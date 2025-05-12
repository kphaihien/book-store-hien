import React, { useEffect, useState } from 'react'

import { useForm } from "react-hook-form"

import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios"
import Swal from 'sweetalert2';
import getBaseUrl from '../utils/baseUrl';

const AdminLogin = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const auth =await response.data
            if (auth.token) {
                localStorage.setItem("token", auth.token)
                setTimeout(() => {
                    localStorage.removeItem("token");
                    alert("Phiên đăng nhập đã hết hạn!")
                    navigate("/admin")
                }, 3600 * 1000)
            }
            await Swal.fire({
                position: "center",
                icon: "success",
                title: "Đăng nhập thành công",
                showConfirmButton: false,
                timer: 1500
            });
            await navigate("/dashboard")
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
                        <label className="block text-gray-700">Tài khoản</label>
                        <input
                            {...register("user_name", { required: true })}
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

                </form>
            </div>
        </div>
    );
}

export default AdminLogin