import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    message: "Explosives Royalty Calculator API",
    version: "1.0.0",
  });
} 