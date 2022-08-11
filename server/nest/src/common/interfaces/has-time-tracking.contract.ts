import { HasCreatedAt } from './has-created-at.contract';
import { HasUpdatedAt } from './has-updated-at.contract';

export interface HasTimeTracking extends HasCreatedAt, HasUpdatedAt {}
