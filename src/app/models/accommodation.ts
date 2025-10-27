export interface AccommodationPagedResponse {
    results: Accommodation[];
    totalCount: number;
}
export interface Duration {
    from: string,
    to: string
}
export enum ConvenieceType {
  WIFI = 0,
  KITCHEN = 1,
  AIR_CONDITION = 2,
  FREE_PARKING = 3
}

export enum PriceType {
  PER_GUEST = 0,
  PER_UNIT = 1
}

export interface DateRange {
  from: string; // ISO date yyyy-mm-dd
  to: string;   // ISO date yyyy-mm-dd
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
  priceType: PriceType;
  globalPrice: number; // base price
  isAutoReservation?: boolean;
  ownerId?: string;
}
export interface AccommodationAndPrice {
  id: string; 
  name: string;
  location: string;
  conveniences: ConvenieceType[];
  photos: string[];
  minGuestNumber: number;
  maxGuestNumber: number;
  totalPrice: number;
  isAutoReservation: boolean;
  pricePerPersonOrNight: number;
  priceType: PriceType;
}