export interface CarAttributes {
    carId: number;
    registrationNumber: string;
    brand: string;
    model: string;
    note: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}