'use client'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import Loading from '@/app/components/loadings/Loading';
import TitlePage from '@/app/components/TitlePage';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import { GrCircleInformation } from 'react-icons/gr';
import { StateProps } from '@/app/types/interface/state.interface';

interface props {
    question_id: React.ReactNode
}

export default function QuestionForm({ question_id }: props) {

    const [isEditing, setEditing] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const router = useRouter();
    const [categoryList, setCategory] = React.useState<any[]>([])
    const [isReceiving, setReceive] = useState(true);

    async function getCategory() {

        const request = await axiosInterceptorInstance.get('/faq/get-all/category', {
            params: {
                isActive: null
            }
        })

        if (request.status === 200) {
            setCategory(request.data)
            return
        }
    }

    async function storeQuestion(FormData: any) {

        if (FormData.faqCategoryId === "") {
            toast.error("Selecione a categoria")
            return
        }

        setLoading(true);

        let response: any;

        try {
            const data = {
                id: question_id,
                question: FormData?.question,
                response: FormData?.response,
                faqCategoryId: FormData.faqCategoryId,
                isActive: FormData?.isActive === "true" ? true : false
            }

            if (isEditing) {
                response = await axiosInterceptorInstance.patch('/faq/update/question', data)
            } else {
                response = await axiosInterceptorInstance.post('/faq/create/question', data)
            }

            router.push('/admin/faq')
            toast.success('Pergunta ' + (isEditing ? 'atualizada' : 'criada') + ' com sucesso')


        } catch (error: any) {
            toast.error(error.response?.data?.message)
            setLoading(false);
        }
    }

    async function getCity(id: any) {

        setReceive(true);

        const request: any = await axiosInterceptorInstance.get(`/faq/detail/question/${id}`)
        const response = request.data

        if (request.status > 400) {
            toast.error(response.message)
            setReceive(false);
            return
        }

        if (request.status === 200) {
            setValue('question', response?.question)
            setValue('response', response?.response)
            setValue('faqCategoryId', response?.faqCategoryId)
            setValue('isActive', response.isActive === true ? "true" : "false")
            setReceive(false);
        }

    }

    React.useEffect(() => {

        getCategory()

        if (question_id) {
            setEditing(true)
            getCity(question_id)
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
                        <TitlePage icon={<GrCircleInformation />} title={isEditing ? 'Atualizar Pergunta FAQ' : 'Nova Pergunta FAQ'} />
                        <button onClick={() => router.push('/admin/faq')} disabled={isLoading} className="text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                            Voltar
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(storeQuestion)}>

                        <div className="mb-6">
                            <div className='w-full'>
                                <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    Pergunta</label>
                                <input type="text" id="user" disabled={isLoading} {...register('question')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className='sm:w-full'>
                                <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    Resposta</label>
                                <textarea  id="user" disabled={isLoading} {...register('response')} className="bg-gray-50 border h-32 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" />
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className='sm:w-96'>
                                <label htmlFor="states" className="block mb-2 text-sm font-medium text-gray-900">Categoria</label>
                                <select id="states" {...register('faqCategoryId')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option>-- Selecione a categoria --</option>
                                    {categoryList?.map((category, index) => {
                                        return (
                                            <option key={index} value={category.id}>{category.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
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
