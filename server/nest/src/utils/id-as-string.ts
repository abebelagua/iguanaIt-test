import { Document } from 'mongoose';

export const mapId = (dto): string => dto.id;

export const mapMongoId = (src: Document<string>) => ({
	id: src._id.toString()
});
