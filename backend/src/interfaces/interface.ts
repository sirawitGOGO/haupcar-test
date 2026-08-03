export interface CarAttributes {
    carId: number;
    vehicleRegistration: string;
    brand: string;
    model: string;
    note: string | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}