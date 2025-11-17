import { NextResponse } from "next/server";
import { Intention } from "@/lib/models";
import { Op } from "sequelize"; 

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { valid: false, message: "Token não fornecido." },
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
      attributes: ['email'],
    });
    // TODO: criar endpoint para renovar tokens expirados ou próximos do vencimento.

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
