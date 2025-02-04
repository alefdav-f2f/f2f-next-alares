'use client'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import Loading from '@/app/components/loadings/Loading';
import TitlePage from '@/app/components/TitlePage';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import { CgFileDocument } from 'react-icons/cg';
import RegulationService from '@/app/services/api/regulation.service';

interface props {
    regulation_id: React.ReactNode
}

export default function RegulationForm({ regulation_id }: props) {

    const [isEditing, setEditing] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [showFile, setShowFile] = useState(false);
    const [editFile, setEditFile] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const router = useRouter();
    const [selectedFile, setFile] = React.useState('')
    const [fileValue, setFileValue] = React.useState('')
    const [isReceiving, setReceive] = useState(true);

    /* toast.error('O cadastro de regulamentos está temporariamente inativo')
    router.push('/admin/regulation')
    return */

    async function storeCategory(form: any) {

        setLoading(true);

        let response: any;
        const formData = new FormData()
        formData.append('title', form.title);
        formData.append('type', form.type);
        formData.append('isActive', form.isActive);

        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        try {

            if (isEditing) {
                formData.append('id', String(regulation_id));

                response = await axiosInterceptorInstance.patch('/regulation/update', formData)
            } else {
                response = await axiosInterceptorInstance.post('/regulation/create', formData)
            }

            router.push('/admin/regulation')
            toast.success('Documento ' + (isEditing ? 'atualizada' : 'criada') + ' com sucesso')


        } catch (error: any) {
            toast.error(error.response?.data?.message)
            setLoading(false);
        }
    }

    async function getRegulation(id: any) {

        setReceive(true);

        const request: any = await axiosInterceptorInstance.get(`/regulation/detail/${id}`)
        const response = request.data

        if (request.status > 400) {
            toast.error(response.message)
            setReceive(false);
            return
        }

        if (request.status === 200) {
            setValue('title', response?.title)
            setValue('type', response?.type)
            setValue('isActive', response.isActive === true ? "true" : "false")
            setFileValue(response.pdf);
            setReceive(false);
        }

    }

    function handleImageUpload(event: any) {

        const file = event.target.files[0];
        setFile(file)
    }



    async function getDocument() {
        const request = await RegulationService.getDocument(String(regulation_id));
    }

    React.useEffect(() => {

        if (regulation_id) {
            setEditing(true)
            getRegulation(regulation_id)
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
                        <TitlePage icon={<CgFileDocument />} title={isEditing ? 'Atualizar Regulamento' : 'Novo Regulamento'} />
                        <button onClick={() => router.push('/admin/regulation')} disabled={isLoading} className="text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                            Voltar
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(storeCategory)}>

                        <div className="mb-6">
                            <div className='sm:w-full'>
                                <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    Nome do regulamento</label>
                                <input type="text" disabled={isLoading} {...register('title')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className='sm:w-96'>
                                <label htmlFor="states" className="block mb-2 text-sm font-medium text-gray-900">Tipo de documento</label>
                                <select id="states" {...register('type')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option value="regulation">Regulamento</option>
                                    <option value="contract">Contrato</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className='w-full'>
                                <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    Arquivo</label>
                                {/* <input type="text" disabled={isLoading} {...register('file')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required /> */}
                                {isEditing ? (
                                    <div className='flex items-center'>
                                        <a rel="canonical" href={fileValue} target='_blank' className='mr-2'>
                                            <button type='button' className='rounded-lg border border-gray-300 px-4 py-2 mr-2 hover:bg-gray-100'>
                                                <span>Arquivo atual</span>
                                            </button>
                                        </a>

                                        <div>
                                            <input type="file" accept="file/*" onChange={handleImageUpload} />
                                        </div>
                                    </div>
                                ) : (
                                    <input type="file" accept="file/*" onChange={handleImageUpload} />
                                )}

                            </div>
                        </div>

                        <div className='mb-8 rounded-lg'>
                            {showFile ? (
                                <embed src={fileValue} width="1000" height="800"
                                    type="application/pdf" />
                            ) : null}
                        </div>


                        <div className="mb-6">
                            <div className='sm:w-96'>
                                <label htmlFor="states" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                                <select id="states" {...register('isActive')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
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
