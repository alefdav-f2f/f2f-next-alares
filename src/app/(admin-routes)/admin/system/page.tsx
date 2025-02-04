'use client'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import Loading from '@/app/components/loadings/Loading';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import TitlePage from '@/app/components/TitlePage'
import Image from 'next/image';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaCog } from 'react-icons/fa'
import { IoMdAdd } from 'react-icons/io';

export default function System() {

    const [canDisplay, setCanDisplay] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, setValue, control } = useForm();
    const [socialList, setList] = React.useState<any[]>([]);
    const [system_id, setId] = useState('');

    async function addSocial() {

        const data = {
            logo: '',
            order: 0,
            url: ''
        }

        setList([...socialList, data])
    }

    async function store(form: any) {

        setLoading(true)

        const data: any = {
            name: form.name,
            logo: 'logo',
            isActive: form.isActive === 'true' ? true : false,
            phones: [
                {
                    ddd: 1,
                    number: 9999999,
                    whatsapp: true,
                    public: true,
                    ufsPhones: []
                }
            ],
            colors: {
                primary: form.primary,
                secondary: form.secondary,
                background: form.background
            },
            socialMedia: socialList
        }

        try {
            let request: any;

            if (isEditing) {
                data.id = system_id;
                request = await axiosInterceptorInstance.patch('/company/update', data);
            } else {
                request = await axiosInterceptorInstance.post('/company/create', data);
            }

            if (request.status >= 200) {
                toast.success('Dados da empresa atualizado com sucesso')
                setLoading(false);
                getCompany();
            }
        }
        catch (error: any) {
            toast.error(error.message)
        }
    }

    async function getCompany() {

        setCanDisplay(false);

        try {
            const request: any = await axiosInterceptorInstance.get('/company/get-all',
                {
                    params: {
                        isActive: null
                    }
                }
            );

            if (request.status >= 200) {
                const data = request.data;

                if (data?.length > 0) {
                    setIsEditing(true)
                    const company = data[0];
                    detailCompany(company.id)
                } else {
                    setIsEditing(false)
                    setCanDisplay(true)
                    setLoading(false)
                }
            }
        }
        catch (error: any) {
            toast.error(error.message)
        }
    }

    async function detailCompany(id: string) {

        const request = await axiosInterceptorInstance.get(`/company/detail/${id}`);

        if (request.status >= 200) {
            const data = request.data;
            setValue('isActive', data.isActive)
            setValue('logo', data.logo)
            setValue('name', data.name)
            setList(data.socialMedia)
            setId(data.id)
            setCanDisplay(true)
            setLoading(false)
        }
    }

    React.useEffect(() => {
        getCompany()
    }, [])

    return (
        <div className='p-4'>
            <div className='mb-6 flex'>
                <TitlePage icon={<FaCog />} title='Sistema' />
            </div>

            {canDisplay === false ? (
                <div className='h-[300px] flex justify-center items-center'>
                    <LoadingAlares />
                </div>
            ) : (
                <form onSubmit={handleSubmit(store)}>
                    <div className="w-96 mb-10">
                        <div>
                            <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                Name</label>
                            <input type="text" disabled={isLoading} {...register('name')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                        </div>
                    </div>

                    <div className="mb-6 w-80 hidden">
                        <label htmlFor="states" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                        <select id="states"  {...register('isActive')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option value="true">Ativo</option>
                            <option value="false">Inativo</option>
                        </select>
                    </div>

                    <div className='hidden'>
                        <div className='mb-2'>
                            <span className='text-gray-500'>Cores</span>
                        </div>
                        <div className="w-96 mb-6">
                            <div className='mb-4'>
                                <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    Cor primária</label>
                                <input type="color" disabled={isLoading} {...register('primary')} />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    Cor secundária</label>
                                <input type="color" disabled={isLoading} {...register('secondary')} />
                            </div>

                            <div className='mb-4'>
                                <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    Cor de background</label>
                                <input type="color" disabled={isLoading} {...register('background')} />
                            </div>
                        </div>
                    </div>


                    <div className='mb-6'>
                        <div className='mb-6 flex aicenter'>
                            <div className='mr-4 pt-1'>
                                <span className='text-gray-500'>Redes Sociais ({socialList.length})</span>
                            </div>

                            <div>
                                <button type="button" onClick={() => addSocial()} className="flex items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1 text-center">
                                    <IoMdAdd className="mr-1" />
                                    Adicionar
                                </button>
                            </div>
                        </div>

                        <div className='flex flex-wrap'>
                            {socialList?.map((social, index) => {
                                return (
                                    <div className="mr-4 w-full p-4 bg-white border border-gray-200 rounded-lg shadow mb-4">

                                        <div className="mb-4">
                                            <div>
                                                <label className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                                    Ícone</label>
                                                <input type="text" defaultValue={social.logo} onChange={(e) => { socialList[index].logo = e.target.value }} disabled={isLoading} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div>
                                                <label className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                                    Ordem</label>
                                                <input type="number" defaultValue={social.order} onChange={(e) => { socialList[index].order = Number(e.target.value) }} disabled={isLoading} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div>
                                                <label className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                                    URL</label>
                                                <input type="text" defaultValue={social.url} onChange={(e) => { socialList[index].url = e.target.value }} disabled={isLoading} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                            </div>
                                        </div>

                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className='flex'>
                        <button type="submit" className="text-white bg-main mr-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                            {isLoading ? <Loading /> : 'Atualizar'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}
