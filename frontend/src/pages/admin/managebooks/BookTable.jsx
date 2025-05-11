import { CiSquarePlus } from "react-icons/ci";
import { useFetchAllBooksQuery } from "../../../redux/features/books/bookApi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AddBook from "./AddBook";
import getBaseUrl from "../../../utils/baseUrl";
import axios from "axios";

const BookTable = () => {
    // Mock data, thay bằng API call nếu cần
    const [isAddBookOn,setIsAddBookOn]=useState(false)
    const {data:books=[]}=useFetchAllBooksQuery();
    const [category,setCategory]=useState([])
    
    const getCategory=(cateId)=>{
        return category?.find((cate)=>cate._id===cateId) ||null
    }

    
    const handleOnAddBook=()=>{
        setIsAddBookOn(true)
    }

    useEffect(()=>{
        axios.get(`${getBaseUrl()}/api/category/`).then((res)=>setCategory(res.data.data))
    },[])
    
    return (
        <div className="flex flex-col gap-3">
            <Link className="self-end" to="/dashboard/manage-book/add-book">  <button onClick={handleOnAddBook}>
                    <CiSquarePlus className="transition transform cursor-pointer hover:scale-110" size="40"/>
                    </button>
            </Link>
            {
                isAddBookOn&&<AddBook isOpen={isAddBookOn} onClose={()=>setIsAddBookOn(false)} categories={category}/>
            }
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-xl font-semibold">Danh sách sách</h2>
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-center bg-gray-100">
                            <th className="p-3">ID</th>
                            <th className="p-3">Ảnh</th>
                            <th className="p-3">Tên sách</th>
                            <th className="p-3">Tác giả</th>
                            <th className="p-3">Thể loại</th>
                            <th className="p-3">Giá</th>
                            <th className="p-3">Đã bán</th>
                            <th className="p-3">Tồn kho</th>
                            <th className="p-3">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book,index) => (
                            <tr key={index} className="text-center border-b">
                                <td className="p-3">{index+1}</td>
                                <td className="p-3"><img className="object-cover w-25 h-30" src={`${getBaseUrl()}/public/${book?.book_img}`}/></td>
                                <td className="p-3">{book.book_name}</td>
                                <td className="p-3">{book.author}</td>
                                <td className="p-3">{getCategory(book.category_id)
                                    ? getCategory(book.category_id).category_name
                                    : 'Không rõ'}</td>
                                <td className="p-3">{book.old_price.toLocaleString("vi-VN")} VNĐ</td>
                                <td className="p-3">{book.stock}</td>
                                <td className="p-3">{book.sold_quantity?book.sold_quantity:"0"}</td>
                                <td className="p-3">
                                    <button className="mr-2 text-blue-600 cursor-pointer hover:underline">
                                        Sửa
                                    </button>
                                    <button className="text-red-600 cursor-pointer hover:underline">Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookTable;