import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaShare } from "react-icons/fa6";

export default function ButtonRedirect() {

    const router = useRouter();

    return (
        <div className='relative flex flex-col items-center'>
            <Link href={'/'} target="_blank" className='text-white min-w-[150px] flex items-center hover:bg-sub justify-center py-2 rounded-md hover:text-black'>
                <FaShare className='mr-2' />
                <span className='text-sm font-medium'>Ir para o site</span>
            </Link>
        </div>
    )
}
