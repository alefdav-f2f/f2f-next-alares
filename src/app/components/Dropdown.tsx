'use client'
import React, { useState } from 'react'
import { IoIosLogOut } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { logout } from '../services/auth-service';
import { useRouter } from 'next/navigation';


export default function Dropdown({ userName }: any) {

    const [isOpen, setIsOpen] = useState(false);
    const router =  useRouter();

    async function doLogout() {
        setIsOpen(false)
        logout();
        router.replace('/auth')
    }

    return (
        <div className='relative flex flex-col items-center'>
            <button onClick={() => setIsOpen((prev) => !prev)} className='text-white min-w-[150px] flex items-center hover:bg-sub justify-center py-2 px-2 rounded-md hover:text-black'>
                <FaRegUserCircle className='mr-2' />
                {userName ? (
                    <span className='text-sm whitespace-nowrap font-medium fade25'>{userName}</span>
                ) : null}
            </button>
            {isOpen && (
                <div className=' absolute top-10 flex flex-col items-start rounded-md py-2 w-full bg-white shadow-md'>
                    <button onClick={() => doLogout()} className='flex items-center p-2.5 hover:bg-gray-200 w-full hover:cursor-pointer hover:text-red-600 hover:font-semibold'>
                        <IoIosLogOut className='mr-2' />
                        <span className='text-sm font-medium'>Sair</span>
                    </button>
                </div>
            )}
        </div>
    )
}
