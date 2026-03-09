import { useEffect } from "react";
import {
    Modal,
    Form,
    Input,
    InputNumber,
    Select,
    message,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useUpdateBookMutation } from "../redux/features/books/bookApi";

const { Option } = Select;

const EditBookModal = ({ book, categories = [], onClose }) => {
    const [form] = Form.useForm();
    // const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
    const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
    // Điền dữ liệu vào form mỗi khi `book` thay đổi
    useEffect(() => {
        if (book) {
            form.setFieldsValue({
                book_name: book.book_name,
                author: book.author,
                category_id: book.category_id,
                old_price: book.old_price,
                new_price: book.new_price,
                stock: book.stock,
                description: book.description,
            });
        }
    }, [book, form]);

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            await updateBook({ id: book._id, ...values }).unwrap();
            message.success("Cập nhật sách thành công!");
            form.resetFields();
            onClose();
        } catch (err) {
            // Lỗi validate form không có err.data
            if (err?.data?.message) {
                message.error(err.data.message);
            }
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };
    console.log(book);
    
    return (
        <Modal
            title={
                <div className="flex items-center gap-2 text-gray-800">
                    <EditOutlined className="text-blue-500" />
                    <span>Chỉnh sửa sách</span>
                </div>
            }
            open={!!book}
            onOk={handleSave}
            onCancel={handleCancel}
            okText="Lưu thay đổi"
            cancelText="Hủy"
            confirmLoading={isUpdating}
            width={600}
            okButtonProps={{ className: "bg-blue-500 border-none" }}
        >
            <Form form={form} layout="vertical" className="mt-4">
                <div className="grid grid-cols-2 gap-x-4">
                    <Form.Item
                        name="book_name"
                        label="Tên sách"
                        rules={[{ required: true, message: "Vui lòng nhập tên sách" }]}
                        className="col-span-2"
                    >
                        <Input placeholder="Nhập tên sách" />
                    </Form.Item>

                    <Form.Item
                        name="author"
                        label="Tác giả"
                        rules={[{ required: true, message: "Vui lòng nhập tác giả" }]}
                    >
                        <Input placeholder="Nhập tên tác giả" />
                    </Form.Item>

                    <Form.Item name="category_id" label="Thể loại">
                        <Select placeholder="Chọn thể loại">
                            {categories.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.category_name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="old_price"
                        label="Giá gốc (VNĐ)"
                        rules={[{ required: true, message: "Vui lòng nhập giá" }]}
                    >
                        <InputNumber
                            className="w-full"
                            min={0}
                            formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(v) => v.replace(/,/g, "")}
                            placeholder="0"
                        />
                    </Form.Item>

                    <Form.Item name="new_price" label="Giá khuyến mãi (VNĐ)">
                        <InputNumber
                            className="w-full"
                            min={0}
                            formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(v) => v.replace(/,/g, "")}
                            placeholder="0"
                        />
                    </Form.Item>

                    <Form.Item
                        name="stock"
                        label="Tồn kho"
                        rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
                    >
                        <InputNumber className="w-full" min={0} placeholder="0" />
                    </Form.Item>

                    <Form.Item name="description" label="Mô tả" className="col-span-2">
                        <Input.TextArea rows={3} placeholder="Nhập mô tả sách..." />
                    </Form.Item>
                </div>
            </Form>
        </Modal>
    );
};

export default EditBookModal;