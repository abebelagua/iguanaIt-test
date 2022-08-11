import { delay } from './../../../utils/delay';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationInput } from 'src/common';
import { ICreateUserInput, IUpdateUserInput, IUser } from '../interfaces';
import { UserService } from '../services';

@ApiTags('user')
@Controller('/user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('all')
	@ApiOperation({
		operationId: 'getAll',
		summary: 'Get all users using pagination'
	})
	getAll(@Body() input: PaginationInput<IUser>) {
		return this.userService.findAll(input);
	}

	@Get(':id')
	@ApiOperation({
		operationId: 'getOne',
		summary: 'Get a user by id'
	})
	getOne(@Param('id') id: string) {
		return this.userService.findById(id);
	}

	@Post()
	@ApiOperation({
		operationId: 'create',
		summary: 'Create a user'
	})
	create(@Body() input: ICreateUserInput) {
		return this.userService.create(input);
	}

	@Put(':id')
	@ApiOperation({
		operationId: 'update',
		summary: 'Update a user'
	})
	update(@Param('id') id: string, @Body() input: IUpdateUserInput) {
		return this.userService.update(id, input);
	}

	@Delete(':id')
	@ApiOperation({
		operationId: 'delete',
		summary: 'delete a user by id'
	})
	delete(@Param('id') id: string) {
		return this.userService.remove(id);
	}
}
