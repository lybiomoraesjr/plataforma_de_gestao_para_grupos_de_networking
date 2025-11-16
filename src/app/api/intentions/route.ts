import { NextResponse } from "next/server";
import { Intention, User } from "@/lib/models";
import { sequelize } from "@/lib/db";
import { Op } from "sequelize";

export async function POST(request: Request) {
  try {
    await sequelize.sync();

    const body = await request.json();
    const { name, email, company, reason } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Nome e Email são obrigatórios." },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Este e-mail já está cadastrado como membro.",
        },
        { status: 409 }
      );
    }

    const existingIntention = await Intention.findOne({
      where: {
        email,
        status: {
          [Op.or]: ["PENDING", "APPROVED"],
        },
      },
    });

    if (existingIntention) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Este e-mail já possui uma intenção de participação em andamento.",
        },
        { status: 409 }
      );
    }

    const newIntention = await Intention.create({
      name,
      email,
      company,
      reason,
      status: "PENDING",
    });

    return NextResponse.json(
      { success: true, intentionId: newIntention.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar intenção:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
