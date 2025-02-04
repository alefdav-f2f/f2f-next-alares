import React from 'react'

interface CardNumberProps {
    title: string,
    value: number,
    className: string
}

export default function CardNumber({ title, value, className }: CardNumberProps) {
    return (
        <div className='flex'>
            <div>
                <div className={className + ' p-3 rounded-md w-[200px] shadow-md'}>
                    <div>
                        <span>{title}</span>
                    </div>
                    <div className='text-end'>
                        <span className='text-3xl font-bold'>{value}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
