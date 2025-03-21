// app/api/calculateRoyalty.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { waterGel, nh4no3, powderFactor } = req.body;

    // Check if Powder Factor is 0 to prevent division by zero
    if (powderFactor === 0) {
      return res.status(400).json({ error: "Powder Factor cannot be zero" });
    }

    // Step 1: Calculate Total Explosive Quantity (TEQ)
    const teq = (waterGel * 1.2) + nh4no3;

    // Step 2: Calculate Blasted Rock Volume
    const volume = teq / powderFactor;
    const expandedVolume = (teq * 1.6) / (powderFactor * 2.83);

    // Step 3: Calculate Royalty Fee
    const royalty = expandedVolume * 240;

    // Step 4: Apply Additional Charges
    const royaltyWithSSCL = royalty * 1.0256;  // SSCL (2.56%)
    const totalWithVAT = royaltyWithSSCL * 1.18; // VAT (18%)

    res.status(200).json({ 
      teq,
      volume,
      expandedVolume,
      royalty,
      royaltyWithSSCL,
      totalWithVAT
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
} 