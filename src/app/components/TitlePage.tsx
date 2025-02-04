import React from 'react'

export default function TitlePage({ icon, title }: any) {
    return (
        <div className="flex items-center text-lg mr-4">
            <div className="bg-sub w-2 h-[25px] mr-2"></div>
            <div className="mr-2">
                { icon }
            </div>
            <span className='font-medium'>{ title }</span>
        </div>
    )
}
