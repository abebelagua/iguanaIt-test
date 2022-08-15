import { HasFullTracking, HasId } from '../../common/interfaces'
import { IUser } from './user.contract'

export type IUpdateUserInput = Partial<
	Omit<
		IUser,
		| keyof (HasId & HasFullTracking)
		| 'oneSignalId'
		| 'name'
		| 'externalUserId'
		| 'email'
	>
>
