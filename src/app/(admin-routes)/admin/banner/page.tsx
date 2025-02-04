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
import { PiFlagBannerFill } from 'react-icons/pi';
import DatePTBR from '@/app/resource/date.service';
import BannerService from '@/app/services/api/banner-service';
import { IoOpenOutline } from 'react-icons/io5';

export default function Banner() {

    const router = useRouter()
    const [bannerList, setBanner] = React.useState<any[]>([])
    const [isLoading, setLoading] = useState(true);
    const [showModal, setModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [target, setTarget] = useState<any>({});

    const [massiveSelection, setMassiveSelection] = useState(false);

    async function getBanners() {

        const params = {
            isActive: null,
        }

        const response = await BannerService.paginate(params);

        if (response) {
            const data = response.data?.data;
            data.map((d: any) => d.checked = false);
            setBanner(data);
            setLoading(false)
        }
    }

    async function deleteBanner() {

        setLoading(true)

        const request = await BannerService.delete(target.id)

        if (request.status > 400) {
            toast.error('Erro ao excluir banner')
            setLoading(false)
            return
        }

        if (request.status >= 200) {
            toast.success('Banner excluído com sucesso')
            setLoading(false)
            getBanners();
            return
        }
    }

    function setChecked(event: any, index: number) {

        const value = event.target.checked;
        const array = [...bannerList];
        array[index].checked = value;

        const count = array.filter(a => a.checked === true);

        setBanner(array)

        checkChecked()
    }

    function selected() {
        return bannerList.filter(b => b.checked).length;
    }

    function checkChecked() {
        const array = [...bannerList];
        const count = array.filter(a => a.checked === true);
        if (count.length > 0) {
            setMassiveSelection(true);
        } else {
            setMassiveSelection(false);
        }
    }

    function clearSelection() {
        const array = [...bannerList];
        array.forEach(b => b.checked = false);
        setBanner(array);
        checkChecked();
    }

    async function activeMassive() {
        const array = [...bannerList];
        const checked = array.filter(a => a.checked === true);
        const data = {
            type: 'active',
            banners: checked
        }
        const request = await BannerService.massiveUpdate(data);

        if (request) {
            toast.success('Banners ativos com sucesso');
            clearSelection();
            getBanners();
        }
    }

    async function inactiveMassive() {
        const array = [...bannerList];
        const checked = array.filter(a => a.checked === true);
        const data = {
            type: 'inactive',
            banners: checked
        }
        const request = await BannerService.massiveUpdate(data);

        if (request) {
            toast.success('Banners inativados com sucesso');
            clearSelection();
            getBanners();
        }
    }

    async function deleteMassive() {
        const array = [...bannerList];
        const checked = array.filter(a => a.checked === true);
        const data = {
            type: 'delete',
            banners: checked
        }
        const request = await BannerService.massiveUpdate(data);

        if (request) {
            toast.success('Banners removidos com sucesso');
            clearSelection();
            getBanners();
        }
    }

    React.useEffect(() => {
        getBanners();
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
                <ModalConfirmation text={`Deseja excluir ${target?.name}?`} buttons={<>
                    <button onClick={() => setModal(false)} className="mr-2 p-2 rounded-md hover:bg-gray-100">Cancelar</button>
                    <button onClick={() => { deleteBanner(), setModal(false); }} className="p-2 bg-confirm hover:bg-confirmHover text-white rounded-md">Confirmar</button>
                </>} fields={undefined} />
                : null}
            <div className='p-4'>
                <div className='mb-6 flex'>
                    <TitlePage icon={<PiFlagBannerFill />} title='Banners' />

                    <div>
                        <button type="button" onClick={() => { router.push('/admin/banner/new') }} className="flex items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1 text-center">
                            <IoMdAdd className="mr-1" />
                            Criar banner
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

                {bannerList?.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full mb-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">

                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Banner
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Vigência
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
 
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {bannerList?.map((banner, index) => {
                                    return (
                                        <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                            <th scope="row" className="px-4 py-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                <div className="flex items-center">
                                                    <input onChange={(e) => setChecked(e, index)} type="checkbox" checked={banner.checked} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                                                </div>
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                <div className='mb-[2px]'>
                                                    {banner.name}
                                                </div>
                                                <div>
                                                    <img src={banner.image} alt="" className='h-28 rounded-[8px]' />
                                                </div>
                                            </th>
                                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                                {banner.isActive ? (
                                                    <span className='text-green-400 font-bold'>Ativo</span>
                                                ) : (
                                                    <span className='text-red-400 font-bold'>Inativo</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                                <div>
                                                    <div className='flex'>
                                                        <span>Início:   <DatePTBR date={banner.beginningOfTerm} /> </span>
                                                    </div>
                                                    <div className='flex'>
                                                        <span>Final: <DatePTBR date={banner.endOfTerm} /></span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => window.open('/admin/banner/' + banner.id, '_blank')} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                                    <IoOpenOutline />
                                                </button>
                                                <button onClick={() => router.push('/admin/banner/' + banner.id)} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                                    <MdEdit />
                                                </button>
                                                <button onClick={() => { setModal(true), setTarget(banner) }} className="hover:text-white hover:bg-red-600 p-2 rounded-full">
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
                                <span className='text-gray-500'>Nenhum banner cadastrada</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
