import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { TrackedEntity } from '../../../common';
import { IUser } from '../interfaces';

/**
 * User schema information.
 */
@Schema({ collection: 'users' })
export class User extends TrackedEntity implements IUser {
	/**
	 * One Signal ID assigned to the user.
	 */
	@Prop({ required: true })
	oneSignalId: string;

	/**
	 * User id of social login.
	 */
	@Prop({ required: true })
	externalUserId: string;

	/**
	 * User name
	 */
	@Prop({ required: true })
	name: string;

	/**
	 * User email
	 */
	@Prop({ required: true })
	email: string;

	/**
	 * Image url
	 */
	@Prop({ required: false, default: '' })
	image: string;
}

/**
 * DB schema for the `User` entity
 */
export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document<string>;
