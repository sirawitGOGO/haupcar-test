import type React from "react";
import { useDeleteCar, useFindCar } from "../hooks/useCar";
import { useState } from "react";
import { Button, Pagination, Space, Table, type TableProps } from "antd";
import CarModal from "../components/CarModal";
import type { CarCreateAndUpdateRequest, CarResponse } from "../interfaces/interface";
import Swal from "sweetalert2";
import dayjs from "dayjs";

interface CarDataType {
  carId: CarResponse['carId'];
  registrationNumber: CarResponse['registrationNumber'];
  brand: CarResponse['brand'];
  model: CarResponse['model'];
  note: CarResponse['note'];
  createdAt: CarResponse['createdAt'];
  updatedAt: CarResponse['updatedAt'];
}

const HomePage: React.FC = () => {
  const limit = 5
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<CarCreateAndUpdateRequest>();
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

  const handleUpdate = (data: CarDataType) => {
    setIsModalOpen(true);
    const payload: CarCreateAndUpdateRequest = {
      carId: data.carId,
      registrationNumber: data.registrationNumber,
      brand: data.brand,
      model: data.model,
      note: data.note
    }
    setUpdateData(payload);
  }

  const columns: TableProps<CarDataType>['columns'] = [
    { title: 'Car ID', dataIndex: 'carId' },
    { title: 'Registration Number', dataIndex: 'registrationNumber' },
    { title: 'Brand', dataIndex: 'brand' },
    { title: 'Model', dataIndex: 'model' },
    { title: 'Note', dataIndex: 'note' },
    {
      title: 'Created At', dataIndex: 'createdAt',
      render: (_, record) => {
        const date = dayjs(record.createdAt).format('YYYY-MM-DD HH:mm:ss');
        return (
          <p>{date}</p>
        )
      }
    },
    {
      title: 'Updated At', dataIndex: 'createdAt',
      render: (_, record) => {
        const date = dayjs(record.updatedAt).format('YYYY-MM-DD HH:mm:ss');
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
          <Button type="primary" onClick={() => handleUpdate(record)}>Edit</Button>
          <Button color="danger" variant="solid" onClick={() => handleDelete(record.carId)}>Delete</Button>
        </Space>
      ),
    },
  ]

  return (
    <div className="h-screen w-screen flex flex-col justify-start items-center">
      <div className="flex flex-col justify-center items-center bg-white m-20 rounded-xl shadow-xl">
        <div className="p-5">
          <div className="flex flex-row justify-between pb-4">
            <div className="flex justify-center items-center">
              <h1 className="font-bold text-3xl">Car Management</h1>
            </div>
            <div className="flex justify-center items-center">
              <Button color="green" variant="solid" onClick={() => setIsModalOpen(true)}>Insert Car</Button>
            </div>
          </div>
          <Table<CarDataType>
            columns={columns}
            dataSource={carData?.cars}
            pagination={false}
            loading={isCarLoading}
          />
          <div className="flex flex-row justify-end items-center p-3">
            <Pagination defaultCurrent={page} total={totalPages * 10} onChange={(page) => setPage(page)} className="mx-auto" />
          </div>
          <CarModal
            data={updateData}
            isModalOpen={isModalOpen}
            isModalClose={() => {
              setUpdateData(undefined);
              setIsModalOpen(false);
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage