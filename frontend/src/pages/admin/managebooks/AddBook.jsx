// import { useState } from "react";
// import { FaTimes } from "react-icons/fa";
// import { useForm } from "react-hook-form"
// import axios from "axios";
// import getBaseUrl from "../../../utils/baseUrl";
// import Swal from "sweetalert2";
// import { useAddBookMutation } from "../../../redux/features/books/bookApi";
// const AddBook = ({ isOpen, onClose,categories }) => {
    
//     const [addBook,isLoading]=useAddBookMutation()
    
//     // State để lưu dữ liệu form
//     const { register, handleSubmit, reset } = useForm();
//     const [file, setFile] = useState(null)
//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         setFile(selectedFile);
//     };
    

//     const onSubmit=async(data)=>{
        
//         const formData=new FormData();
//         formData.append("book_name", data.book_name);
//         formData.append("author", data.author);
//         formData.append("category_id", data.category_id);
//         formData.append("old_price", data.old_price);
//         formData.append("stock", data.stock);
        
//         formData.append("image", file);
//         const token=localStorage.getItem('token')
//         try {
 
//             await addBook(formData).unwrap()
//             await Swal.fire({
//                 position: "center",
//                 icon: "success",
//                 title: "Thêm thành công",
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//         } catch (error) {
//             console.log(error);

//         }
        
//     }


//     // Nếu modal không mở, không render gì
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//             <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl">
//                 {/* Header */}
//                 <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-2xl font-bold text-gray-800">Thêm sách mới</h2>
//                     <button
//                         onClick={onClose}
//                         className="text-gray-600 cursor-pointer hover:text-red-500"
//                     >
//                         <FaTimes size={20} />
//                     </button>
//                 </div>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="mb-4">
//                         <label htmlFor="book_name" className="block text-sm font-medium text-gray-700">
//                             Tên sách
//                         </label>
//                         <input
//                             type="text"
//                             id="book_name"
//                             {...register("book_name", { required: true })}
//                             name="book_name"
//                             // onChange={handleChange}
//                             className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//                             required
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="author" className="block text-sm font-medium text-gray-700">
//                             Tác giả
//                         </label>
//                         <input
//                             type="text"
//                             id="author"
//                             name="author"
//                             {...register("author", { required: true })}
//                             className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//                             required
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
//                             Thể loại
//                         </label>
//                         <select
//                             {...register("category_id",{required:true})}
//                             className="w-full p-2 font-medium text-gray-700 border rounded-lg text-md">
//                                 {categories.map((cate,index)=>(
//                                     <option key={index} value={cate._id}>{cate.category_name}</option>
//                                 ))}
//                         </select>

//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="old_price" className="block text-sm font-medium text-gray-700">
//                             Giá (VNĐ)
//                         </label>
//                         <input
//                             {...register("old_price", { required: true })}
//                             type="number"
//                             id="old_price"
//                             name="old_price"
//                             min="0"
//                             // value={formData.old_price}
//                             // onChange={handleChange}
//                             className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//                             required
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
//                             Tồn kho
//                         </label>
//                         <input
//                             {...register("stock", { required: true })}
//                             type="number"
//                             id="stock"
//                             min="0"
//                             name="stock"

//                             className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//                             required
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label htmlFor="book_img" className="block text-sm font-medium text-gray-700">
//                             Ảnh bìa
//                         </label>
//                         <input
//                             // {...register("book_img")}
//                             type="file"
//                             id="book_img"
//                             name="book_img"

//                             onChange={handleFileChange}
//                             className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//                         />
//                     </div>

//                     {/* Buttons */}
//                     <div className="flex justify-end gap-3">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
//                         >
//                             Hủy
//                         </button>
//                         <button
//                             type="submit"
//                             className="px-4 py-2 text-white bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
//                         >
//                             Thêm sách
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddBook;

import { useState } from "react";
import {
    Modal, Form, Input, InputNumber, Select,
    Upload, Button, message,
} from "antd";
import {
    BookOutlined,
    UserOutlined,
    DollarOutlined,
    InboxOutlined,
    PlusOutlined,
    AppstoreOutlined,
} from "@ant-design/icons";
import { useAddBookMutation } from "../../../redux/features/books/bookApi";

const { Option } = Select;
const { Dragger } = Upload;

/**
 * Props:
 * - isOpen     : boolean
 * - onClose    : () => void
 * - categories : [{ _id, category_name }]
 */
const AddBook = ({ isOpen, onClose, categories = [] }) => {
    const [form] = Form.useForm();
    const [addBook, { isLoading }] = useAddBookMutation();
    const [fileList, setFileList] = useState([]);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Chặn auto-upload, chỉ lưu file vào state
    const beforeUpload = (file) => {
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
            message.error("Chỉ chấp nhận file ảnh!");
            return Upload.LIST_IGNORE;
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error("Ảnh phải nhỏ hơn 5MB!");
            return Upload.LIST_IGNORE;
        }
        setPreviewUrl(URL.createObjectURL(file));
        setFileList([file]);
        return false; // ngăn upload tự động
    };

    const handleRemove = () => {
        setFileList([]);
        setPreviewUrl(null);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const formData = new FormData();
            formData.append("book_name", values.book_name);
            formData.append("author", values.author);
            formData.append("category_id", values.category_id);
            formData.append("old_price", values.old_price);
            formData.append("stock", values.stock);
            if (fileList[0]) formData.append("image", fileList[0]);

            await addBook(formData).unwrap();
            message.success("Thêm sách thành công!");
            form.resetFields();
            setFileList([]);
            setPreviewUrl(null);
            onClose();
        } catch (err) {
            if (err?.data?.message) message.error(err.data.message);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setFileList([]);
        setPreviewUrl(null);
        onClose();
    };

    return (
        <Modal
            open={isOpen}
            onCancel={handleCancel}
            onOk={handleSubmit}
            confirmLoading={isLoading}
            okText="Thêm sách"
            cancelText="Hủy"
            width={580}
            okButtonProps={{ className: "bg-blue-500 border-none", icon: <PlusOutlined /> }}
            title={
                <div className="flex items-center gap-2 text-gray-800">
                    <BookOutlined className="text-blue-500" />
                    <span className="font-semibold">Thêm sách mới</span>
                </div>
            }
            destroyOnClose
        >
            <Form form={form} layout="vertical" className="mt-4">
                <div className="grid grid-cols-2 gap-x-4">

                    {/* Tên sách */}
                    <Form.Item
                        name="book_name"
                        label="Tên sách"
                        className="col-span-2"
                        rules={[{ required: true, message: "Vui lòng nhập tên sách" }]}
                    >
                        <Input
                            prefix={<BookOutlined className="text-gray-300" />}
                            placeholder="Nhập tên sách..."
                        />
                    </Form.Item>

                    {/* Tác giả */}
                    <Form.Item
                        name="author"
                        label="Tác giả"
                        rules={[{ required: true, message: "Vui lòng nhập tác giả" }]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-300" />}
                            placeholder="Tên tác giả..."
                        />
                    </Form.Item>

                    {/* Thể loại */}
                    <Form.Item
                        name="category_id"
                        label="Thể loại"
                        rules={[{ required: true, message: "Vui lòng chọn thể loại" }]}
                    >
                        <Select
                            placeholder="Chọn thể loại"
                            suffixIcon={<AppstoreOutlined className="text-gray-300" />}
                        >
                            {categories.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.category_name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Giá */}
                    <Form.Item
                        name="old_price"
                        label="Giá (VNĐ)"
                        rules={[{ required: true, message: "Vui lòng nhập giá" }]}
                    >
                        <InputNumber
                            className="w-full"
                            min={0}
                            prefix={<DollarOutlined className="text-gray-300" />}
                            formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={(v) => v.replace(/,/g, "")}
                            placeholder="0"
                        />
                    </Form.Item>

                    {/* Tồn kho */}
                    <Form.Item
                        name="stock"
                        label="Tồn kho"
                        rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
                    >
                        <InputNumber
                            className="w-full"
                            min={0}
                            prefix={<InboxOutlined className="text-gray-300" />}
                            placeholder="0"
                        />
                    </Form.Item>

                    {/* Upload ảnh */}
                    <Form.Item label="Ảnh bìa" className="col-span-2">
                        {previewUrl ? (
                            <div className="relative flex justify-center w-full">
                                <div className="relative group">
                                    <img
                                        src={previewUrl}
                                        alt="preview"
                                        className="object-contain h-40 border border-gray-200 rounded-lg shadow-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemove}
                                        className="absolute flex items-center justify-center w-5 h-5 text-xs text-white transition-opacity bg-red-500 rounded-full opacity-0 cursor-pointer top-1 right-1 group-hover:opacity-100"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Dragger
                                accept="image/*"
                                beforeUpload={beforeUpload}
                                fileList={[]}
                                showUploadList={false}
                                className="rounded-lg"
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined className="text-3xl text-blue-400" />
                                </p>
                                <p className="text-sm font-medium text-gray-600">
                                    Kéo thả hoặc click để chọn ảnh
                                </p>
                                <p className="mt-1 text-xs text-gray-400">
                                    PNG, JPG, WEBP — tối đa 5MB
                                </p>
                            </Dragger>
                        )}
                    </Form.Item>

                </div>
            </Form>
        </Modal>
    );
};

export default AddBook;