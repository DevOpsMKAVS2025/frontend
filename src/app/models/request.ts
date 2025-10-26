export interface Request {
    id: string;
    accommodationId: string;
    accommodation: string;
    guestId: string;
    startDate: string;
    endDate: string;
    guestNum: number;
}

export interface RequestCancelation {
    requestId: string
    accommodationId: string,
    guestId: string,
    startDate: string,
    endDate: string,
    guestNum: number,
    state: string,
    previousCancellations: number
}