// src/app/api/intentions/validate/route.ts

import { NextResponse } from "next/server";
import { Intention } from "@/lib/models";
import { Op } from "sequelize"; // Importa o operador do Sequelize

export async function GET(request: Request) {
  try {
    // 1. Pega a URL e extrai o parâmetro 'token'
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { valid: false, message: "Token não fornecido." },
        { status: 400 }
      );
    }

    // 2. Procura a intenção no banco com esse token
    const intention = await Intention.findOne({
      where: {
        registrationToken: token,
        status: "APPROVED",
        // 3. Garante que o token não expirou
        tokenExpiresAt: {
          [Op.gt]: new Date(), // 'Op.gt' significa "greater than" (maior que)
        },
      },
    });

    if (!intention) {
      return NextResponse.json(
        { valid: false, message: "Token inválido ou expirado." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { valid: true, email: intention.email },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao validar token:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
