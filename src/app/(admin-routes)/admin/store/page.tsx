'use client'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import ModalConfirmation from '@/app/components/ModalConfirmation';
import TitlePage from '@/app/components/TitlePage'
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BsFillTrash2Fill } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import toast from "react-hot-toast";
import { BiSolidStore } from 'react-icons/bi';
import { StoreListProps } from '@/app/types/interface/store.interface';
import { IoOpenOutline } from 'react-icons/io5';
import StoreService from '@/app/services/api/store-service';

export default function Store() {

    const router = useRouter()
    const [storeList, setStore] = React.useState<any[]>([])
    const [isLoading, setLoading] = useState(true);
    const [showModal, setModal] = useState(false);
    const [targetData, setTarget] = useState<any>({});
    const [massiveSelection, setMassiveSelection] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    async function getStores() {

        const request: any = await axiosInterceptorInstance.get('/store/get-all', {
            params: {
                page: 1,
                perPage: 99999
            }
        })
        const response = request.data;

        if (request.status === 200) {
            const data = await request.data?.data;
            data.map((d: any) => d.checked = false);
            setStore(data);
            setLoading(false)
        }
    }

    async function deleteCity() {

        setLoading(true)

        const request = await axiosInterceptorInstance.delete(`store/delete/${targetData.id}`);

        if (request.status > 400) {
            toast.error('Erro ao excluir loja')
            setLoading(false)
            return
        }

        if (request.status >= 200) {
            toast.success('Loja excluída com sucesso')
            setLoading(false)
            getStores();
            return
        }
    };

    function setChecked(event: any, index: number) {

        const value = event.target.checked;
        const array = [...storeList];
        array[index].checked = value;

        const count = array.filter((a: any) => a.checked === true);

        setStore(array)

        checkChecked()
    }

    function selected() {
        return storeList.filter((b: any) => b.checked).length;
    }

    function checkChecked() {
        const array = [...storeList];
        const count = array.filter(a => a.checked === true);
        if (count.length > 0) {
            setMassiveSelection(true);
        } else {
            setMassiveSelection(false);
        }
    }

    function clearSelection() {
        const array = [...storeList];
        array.forEach(b => b.checked = false);
        setStore(array);
        checkChecked();
    }

    async function activeMassive() {
        const array = [...storeList];
        const checked = array.filter(a => a.checked === true);
        const data = {
            type: 'active',
            stores: checked
        }
        const request = await StoreService.massiveUpdate(data);

        if (request) {
            toast.success('Lojas ativas com sucesso');
            clearSelection();
            getStores();
        }
    }

    async function inactiveMassive() {
        const array = [...storeList];
        const checked = array.filter(a => a.checked === true);
        const data = {
            type: 'inactive',
            stores: checked
        }
        const request = await StoreService.massiveUpdate(data);

        if (request) {
            toast.success('Lojas inativadas com sucesso');
            clearSelection();
            getStores();
        }
    }

    async function deleteMassive() {
        const array = [...storeList];
        const checked = array.filter(a => a.checked === true);
        const data = {
            type: 'delete',
            stores: checked
        }
        const request = await StoreService.massiveUpdate(data);

        if (request) {
            toast.success('Banners removidos com sucesso');
            clearSelection();
            getStores();
        }
    }

    React.useEffect(() => {
        getStores();
    }, [])

    return (
        <>
            {showConfirmation ?
                <ModalConfirmation text={`Esta ação não pode ser revertida`} buttons={<>
                    <button onClick={() => setShowConfirmation(false)} className="mr-2 p-2 rounded-md hover:bg-gray-100">Cancelar</button>
                    <button onClick={() => { deleteMassive(), setShowConfirmation(false); }} className="p-2 bg-confirm hover:bg-confirmHover text-white rounded-md">Confirmar</button>
                </>} fields={undefined} />
                : null}
            {showModal ?
                <ModalConfirmation text={`Deseja excluir ${targetData?.name}?`} buttons={<>
                    <button onClick={() => setModal(false)} className="mr-2 p-2 rounded-md hover:bg-gray-100">Cancelar</button>
                    <button onClick={() => { deleteCity(), setModal(false); }} className="p-2 bg-confirm hover:bg-confirmHover text-white rounded-md">Confirmar</button>
                </>} fields={undefined} />
                : null}
            <div className='p-4'>
                <div className='mb-6 flex'>
                    <TitlePage icon={<BiSolidStore />} title='Lojas' />

                    <div>
                        <button type="button" onClick={() => { router.push('/admin/store/new') }} className="flex items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1 text-center">
                            <IoMdAdd className="mr-1" />
                            Criar loja
                        </button>
                    </div>
                </div>

                <div className='flex items-center justify-end mb-4'>
                    {massiveSelection ? (
                        <>
                            <div className='mr-2'>
                                <span>{selected()} {selected() > 1 ? 'selecionados' : 'selecionado'}</span>
                            </div>
                            <button type="button" onClick={() => { clearSelection() }} disabled={!massiveSelection} className={`flex items-center font-medium rounded-md text-sm px-3 py-1 text-center mr-2 border  ${massiveSelection ? 'text-blue-700 hover:text-white border-blue-700 hover:bg-blue-800' : 'border-gray-400 text-gray-400'}`}>
                                Limpar
                            </button>
                        </>
                    ) : null}
                    <button type="button" onClick={() => activeMassive()} disabled={!massiveSelection} className={`flex items-center font-medium rounded-md text-sm px-3 py-1 text-center mr-2 border  ${massiveSelection ? 'text-blue-700 hover:text-white border-blue-700 hover:bg-blue-800' : 'border-gray-400 text-gray-400'}`}>
                        Ativar
                    </button>
                    <button type="button" onClick={() => inactiveMassive()} disabled={!massiveSelection} className={`flex items-center font-medium rounded-md text-sm px-3 py-1 text-center mr-2 border  ${massiveSelection ? 'text-blue-700 hover:text-white border-blue-700 hover:bg-blue-800' : 'border-gray-400 text-gray-400'}`}>
                        Inativar
                    </button>
                    <button type="button" onClick={() => setShowConfirmation(true)} disabled={!massiveSelection} className={`flex items-center font-medium rounded-md text-sm px-3 py-1 text-center mr-2 border  ${massiveSelection ? 'text-blue-700 hover:text-white border-blue-700 hover:bg-blue-800' : 'border-gray-400 text-gray-400'}`}>
                        <BsFillTrash2Fill className="mr-1" />
                        Excluir
                    </button>
                </div>

                {storeList?.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full mb-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Nome
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Cidade/Estado
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Endereço
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Latitude/Longitude
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Criado em
                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {storeList?.map((store, index) => {
                                    return (
                                        <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                            <th scope="row" className="px-4 py-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                <div className="flex items-center">
                                                    <input onChange={(e) => setChecked(e, index)} type="checkbox" checked={store.checked} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                                </div>
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                {store.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {store.city}/{store.uf}
                                            </td>
                                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-xs">
                                                {store.address}
                                            </td>
                                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                                {store.isActive ? (
                                                    <span className='text-green-400 font-bold'>Ativo</span>
                                                ) : (
                                                    <span className='text-red-400 font-bold'>Inativo</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-xs">
                                                {store.latitude}/{store.longitude}
                                            </td>
                                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800 text-xs">
                                                {format(parseISO(store.createdAt), 'dd/MM/yyyy hh:mm')}
                                            </td>
                                            <td className="px-6 py-4 flex">
                                                <button onClick={() => window.open('/admin/store/' + store.id, '_blank')} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                                    <IoOpenOutline />
                                                </button>
                                                <button onClick={() => router.push('/admin/store/' + store.id)} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                                    <MdEdit />
                                                </button>
                                                <button onClick={() => { setModal(true), setTarget(store) }} className="hover:text-white hover:bg-red-600 p-2 rounded-full">
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
                                <span className='text-gray-500'>Nenhuma loja cadastrada</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
