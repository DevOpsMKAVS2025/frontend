export interface NewRatingDto {
  id: string;
  type: string;
  accommodationId: string;
  hostId: string;
  guestId: string;
  evaluation: number;
}