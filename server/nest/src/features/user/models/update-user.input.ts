import { IsOptional, IsString } from 'class-validator';
import { IUpdateUserInput } from '../interfaces';

export class UpdateUserInput implements IUpdateUserInput {
	@IsOptional()
	@IsString()
	image?: string;
}
