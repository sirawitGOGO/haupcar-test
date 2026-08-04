const baseUrl = import.meta.env.VITE_API_URL

export const ENDPOINTS = {
    car: {
        insert: `${baseUrl}/car/insert`,
        findById: (carId: number) => `${baseUrl}/car/findById/${carId}`,
        findCar: `${baseUrl}/car/findCar`,
        update: `${baseUrl}/car/update`,
        delete: (carId: number) => `${baseUrl}/car/delete/${carId}`,
    }
}