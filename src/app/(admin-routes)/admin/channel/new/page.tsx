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

export default function ChannelForm({ channelId }: any) {

    const [isEditing, setEditing] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const router = useRouter();
    const [categoryList, setCategory] = React.useState<StateProps[]>([]);
    const [isReceiving, setReceive] = useState(true);
    const [imageLogo, setImageLogo] = React.useState('');

    async function setValueLogo(event: any) {
        const value = event?.target?.value
        setImageLogo(value)
    }

    async function getCategory() {

        const request = await axiosInterceptorInstance.get('/category-channel/get-all', {
            params: {
                isActive: null
            }
        })

        if (request.status === 200) {
            setCategory(request.data)
            return
        }
    }

    async function storeChannel(channelData: any) {

        if (channelData.channelCategoryId === "") {
            toast.error("Selecione a categoria")
            return
        }

        setLoading(true);

        let response: any;

        try {

            const data = {
                id: channelId,
                name: channelData?.name,
                image: channelData?.image,
                channelCategoryId: channelData?.channelCategoryId,
                isActive: channelData?.isActive === "true" ? true : false,
            }

            if (isEditing) {
                response = await axiosInterceptorInstance.patch('/channel/update', data)
            } else {
                response = await axiosInterceptorInstance.post('/channel/create', data)
            }

            router.push('/admin/channel')
            toast.success('Channel ' + (isEditing ? 'atualizado' : 'criado') + ' com sucesso')


        } catch (error: any) {
            toast.error(error.response?.data?.message)
            setLoading(false);
        }
    }

    async function getChannel(id: string) {

        setReceive(true);

        const request: any = await axiosInterceptorInstance.get(`/channel/detail/${id}`)
        const response = request.data

        if (request.status > 400) {
            toast.error(response.message)
            setReceive(false);
            return
        }

        if (request.status === 200) {
            setValue('name', response?.name)
            setValue('image', response?.image)
            setImageLogo(response?.image)
            setValue('channelCategoryId', response?.channelCategoryId)
            setValue('isActive', response?.isActive)
            setReceive(false);
        }

    }

    React.useEffect(() => {

        getCategory()

        if (channelId) {
            setEditing(true)
            getChannel(channelId)
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
                        <TitlePage icon={<FaCity />} title={isEditing ? 'Atualizar canal' : 'Novo canal'} />
                        <button onClick={() => router.push('/admin/channel')} disabled={isLoading} className="text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                            Voltar
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(storeChannel)}>

                        <div className="mb-6">
                            <div className='sm:w-96'>
                                <label htmlFor="channel" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    Nome do canal</label>
                                <input type="text" id="channel" disabled={isLoading} {...register('name')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                            </div>
                        </div>

                        <div className="mb-6 w-40">
                            <div>
                                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                                <select id="status"  {...register('isActive')} disabled={isLoading} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option value="true">Ativo</option>
                                    <option value="false">Inativo</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-6 grid gap-4 grid-cols-4">
                            <div className='col-span-2 mb-2'>
                                <label htmlFor="image" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    Imagem do canal</label>
                                <input id="image" type="text" disabled={isLoading} {...register('image')} onChange={() => setValueLogo(event)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" />
                            </div>

                            <div className='col-span-2'>
                                <img src={imageLogo} alt="" className=' max-h-[100px] rounded-sm' />
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className='sm:w-96'>
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Categoria</label>
                                <select id="category" {...register('channelCategoryId')} disabled={isLoading} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option value="">--Selecione a categoria--</option>
                                    {categoryList?.map((category, index) => {
                                        return (
                                            <option key={index} value={category.id}>{category.name}</option>
                                        )
                                    })}
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
