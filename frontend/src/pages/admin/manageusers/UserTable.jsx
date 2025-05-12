import { CiSquarePlus } from "react-icons/ci";
import { useFetchAllBooksQuery } from "../../../redux/features/books/bookApi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getBaseUrl from "../../../utils/baseUrl";
import axios from "axios";
import { useGetAllUsersQuery } from "../../../redux/features/users/usersApi";
import { useFetchOrdersByUserIdQuery } from "../../../redux/features/orders/orderApi";

const UserTable = () => {

    const {data,isLoading}=useGetAllUsersQuery()
    
    if (!isLoading){
        const users=data.users
        
    return (
        <div className="flex flex-col gap-3">
            <Link className="self-end" to="/dashboard/manage-book/add-book">  <button >
                <CiSquarePlus className="transition transform cursor-pointer hover:scale-110" size="40" />
            </button>
            </Link>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-xl font-semibold">Danh sách người dùng</h2>
                <table className="w-full text-left">
                    <thead>
                        <tr className="w-full text-center bg-gray-100">
                            <th className="p-3">ID</th>
                            <th className="p-3">Tên đăng nhập</th>
                            <th className="p-3">Tên đầy đủ</th>
                            <th className="p-3">Giới tính</th>
                            <th className="p-3">Đơn hàng</th>
                            <th className="p-3">Ngày tạo</th>
                            <th className="p-3">Ngày cập nhật</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className="text-center border-b">
                                <td className="p-3">{user._id}</td>
                                <td className="p-3">{user.user_name}</td>
                                <td className="p-3">{user.full_name||"Không có"}</td>
                                <td className="p-3">{user?.user_gender||"Chưa đặt"}</td>
                                <td className="p-3 transition transform cursor-pointer hover:underline hover:text-yellow-400 hover:font-bold">{"Xem chi tiết"}</td>
                                <td className="p-3">{user.createdAt || "Không xác định"}</td>
                                <td className="p-3">{user.updatedAt||"Không xác định"}</td>
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
}
export default UserTable;