'use client'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor'
import Loading from '@/app/components/loadings/Loading';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

export default function page() {
    const [isLoading, setIsLoading] = useState(false)

    async function deleteSocialMedia() {

        setIsLoading(true)

        try{
            const request: any = await axiosInterceptorInstance.post('company/delete-all-social-media');

            if(request.status >= 200) {
                const data = request.data;
                toast.success(data.message);
                setIsLoading(false)
            }
        } 
        catch(error: any){
            toast.error(error);
            setIsLoading(false)
        }
        
    }
    return (
        <div className='p-4'>
            <div className='flex items-center border-l-4 border-sub pl-4'>
                <div className='mr-4'>
                <span>Corrigir cadastro de redes sociais</span>
                </div>
                <button onClick={() => { deleteSocialMedia() }} className='py-1 px-5 bg-main text-white rounded-md hover:bg-hover'>
                    { isLoading ? <Loading/> : 'Iniciar'}
                </button>
            </div>
        </div>
    )
}
