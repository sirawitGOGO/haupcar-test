import { CarAttributes } from "../../interfaces/interface";

export interface CarCreateAndUpdateAtrributes {
    carId?: CarAttributes['carId'];
    registrationNumber: CarAttributes['registrationNumber'];
    brand: CarAttributes['brand'];
    model: CarAttributes['model'];
    note: CarAttributes['note'];
}

export interface CarPaginationResponse {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    cars: CarAttributes[];
}