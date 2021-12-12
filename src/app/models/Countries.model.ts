import { LatestData } from './LatestData.model';
import { Timeline } from './Timeline.model';
import { Today } from './Today.model';

export interface Country {
  name: string;
  code: string;
  population: number;
  updated_at: Date;
  today: Today;
  latest_data: LatestData;
  timeline: Timeline[];
}
