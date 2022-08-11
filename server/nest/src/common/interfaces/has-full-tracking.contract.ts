import { HasTimeTracking } from './has-time-tracking.contract';
import { HasUserTracking } from './has-user-tracking.contract';

export interface HasFullTracking extends HasTimeTracking, HasUserTracking {}
