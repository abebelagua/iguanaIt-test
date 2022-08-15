/**
 * A data contract for records that track creator identity.
 */
export interface HasCreatedBy {
	/**
	 * An identifier for the user or service account that created the record.
	 */
	createdBy?: string;
}
