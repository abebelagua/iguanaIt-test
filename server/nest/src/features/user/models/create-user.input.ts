import {
	IsArray,
	IsNotEmpty,
	IsObject,
	IsOptional,
	IsString
} from 'class-validator';
import { ICreateUserInput } from '../interfaces/create-user.input';

export class CreateUserInput implements ICreateUserInput {
	@IsNotEmpty()
	@IsString()
	oneSignalId: string;

	@IsNotEmpty()
	@IsString()
	externalUserId: string;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	email: string;

	@IsOptional()
	@IsString()
	image?: string;
}
