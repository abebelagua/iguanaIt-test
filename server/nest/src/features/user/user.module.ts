import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers';
import { UserService } from './services';
import { entities } from './entities';

@Module({
	imports: [MongooseModule.forFeature(entities)],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule {}
