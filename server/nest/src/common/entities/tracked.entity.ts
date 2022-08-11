import { Prop, Schema } from '@nestjs/mongoose';
import { HasFullTracking } from '../interfaces/has-full-tracking.contract';
import { HasId } from '../interfaces/has-id.contract';

import { EntityBase } from './base.entity';

@Schema()
export abstract class TrackedEntity
	extends EntityBase
	implements HasFullTracking, HasId
{
	/**
	 * Date and time of creation
	 */
	@Prop({ required: true, default: () => new Date() })
	createdAt: Date;

	@Prop({ required: true, default: () => new Date() })
	updatedAt: Date;

	@Prop({ required: false })
	createdBy?: string;

	@Prop({ required: false })
	updatedBy?: string;
}
