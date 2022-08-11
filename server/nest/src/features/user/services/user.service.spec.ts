import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import Chance from 'chance';

import { managementClientProvider } from '../../auth/services/auth0-management-client.provider';
import {
	rootMongooseTestModule,
	closeMongoInMemoryConnection
} from '../../../common/mongoose.helper';
import { PaginationInput } from '../../../common/models/pagination.input';

import {
	CreateAccountInput,
	UpdateAccountInput,
	AccountUserInput,
	AccountMemberInput,
	PasswordChangeTicketResponse
} from '../models';
import { Account, AccountSchema, User } from '../entities';

import { AccountService } from './user.service';
import { GhlExtensionOptionsService } from '../../ghl-extension-options/services';
import { CustomerService } from '../../billing/services';

describe('AccountService', () => {
	let service: AccountService;
	let module: TestingModule;
	const chance = new Chance();

	const USER_ID = 'auth0|625e615a82f5e20070c19cc0';
	let accountGlobal: Account;

	const user: User = {
		id: USER_ID,
		email: chance.email(),
		firstName: chance.first(),
		lastName: chance.last(),
		phone: chance.phone(),
		picture: chance.url()
	};

	const accountInput: CreateAccountInput = {
		name: chance.name(),
		owner: { ...user } as AccountUserInput,
		members: [{ ...user, role: 'Admin' } as AccountMemberInput]
	};

	const updateAccountInput: UpdateAccountInput = {
		name: chance.name()
	};

	beforeAll(async () => {
		module = await Test.createTestingModule({
			imports: [
				// rootMongooseTestModule(),
				MongooseModule.forFeature([
					{
						name: Account.name,
						schema: AccountSchema
					}
				])
			],
			providers: [
				AccountService,
				CustomerService,
				GhlExtensionOptionsService,
				ConfigService,
				managementClientProvider
			]
		}).compile();

		service = await module.get<AccountService>(AccountService);
	});

	afterAll(async () => {
		if (module) {
			await module.close();
			await closeMongoInMemoryConnection();
		}
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	// it('should create an account with createAccountInput', async () => {
	// 	const account = await service.create(user, accountInput);
	// 	expect(account._id).toBeDefined();
	// 	expect(account.id).toBeDefined();
	// 	expect(account.name).toBe(accountInput.name);
	// 	expect(account.owner.id).toBe(accountInput.owner.id);
	// 	expect(account.owner.email).toBeDefined();
	// 	expect(account.members[0].id).toBe(user.id);
	// 	expect(account.members[0].email).toBeDefined();
	// 	accountGlobal = account;
	// });

	// it('should get a list of accounts with empty pagination', async () => {
	// 	const paginationQuery: PaginationInput<Account> = { filters: null };
	// 	const { items, count, limit, offset } = await service.findAll(
	// 		paginationQuery
	// 	);

	// 	expect(items).toBeDefined();
	// 	expect(count).toBeDefined();
	// 	expect(count).toBe(1);
	// 	expect(limit).toBeDefined();
	// 	expect(limit).toBe(10);
	// 	expect(offset).toBeDefined();
	// 	expect(offset).toBe(0);
	// 	expect(Array.isArray(items)).toBe(true);
	// 	expect(items.length).toBe(1);
	// });

	// it('should get a list of accounts with specific pagination and filters', async () => {
	// 	const paginationQuery: PaginationInput<Partial<Account>> = {
	// 		limit: 4,
	// 		offset: 0,
	// 		filters: {
	// 			name: accountInput.name
	// 		}
	// 	};
	// 	const { items, count, limit, offset } = await service.findAll(
	// 		paginationQuery
	// 	);
	// 	expect(items).toBeDefined();
	// 	expect(count).toBeDefined();
	// 	expect(count).toBe(1);
	// 	expect(limit).toBeDefined();
	// 	expect(limit).toBe(4);
	// 	expect(offset).toBeDefined();
	// 	expect(offset).toBe(0);
	// 	expect(Array.isArray(items)).toBe(true);
	// 	expect(items.length).toBe(1);
	// });

	// it('should get the account by its own accountId', async () => {
	// 	const account = await service.findById(accountGlobal._id);
	// 	expect(account.id).toStrictEqual(accountGlobal.id);
	// 	expect(account.name).toBe(accountInput.name);
	// });

	// it('should get accounts by userId', async () => {
	// 	const { items, count, limit, offset } = await service.findByUserId(
	// 		accountInput.owner.id,
	// 		{ filters: null }
	// 	);
	// 	expect(items).toBeDefined();
	// 	expect(count).toBeDefined();
	// 	expect(count).toBe(1);
	// 	expect(Array.isArray(items)).toBe(true);
	// 	expect(items.length).toBe(1);
	// });

	// it('should get accounts with user picture from auth0', async () => {
	// 	const account = await service.findUserInfoFromAuth0(accountGlobal);
	// 	expect(account.id).toBeDefined();
	// 	expect(account.name).toBe(accountInput.name);
	// 	expect(account.owner.id).toStrictEqual(accountInput.owner.id);
	// 	expect(account.owner.email).toBeDefined();
	// 	expect(account.owner.picture).toBeDefined();
	// 	expect(account.members[0].id).toBe(user.id);
	// 	expect(account.members[0].email).toBeDefined();
	// 	expect(account.members[0].picture).toBeDefined();
	// });

	// it('should update some account properties', async () => {
	// 	const updatedAccount = await service.update(
	// 		user,
	// 		accountGlobal._id,
	// 		updateAccountInput
	// 	);
	// 	expect(updatedAccount._id).toStrictEqual(accountGlobal._id);
	// 	expect(updatedAccount.name).toBe(updateAccountInput.name);
	// });

	// // it('should reset password for a user from the testing account', async () => {
	// // 	const passwordChangeTicketResponse: PasswordChangeTicketResponse =
	// // 		await service.resetPassword(user.id);
	// // 	expect(passwordChangeTicketResponse).toBeDefined();
	// // 	expect(passwordChangeTicketResponse.ticket).toBeDefined();
	// // });

	// it('should remove user from the testing account members', async () => {
	// 	const deletedAccount = await service.removeUserFromAccountMembers(
	// 		user,
	// 		accountGlobal._id,
	// 		user.id
	// 	);
	// 	expect(deletedAccount).toBeDefined();
	// 	expect(deletedAccount.members).toBeDefined();
	// 	expect(deletedAccount.members.length).toBe(0);
	// });

	// it('should remove the testing account', async () => {
	// 	const deletedAccount = await service.remove(accountGlobal._id);
	// 	expect(deletedAccount).toBeDefined();
	// });

	// it('should receive not found error for getting the deleted account', async () => {
	// 	try {
	// 		await service.findById(accountGlobal._id);
	// 	} catch (err) {
	// 		console.log(err);
	// 		expect(err).toBeDefined();
	// 		// expect(err.response).toBeDefined();
	// 		// expect(err.response.statusCode).toBe(404);
	// 	}
	// });

	// it('should not be able to update an non existing account', async () => {
	// 	try {
	// 		await service.update(user, accountGlobal._id, updateAccountInput);
	// 	} catch (err) {
	// 		expect(err).toBeDefined();
	// 		expect(err.response).toBeDefined();
	// 		expect(err.response.statusCode).toBe(404);
	// 	}
	// });
});
