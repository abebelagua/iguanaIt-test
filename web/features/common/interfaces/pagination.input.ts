export interface IPaginationInput<T> {
	offset?: number;
	limit?: number;
	filters?: T | null;
}
