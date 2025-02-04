'use client'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import ModalConfirmation from '@/app/components/ModalConfirmation';
import TitlePage from '@/app/components/TitlePage'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BsFillTrash2Fill } from 'react-icons/bs';
import { FaCity, FaRegCopy } from "react-icons/fa";
import { IoMdAdd } from 'react-icons/io';
import { MdEdit, MdLocalOffer } from 'react-icons/md';
import toast from "react-hot-toast";
import DatePTBR from '@/app/resource/date.service';
import { IoOpenOutline } from 'react-icons/io5';
import EcommerceService from '@/app/services/api/ecommerce.service';

export default function ExclusiveOffer() {

    const router = useRouter()
    const [offerList, setOfferList] = React.useState<any[]>([])
    const [isLoading, setLoading] = useState(true);
    const [showModal, setModal] = useState(false);
    const [target, setTarget] = useState<any>({})

    async function getExclusiveOffers() {

        const params = {
            isActive: null
        }

        const request: any = await EcommerceService.getExclusiveOffers(params)
        const response = request.data;

        if (request.status === 200) {
            const data = await request.data?.data;
            setOfferList(data);
            setLoading(false)
        }
    }

    async function deleteExclusive() {

        setLoading(true)

        const request = await EcommerceService.deleteExclusiveOffer(target.id);

        if (request.status > 400) {
            toast.error('Erro ao excluir oferta exclusiva')
            setLoading(false)
            return
        }

        if (request.status >= 200) {
            toast.success('Oferta exclusiva excluída com sucesso')
            setLoading(false)
            getExclusiveOffers();
            return
        }
    }

    function clipBoard(url: string) {
        navigator.clipboard.writeText(url);
        toast.success('URL copiado')
    }

    React.useEffect(() => {
        getExclusiveOffers();
    }, [])

    return (
        <>
            {showModal ?
                <ModalConfirmation text={`Deseja excluir a oferta exclusiva ${target?.external_id}?`} buttons={<>
                    <button onClick={() => setModal(false)} className="mr-2 p-2 rounded-md hover:bg-gray-100">Cancelar</button>
                    <button onClick={() => { deleteExclusive(), setModal(false); }} className="p-2 bg-confirm hover:bg-confirmHover text-white rounded-md">Confirmar</button>
                </>} fields={undefined} />
                : null}
            <div className='p-4'>
                <div className='mb-6 flex'>
                    <TitlePage icon={<MdLocalOffer />} title='Oferta Exclusiva' />

                    <div>
                        <button type="button" onClick={() => { router.push('/admin/exclusive-offer/new') }} className="flex items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1 text-center">
                            <IoMdAdd className="mr-1" />
                            Criar oferta exclusiva
                        </button>
                    </div>
                </div>

                {offerList?.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full mb-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Código Externo
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Criado em
                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {offerList?.map((offer, index) => {
                                    return (
                                        <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                {offer.external_id}
                                            </th>
                                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                                {offer.isActive ? (
                                                    <span className='text-green-400 font-bold'>Ativo</span>
                                                ) : (
                                                    <span className='text-red-400 font-bold'>Inativo</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                                <DatePTBR date={offer.createdAt} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => clipBoard(offer.url)} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                                    <FaRegCopy  />
                                                </button>
                                                <button onClick={() => window.open('/admin/exclusive-offer/' + offer.id, '_blank')} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                                    <IoOpenOutline />
                                                </button>
                                                <button onClick={() => router.push('/admin/exclusive-offer/' + offer.id)} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                                    <MdEdit />
                                                </button>
                                                <button onClick={() => { setModal(true), setTarget(offer) }} className="hover:text-white hover:bg-red-600 p-2 rounded-full">
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
                                <span className='text-gray-500'>Nenhuma oferta exclusiva cadastrada</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
