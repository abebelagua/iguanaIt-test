import { HasFullTracking, HasHexId, IKVPair } from '../../../common/interfaces';

export interface IUser extends HasHexId, HasFullTracking {
	/**
	 * One Signal ID assigned to the user.
	 */
	oneSignalId: string;

	/**
	 * User id of social login.
	 */
	externalUserId: string;

	/**
	 * User name
	 */
	name: string;

	/**
	 * User email
	 */
	email: string;

	/**
	 * Image url
	 */
	image: string;

	/**
	 * User tags
	 */
	tags: IKVPair[];
}
