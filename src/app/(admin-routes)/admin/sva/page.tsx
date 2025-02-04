'use client'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import ModalConfirmation from '@/app/components/ModalConfirmation';
import TitlePage from '@/app/components/TitlePage'
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BsCardChecklist, BsFillTrash2Fill } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import toast from "react-hot-toast";
import DatePTBR from '@/app/resource/date.service';
import { IoOpenOutline } from 'react-icons/io5';


export default function Sva() {

    const router = useRouter()
    const [svaList, setSVA] = React.useState<any[]>([])
    const [isLoading, setLoading] = useState(true);
    const [showModal, setModal] = useState(false);
    const [target, setTarget] = useState<any>({})

    async function getSVA() {

        const request: any = await axiosInterceptorInstance.get('/sva/get-all', {
            params: {
                isActve: null
            }
        })
        const response = request.data;

        if (request.status === 200) {
            setSVA(response);
            setLoading(false)
        }
    }

    async function deleteCity() {

        setLoading(true)

        const request = await axiosInterceptorInstance.delete(`sva/delete/${target.id}`);

        if (request.status > 400) {
            toast.error('Erro ao excluir SVA')
            setLoading(false)
            return
        }

        if (request.status >= 200) {
            toast.success('SVA excluído com sucesso')
            setLoading(false)
            getSVA();
            return
        }
    }

    React.useEffect(() => {
        getSVA();
    }, [])

    return (
        <>
            {showModal ?
                <ModalConfirmation text={`Deseja excluir ${target?.name}?`} buttons={<>
                    <button onClick={() => setModal(false)} className="mr-2 p-2 rounded-md hover:bg-gray-100">Cancelar</button>
                    <button onClick={() => { deleteCity(), setModal(false); }} className="p-2 bg-confirm hover:bg-confirmHover text-white rounded-md">Confirmar</button>
                </>} fields={undefined} />
                : null}
            <div className='p-4'>
                <div className='mb-6 flex'>
                    <TitlePage icon={<BsCardChecklist />} title='SVA´s' />

                    <div>
                        <button type="button" onClick={() => { router.push('/admin/sva/new') }} className="flex items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1 text-center">
                            <IoMdAdd className="mr-1" />
                            Criar SVA
                        </button>
                    </div>
                </div>

                {svaList?.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full mb-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Nome
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Imagem
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Criado em
                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {svaList?.map((sva, index) => {
                                    return (
                                        <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                {sva.name}
                                            </th>
                                            <td className="px-6 py-4 flex justify-center">
                                                <img src={sva.image} alt="" className='h-28' />
                                            </td>
                                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                                <DatePTBR date={sva.createdAt} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => window.open('/admin/sva/' + sva.id, '_blank')} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                                    <IoOpenOutline />
                                                </button>
                                                <button onClick={() => router.push('/admin/sva/' + sva.id)} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                                    <MdEdit />
                                                </button>
                                                <button onClick={() => { setModal(true), setTarget(sva) }} className="hover:text-white hover:bg-red-600 p-2 rounded-full">
                                                    <BsFillTrash2Fill />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className='flex justify-center items-center h-[200px]'>
                        {isLoading ? (
                            <div>
                                <LoadingAlares />
                            </div>
                        ) : (
                            <div>
                                <span className='text-gray-500'>Nenhum SVA cadastrada</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
