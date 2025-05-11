import React, { useEffect, useState } from 'react'
import { FaBars,FaRegUser } from "react-icons/fa6";
import { CiSearch,CiHeart, CiShoppingCart } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { TiHome } from "react-icons/ti";
import { FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import cheems from "../assets/cheems.png"
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { useSearchBooksByNameQuery } from '../redux/features/books/bookApi';

const nagivation = [
    {
        name: "Hồ sơ của tôi", href: "/profile"
    },
    {
        name: "Đơn hàng của tôi", href: "/orders"
    },
]

const NavBar = () => {
    const navigate=useNavigate()
    const [isDropdownOpen,setIsDropdownOpen]=useState(false);
    const cartItems=useSelector(state=>state.cart.cartItems)

    const [searchQuery,setSearchQuery]=useState("")  
      
    const {currentUser,logOut}=useAuth()
    
    const handleSearch=()=>{
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    }
    // const handleKeyDown=(e)=>{
    //     if(e.key==="Enter"){
    //         e.preventDefault()
    //         handleSearch()
    //     }
    // }
    const handleLogOut=()=>{
        logOut()
    }

  return (
    <>
        <header className='sticky top-0 z-50 px-4 py-6 mx-auto bg-white border-b border-gray-200 shadow-md max-w-screen-2xl'>
            <nav className='flex items-center justify-between gap-4 px-4 md:gap-16'>
                <div className='flex items-center gap-2'>
                      <button className='cursor-pointer active:text-black'><Link to="/"><GoHome  className='w-7 h-7'/></Link></button>

                    
                    <div className='relative flex items-center justify-between w-40 space-x-2 sm:w-96'>
                        <CiSearch className='absolute inline-block left-2 ' />
                        <input onKeyDown={(e)=>e.key==="Enter"&&handleSearch()}  onChange={(e)=>setSearchQuery(e.target.value)} type="text" className='px-6 py-2 bg-gray-300 rounded-md md:px-8 focus:outline-none' placeholder='Tìm kiếm ở đây'/>
                    </div>
                </div>

                <div className='relative flex items-center justify-between md:space-x-3'>
                    <div>
                          {currentUser ? <>
                          <button onClick={()=>setIsDropdownOpen(!isDropdownOpen)}>
                            <img className='border-2 rounded-full size-10' src={cheems}/>
                            </button>
                            {isDropdownOpen&&(<div className='absolute z-40 p-2 mt-2 bg-white rounded-md shadow-lg cursor-pointer w-44 right-16'>
                                <ul>
                                    {
                                        nagivation.map((item)=>(
                                            <li onClick={() => setIsDropdownOpen(false)} className='px-4 py-2 hover:bg-gray-200 hover:rounded-md' key={item.name}>
                                                <Link  to={item.href}>{item.name}</Link>
                                            </li>
                                        ))
                                    }
                                      <button onClick={handleLogOut} className='block w-full px-4 py-2 text-left hover:rounded-md hover:bg-gray-200'>Đăng xuất</button>
                                </ul>
                            </div>)}
                            </> 
                        :<Link to="/login"> <FaRegUser className='size-6' /></Link>
                        }
                    </div>
                        
        
                    <button className='hidden cursor-pointer sm:block'>
                          <FaRegHeart   className=' size-6'/>
                    </button>
                    <Link to="/cart"><button className='flex items-center justify-center p-1 px-2 bg-yellow-400 rounded-sm hover:border-2 sm:px-6'>
                          <CiShoppingCart/>
                          {
                              cartItems?.length > 0 ? <span className='ml-0.5' >{cartItems?.length}</span> : <span className='ml-0.5'>0</span>
                          }
                          
                    </button></Link>
                </div>
              
            </nav>
        </header>
    </>
  )
}

export default NavBar