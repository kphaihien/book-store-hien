import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';
import { useRegisterNewUserMutation } from '../redux/features/auth/authApi';
import useScrollToTopOnMount from '../utils/useScrollToTopOnMount';



const Register = () => {
    useScrollToTopOnMount()
    const [message,setMessage]=useState();
    const navigate=useNavigate()
    const {registerUser}=useAuth()
    const [registerNewUser]=useRegisterNewUserMutation();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    
    //register
    const onSubmit = async(data) => {
        try {
            if (data.password !== data.repeatedpassword) {
                setMessage("Mật khẩu chưa trùng nhau")
                return;
            }
            await registerUser(data)
        } catch (error) {
            console.log(error);        
        }
        
    }



    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="p-8 bg-white shadow-md rounded-xl w-96">
                <h2 className="mb-6 text-2xl font-bold text-center">Đăng Ký</h2>
                <form onSubmit={handleSubmit(onSubmit)}  className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Họ và tên đầy đủ</label>
                        <input
                            type="text"
                            name="full_name"
                            {...register("full_name", { required: true })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        
                    </div>
                    
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-700">Tên đăng nhập</label>
                        <input
                            type="text"
                            {...register("user_name", { required: true })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-700">Mật khẩu</label>
                        <input
                            type="password"
                            {...register("password", { required: true })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Nhập lại mật khẩu</label>
                        <input
                            type="password"
                            name="repeatedpassword"
                            {...register("repeatedpassword", { required: true })}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        {message&&<p className='text-sm text-red-500 '>{message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 font-semibold text-white transition transform bg-yellow-400 rounded-lg active:scale-105 hover:bg-yellow-500"
                    >
                        Đăng Ký
                    </button>

                    <div className='flex flex-row gap-1'>
                        <p>
                            Đã có tài khoản?
                        </p>
                        <Link to="/login"><p className='text-blue-500 hover:font-bold hover:underline'>Đăng nhập</p></Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register