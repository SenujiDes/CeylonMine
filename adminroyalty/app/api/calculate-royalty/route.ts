import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { ExplosivesCalculator } from '../../../lib/ExplosivesCalculator';
import { z } from 'zod';

const prisma = new PrismaClient();

// Input validation schema
const CalculationInputSchema = z.object({
  water_gel: z.number().positive(),
  nh4no3: z.number().positive(),
  powder_factor: z.number().positive(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    
    // Validate input
    const validatedData = CalculationInputSchema.safeParse(json);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid input data', details: validatedData.error },
        { status: 400 }
      );
    }

    const { water_gel, nh4no3, powder_factor } = validatedData.data;

    // Perform calculations
    const teq = ExplosivesCalculator.calculateTotalExplosiveQuantity(water_gel, nh4no3);
    const basicVolume = ExplosivesCalculator.calculateRockVolume(teq, powder_factor);
    const blastedVolume = ExplosivesCalculator.calculateBlastedRockVolume(teq, powder_factor);
    const baseRoyalty = ExplosivesCalculator.calculateRoyalty(blastedVolume);
    const royaltyWithSscl = ExplosivesCalculator.applySscl(baseRoyalty);
    const totalAmount = ExplosivesCalculator.applyVat(royaltyWithSscl);

    // Save calculation to database
    const calculation = await prisma.royaltyCalculation.create({
      data: {
        waterGel: water_gel,
        nh4no3: nh4no3,
        powderFactor: powder_factor,
        totalExplosiveQuantity: teq,
        blastedRockVolume: blastedVolume,
        baseRoyalty: baseRoyalty,
        royaltyWithSscl: royaltyWithSscl,
        totalAmount: totalAmount,
      },
    });

    // Prepare response
    const response = {
      calculation_date: calculation.calculationDate.toISOString(),
      inputs: {
        water_gel_kg: water_gel,
        nh4no3_kg: nh4no3,
        powder_factor: powder_factor,
      },
      calculations: {
        total_explosive_quantity: Number(teq.toFixed(2)),
        basic_volume: Number(basicVolume.toFixed(2)),
        blasted_rock_volume: Number(blastedVolume.toFixed(2)),
        base_royalty: Number(baseRoyalty.toFixed(2)),
        royalty_with_sscl: Number(royaltyWithSscl.toFixed(2)),
        total_amount_with_vat: Number(totalAmount.toFixed(2)),
      },
      rates_applied: {
        royalty_rate_per_cubic_meter: 240,
        sscl_rate: "2.56%",
        vat_rate: "18%",
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: "healthy",
    message: "Explosives Royalty Calculator API",
    version: "1.0.0",
  });
} 