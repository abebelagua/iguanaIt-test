import { ApiProperty, ApiResponseOptions } from '@nestjs/swagger';

import R from './i18n';

export class UnprocessableEntityDto {
	@ApiProperty({ type: Number, enum: [422] })
	statusCode: 422;

	@ApiProperty({ type: String, enum: ['Unprocessable Entity'] })
	error: 'Unprocessable Entity';

	@ApiProperty()
	message: string;
}

export const UnprocessableEntityResponse: ApiResponseOptions = {
	type: UnprocessableEntityDto,
	description: R.ERR_UNPROCESSABLE_ENTITY_RESPONSE
};
