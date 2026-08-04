import { Button, Form, Input, Modal, Space } from "antd";
import type { CarCreateAndUpdateRequest } from "../interfaces/interface";
import { useInsertCar, useUpdateCar } from "../hooks/useCar";
import Swal from "sweetalert2";

interface CarModalProp {
    data?: CarCreateAndUpdateRequest
    isModalOpen: boolean;
    isModalClose: () => void;
}

const CarModal = ({
    data,
    isModalOpen,
    isModalClose
}: CarModalProp) => {
    const insertCarMutation = useInsertCar();
    const updateCarMutation = useUpdateCar();
    const [form] = Form.useForm<CarCreateAndUpdateRequest>();
    form.setFieldsValue({
        carId: data?.carId,
        registrationNumber: data?.registrationNumber,
        brand: data?.brand,
        model: data?.model,
        note: data?.note
    })

    const handleFormSubmit = (newData: CarCreateAndUpdateRequest) => {
        const payload: CarCreateAndUpdateRequest = {
            ...newData
        }

        if (data) {
            updateCarMutation.mutate(payload, {
                onSuccess: () => {
                    form.resetFields();
                    isModalClose();
                    Swal.fire({
                        title: "update car successful",
                        icon: "success"
                    });
                },
                onError: (error) => {
                    console.error(error.message)
                    Swal.fire({
                        title: "update car failed",
                        icon: "error"
                    });
                }
            })
        } else {
            insertCarMutation.mutate(payload, {
                onSuccess: () => {
                    form.resetFields();
                    isModalClose();
                    Swal.fire({
                        title: "insert car successful",
                        icon: "success"
                    });
                },
                onError: (error) => {
                    console.error(error.message)
                    Swal.fire({
                        title: "insert car failed",
                        icon: "error"
                    });
                }
            })
        }
    }

    return (
        <div>
            <Modal
                title={data ? "Update Car" : "Insert Car"}
                open={isModalOpen}
                onCancel={() => {
                    form.resetFields();
                    isModalClose();
                }}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFormSubmit}
                >
                    {data && (
                        <Form.Item
                            name="carId"
                            label="Car ID"
                        >
                            <Input value={data?.carId} disabled />
                        </Form.Item>
                    )}
                    <Form.Item
                        name="registrationNumber"
                        label="Registration Number"
                        rules={[
                            { required: true },
                            { type: 'string' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="brand"
                        label="Brand"
                        rules={[
                            { required: true },
                            { type: 'string' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="model"
                        label="Model"
                        rules={[
                            { required: true },
                            { type: 'string' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="note"
                        label="Note"
                        rules={[
                            { required: false },
                            { type: 'string' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                {data ? "Update" : "Insert"}
                            </Button>
                            <Button htmlType="button" onClick={isModalClose}>
                                Close
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default CarModal;