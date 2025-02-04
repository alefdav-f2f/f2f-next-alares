import React from 'react'

export default function page() {
    return (
        <div className='p-4'>
            <div className='mb-4'>
                <span>Alares Site is running!</span>
            </div>

            <div>
                <div>
                    <span>Authentication: <span className='text-gray-500'>{process.env.NEXTAUTH_URL}</span></span>
                </div>
                <div>
                    <span>API URL: <span className='text-gray-500'>{process.env.NEXT_PUBLIC_BASE_URL}</span></span>
                </div>
            </div>
        </div>
    )
}
