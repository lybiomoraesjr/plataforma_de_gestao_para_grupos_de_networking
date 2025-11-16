import { NextResponse } from "next/server";
import { Intention } from "@/lib/models"; 
import { sequelize } from "@/lib/db"; 

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

    const newIntention = await Intention.create({
      name,
      email,
      company,
      reason,
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
