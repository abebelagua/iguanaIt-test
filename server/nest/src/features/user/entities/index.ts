import { ModelDefinition } from '@nestjs/mongoose';

import { User, UserDocument, UserSchema } from './user.entity';
export { User, UserDocument, UserSchema };

export * from './user.entity';

export const entities: ModelDefinition[] = [
	{
		name: User.name,
		schema: UserSchema
	}
];
