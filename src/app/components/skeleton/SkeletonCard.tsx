import React from 'react'
import Skeleton from './Skeleton'

export default function SkeletonCard() {
    return (
        <div className='flex justify-center'>

            <div className='p-4 lg:block hidden'>
                <div className='pb-6 px-2 pt-2 w-[320px] h-[700px]'>
                    <div className='rounded-lg shadow-lg sm:m-2 p-4 h-full'>

                        <div className='mb-4'>
                            <Skeleton className="w-full h-10 rounded-md mb-2" />
                            <Skeleton className="w-full h-5 rounded-md" />
                        </div>

                        <div className='flex justify-center'>
                            <div>
                                <Skeleton className="w-[150px] h-4 rounded-md mb-4" />
                                <Skeleton className="w-[150px] h-4 rounded-md mb-4" />
                                <Skeleton className="w-[150px] h-4 rounded-md mb-4" />
                                <Skeleton className="w-[150px] h-4 rounded-md mb-4" />
                            </div>
                        </div>

                        <div className='flex justify-evenly mb-8'>
                            <Skeleton className="w-12 h-12 rounded-full" />
                            <Skeleton className="w-12 h-12 rounded-full" />
                            <Skeleton className="w-12 h-12 rounded-full" />
                        </div>

                        <div className='flex justify-center'>
                            <Skeleton className="w-[150px] h-20 rounded-md mb-4" />
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-4'>
                <div className='pb-6 px-2 pt-2 w-[320px] h-[700px]'>
                    <div className='rounded-lg shadow-lg sm:m-2 p-4 h-full'>

                        <div className='mb-4'>
                            <Skeleton className="w-full h-10 rounded-md mb-2" />
                            <Skeleton className="w-full h-5 rounded-md" />
                        </div>

                        <div className='flex justify-center'>
                            <div>
                                <Skeleton className="w-[150px] h-4 rounded-md mb-4" />
                                <Skeleton className="w-[150px] h-4 rounded-md mb-4" />
                                <Skeleton className="w-[150px] h-4 rounded-md mb-4" />
                                <Skeleton className="w-[150px] h-4 rounded-md mb-4" />
                            </div>
                        </div>

                        <div className='flex justify-evenly mb-8'>
                            <Skeleton className="w-12 h-12 rounded-full" />
                            <Skeleton className="w-12 h-12 rounded-full" />
                            <Skeleton className="w-12 h-12 rounded-full" />
                        </div>

                        <div className='flex justify-center'>
                            <Skeleton className="w-[150px] h-20 rounded-md mb-4" />
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-4 lg:block hidden'>
                <div className='pb-6 px-2 pt-2 w-[320px] h-[700px]'>
                    <div className='rounded-lg shadow-lg sm:m-2 p-4 h-full'>

                        <div className='mb-4'>
                            <Skeleton className="w-full h-10 rounded-md mb-2" />
                            <Skeleton className="w-full h-5 rounded-md" />
                        </div>

                        <div className='flex justify-center'>
                            <div>
                                <Skeleton className="w-[150px] h-4 rounded-md mb-4" />
                                <Skeleton className="w-[150px] h-4 rounded-md mb-4" />
                                <Skeleton className="w-[150px] h-4 rounded-md mb-4" />
                                <Skeleton className="w-[150px] h-4 rounded-md mb-4" />
                            </div>
                        </div>

                        <div className='flex justify-evenly mb-8'>
                            <Skeleton className="w-12 h-12 rounded-full" />
                            <Skeleton className="w-12 h-12 rounded-full" />
                            <Skeleton className="w-12 h-12 rounded-full" />
                        </div>

                        <div className='flex justify-center'>
                            <Skeleton className="w-[150px] h-20 rounded-md mb-4" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
