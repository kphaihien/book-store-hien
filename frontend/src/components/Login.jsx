import React, { useEffect, useState } from 'react'

import { useForm } from "react-hook-form"

import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import Swal from 'sweetalert2';
import useScrollToTopOnMount from '../utils/useScrollToTopOnMount';

const Login = () => {
    useScrollToTopOnMount()

    const { logIn } = useAuth()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => { 
            try {
                await logIn(data);
            } catch (error) {
                console.log(error);
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
                        className="w-full py-2 font-semibold text-white transition transform bg-yellow-400 rounded-lg cursor-pointer hover:bg-yellow-500 active:scale-105"
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