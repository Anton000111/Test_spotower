import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

export async function POST(request) {
  const { screenSize, ip, userAgent, dashboardId } = await request.json();

  const prisma = new PrismaClient();

  const track = await prisma.track.create({
    data: {
      screenSize,
      ip,
      userAgent,
      dashboardId,
    }
  });

  if (!track) return NextResponse.json({ error: "Incorrect data" }, { status: 400 })

  return NextResponse.json(track);
}
