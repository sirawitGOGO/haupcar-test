export interface CarCreateAndUpdateRequest {
    carId?: number;
    registrationNumber: string;
    brand: string;
    model: string;
    note: string | null;
}

export interface CarResponse {
    carId: number;
    registrationNumber: string;
    brand: string;
    model: string;
    note: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export interface CarPaginationResponse {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    cars: CarResponse[];
}