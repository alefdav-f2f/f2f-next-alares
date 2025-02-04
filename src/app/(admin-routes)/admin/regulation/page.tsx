'use client'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import ModalConfirmation from '@/app/components/ModalConfirmation';
import TitlePage from '@/app/components/TitlePage'
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BsFillTrash2Fill } from 'react-icons/bs';
import { FaCity } from "react-icons/fa";
import { IoMdAdd } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import toast from "react-hot-toast";
import { CgFileDocument } from 'react-icons/cg';
import { useForm } from 'react-hook-form';
import { IoOpenOutline } from 'react-icons/io5';

export default function Regulation() {

    const router = useRouter()
    const [regulationList, setRegulation] = React.useState<any[]>([])
    const [isLoading, setLoading] = useState(true);
    const [showModal, setModal] = useState(false);
    const [active, setActive] = useState(true);
    const [targetUser, setTarget] = useState<any>({});

    async function getRelations(isActive: boolean) {
        const request: any = await axiosInterceptorInstance.get('/regulation/get-all', {
            params: {
                isActive: isActive,
            }
        })
        const response = request.data;

        if (request.status === 200) {
            setRegulation(response);
            setLoading(false)
        }
    }

    async function deleteCity() {

        setLoading(true)

        const request = await axiosInterceptorInstance.delete(`regulation/delete/${targetUser.id}`);

        if (request.status > 400) {
            toast.error('Erro ao excluir regulamento')
            setLoading(false)
            return
        }

        if (request.status >= 200) {
            toast.success('Regulamento excluído com sucesso')
            setLoading(false)
            getRelations(active);
            return
        }
    }

    async function setStatus(value: any) {
        const isActive = value === 'true' ? true : false;
        setActive(isActive)

        getRelations(isActive);
    }

    React.useEffect(() => {
        getRelations(active);
    }, [])

    return (
        <>
            {showModal ?
                <ModalConfirmation text={`Deseja excluir ${targetUser?.title}?`} buttons={<>
                    <button onClick={() => setModal(false)} className="mr-2 p-2 rounded-md hover:bg-gray-100">Cancelar</button>
                    <button onClick={() => { deleteCity(), setModal(false); }} className="p-2 bg-confirm hover:bg-confirmHover text-white rounded-md">Confirmar</button>
                </>} fields={undefined} />
                : null}
            <div className='p-4'>
                <div className='mb-6 flex'>
                    <TitlePage icon={<CgFileDocument />} title='Regulamentos' />

                    <div>
                        <button type="button" onClick={() => { router.push('/admin/regulation/new') }} className="flex items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1 text-center">
                            <IoMdAdd className="mr-1" />
                            Criar regulamento
                        </button>
                    </div>
                </div>

                <form action="">
                    <div className="mb-6">
                        <div className='sm:w-96'>
                            <label htmlFor="states" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                            <select onChange={(e) => setStatus(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option value="true">Em vigência</option>
                                <option value="false">Comercialização encerrada</option>
                            </select>
                        </div>
                    </div>
                </form>

                {regulationList?.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full mb-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Título
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Tipó
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Status
                                    </th>
                                    <th scope="col" className="w-40">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {regulationList?.map((regulation, index) => {
                                    return (
                                        <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                <div className='flex items-center'>
                                                    <CgFileDocument className='mr-2' />
                                                    {regulation.title}
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                {regulation.type === 'regulation' ? 'Regulamento' : null}
                                                {regulation.type === 'contract' ? 'Contrato' : null}
                                            </td>
                                            <td className="px-6 py-4">
                                                {regulation.isActive === true ? 'Em vigência' : 'Comercialização encerrada'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => window.open('/admin/regulation/' + regulation.id, '_blank')} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                                    <IoOpenOutline />
                                                </button>
                                                <button onClick={() => router.push('/admin/regulation/' + regulation.id)} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                                    <MdEdit />
                                                </button>
                                                <button onClick={() => { setModal(true), setTarget(regulation) }} className="hover:text-white hover:bg-red-600 p-2 rounded-full">
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
                                <span className='text-gray-500'>Nenhum regulamento cadastrado</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
