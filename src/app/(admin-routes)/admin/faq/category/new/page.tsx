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
import CityService from '@/app/services/api/city-service';
import { StateProps } from '@/app/types/interface/state.interface';
import ModalConfirmation from '@/app/components/ModalConfirmation';
import FaqService from '@/app/services/api/faq.service';

interface props {
    category_id: React.ReactNode
}

export default function QuestionForm({ category_id }: props) {

    const [isEditing, setEditing] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const router = useRouter();
    const [stateList, setState] = useState<StateProps[]>([])
    const [isReceiving, setReceive] = useState(true);
    const [cityList, setCityList] = useState<any[]>([])

    const [showModal, setShowModal] = useState(false);
    const [isAll, setIsAll] = useState(false);

    async function getStates() {

        const request = await axiosInterceptorInstance.get('/uf/paginate', {
            params: {
                isActive: null,
                page: 1,
                perPage: 9999

            }
        })

        if (request.status === 200) {
            setState(request.data)
            return
        }
    }

    async function storeCategory(FormData: any) {

        setLoading(true);

        let response: any;

        try {

            const data = {
                id: category_id,
                name: FormData?.name,
                isActive: FormData?.isActive === "true" ? true : false,
                cities: cityList
            }

            if (isEditing) {
                response = await axiosInterceptorInstance.patch('/faq/update/category', data)
            } else {
                response = await axiosInterceptorInstance.post('/faq/create/category', data)
            }

            router.push('/admin/faq')
            toast.success('Categoria ' + (isEditing ? 'atualizada' : 'criada') + ' com sucesso')


        } catch (error: any) {
            toast.error(error.response?.data?.message)
            setLoading(false);
        }
    }

    async function getCategory(id: any) {

        setReceive(true);

        const request: any = await axiosInterceptorInstance.get(`/faq/detail/category/${id}`)
        const response = request.data

        if (request.status > 400) {
            toast.error(response.message)
            setReceive(false);
            return
        }

        if (request.status === 200) {
            const cities = response?.cities;
            setValue('name', response?.detail.name)
            setValue('isActive', response.detail.isActive === true ? "true" : "false")
            setCityList(cities)
            setReceive(false);
            const every = cities?.every((city: any) => city.selected === true);
            if (every) {
                setIsAll(true)
            }
        }
    }

    function setSelected(checked: any, index: number) {

        const array = [...cityList];

        array[index].selected = checked;

        setCityList(array);

        const every = array?.every((city: any) => city.selected === true);
        if (every) {
            setIsAll(true)
        } else {
            setIsAll(false)
        }
    }

    async function deleteCategory() {

        setLoading(true);

        const response = await FaqService.deleteCategory(String(category_id));

        if (response) {
            toast.success(response.message);
            router.push('/admin/faq')
        }
    }

    function setAllCheck(checked: any) {
        setIsAll(checked);
        let array = [...cityList]
        if (checked) {
            array.map(a => a.selected = true);
        } else {
            array.map(a => a.selected = false);
        }
        setCityList(array);
    }

    React.useEffect(() => {
        getStates();

        if (category_id) {
            setEditing(true)
            getCategory(category_id)
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
                {showModal ?
                    <ModalConfirmation text={`Deseja realmente excluir a categoria?`} buttons={<>
                        <button onClick={() => setShowModal(false)} className="mr-2 p-2 rounded-md hover:bg-gray-100">Cancelar</button>
                        <button onClick={() => { deleteCategory(), setShowModal(false); }} className="p-2 bg-confirm hover:bg-confirmHover text-white rounded-md">Confirmar</button>
                    </>} fields={undefined} />
                    : null}
                <div className='p-4'>
                    <div className='mb-6 flex justify-between items-center'>
                        <TitlePage icon={<GrCircleInformation />} title={isEditing ? 'Atualizar Categoria de FAQ' : 'Nova Categoria de FAQ'} />
                        <button onClick={() => router.push('/admin/faq')} disabled={isLoading} className="text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                            Voltar
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(storeCategory)}>

                        <div className="mb-6">
                            <div className='sm:w-96'>
                                <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    Nome da categoria</label>
                                <input type="text" id="user" disabled={isLoading} {...register('name')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
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

                        <div className='mb-4'>
                            <div className='mb-2'>
                                <span className='text-sm font-medium'>Cidades relacionadas</span>
                            </div>
                            <label className="inline-flex items-center cursor-pointer mb-4">
                                <input type="checkbox" checked={isAll} onChange={(e) => { setAllCheck(e.target.checked) }} className="sr-only peer" />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                <span className="ms-3 text-sm font-medium text-gray-900">Habilitar para todas as cidades</span>
                            </label>
                            <div className='pl-4'>
                                {cityList?.map((city: any, index) => {
                                    return (
                                        <div key={index}>
                                            <div>
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" checked={city.selected} onChange={(e) => setSelected(e.target.checked, index)} className="sr-only peer" />
                                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                    <span className="ms-3 text-sm font-medium text-gray-900">{city.name}</span>
                                                </label>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className='flex'>
                            <button type="submit" className="text-white bg-main mr-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                {isLoading ? <Loading /> : (isEditing ? 'Atualizar' : 'Criar')}
                            </button>

                            {isEditing ? (
                                <button type='button' onClick={() => setShowModal(true)} className="text-white bg-red-600 mr-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                    Excluir categoria
                                </button>
                            ) : null}
                        </div>
                    </form>
                </div>
            </>
        )
    }
}
