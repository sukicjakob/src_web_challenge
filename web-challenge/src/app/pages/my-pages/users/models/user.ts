import { Address } from "./address"
import { Bank } from "./bank"
import { Company } from "./company"

export interface UsersResponse {
    users: User[],
    total: number,
    skip: number,
    limit: number
}

export interface UserHair {
    color: string,
    type: string
}

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    maidenName: string,
    age: number,
    gender: string,
    email: string,
    phone: string,
    username: string,
    password: string,
    birthDate: string,
    image: string,
    bloodGroup: string,
    height: number,
    weight: number,
    eyeColor: string,
    hair: UserHair,
    domain: string,
    ip: string,
    address: Address,
    macAddress: string,
    university: string,
    bank: Bank,
    company: Company,
    ein: string,
    ssn: string,
    userAgent: string
}