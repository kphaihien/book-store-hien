import React from 'react'
import { FiBox, FiTruck } from "react-icons/fi";
import { CiDeliveryTruck } from "react-icons/ci";
import { TiTickOutline } from "react-icons/ti";
import { MdOutlineCancel } from "react-icons/md";
const OrderStatus = ({ status }) => {
    switch (status) {
        case "pending":
            return (<>
                <div className="flex flex-row items-center justify-around p-2">
                    <div className='flex flex-col items-center'>
                        <FiBox className='w-10 h-10 text-yellow-500' />
                        <p className='text-sm font-bold'>Đang đóng hàng</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <FiTruck className='w-10 h-10' />
                        <p className='text-sm'>Đang vận chuyển</p>
                    </div>

                    <div className='flex flex-col items-center'>
                        <TiTickOutline className='w-10 h-10' />
                        <p className='text-sm'>Đã giao thành công</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <MdOutlineCancel className='w-10 h-10' />
                        <p className='text-sm'>Đã hủy</p>
                    </div>
                </div>
            </>)
        case "shipped":
            return (<>
                <div className="flex flex-row items-center justify-around p-2">
                    <div className='flex flex-col items-center'>
                        <FiBox className='w-10 h-10 ' />
                        <p className='text-sm'>Đang đóng hàng</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <FiTruck className='w-10 h-10' />
                        <p className='text-sm'>Đang vận chuyển</p>
                    </div>

                    <div className='flex flex-col items-center'>
                        <TiTickOutline className='w-10 h-10 text-yellow-500' />
                        <p className='text-sm font-bold'>Đã giao thành công</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <MdOutlineCancel className='w-10 h-10' />
                        <p className='text-sm'>Đã hủy</p>
                    </div>
                </div>
            </>)
        case "delivered":
            return (<>
                <div className="flex flex-row items-center justify-around p-2">
                    <div className='flex flex-col items-center'>
                        <FiBox className='w-10 h-10 ' />
                        <p className='text-sm'>Đang đóng hàng</p>
                    </div>
                    <div className='flex flex-col items-center text-yellow-500'>
                        <FiTruck className='w-10 h-10' />
                        <p className='text-sm font-bold'>Đang vận chuyển</p>
                    </div>

                    <div className='flex flex-col items-center'>
                        <TiTickOutline className='w-10 h-10' />
                        <p className='text-sm'>Đã giao thành công</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <MdOutlineCancel className='w-10 h-10' />
                        <p className='text-sm'>Đã hủy</p>
                    </div>
                </div>
            </>)
        default:
            return (<>
                <div className="flex flex-row items-center justify-around p-2">
                    <div className='flex flex-col items-center'>
                        <FiBox className='w-10 h-10 ' />
                        <p className='text-sm'>Đang đóng hàng</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <FiTruck className='w-10 h-10' />
                        <p className='text-sm'>Đang vận chuyển</p>
                    </div>

                    <div className='flex flex-col items-center'>
                        <TiTickOutline className='w-10 h-10' />
                        <p className='text-sm'>Đã giao thành công</p>
                    </div>
                    <div className='flex flex-col items-center text-yellow-500'>
                        <MdOutlineCancel className='w-10 h-10 ' />
                        <p className='text-sm font-bold'>Đã hủy</p>
                    </div>
                </div>
            </>)
    }
}

export default OrderStatus