import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { CarCreateAndUpdateRequest } from "../interfaces/interface"
import { deleteCarApi, findCarApi, findCarByIdApi, insertCarApi, updateCarApi } from "../services/api"

export const useInsertCar = () => {
    const queryClint = useQueryClient()
    return useMutation({
        mutationFn: (payload: CarCreateAndUpdateRequest) => insertCarApi(payload),
        onSuccess: () => {
            queryClint.invalidateQueries({
                queryKey: ['cars']
            })
        }
    })
}

export const useFindCarById = (carId: number) => {
    return useQuery({
        queryKey: ["cars", { carId }],
        queryFn: () => findCarByIdApi(carId)
    })
}

export const useFindCar = (page: number, limit: number) => {
    return useQuery({
        queryKey: ["cars", { page }],
        queryFn: () => findCarApi(page, limit)
    })
}

export const useUpdateCar = () => {
    const queryClint = useQueryClient()
    return useMutation({
        mutationFn: (payload: CarCreateAndUpdateRequest) => updateCarApi(payload),
        onSuccess: () => {
            queryClint.invalidateQueries({
                queryKey: ['cars']
            })
        }
    })
}

export const useDeleteCar = () => {
    const queryClint = useQueryClient()
    return useMutation({
        mutationFn: (carId: number) => deleteCarApi(carId),
        onSuccess: () => {
            queryClint.invalidateQueries({
                queryKey: ['cars']
            })
        }
    })
}