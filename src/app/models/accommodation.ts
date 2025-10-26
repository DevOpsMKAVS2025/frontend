export interface AccommodationPagedResponse {
    results: Accommodation[];
    totalCount: number;
}
export interface Duration {
    from: string,
    to: string
}
export enum ConvenieceType {
  WIFI = 'WIFI',
  KITCHEN = 'KITCHEN',
  AIR_CONDITION = 'AIR_CONDITION',
  FREE_PARKING = 'FREE_PARKING'
}

export enum PriceType {
  PER_GUEST = 'PER_GUEST',
  PER_UNIT = 'PER_UNIT'
}

export interface DateRange {
  start: string; // ISO date yyyy-mm-dd
  end: string;   // ISO date yyyy-mm-dd
}

export interface Availability {
  id?: string;
  accommodationId?: string;
  duration: DateRange;
}

export interface Price {
  id?: string;
  accommodationId?: string;
  amount: number;
  duration: DateRange;
  priceType: PriceType;
}

export interface Accommodation {
  id?: string;
  name: string;
  location: string;
  conveniences: ConvenieceType[];
  photos: string[];
  minGuestNumber: number;
  maxGuestNumber: number;
  availability: Availability[];
  prices: Price[];
  globalPrice: number; // base price
  isAutoReservation?: boolean;
  ownerId?: string;
}
