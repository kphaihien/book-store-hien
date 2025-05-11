import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit } from 'react-icons/fa';
import { GoPencil } from "react-icons/go";
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { useUpdateUserProfileMutation } from '../../redux/features/users/usersApi';
import Swal from 'sweetalert2';

const UserProfile = () => {
    const { currentUser,setCurrentUser } = useAuth()

    const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
        } = useForm({defaultValues:{
            phone_number:currentUser.phone_number||"Chưa có thông tin",
            full_name:currentUser.full_name||"Chưa có thông tin",
            default_address:currentUser.default_address||"Chưa có thông tin"
        }})
    const [updateUserProfile,{isLoading,isError,isSuccess}]=useUpdateUserProfileMutation()
    const [isEditing, setIsEditing] = useState(false);
    
    const onSubmit=async(data)=>{
        const response=await updateUserProfile({
            id:currentUser.id,
            full_name:data.full_name,
            phone_number:data.phone_number,
            default_address:data.default_address
        })
        setCurrentUser({...response.data,phone_number:response.data.user_phone})

        
    }
    
    useEffect(()=>{

        if(isSuccess){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Thay đổi thành công",
                showConfirmButton: false,
                timer: 2000
            }).then(()=>setIsEditing(false))
        }else if(isError){
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Đã xảy ra lỗi vui lòng thử lại",
                showConfirmButton: false,
                timer: 2000
            }).then(() => setIsEditing(false))
        }
    },[isSuccess,isError])
    
    if(currentUser===null){return <div>404</div>}

    return (
        <div className="w-full h-full py-10 bg-gray-100 ">
            <div className="px-4 mx-auto ">
                <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-lg">
                    <div className="flex flex-col items-center">
                        <div className='relative w-32 h-32 rounded-full'>
                            <img
                                
                                className="object-cover w-32 h-32 mb-4 border border-gray-400 rounded-full"
                            />
                            <button ><GoPencil className='absolute inset-0 w-full h-full p-12 opacity-0 cursor-pointer hover:opacity-50' /></button>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">{currentUser.full_name}</h2>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="flex items-center mt-2 text-blue-600 hover:text-blue-800"
                        >
                            <FaEdit className="mr-1" /> {isEditing ? 'Hủy' : 'Chỉnh sửa'}
                        </button>
                    </div>

                    <div className="mt-6">
                        {isEditing ? (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label className="flex items-center text-gray-600">
                                        <FaUser className="mr-2" /> Họ tên
                                    </label>
                                    <input
                                        type="text"
                                        {...register("full_name", { required: true ,})}
                                        // value={currentUser.full_name}
                                        className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center text-gray-600">
                                        <FaEnvelope className="mr-2" /> Email
                                    </label>
                                    <p
                                        className="w-full p-2 mt-1 border rounded cursor-default focus:outline-none focus:ring-2 focus:ring-blue-500">{currentUser.email}
                                    </p>
                                    <p className='text-sm font-semibold text-red-600'>*Không thể sửa email</p>
                                </div>
                                <div>
                                    <label className="flex items-center text-gray-600">
                                        <FaPhone className="mr-2" /> Số điện thoại
                                    </label>
                                    <input
                                        type="text"
                                    
                                        {...register("phone_number", { required: true, })}
            
                                        className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center text-gray-600">
                                        <FaMapMarkerAlt className="mr-2" /> Địa chỉ
                                    </label>
                                    <input
                                        type="text"
                                    
                                        {...register("default_address", { required: true, })}
                                
                                        className="w-full p-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
                                >
                                    Lưu thay đổi
                                </button>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <p className="flex items-center text-gray-600">
                                        <FaEnvelope className="mr-2" /> {currentUser.email || "Chưa có thông tin"}
                                </p>
                                <p className="flex items-center text-gray-600">
                                        <FaPhone className="mr-2" /> {currentUser.phone_number || "Chưa có thông tin"}
                                </p>
                                <p className="flex items-center text-gray-600">
                                    <FaMapMarkerAlt className="mr-2" /> {currentUser.default_address||"Chưa có thông tin"}
                                </p>
                            </div>
                        )}
                    </div>

                
                </div>
            </div>
        </div>
    );
};

export default UserProfile;