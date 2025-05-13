import { CiSquarePlus } from "react-icons/ci";
import { useFetchAllBooksQuery } from "../../../redux/features/books/bookApi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import getBaseUrl from "../../../utils/baseUrl";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { useDeleteUserWithIdMutation, useGetAllUsersQuery, useSearchUserQuery } from "../../../redux/features/users/usersApi";
import { useFetchOrdersByUserIdQuery } from "../../../redux/features/orders/orderApi";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";

const UserTable = () => {

    // const {data,isLoading}=useGetAllUsersQuery()
    const [searchQuery, setSearchQuery] = useState("")
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 1000);

        return () => {
            clearTimeout(handler); // huỷ timeout cũ nếu user gõ tiếp
        };
    }, [searchQuery]);
    const {data,isLoading}=useSearchUserQuery({q:debouncedQuery})
    const [deleteUserWithId] = useDeleteUserWithIdMutation()
    const [users, setUsers] = useState([])
    const handleDeleteUser=async(user_id)=>{
        try {
            const result =await Swal.fire({
                                position: "center",
                                icon: "warning",
                                title: "Bạn có chắc muốn xóa người dùng này ?",
                                showCancelButton:true,
                                showConfirmButton: true,
                                cancelButtonText:"Hủy",
                                confirmButtonText:"Đồng ý!"
                            })
            if(result.isConfirmed){
                const response=await deleteUserWithId(user_id).unwrap()
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Đã xóa",
                    timer:2000,
                })
                console.log(response);
                
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
        if(data){
            setUsers(data.users)
        }
    },[data])

    if(isLoading){return <Loading/>}
    if(data===undefined){return <div>Dữ liệu trống</div>}

        
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center w-1/4 bg-white border rounded-lg">
                    <CiSearch className="w-6 h-6 m-1"/>
                    <input
                        type="text"
                        className="w-full p-2 text-gray-700 rounded-lg focus:outline-none "
                        placeholder="Tên đăng nhập, email, ID..."
                        value={searchQuery}
                        onChange={(e)=>setSearchQuery(e.target.value)}
                    />
                </div>
                <Link className="self-end" to="/dashboard/manage-book/add-book">  
                    <button >
                    <CiSquarePlus className="transition transform cursor-pointer hover:scale-110" size="40" />
                    </button>
                </Link>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-xl font-semibold">Danh sách người dùng</h2>
                <table className="w-full text-left">
                    <thead>
                        <tr className="w-full text-center bg-gray-100">
                            <th className="p-3">ID</th>
                            <th className="p-3">Tên đăng nhập</th>
                            <th className="p-3">Tên đầy đủ</th>
                            <th className="p-3">Giới tính</th>
                            <th className="p-3">Ngày tạo</th>
                            <th className="p-3">Ngày cập nhật</th>
                        </tr>
                    </thead>
                    {isLoading?<div>Đang tìm kiếm...</div>:(
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className="text-center border-b">
                                    <td className="p-3">{user._id}</td>
                                    <td className="p-3">{user.user_name}</td>
                                    <td className="p-3">{user.full_name||"Không có"}</td>
                                    <td className="p-3">{user?.user_gender||"Chưa đặt"}</td>
                                    <td className="p-3">{user.createdAt || "Không xác định"}</td>
                                    <td className="p-3">{user.updatedAt||"Không xác định"}</td>
                                    <td className="p-3">
                                        {/* <button className="mr-2 text-blue-600 cursor-pointer hover:underline">
                                            Sửa
                                        </button> */}
                                        <button onClick={()=>handleDeleteUser(user._id)} className="text-red-600 cursor-pointer hover:underline">Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );

}
export default UserTable;