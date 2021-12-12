import { Calculated } from './Calculated.model';

export interface LatestData {
    deaths: number;
    confirmed: number;
    recovered: number;
    critical: number;
    calculated: Calculated;
  }
