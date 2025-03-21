interface RoyaltyCalculationRequest {
  water_gel: number;
  nh4no3: number;
  powder_factor: number;
}

interface RoyaltyCalculationResponse {
  calculation_date: string;
  inputs: {
    water_gel_kg: number;
    nh4no3_kg: number;
    powder_factor: number;
  };
  calculations: {
    total_explosive_quantity: number;
    basic_volume: number;
    blasted_rock_volume: number;
    base_royalty: number;
    royalty_with_sscl: number;
    total_amount_with_vat: number;
  };
  rates_applied: {
    royalty_rate_per_cubic_meter: number;
    sscl_rate: string;
    vat_rate: string;
  };
}

// Fixed rates - updated according to new formula
const ROYALTY_RATE_PER_CUBIC_METER = 240; // LKR
const SSCL_RATE = 0.0256; // 2.56%
const VAT_RATE = 0.18; // 18%

export const calculateRoyalty = async (data: RoyaltyCalculationRequest): Promise<RoyaltyCalculationResponse> => {
  try {
    // Step 1: Calculate Total Explosive Quantity (TEQ)
    const total_explosive_quantity = (data.water_gel * 1.2) + data.nh4no3;
    
    // Step 2: Calculate volumes
    const basic_volume = total_explosive_quantity / data.powder_factor;
    
    // Expanded Blasted Rock Volume calculation
    const blasted_rock_volume = (total_explosive_quantity * 1.6) / (data.powder_factor * 2.83);
    const rounded_blasted_volume = Math.round(blasted_rock_volume * 100) / 100; // Rounded to 2 decimal places
    
    // Step 3: Calculate Royalty Fee
    const base_royalty = rounded_blasted_volume * ROYALTY_RATE_PER_CUBIC_METER;
    
    // Step 4: Apply Additional Charges
    // SSCL (2.56%)
    const royalty_with_sscl = base_royalty * (1 + SSCL_RATE);
    
    // VAT (18%)
    const total_amount_with_vat = royalty_with_sscl * (1 + VAT_RATE);

    // Create the calculation date
    const calculation_date = new Date().toISOString();
    
    // Return the response object
    return {
      calculation_date,
      inputs: {
        water_gel_kg: data.water_gel,
        nh4no3_kg: data.nh4no3,
        powder_factor: data.powder_factor
      },
      calculations: {
        total_explosive_quantity,
        basic_volume,
        blasted_rock_volume: rounded_blasted_volume,
        base_royalty,
        royalty_with_sscl,
        total_amount_with_vat
      },
      rates_applied: {
        royalty_rate_per_cubic_meter: ROYALTY_RATE_PER_CUBIC_METER,
        sscl_rate: `${SSCL_RATE * 100}%`,
        vat_rate: `${VAT_RATE * 100}%`
      }
    };
  } catch (error) {
    console.error('Calculation failed:', error);
    throw error;
  }
}; 