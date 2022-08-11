import { HasFullTracking, HasId } from '../../../common/interfaces';

export interface IUser extends HasId, HasFullTracking {
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
}
