import { Module } from '@nestjs/common';

import { CommonModule } from './common';
import { features } from './features';
import { HealthzController } from './healthz.controller';

@Module({
	imports: [CommonModule, ...features],
	controllers: [HealthzController]
})
export class AppModule {}
