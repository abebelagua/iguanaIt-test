import { HasCreatedBy } from './has-created-by.contract';
import { HasUpdatedBy } from './has-updated-by.contract';

export interface HasUserTracking extends HasCreatedBy, HasUpdatedBy {}
