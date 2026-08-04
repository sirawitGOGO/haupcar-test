import axios from "axios";
import { ENDPOINTS } from "../constants/endpoint";
import type { CarCreateAndUpdateRequest, CarPaginationResponse, CarResponse } from "../interfaces/interface";

export const insertCarApi = async (payload: CarCreateAndUpdateRequest) => {
    const response = await axios.post<CarResponse>(
        ENDPOINTS.car.insert,
        payload
    );
    return response.data
}

export const findCarByIdApi = async (carId: number) => {
    const response = await axios.get<CarResponse>(ENDPOINTS.car.findById(carId));
    return response.data
}

export const findCarApi = async (page: number, limit: number) => {
    const response = await axios.post<CarPaginationResponse>(
        ENDPOINTS.car.findCar,
        { page, limit }
    );
    return response.data
}

export const updateCarApi = async (payload: CarCreateAndUpdateRequest) => {
    const response = await axios.post<CarResponse>(
        ENDPOINTS.car.update,
        payload
    );
    return response.data
}

export const deleteCarApi = async (carId: number) => {
    const response = await axios.get<void>(ENDPOINTS.car.delete(carId));
    return response.data
}