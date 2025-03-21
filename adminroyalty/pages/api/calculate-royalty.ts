import type { NextApiRequest, NextApiResponse } from 'next';

interface RoyaltyCalculationRequest {
  waterGel: number;
  nh4no3: number;
  powderFactor: number;
}

interface RoyaltyCalculationResponse {
  teq: number;
  blastedRockVolume: number;
  expandedBlastedRockVolume: number;
  royalty: number;
  royaltyWithSSCL: number;
  totalAmountDue: number;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RoyaltyCalculationResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { waterGel, nh4no3, powderFactor } = req.body as RoyaltyCalculationRequest;

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

    return res.status(200).json({
      teq,
      blastedRockVolume,
      expandedBlastedRockVolume,
      royalty,
      royaltyWithSSCL,
      totalAmountDue,
    });
  } catch (error) {
    return res.status(400).json({ error: 'Invalid input data' });
  }
} 