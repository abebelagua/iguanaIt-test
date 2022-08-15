/**
 * A data contract for records that track modifier identity.
 */
export interface HasUpdatedBy {
	/**
	 * And identifier for the user or service account that last updated the record.
	 */
	updatedBy?: string;
}
