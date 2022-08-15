import { HasFullTracking, HasHexId } from '../../../common/interfaces';
import { IUser } from './user.contract';

export type ICreateUserInput = Omit<
	IUser,
	keyof (HasHexId & HasFullTracking) | 'image' | 'tags'
> & {
	image?: string;
};
