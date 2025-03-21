import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Constants
const WATER_GEL_MULTIPLIER = 1.2;
const BLASTED_ROCK_MULTIPLIER = 2.83;
const DENSITY_FACTOR = 1.6;
const ROYALTY_RATE_PER_CUBIC_METER = 240;
const SSCL_RATE = 0.0256;  // 2.56%
const VAT_RATE = 0.18;     // 18%

class ExplosivesCalculator {
  static calculateTotalExplosiveQuantity(waterGel: number, nh4no3: number): number {
    return (waterGel * WATER_GEL_MULTIPLIER) + nh4no3;
  }

  static calculateRockVolume(teq: number, powderFactor: number): number {
    return teq / powderFactor;
  }

  static calculateBlastedRockVolume(teq: number, powderFactor: number): number {
    return (teq * DENSITY_FACTOR) / (powderFactor * BLASTED_ROCK_MULTIPLIER);
  }

  static calculateRoyalty(volume: number): number {
    return volume * ROYALTY_RATE_PER_CUBIC_METER;
  }

  static applySscl(royalty: number): number {
    return royalty * 1.0256;
  }

  static applyVat(royaltyWithSscl: number): number {
    return royaltyWithSscl * 1.18;
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }
    
    const required = ['water_gel', 'nh4no3', 'powder_factor'];
    for (const field of required) {
      if (!(field in data)) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }
    
    // Extract and validate input
    const waterGel = Number(data.water_gel);
    const nh4no3 = Number(data.nh4no3);
    const powderFactor = Number(data.powder_factor);
    
    if ([waterGel, nh4no3, powderFactor].some(val => val <= 0 || isNaN(val))) {
      return NextResponse.json({ error: "All values must be positive numbers" }, { status: 400 });
    }
    
    // Perform calculations
    const teq = ExplosivesCalculator.calculateTotalExplosiveQuantity(waterGel, nh4no3);
    const basicVolume = ExplosivesCalculator.calculateRockVolume(teq, powderFactor);
    const blastedVolume = ExplosivesCalculator.calculateBlastedRockVolume(teq, powderFactor);
    const baseRoyalty = ExplosivesCalculator.calculateRoyalty(blastedVolume);
    const royaltyWithSscl = ExplosivesCalculator.applySscl(baseRoyalty);
    const totalAmount = ExplosivesCalculator.applyVat(royaltyWithSscl);
    
    // Save calculation to database
    const calculation = await prisma.royaltyCalculation.create({
      data: {
        waterGel,
        nh4no3,
        powderFactor,
        totalExplosiveQuantity: teq,
        blastedRockVolume: blastedVolume,
        baseRoyalty,
        royaltyWithSscl,
        totalAmount,
      },
    });
    
    // Return the same response format as Flask
    return NextResponse.json({
      calculation_date: calculation.calculationDate.toISOString(),
      inputs: {
        water_gel_kg: waterGel,
        nh4no3_kg: nh4no3,
        powder_factor: powderFactor
      },
      calculations: {
        total_explosive_quantity: Number(teq.toFixed(2)),
        basic_volume: Number(basicVolume.toFixed(2)),
        blasted_rock_volume: Number(blastedVolume.toFixed(2)),
        base_royalty: Number(baseRoyalty.toFixed(2)),
        royalty_with_sscl: Number(royaltyWithSscl.toFixed(2)),
        total_amount_with_vat: Number(totalAmount.toFixed(2))
      },
      rates_applied: {
        royalty_rate_per_cubic_meter: ROYALTY_RATE_PER_CUBIC_METER,
        sscl_rate: "2.56%",
        vat_rate: "18%"
      }
    });
    
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
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