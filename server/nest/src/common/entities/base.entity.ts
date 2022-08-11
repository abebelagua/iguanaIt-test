import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { hexToBase64 } from '../../utils';
import { HasHexId, HasId } from '../interfaces/has-id.contract';

@Schema()
export abstract class EntityBase implements HasId, HasHexId {
	/**
	 * ID as a HEX string
	 */
	_id: string;

	/**
	 * Auto-generated system identifier
	 */
	@Prop({
		get: function (this: Document) {
			const hex = this._id.toString();
			const b64 = hexToBase64(hex);
			return b64;
		}
	})
	id: string;
}
