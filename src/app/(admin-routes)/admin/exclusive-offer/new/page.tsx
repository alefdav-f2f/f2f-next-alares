'use client'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import Loading from '@/app/components/loadings/Loading';
import TitlePage from '@/app/components/TitlePage';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaCity } from 'react-icons/fa';
import toast from 'react-hot-toast';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import { StateProps } from '@/app/types/interface/state.interface';
import EcommerceService from '@/app/services/api/ecommerce.service';
import { MdLocalOffer } from 'react-icons/md';

export default function ExclusiveOfferForm({ id }: any) {

    const [isEditing, setEditing] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const router = useRouter();
    const [isReceiving, setReceive] = useState(true);

    async function store(formData: any) {
        
        setLoading(true);

        let response: any;

        try {
            console.log(formData)
            const data: any = {
                external_id: formData?.external_id,
                isActive: formData?.isActive === 'true' ? true : false,
            }

            if (isEditing) {
                data.id = id
                response = await EcommerceService.updateExclusiveOffer(data);
            } else {
                response = await EcommerceService.createExclusiveOffer(data);
            }

            router.push('/admin/exclusive-offer')
            toast.success('Oferta exclusiva ' + (isEditing ? 'atualizada' : 'criada') + ' com sucesso')


        } catch (error: any) {
            toast.error(error.response?.data?.message)
            setLoading(false);
        }
    }

    async function getOffer(id: string) {

        setReceive(true);

        const request: any = await EcommerceService.detailExclusiveOffer(id)
        const response = request.data

        if (request.status > 400) {
            toast.error(response.message)
            setReceive(false);
            return
        }

        if (request.status === 200) {
            setValue('external_id', response?.external_id)
            setValue('isActive', String(response?.isActive));
            setReceive(false);
        }

    }

    React.useEffect(() => {

        if (id) {
            setEditing(true)
            getOffer(id)
        } else {
            setReceive(false);
        }
    }, [])

    if (isReceiving) {
        return (
            <div className='h-[500px] flex items-center justify-center'>
                <LoadingAlares />
            </div>
        )
    } else {
        return (
            <>
                <div className='p-4'>
                    <div className='mb-6 flex justify-between items-center'>
                        <TitlePage icon={<MdLocalOffer />} title={isEditing ? 'Atualizar oferta exclusiva' : 'Nova oferta exclusiva'} />
                        <button onClick={() => router.push('/admin/exclusive-offer')} disabled={isLoading} className="text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                            Voltar
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(store)}>

                        <div className='flex'>
                            <div className="mb-6 mr-4">
                                <div className='sm:w-96'>
                                    <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                        Código externo</label>
                                    <input type="text" id="user" disabled={isLoading} {...register('external_id')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                </div>
                            </div>

                            <div className='sm:w-52'>
                                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                                <select id="status"  {...register('isActive')} disabled={isLoading} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option value="true">Ativo</option>
                                    <option value="false">Inativo</option>
                                </select>
                            </div>
                        </div>

                        <div className='flex'>
                            <button type="submit" className="text-white bg-main mr-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                {isLoading ? <Loading /> : (isEditing ? 'Atualizar' : 'Criar')}
                            </button>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}
