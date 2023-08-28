import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

export async function POST(request) {
  const data = await request.json();

  const prisma = new PrismaClient();

  const dashboard = await prisma.dashboard.create({
    data
  });

  if (!dashboard) return NextResponse.json({ error: "Incorrect data" }, { status: 400 })

  return NextResponse.json(dashboard);
}
