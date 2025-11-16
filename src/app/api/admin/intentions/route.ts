import { NextResponse } from "next/server";
import { Intention } from "@/lib/models";
import { sequelize } from "@/lib/db";

export async function GET(request: Request) {
  try {
    await sequelize.sync();

    const intentions = await Intention.findAll({
      order: [["created_at", "DESC"]],
    });

    return NextResponse.json(intentions, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar intenções:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
