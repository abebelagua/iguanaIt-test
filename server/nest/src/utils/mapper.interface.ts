export interface Mapper<TSource, TDestination, TExtras = never> {
	map(src: TSource, extras?: TExtras): TDestination;
}
