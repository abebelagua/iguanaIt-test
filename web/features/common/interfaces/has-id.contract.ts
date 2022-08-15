/**
 * A data contract for records that have IDs.
 */
export interface HasId {
	/**
	 * Record ID in Base64 format.
	 */
	id: string;
}

/**
 * A data contract for records that have IDs.
 */
export interface HasHexId {
	/**
	 * Record ID in HEX format.
	 */
	_id: string;
}
