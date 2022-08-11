import { IsNumber, IsObject, IsOptional } from 'class-validator';
import { IPaginationInput } from '../interfaces';

export class PaginationInput<T> implements IPaginationInput<T> {
	@IsOptional()
	@IsNumber()
	offset?: number = 0;

	@IsOptional()
	@IsNumber()
	limit?: number = 10;

	@IsOptional()
	@IsObject()
	filters?: T = null;
}
