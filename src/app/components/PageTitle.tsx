import Image from 'next/image'
import React from 'react'

interface props {
    icon: any
    title: string
}

export default function PageTitle({ icon, title }: props) {
    return (
        <div className='p-8 flex justify-center'>
            <div className='flex items-center'>
                {icon ? (
                    <Image
                        alt=""
                        src={icon}
                        className="w-9 mr-4" />
                ) : null}
                <h2 className='sm:text-4xl text-2xl text-main'>{title}</h2>
            </div>
        </div>
    )
}
