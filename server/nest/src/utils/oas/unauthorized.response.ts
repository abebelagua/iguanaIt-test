import { ApiProperty, ApiResponseOptions } from '@nestjs/swagger';

import R from './i18n';

export class UnauthorizedDto {
	@ApiProperty({ type: Number, enum: [401] })
	statusCode: 401;

	@ApiProperty({ type: String, enum: ['Unauthorized'] })
	message: 'Unauthorized';
}

export const UnauthorizedResponse: ApiResponseOptions = {
	type: UnauthorizedDto,
	description: R.ERR_API_UNAUTHORIZED_RESPONSE
};
