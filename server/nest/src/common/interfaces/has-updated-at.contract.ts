/**
 * A data contract for records that track modification time.
 */
export interface HasUpdatedAt {
	/**
	 * The date and time the record was last modified.
	 */
	updatedAt: Date;
}
