import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form"
import axios from "axios";
import getBaseUrl from "../../../utils/baseUrl";
import Swal from "sweetalert2";
import { useAddBookMutation } from "../../../redux/features/books/bookApi";
const AddBook = ({ isOpen, onClose,categories }) => {
    
    const [addBook,isLoading]=useAddBookMutation()
    
    // State để lưu dữ liệu form
    const { register, handleSubmit, reset } = useForm();
    const [file, setFile] = useState(null)
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };
    
    // const [formData, setFormData] = useState({
    //     book_name: "",
    //     author: "",
    //     category: "",
    //     old_price: "",
    //     stock: "",
    //     book_img: "",
    // });

    const onSubmit=async(data)=>{
        
        const formData=new FormData();
        formData.append("book_name", data.book_name);
        formData.append("author", data.author);
        formData.append("category_id", data.category_id);
        formData.append("old_price", data.old_price);
        formData.append("stock", data.stock);
        
        formData.append("image", file);
        const token=localStorage.getItem('token')
        try {
 
            await addBook(formData).unwrap()
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Thêm thành công",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error, "hehee");

        }
        
    }


    // Nếu modal không mở, không render gì
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Thêm sách mới</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 cursor-pointer hover:text-red-500"
                    >
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="book_name" className="block text-sm font-medium text-gray-700">
                            Tên sách
                        </label>
                        <input
                            type="text"
                            id="book_name"
                            {...register("book_name", { required: true })}
                            name="book_name"
                            // onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                            Tác giả
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            {...register("author", { required: true })}
                            // value={formData.author}
                            // onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                            Thể loại
                        </label>
                        <select
                            {...register("category_id",{required:true})}
                            className="w-full p-2 font-medium text-gray-700 border rounded-lg text-md">
                                {categories.map((cate,index)=>(
                                    <option key={index} value={cate._id}>{cate.category_name}</option>
                                ))}
                        </select>
                        {/* <input
                            type="text"
                            id="genre"
                            name="genre"
                            // value={formData.genre}
                            // onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        /> */}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="old_price" className="block text-sm font-medium text-gray-700">
                            Giá (VNĐ)
                        </label>
                        <input
                            {...register("old_price", { required: true })}
                            type="number"
                            id="old_price"
                            name="old_price"
                            min="0"
                            // value={formData.old_price}
                            // onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                            Tồn kho
                        </label>
                        <input
                            {...register("stock", { required: true })}
                            type="number"
                            id="stock"
                            min="0"
                            name="stock"
                            // value={formData.stock}
                            // onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="book_img" className="block text-sm font-medium text-gray-700">
                            Ảnh bìa
                        </label>
                        <input
                            // {...register("book_img")}
                            type="file"
                            id="book_img"
                            name="book_img"
                            // value={formData.book_img}
                            onChange={handleFileChange}
                            className="w-full p-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
                        >
                            Thêm sách
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBook;