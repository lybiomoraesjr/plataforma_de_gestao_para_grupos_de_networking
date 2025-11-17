import { NextResponse } from "next/server";
import { Intention } from "@/lib/models";
import crypto from "crypto";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    const body = await request.json();
    const { action } = body;

    const intention = await Intention.findByPk(id);

    if (!intention) {
      console.log("DEBUG: findByPk não encontrou nada com esse ID.");
      return NextResponse.json(
        { success: false, message: "Intenção não encontrada." },
        { status: 404 }
      );
    }

    let registrationLink = null;

    if (action === "APPROVE") {
      const token = crypto.randomBytes(32).toString("hex");
      const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

      await intention.update({
        status: "APPROVED",
        registrationToken: token,
        tokenExpiresAt: expires,
      });

      registrationLink = `http://localhost:3000/cadastro?token=${token}`;
      console.log("--- LINK DE CONVITE GERADO ---");
      console.log(registrationLink);
      console.log("-------------------------------");
    } else if (action === "REJECT") {
      await intention.update({
        status: "REJECTED",
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Ação inválida. Use 'APPROVE' ou 'REJECT'.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        intention: intention,
        registrationLink: registrationLink,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao atualizar intenção:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
