import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationInput } from '../../../common/models';
import { getMongooseFilter } from '../../../utils';

import { User } from '../entities';
import {
	ChangeStream,
	ChangeStreamDocument,
	ChangeStreamOptions
} from 'mongodb';
import { ICreateUserInput } from '../interfaces/create-user.input';
import { IUpdateUserInput, IUser } from '../interfaces';
import { IPaginationInput } from '../../../common/interfaces';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name)
		readonly userModel: Model<User>
	) {}

	/**
	 * Create User
	 * @param input User data
	 * @returns The created {@link IUser}
	 */
	async create(input: ICreateUserInput) {
		const usersFound = await this.findAll({
			filters: {
				externalUserId: input.externalUserId
			} as IUser
		});

		if (usersFound.count > 0) {
			throw new HttpException('User exist', HttpStatus.CREATED);
		}
		const user = await new this.userModel({
			...input,
			createdBy: input.externalUserId,
			createdAt: new Date()
		} as IUser).save();
		return user;
	}

	/**
	 * Find all Users
	 * @param input The input pagination with filters for {@link IUser}
	 * @returns List of {@link IUser}
	 */
	async findAll(input: IPaginationInput<Partial<IUser>>) {
		const pagination = input.filters ? input : new PaginationInput();
		//Count the total of users
		const count = await this.userModel.count(
			getMongooseFilter(pagination.filters)
		);

		//Find the users with the pagination and filters
		const items = await this.userModel
			.find(getMongooseFilter(pagination.filters))
			.skip(pagination.offset)
			.limit(pagination.limit)
			.exec();

		//Create response list and find user images from Auth0
		const responseList = {
			items,
			count,
			limit: pagination.limit,
			offset: pagination.offset
		};
		return responseList;
	}

	/**
	 * Find an user by id
	 * @param id User id
	 * @returns User found
	 */
	async findById(id: string) {
		const user = await this.userModel.findById(id);
		return user;
	}

	/**
	 * Update an user
	 * @param id User id
	 * @param input The input data for update
	 * @returns User updated
	 */
	async update(id: string, input: IUpdateUserInput) {
		const user = await this.userModel.findById(id);

		return await this.userModel.findByIdAndUpdate(
			id,
			{ ...input, updatedBy: user.id, updatedAt: new Date() },
			{
				new: true
			}
		);
	}

	//Todo la eliminacion debe ser logica no fisica
	/**
	 * Remove a user
	 * @param id User id
	 * @returns User deleted
	 */
	async remove(id: string) {
		const user = await this.userModel.findByIdAndDelete(id);
		return user;
	}

	/**
	 * Add tag to user
	 * @param id User id
	 * @param key Tag key
	 * @param value Tag value
	 * @returns User deleted
	 */
	async addTagToUser(id: string, key: string, value: string) {
		const user = await this.userModel.findById(id);

		return await this.userModel.findByIdAndUpdate(
			id,
			{
				tags: [...user.tags, { key, value }],
				updatedBy: user.id,
				updatedAt: new Date()
			},
			{
				new: true
			}
		);
	}

	watch(
		pipeline?: Array<Record<string, unknown>>,
		options?: ChangeStreamOptions
	) {
		const stream: ChangeStream<IUser, ChangeStreamDocument<IUser>> = (
			this.userModel as any
		).watch(pipeline, options);
		return stream;
	}
}
