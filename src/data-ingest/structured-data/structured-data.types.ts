export interface IStructuredData {
  id: number;
  name: string;
  address: Address;
  isAvailable: boolean;
  priceForNight: number;
}

export interface Address {
  country: string;
  city: string;
}
