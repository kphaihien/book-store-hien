import axios from "axios";
import getBaseUrl from "../../../utils/baseUrl";
import { useEffect, useState } from "react";


const DashboardStats = () => {
    const [numberBooks,setNumberBooks]=useState(0)
    const [numberUsers, setNumberUsers] = useState(0)
    const [numberOrders, setNumberOrders] = useState(0)
    const fetchBooksCount=async()=>{
        try {
            const response = await axios.get(`${getBaseUrl()}/api/books/count`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setNumberBooks(response.data.count_book);
        } catch (error) {
            console.error('Lỗi:', error.response?.data?.message || error.message);
            throw error;
        }
    }
    const fetchUsersCount = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/api/users/count`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setNumberUsers(response.data.numberUsers);
            } catch (error) {
                console.error('Lỗi:', error.response?.data?.message || error.message);
                throw error;
            }
        }
    const fetchOrdersCount = async () => {
        try {
            const response = await axios.get(`${getBaseUrl()}/api/orders/count`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            
            setNumberOrders(response.data.numberOrders);
        } catch (error) {
            console.error('Lỗi:', error.response?.data?.message || error.message);
            throw error;
        }
    }

    useEffect(()=>{
        fetchBooksCount()
        fetchUsersCount()
        fetchOrdersCount()
    },[])
        
    
    const stats = {
        totalBooks: 120,
        totalUsers: 50,
        totalOrders: 30,
        revenue: 15000000,
    };

    return (
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-4">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Tổng số sách</h3>
                <p className="text-3xl font-bold text-blue-600">{numberBooks?numberBooks:0}</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Tổng người dùng</h3>
                <p className="text-3xl font-bold text-green-600">{numberUsers?numberUsers:0}</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Tổng đơn hàng</h3>
                <p className="text-3xl font-bold text-yellow-600">{numberOrders?numberOrders:0}</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700">Doanh thu</h3>
                <p className="text-3xl font-bold text-red-600">
                    {stats.revenue.toLocaleString("vi-VN")} VNĐ
                </p>
            </div>
        </div>
    );
};

export default DashboardStats;