import { NextResponse } from 'next/server';

interface RoyaltyCalculationRequest {
  waterGel: number;
  nh4no3: number;
  powderFactor: number;
}

export async function POST(request: Request) {
  try {
    const body: RoyaltyCalculationRequest = await request.json();
    const { waterGel, nh4no3, powderFactor } = body;

    // Step 1: Calculate Total Explosive Quantity (TEQ)
    const teq = (waterGel * 1.2) + nh4no3;

    // Step 2: Determine Blasted Rock Volume
    const blastedRockVolume = teq / powderFactor;
    const expandedBlastedRockVolume = (teq * 1.6) / (powderFactor * 2.83);

    // Step 3: Calculate Royalty Fee
    const royalty = blastedRockVolume * 240;

    // Step 4: Apply Additional Charges
    // SSCL (2.56%)
    const royaltyWithSSCL = royalty * 1.0256;

    // VAT (18%)
    const totalAmountDue = royaltyWithSSCL * 1.18;

    return NextResponse.json({
      teq,
      blastedRockVolume,
      expandedBlastedRockVolume,
      royalty,
      royaltyWithSSCL,
      totalAmountDue,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid input data' },
      { status: 400 }
    );
  }
} 