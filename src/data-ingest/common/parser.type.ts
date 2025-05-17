import { INormalizedData } from './normalized-data.types';

export type DataParser = (a: any) => INormalizedData | undefined;
