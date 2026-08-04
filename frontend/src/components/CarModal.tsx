import { Button, Form, Input, Modal, Space } from "antd";
import type { CarCreateAndUpdateRequest } from "../interfaces/interface";
import { useInsertCar } from "../hooks/useCar";
import Swal from "sweetalert2";

interface CarModalProp {
    isModalOpen: boolean;
    isModalClose: () => void;
}

const CarModal = ({
    isModalOpen,
    isModalClose
}: CarModalProp) => {
    const insertCarMutation = useInsertCar();
    const [form] = Form.useForm<CarCreateAndUpdateRequest>();
    
    const handleFormSubmit = (newData: CarCreateAndUpdateRequest) => {
        const payload: CarCreateAndUpdateRequest = {
            ...newData
        }

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


    return (
        <div>
            <Modal
                title={"Insert Car"}
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
                    <Form.Item
                        name="vehicleRegistration"
                        label="Vehicle Registration"
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
                                Submit
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