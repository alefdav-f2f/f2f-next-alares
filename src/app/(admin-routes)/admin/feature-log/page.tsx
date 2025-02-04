'use client'
import React from 'react'
import featureList from '@/app/mock/featureList.json';
import { BsArrowReturnRight } from "react-icons/bs";


export default function FeatureLog() {

    const features = featureList;
    return (
        <>
            <div className='flex flex-col-reverse items-center pt-2'>
                {features?.map((item: any, index) => {
                    return (
                        <div key={index} className='p-4'>
                            <div className='py-2 px-5 bg-sub rounded-lg sm:min-w-[500px]'>
                                <div className='flex justify-between items-center'>
                                    <span className='text-lg font-medium text-black'>Versão {index + 1}</span>
                                    <span className='text-sm font-normal'>{item.date}</span>
                                </div>
                            </div>
                            <div className='p-4'>
                                {item?.topics?.map((tp: any, index: any) => {
                                    return (
                                        <div className='mb-2' key={index}>
                                            {/* Tipo texto */}
                                            {tp.type === 1 ? <div className='mb-1 flex items-center text-sm'>
                                                <BsArrowReturnRight className='mr-1 mb-0.5 text-gray-600'/> 
                                                <span>{tp.content}</span>
                                            </div> : null}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
