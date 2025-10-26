import { Observable, of } from "rxjs";
import { Accommodation, ConvenieceType, PriceType } from "../models/accommodation";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class AccommodationService {
     private data: Accommodation[] = [
    {
      id: '1',
      name: 'Sunny Beach House',
      location: 'Novi Sad',
      conveniences: [ConvenieceType.WIFI, ConvenieceType.KITCHEN, ConvenieceType.FREE_PARKING],
      photos: [],
      minGuestNumber: 1,
      maxGuestNumber: 6,
      availability: [
        { id: 'a1', duration: { start: '2025-06-01', end: '2025-09-30' } },
        { id: 'a2', duration: { start: '2025-11-01', end: '2025-12-31' } }
      ],
      prices: [
        { id: 'p1', amount: 80, duration: { start: '2025-06-01', end: '2025-08-31' }, priceType: PriceType.PER_UNIT },
        { id: 'p2', amount: 90, duration: { start: '2025-08-15', end: '2025-08-20' }, priceType: PriceType.PER_UNIT }
      ],
      globalPrice: 60,
      isAutoReservation: true,
      ownerId: 'host1'
    },
    {
      id: '2',
      name: 'City Center Apartment',
      location: 'Belgrade',
      conveniences: [ConvenieceType.WIFI, ConvenieceType.AIR_CONDITION],
      photos: [],
      minGuestNumber: 1,
      maxGuestNumber: 3,
      availability: [
        { id: 'b1', duration: { start: '2025-01-01', end: '2026-12-31' } }
      ],
      prices: [
        { id: 'p3', amount: 30, duration: { start: '2025-12-20', end: '2025-12-31' }, priceType: PriceType.PER_GUEST }
      ],
      globalPrice: 25,
      ownerId: 'host2'
    },
    {
      id: '3',
      name: 'Quiet Mountain Cabin',
      location: 'Kopaonik',
      conveniences: [ConvenieceType.KITCHEN, ConvenieceType.FREE_PARKING],
      photos: [],
      minGuestNumber: 2,
      maxGuestNumber: 5,
      availability: [
        { id: 'c1', duration: { start: '2025-01-01', end: '2025-03-31' } },
        { id: 'c2', duration: { start: '2025-12-01', end: '2025-12-31' } }
      ],
      prices: [
        { id: 'p4', amount: 40, duration: { start: '2025-12-01', end: '2025-12-31' }, priceType: PriceType.PER_UNIT }
      ],
      globalPrice: 35,
      ownerId: 'host3'
    }
  ];

  constructor() {}

  getAll(): Observable<Accommodation[]> {
    return of(this.data);  // TODO: call backend API here
  }

  search(location: string, guests: number, start: string, end: string) : Observable<Accommodation[]> {
    return of(this.data);  // TODO: call filter API here
  }

  calculatePrices() {
    return 100;
  }
}