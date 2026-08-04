import type React from "react";
import { useDeleteCar, useFindCar } from "../hooks/useCar";
import { useState } from "react";
import IsLoading from "../components/IsLoading";
import { Button, Pagination, Space, Table, type TableProps } from "antd";
import CarModal from "../components/CarModal";
import type { CarResponse } from "../interfaces/interface";
import Swal from "sweetalert2";
import dayjs from "dayjs";

interface CarDataType {
  carId: CarResponse['carId'];
  vehicleRegistration: CarResponse['vehicleRegistration'];
  brand: CarResponse['brand'];
  model: CarResponse['model'];
  note: CarResponse['note'];
  createdAt: CarResponse['createdAt'];
}

const HomePage: React.FC = () => {
  const limit = 5
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data: carData, isLoading: isCarLoading } = useFindCar(page, limit);
  const totalPages = Number(carData?.totalPages);

  const deleteCarMutation = useDeleteCar();
  const handleDelete = async (carId: number) => {
    try {
      const dialog = await Swal.fire({
        title: "do you want to delete this car",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "delete"
      });

      if (dialog.isConfirmed) {
        await deleteCarMutation.mutateAsync(carId);
        Swal.fire({
          title: "delete successful",
          icon: "success",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "delete failed",
        icon: "error",
      });
    }
  }

  const columns: TableProps<CarDataType>['columns'] = [
    { title: 'Car ID', dataIndex: 'carId' },
    { title: 'Vehicle Registration', dataIndex: 'vehicleRegistration' },
    { title: 'Brand', dataIndex: 'brand' },
    { title: 'Model', dataIndex: 'model' },
    { title: 'Note', dataIndex: 'note' },
    {
      title: 'Create At', dataIndex: 'createdAt',
      render: (_, record) => {
        const date = dayjs(record.createdAt).format('YY-MM-DD HH:MM');
        return (
          <p>{date}</p>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="medium">
          <Button type="primary" ghost>Update</Button>
          <Button danger ghost onClick={() => handleDelete(record.carId)}>Delete</Button>
        </Space>
      ),
    },
  ]

  return (
    <div className="h-screen w-screen flex flex-col justify-start items-center">
      <div className="flex flex-col justify-center items-center p-20">
        <div>
          <div className="flex flex-row justify-between pb-4">
            <div className="flex justify-center items-center">
              <h1 className="font-bold text-3xl">Car Management</h1>
            </div>
            <div className="flex justify-center items-center">
              <Button type="primary" onClick={() => setIsModalOpen(true)}>Insert Car</Button>
            </div>
          </div>
          {
            isCarLoading ? <IsLoading size="large" /> :
              <Table<CarDataType>
                columns={columns}
                dataSource={carData?.cars}
                pagination={false}
              />
          }
          <div className="flex flex-row justify-end items-center p-3">
            <Pagination defaultCurrent={page} total={totalPages * 10} onChange={(page) => setPage(page)} className="mx-auto" />
          </div>
          <CarModal
            isModalOpen={isModalOpen}
            isModalClose={() => {
              setIsModalOpen(false);
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage