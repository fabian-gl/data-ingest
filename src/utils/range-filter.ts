import { isEmptyObject } from './is-empty-object';

export type MongoRangeFilter<T> = {
  $gte?: T;
  $lt?: T;
};

export function getRangeFilter<T>(
  valueFrom: T,
  valueTo: T,
): MongoRangeFilter<T> | undefined {
  const rangeFilter: MongoRangeFilter<T> = {};

  if (valueFrom) rangeFilter.$gte = valueFrom;

  if (valueTo) rangeFilter.$lt = valueTo;

  return !isEmptyObject(rangeFilter) ? rangeFilter : undefined;
}
