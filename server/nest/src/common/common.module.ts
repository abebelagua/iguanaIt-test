import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CONFIG_KEY_RUNTIME, RuntimeConfig, configModule } from '../config';

const dbModule = MongooseModule.forRootAsync({
	imports: [configModule],
	inject: [ConfigService],
	useFactory: async (config: ConfigService) => {
		const runtimeConfig = config.get<RuntimeConfig>(CONFIG_KEY_RUNTIME);
		return {
			uri: runtimeConfig.DB_URI,
			useNewUrlParser: true,
			useUnifiedTopology: true
		};
	}
});

@Module({
	imports: [configModule, dbModule]
})
export class CommonModule {}
