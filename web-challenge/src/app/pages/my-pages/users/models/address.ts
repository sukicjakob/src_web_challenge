export interface Address {
    address: string,
    city: string,
    coordinates: Coordinates,
    postalCode: string,
    state: string
}

export interface Coordinates {
    lat: number,
    lng: number
}