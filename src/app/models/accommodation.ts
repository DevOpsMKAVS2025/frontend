export interface AccommodationPagedResponse {
    results: Accommodation[];
    totalCount: number;
}

export interface Accommodation {
    id: string,
    name: string,
    location: string,
    conveniences: number[],
    photos: string[],
    minGuestNumber: number,
    maxGuestNumber: number,
    availability: Availability[],
    prices: Price[],
    globalPrice: number,
    isAutoReservation: boolean,
    ownerId: string
}

export interface Availability {
    id: string,
    accommodationId: string,
    duration: Duration
}

export interface Price {
    id: string,
    accommodationId: string,
    amount: number,
    duration: Duration,
    priceType: number
}

export interface Duration {
    from: string,
    to: string
}