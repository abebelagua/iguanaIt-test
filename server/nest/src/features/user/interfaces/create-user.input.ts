import { HasFullTracking, HasId } from '../../../common/interfaces';
import { IUser } from './user.contract';

export type ICreateUserInput = Omit<
	IUser,
	keyof (HasId & HasFullTracking) | 'image'
> & {
	image?: string;
};
