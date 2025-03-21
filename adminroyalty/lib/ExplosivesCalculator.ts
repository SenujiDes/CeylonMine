import {
  WATER_GEL_MULTIPLIER,
  BLASTED_ROCK_MULTIPLIER,
  DENSITY_FACTOR,
  ROYALTY_RATE_PER_CUBIC_METER,
} from './constants';

export class ExplosivesCalculator {
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