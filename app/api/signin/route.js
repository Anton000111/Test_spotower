import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

export async function POST(request) {
  const { email, password } = await request.json();

  const prisma = new PrismaClient();

  const user = await prisma.user.findFirst({ where: {
    email,
    password
  }});

  if (!user) return NextResponse.json({ error: "Incorrect email or password" }, { status: 400 })

  return NextResponse.json(user);
}