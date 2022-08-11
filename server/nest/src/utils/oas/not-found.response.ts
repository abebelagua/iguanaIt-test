import { ApiProperty, ApiResponseOptions } from '@nestjs/swagger';

import R from './i18n';

export class NotFoundDto {
	@ApiProperty({ type: Number, enum: [404] })
	statusCode: 404;

	@ApiProperty({ type: String, enum: ['Unauthorized'] })
	message: 'Unauthorized';
}

export const NotFoundResponse: ApiResponseOptions = {
	type: NotFoundDto,
	description: R.ERR_API_NOT_FOUND_RESPONSE
};
