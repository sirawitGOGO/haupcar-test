import type React from "react";
import { useFindCar } from "../hooks/useCar";
import { useState } from "react";
import IsLoading from "../components/IsLoading";
import { Pagination } from "antd";

const HomePage: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const { data: CarData, isLoading: isCarLoading } = useFindCar(page, 2);
  const totalPages = Number(CarData?.totalPages)

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="flex justify-center items-center mt-4">
        <h1 className="font-bold text-3xl">Car Management</h1>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex flex-col justify-center items-center">
          {
            isCarLoading ? <IsLoading size="large" /> : (
              CarData?.cars.map((car, index) => (
              <li key={index}>
                {car.carId} - {car.vehicleRegistration} - {car.brand}
              </li>
            ))
            )
          }
          <div className="flex flex-row justify-center items-center gap-3">
            <Pagination defaultCurrent={page} total={totalPages*10} onChange={(page) => setPage(page)} className="mx-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage