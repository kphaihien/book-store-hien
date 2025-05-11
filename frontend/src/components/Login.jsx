import React, { useEffect, useState } from 'react'

import { useForm } from "react-hook-form"

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import Swal from 'sweetalert2';

const Login = () => {
    const navigate = useNavigate();

    const { logIn,loading } = useAuth()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => { 
            try {
                const response=await logIn(data);
            } catch (error) {
                console.log(error);
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Email hoặc mật khẩu sai",
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        
    }
    
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="p-8 bg-white shadow-md rounded-xl w-96">
                <h2 className="mb-6 text-2xl font-bold text-center">Đăng Nhập</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Email hoặc tên đăng nhập</label>
                        <input
                            {...register("loginInput", { required: true })}
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Mật khẩu</label>
                        <input
                            {...register("password", { required: true })}
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white transition bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        Đăng Nhập
                    </button>
                    <div className='flex flex-row gap-1'>
                        <p>Chưa có tài khoản?</p>
                        <Link to="/register"><p className='text-blue-600 hover:underline hover:font-bold'>Đăng ký</p></Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login