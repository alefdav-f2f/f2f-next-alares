import React from 'react'

export default function Divider({ text, color, background }: any) {
    return (
        <div className={`${color} flex items-center`} >
            <div className='mr-2'>
                <span className='whitespace-nowrap'>{ text }</span>
            </div>
            <div className={ `h-[2px] w-full ${background}` }></div>
        </div>
    )
}
