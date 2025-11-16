import { NextResponse } from "next/server";
import { Intention, User } from "@/lib/models";
import { sequelize } from "@/lib/db";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  await sequelize.sync();

  try {
    const body = await request.json();
    const { token, name, password, company } = body;

    if (!token || !name || !password) {
      return NextResponse.json(
        { success: false, message: "Token, Nome e Senha são obrigatórios." },
        { status: 400 }
      );
    }

    const intention = await Intention.findOne({
      where: {
        registrationToken: token,
        status: "APPROVED",
        tokenExpiresAt: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (!intention) {
      return NextResponse.json(
        { success: false, message: "Token inválido ou expirado." },
        { status: 404 }
      );
    }

    const existingUser = await User.findOne({
      where: { email: intention.email },
    });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Este email já foi cadastrado." },
        { status: 409 }
      );
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name,
      email: intention.email,
      passwordHash,
      company,
      role: "MEMBER",
      status: "ACTIVE",
    });

    await intention.update({
      registrationToken: null,
      tokenExpiresAt: null,
    });

    return NextResponse.json(
      { success: true, userId: newUser.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
