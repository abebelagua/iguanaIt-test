import { ModelDefinition } from '@nestjs/mongoose';

import { EntityBase } from './base.entity';
import { TrackedEntity } from './tracked.entity';

export { EntityBase, TrackedEntity };

export const models: ModelDefinition[] = [];
