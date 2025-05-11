import React, { useEffect, useState } from 'react'
import { FaBars, FaRegUser } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import cheems from "../assets/cheems.png"
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { GoTriangleDown } from "react-icons/go";

const nagivation = [
    {
        name: "Dashboard", href: "/dashboard"
    }, {
        name: "Order", href: "/order"
    },
    {
        name: "Cart Page", href: "/cartpage"
    },
]

const NavBarAdmin = () => {
    const navigate=useNavigate()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const cartItems = useSelector(state => state.cart.cartItems)

    const handleLogOut=()=>{
        localStorage.removeItem("token");
        navigate("/admin")
    }
    // const {currentUser,logOut}=useAuth()
    const currentUser = true


    return (
        <>
            <div className='flex w-[calc(100vw-16rem)] flex-row items-center justify-between h-20 border-b p-4 shadow-md bg-white'>
                <h1 className='text-2xl font-bold'>Tổng quan</h1>
                <div>
                    <div className='relative flex items-center justify-between md:space-x-3'>
                        <div>
                            {currentUser ? <>
                                <button >
                                    <img className='border-2 rounded-full size-8' src={cheems} />
                                </button>
                                {/* {isDropdownOpen&&(<div className='absolute z-40 p-2 mt-2 bg-white rounded-md shadow-lg w-36 right-16'>
                                                <ul>
                                                    {
                                                        nagivation.map((item)=>(
                                                            <li onClick={()=>setIsDropdownOpen(false)} className='px-4 py-2 hover:bg-gray-200' key={item.name}>
                                                                <Link  to={item.href}>{item.name}</Link>
                                                            </li>
                                                        ))
                                                    }
                                                      <button  className='block px-4 py-2 hover:bg-gray-200'>Đăng xuất</button>
                                                </ul>
                                            </div>)} */}
                            </>
                                : <Link to="/login"> <FaRegUser className='size-6' /></Link>
                            }
                        </div>


                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='hidden sm:block'>
                            <GoTriangleDown className=' size-8' />
                            {isDropdownOpen && (<div className='absolute z-40 p-2 mt-2 bg-white rounded-md shadow-lg w-36 right-2'>
                                <ul>
                                    {
                                        nagivation.map((item) => (
                                            <li onClick={() => setIsDropdownOpen(false)} className='px-4 py-2 hover:bg-gray-200 hover:rounded-lg' key={item.name}>
                                                <Link to={item.href}>{item.name}</Link>
                                            </li>
                                        ))
                                    }
                                    <button onClick={handleLogOut} className='block w-full px-4 py-2 hover:rounded-lg hover:bg-gray-200'>Đăng xuất</button>
                                </ul>
                            </div>)}
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBarAdmin