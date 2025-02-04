import React from 'react'
import Icon from '@/img/alares-icon2.png';
import Image from 'next/image';

export default function LoadingLogo({ textClass, text }: any) {
    return (
        <div className='flex flex-col items-center'>
            <div className='mb-10'>
                <div className="loading_alares"></div>
                <div className='mt-[-45px] ml-6'>
                    <Image
                        alt="Logo Alares Internet"
                        src={Icon}
                        className="w-6 loading_pulse" />
                </div>
            </div>
            <div>
                <span className={textClass ? textClass : 'text-gray-500'}>{text ? text : 'Carregando ...'}</span>
            </div>
        </div>
    )
}
