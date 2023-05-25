import { Address } from "./address";

export default class User{
    private id: string;
    private firstName: string;
    private lastName: string;
    private birtday: Date;
    private postOffice: string;
    private address: Address;

    constructor() {}

    get getId(): string {
        return this.id
    }

    set setId(id: string) {
        this.id = id;
    }

    get getFirstName(): string {
        return this.firstName
    }

    set setFirstName(firstName: string) {
        this.firstName = firstName;
    }

    get getLastName(): string {
        return this.lastName
    }

    set setLastName(lastName: string) {
        this.lastName = lastName;
    }

    get getBirtday(): Date {
        return this.birtday
    }

    set setBirtday(birtday: Date) {
        this.birtday = birtday;
    }

    get getPostOffice(): string {
        return this.postOffice
    }

    set setPostOffice(postOffice: string) {
        this.postOffice = postOffice;
    }

    get getAddress(): Address {
        return this.address;
    }


    set setAddress(address: Address) {
        this.address = address;
    }
}