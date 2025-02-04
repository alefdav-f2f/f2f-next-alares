'use client'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import ModalConfirmation from '@/app/components/ModalConfirmation';
import TitlePage from '@/app/components/TitlePage'
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { BsFillTrash2Fill, BsTv } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import toast from "react-hot-toast";
import Loading from '@/app/components/loadings/Loading';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import ChannelService from '@/app/services/api/channel-tv-service';

export default function Channel() {

    const router = useRouter()
    const [cityList, setCityList] = useState<any[]>([]);

    const [isLoading, setLoading] = useState(true);
    const [isLoadingForm, setLoadingForm] = useState(false);
    const [showModal, setModal] = useState(false);

    const [isAll, setAll] = useState(true);
    const [planList, setPlanList] = useState<any[]>([])
    const [showModalPlan, setShowModalPlan] = useState(false);
    const [isEditingPlan, setIsEditingPlan] = useState(false);
    const [plan_id, setPlanID] = useState('');
    const [selectedChannelList, setSelectedChannelList] = useState<any[]>([])
    const [unselectedChannelList, setUnselectedChannelList] = useState<any[]>([])


    const [categoryList, setCategoryList] = useState<any[]>([])
    const [showModalCategory, setShowModalCategory] = useState(false);
    const [isEditingCategory, setIsEditingCategory] = useState(false);
    const [category_id, setCategoryID] = useState('');

    const [channelList, setChannelList] = useState<any[]>([])
    const [showModalChannel, setShowModalChannel] = useState(false);
    const [isEditingChannel, setIsEditingChannel] = useState(false);
    const [channel_id, setChannelID] = useState('');

    const [target, setTarget] = useState<any>({ id: '', type: '', name: '' });
    const [content, setContent] = useState(1);
    const [contentPlan, setContentPlan] = useState('cities');
    const { register, handleSubmit, setValue, reset } = useForm();

    //Lista todas as cidades
    async function getCity(setList: any) {

        const request: any = await axiosInterceptorInstance.get('/city/get-all', {
            params: {
                isActive: null,
                page: 1,
                perPage: 99999,
                search: null,
                order: 'asc'
            }
        })

        const data = request.data?.data;

        if (request.status >= 200) {

            if (setList?.length > 0) {
                data.map((d: any) => {
                    setList?.map((s: any) => {
                        if (d.id === s.id) {
                            d.checked = true;
                        }
                    })
                })

            } else {
                data.map((d: any) => {
                    d.checked = false;
                })
            }

            setCityList(data);
            setLoadingForm(false)

        }
    }


    //Muda o conteúdo principal do body
    async function changeContent(content: number) {
        switch (content) {
            case 1: {
                setContent(1)
                getPlan()
                break
            }
            case 2: {
                setContent(2)
                getCategory()
                break
            }
            case 3: {

                setContent(3)
                getCategory()
                getChannel()
                break
            }
        }
    }

    //Listar todos os Planos
    async function getPlan() {

        setLoading(true);

        const request: any = await axiosInterceptorInstance.get('/plan-tv/get-all-tv-plans')
        const response = request.data;

        if (request.status >= 200) {
            setPlanList(response);
            setLoading(false);
        }
    }

    //Listar todos as Categorias
    async function getCategory() {

        setLoading(true);

        const request: any = await axiosInterceptorInstance.get('/category-channel/get-all')
        const response = request.data;

        if (request.status >= 200) {
            setCategoryList(response);
            setLoading(false);
        }
    }

    async function getChannel() {

        setLoading(true);


        const response = await ChannelService.getWithChannel();
        if (response) {
            const data = response.data?.data;
            setChannelList(data);
            setLoading(false)
        }
    }


    //Cria-Atualiza um plano
    async function storePlan(form: any) {

        setLoadingForm(true);

        try {

            let list: any[] = [];
            let selectedList: any[] = [];

            cityList.map(c => {
                if (c.checked === true) {
                    list.push(c.id)
                }
            });

            selectedChannelList?.map((selected: any) => {
                selectedList.push(selected.id);
            })

            const data: any = {
                name: form.name,
                cityId: list,
                channels: selectedList,
                isAll: isAll,
                isActive: form.isActive === 'true' ? true : false
            }

            if (isEditingPlan) {
                data.id = plan_id;
            }

            let request: any;

            if (isEditingPlan) {
                request = await axiosInterceptorInstance.patch(`plan-tv/update`, data);
            } else {
                request = await axiosInterceptorInstance.post(`plan-tv/create`, data);
            }

            if (request.status >= 200) {
                toast.success(`Plano ${isEditingPlan ? 'atualizado' : 'criado'} com sucesso`);
                setShowModalPlan(false);
                changeContent(0);
                changeContent(1);
                resetForm();
            }
        }
        catch (error: any) {
            setLoadingForm(false);
            toast.error(error?.response?.data?.message)
        }
    }

    //Cria-Atualiza uma categoria
    async function storeCategory(form: any) {

        setLoadingForm(true);

        try {

            const data: any = {
                name: form.category_name,
                isActive: form.category_isActive === 'true' ? true : false
            }

            let request: any;

            if (isEditingCategory) {
                data.id = category_id
                request = await axiosInterceptorInstance.patch(`category-channel/update`, data);
            } else {
                request = await axiosInterceptorInstance.post(`category-channel/create`, data);
            }

            if (request.status >= 200) {
                toast.success(`Categoria ${isEditingCategory ? 'atualizada' : 'criada'} com sucesso`);
                setShowModalCategory(false);
                changeContent(2);
                resetForm();
            }
        }
        catch (error: any) {
            setLoadingForm(false);
            toast.error(error?.response?.data?.message)
        }
    }

    //Cria-Atualiza um canal
    async function storeChannel(form: any) {

        setLoadingForm(true);

        try {
            const data: any = {
                name: form.channel_name,
                image: form.channel_image,
                channelCategoryId: form.channel_channelCategoryId,
                isActive: form.channel_isActive === 'true' ? true : false
            }

            if (isEditingChannel) {
                data.id = channel_id
            }

            let request: any;

            if (isEditingChannel) {
                request = await axiosInterceptorInstance.patch(`channel/update`, data);
            } else {
                request = await axiosInterceptorInstance.post(`channel/create`, data);
            }

            if (request.status >= 200) {
                toast.success(`Canal ${isEditingChannel ? 'atualizado' : 'criado'} com sucesso`);
                setShowModalChannel(false);
                changeContent(3);
                resetForm();
            }
        }
        catch (error: any) {
            setLoadingForm(false);
            toast.error(error?.response?.data?.message)
        }
    }

    //Detalha plano
    async function detailPlan(id: string) {

        setPlanID(id);
        setIsEditingPlan(true);
        setShowModalPlan(true);
        setLoadingForm(true);

        try {
            const request = await axiosInterceptorInstance.get(`plan-tv/detail/${id}`);

            const data: any = request.data;

            setValue('name', data.name);
            setValue('isActive', data.isActive ? 'true' : 'false');
            setAll(data.isAll)
            setTimeout(() => {
                getCity(data?.cities)
            }, 1000)
            getChannelAndSeparate(data?.channels);
        }
        catch (error) {

        }
    }

    //Detalha plano
    async function detailCategory(id: string) {

        setCategoryID(id);
        setIsEditingCategory(true);
        setShowModalCategory(true);
        setLoadingForm(true);

        try {
            const request = await axiosInterceptorInstance.get(`category-channel/detail/${id}`);

            const data: any = request.data;

            setValue('category_name', data.name);
            setValue('category_isActive', data.isActive ? 'true' : 'false');
            setLoadingForm(false);
        }
        catch (error: any) {
            toast.error(error)
        }
    }

    //Detalha plano
    async function detailChannel(id: string) {

        setChannelID(id);
        setIsEditingChannel(true);
        setShowModalChannel(true);
        setLoadingForm(true);

        try {
            const request = await axiosInterceptorInstance.get(`channel/detail/${id}`);

            const data: any = request.data;

            setValue('channel_name', data.name);
            setValue('channel_image', data.image);
            setValue('channel_channelCategoryId', data.channelCategoryId);
            setValue('channel_isActive', data.isActive ? 'true' : 'false');
            setLoadingForm(false);
        }
        catch (error: any) {
            toast.error(error?.response?.data?.message)
        }
    }

    //Deleta um plano, categoria ou canal
    async function deleteType() {

        setLoading(true);
        const type = target.type;
        const id = target.id;

        let request: any;
        let success = '';
        let fail = '';
        let content = 1;

        switch (type) {
            case 'plan': {
                success = 'Canal excluído com sucesso';
                fail = 'Erro ao excluir canal';
                content = 1;
                request = await axiosInterceptorInstance.delete(`plan-tv/delete/${id}`);
                break
            }
            case 'category': {
                success = 'Categoria excluída com sucesso';
                fail = 'Erro ao excluir categoria';
                content = 2;
                request = await axiosInterceptorInstance.delete(`category-channel/delete/${id}`);
                break
            }
            case 'channel': {
                success = 'Canal excluído com sucesso';
                fail = 'Erro ao excluir canal';
                content = 3;
                request = await axiosInterceptorInstance.delete(`channel/delete/${id}`);
                break
            }
        }

        if (request.status > 400) {
            toast.error(fail)
            setLoading(false)
            return
        }

        if (request.status >= 200) {
            toast.success(success)
            setLoading(false)
            changeContent(content)
            resetForm();
            return
        }
    }

    async function resetCityChecked() {
        const array = [...cityList];
        array.map(a => a.checked = false);
        setCityList(array);
    }

    async function handleChecked(index: number) {
        const array = [...cityList];
        const value = array[index].checked;
        array[index].checked = !value;
        setCityList(array);
    }

    async function changePlanContent(content: string) {
        setContentPlan(content);
    }

    async function getChannelAndSeparate(selected: any) {

        const request: any = await axiosInterceptorInstance.get('/channel/get-all-channel')

        if (request.status >= 200) {
            const array = request.data;
            array.map((a: any) => {
                const count = selected.filter((s: any) => s.id === a.id).length;

                if (count > 0) {
                    selectedChannelList.push(a)
                } else {
                    unselectedChannelList.push(a)
                }
            })
        }

    }

    async function filterChannel(event: any) {
        console.log(event.target.value)
    }

    //Reseta o formulário dos modais
    async function resetForm() {
        setIsEditingPlan(false);
        setIsEditingCategory(false);
        setIsEditingChannel(false);
        setShowModalPlan(false);
        setShowModalCategory(false);
        setShowModalChannel(false);
        setCityList([]);
        reset();
        setAll(true);
        setSelectedChannelList([]);
        setUnselectedChannelList([]);
        setContentPlan('cities');
    }

    function migrateChannelSelection(channel: any, selected: boolean) {

        switch (selected) {
            case true: {
                const count = selectedChannelList.filter(s => s.id === channel.id).length;
                if (count > 0) {
                    toast.error('Canal já está vinculado')
                } else {
                    const array = unselectedChannelList.filter(u => u.id !== channel.id);
                    setUnselectedChannelList(array);
                    setSelectedChannelList([...selectedChannelList, channel])
                }
                break
            }
            case false: {
                const count = unselectedChannelList.filter(u => u.id === channel.id).length;
                if (count > 0) {
                    toast.error('Canal já está desvinculado')
                } else {
                    const array = selectedChannelList.filter(s => s.id !== channel.id);
                    setSelectedChannelList(array);
                    setUnselectedChannelList([...unselectedChannelList, channel])
                }
                break
            }
        }

    }

    React.useEffect(() => {
        changeContent(1);
    }, [])

    return (
        <>
            {/* Modal para deletar */}
            {showModal ?
                <ModalConfirmation text={`Deseja excluir ${target?.name}?`} fields={<></>} buttons={
                    <>
                        <button onClick={() => setModal(false)} className="mr-2 p-2 rounded-md hover:bg-gray-100">Cancelar</button>
                        <button onClick={() => { deleteType(), setModal(false) }} className="p-2 bg-confirm hover:bg-confirmHover text-white rounded-md">Confirmar</button>
                    </>
                } />
                : null}

            {/* Modal para formulário de Planos */}
            {showModalPlan ?
                <ModalConfirmation text={`${isEditingPlan ? 'Atualizar' : 'Novo'} plano`}
                    fields={
                        <>
                            {isLoadingForm ? (
                                <>
                                    <div className='p-10'>
                                        <LoadingAlares />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='mb-4'>
                                        <form onSubmit={handleSubmit(storePlan)}>

                                            <div className="mb-6">
                                                <div className='w-full'>
                                                    <label htmlFor="channel" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                                        Nome do plano</label>
                                                    <input type="text" id="channel" disabled={isLoadingForm} {...register('name')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                                </div>
                                            </div>

                                            <div className="mb-6 w-40">
                                                <div>
                                                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                                                    <select id="status"  {...register('isActive')} disabled={isLoadingForm} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                                        <option value="true">Ativo</option>
                                                        <option value="false">Inativo</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
                                                    <li className="me-2 hover:cursor-pointer">
                                                        <a rel="canonical" onClick={() => changePlanContent('cities')} aria-current="page" className={`inline-block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-t-lg ${contentPlan === 'cities' ? 'bg-gray-100' : ''}`}>Cidades</a>
                                                    </li>
                                                    {isEditingPlan ? (
                                                        <li className="me-2 hover:cursor-pointer">
                                                            <a rel="canonical" onClick={() => changePlanContent('channels')} className={`inline-block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-t-lg ${contentPlan === 'channels' ? 'bg-gray-100' : ''}`}>Canais</a>
                                                        </li>
                                                    ) : null}
                                                </ul>
                                            </div>

                                            {contentPlan === 'cities' ? (
                                                <div className='p-3'>
                                                    <div className='mb-1'>
                                                        <label className="inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" checked={isAll} className="sr-only peer" onChange={() => { setAll(!isAll), resetCityChecked() }} />
                                                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                            <span className="ms-3 text-sm font-medium text-gray-900">Vincular com todas as cidades</span>
                                                        </label>
                                                    </div>

                                                    {isAll ? (<></>) : (
                                                        <>
                                                            <div className='p-4 overflow-auto'>
                                                                <div className=' h-[200px]'>
                                                                    {cityList?.map((city, index) => {
                                                                        return (
                                                                            <div key={index}>
                                                                                <div className="flex items-center mb-4">
                                                                                    <input id="default-checkbox" type="checkbox" checked={city.checked} onChange={() => handleChecked(index)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                                    <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{city.name} - {city.uf}</label>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            ) : null}

                                            {contentPlan === 'channels' ? (
                                                <div>
                                                    {/* <form className='p-1'>
                                                        <label htmlFor="city" className="mb-2 text-sm font-medium text-gray-900 sr-only">Procurar</label>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                                </svg>
                                                            </div>
                                                            <input type="search" id="search" onChange={(e) => { filterChannel(e) }} className="block w-full p-2 ps-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Procurar" required />
                                                        </div>
                                                    </form> */}

                                                    <div className='flex'>
                                                        <div className='w-[50%] h-[250px] border-r-[1px] border-gray-200 p-2'>

                                                            <div className='text-center mb-2'>
                                                                <span className='text-sm'>Disponíveis ({unselectedChannelList?.length})</span>
                                                            </div>

                                                            <div className='h-[220px] overflow-auto'>
                                                                {unselectedChannelList.map((unselected) => {
                                                                    return (
                                                                        <>
                                                                            <div key={unselected.id} onClick={() => migrateChannelSelection(unselected, true)} className="mb-1 max-w-sm p-1 bg-white hover:bg-gray-100 hover:cursor-pointer border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                                                                <div className="flex items-center gap-4">
                                                                                    <img className="w-8 h-8 rounded-sm" src={unselected.image} alt="" />
                                                                                    <div className="font-medium">
                                                                                        <div className='text-xs'>{unselected.name}</div>
                                                                                        <div className="text-xs text-gray-500 dark:text-gray-400">{unselected.isActive ? 'Ativo' : 'Inativo'}</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                })}
                                                            </div>

                                                        </div>
                                                        <div className='w-[50%] h-[250px] p-2'>

                                                            <div className='text-center mb-2'>
                                                                <span className='text-sm'>Vinculados ({selectedChannelList?.length})</span>
                                                            </div>

                                                            <div className='h-[220px] overflow-auto'>
                                                                {selectedChannelList.map((selected) => {
                                                                    return (
                                                                        <div key={selected.id} onClick={() => migrateChannelSelection(selected, false)} className="mb-1 max-w-sm p-1 bg-white hover:bg-gray-100 hover:cursor-pointer border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                                                            <div className="flex items-center gap-4">
                                                                                <img className="w-8 h-8 rounded-sm" src={selected.image} alt="" />
                                                                                <div className="font-medium">
                                                                                    <div className='text-xs'>{selected.name}</div>
                                                                                    <div className="text-xs text-gray-500 dark:text-gray-400">{selected.isActive ? 'Ativo' : 'Inativo'}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : null}

                                            <div className='p-2'>
                                                <div className='h-[1px] bg-gray-300 w-full'></div>
                                            </div>

                                            <div className='flex justify-end mt-4'>
                                                <button onClick={() => resetForm()} className="mr-2 p-2 rounded-md hover:bg-gray-100">Cancelar</button>
                                                <button type="submit" className="text-white bg-main mr-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                                    {isLoadingForm ? <Loading /> : (isEditingPlan ? 'Atualizar' : 'Criar')}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            )}
                        </>
                    }
                    buttons={
                        <>

                        </>
                    } />
                : null}

            {/* Modal para formulário de Categorias */}
            {showModalCategory ?
                <ModalConfirmation text={`${isEditingCategory ? 'Atualizar' : 'Nova'} categoria`}
                    fields={
                        <>
                            {isLoadingForm ? (
                                <>
                                    <div className='p-10'>
                                        <LoadingAlares />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='mb-4'>
                                        <form onSubmit={handleSubmit(storeCategory)}>

                                            <div className="mb-6">
                                                <div className='w-full'>
                                                    <label htmlFor="channel" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                                        Nome da categoria</label>
                                                    <input type="text" id="channel" disabled={isLoadingForm} {...register('category_name')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                                </div>
                                            </div>

                                            <div className="mb-6 w-40">
                                                <div>
                                                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                                                    <select id="status"  {...register('category_isActive')} disabled={isLoadingForm} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                                        <option value="true">Ativo</option>
                                                        <option value="false">Inativo</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='flex justify-end'>
                                                <button onClick={() => resetForm()} className="mr-2 p-2 rounded-md hover:bg-gray-100">Cancelar</button>
                                                <button type="submit" className="text-white bg-main mr-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                                    {isLoadingForm ? <Loading /> : (isEditingCategory ? 'Atualizar' : 'Criar')}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            )}
                        </>
                    }
                    buttons={
                        <>

                        </>
                    } />
                : null}

            {/* Modal para formulário de Canais */}
            {showModalChannel ?
                <ModalConfirmation text={`${isEditingCategory ? 'Atualizar' : 'Novo'} canal`}
                    fields={
                        <>
                            {isLoadingForm ? (
                                <>
                                    <div className='p-10'>
                                        <LoadingAlares />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='mb-4'>
                                        <form onSubmit={handleSubmit(storeChannel)}>

                                            <div className="mb-6">
                                                <div className='w-full'>
                                                    <label htmlFor="channel" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                                        Nome do canal</label>
                                                    <input type="text" id="channel" disabled={isLoadingForm} {...register('channel_name')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                                </div>
                                            </div>

                                            <div className="mb-6">
                                                <div className='w-full'>
                                                    <label htmlFor="channel" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                                        Imagem do canal (URL)</label>
                                                    <input type="text" id="channel" disabled={isLoadingForm} {...register('channel_image')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                                </div>
                                            </div>

                                            <div className="mb-6 w-full">
                                                <div>
                                                    <label className="block mb-2 text-sm font-medium text-gray-900">Categoria do canal</label>
                                                    <select {...register('channel_channelCategoryId')} disabled={isLoadingForm} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                                        <option value="">-- Selecione uma categoria --</option>
                                                        {categoryList?.map((channel) => {
                                                            return (
                                                                <option value={channel.id}>{channel.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="mb-6 w-40">
                                                <div>
                                                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                                                    <select id="status"  {...register('channel_isActive')} disabled={isLoadingForm} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                                        <option value="true">Ativo</option>
                                                        <option value="false">Inativo</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className='flex justify-end'>
                                                <button onClick={() => resetForm()} className="mr-2 p-2 rounded-md hover:bg-gray-100">Cancelar</button>
                                                <button type="submit" className="text-white bg-main mr-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                                    {isLoadingForm ? <Loading /> : (isEditingChannel ? 'Atualizar' : 'Criar')}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            )}
                        </>
                    }
                    buttons={<></>} />
                : null}

            <div className='p-4'>
                <div className='mb-6 flex'>
                    <TitlePage icon={<BsTv />} title='Canais de TV' />
                </div>

                <div className='flex'>
                    <span onClick={() => changeContent(1)} className={content === 1 ? 'bg-blue-100 hover:cursor-pointer text-black text-sm font-medium me-2 px-2.5 py-0.5 rounded' : 'bg-gray-200 hover:cursor-pointer text-black text-sm font-normal me-2 px-2.5 py-0.5 rounded'}>Planos</span>
                    <span onClick={() => changeContent(2)} className={content === 2 ? 'bg-blue-100 hover:cursor-pointer text-black text-sm font-medium me-2 px-2.5 py-0.5 rounded' : 'bg-gray-200 hover:cursor-pointer text-black text-sm font-normal me-2 px-2.5 py-0.5 rounded'}>Categorias</span>
                    <span onClick={() => changeContent(3)} className={content === 3 ? 'bg-blue-100 hover:cursor-pointer text-black text-sm font-medium me-2 px-2.5 py-0.5 rounded' : 'bg-gray-200 hover:cursor-pointer text-black text-sm font-normal me-2 px-2.5 py-0.5 rounded'}>Canais</span>
                </div>

                {/* Container para Planos */}
                <div>
                    {content === 1 ? (
                        <div className='pt-8'>
                            <div className='mb-2'>
                                <button type="button" onClick={() => { setShowModalPlan(true), getCity([]) }} className="flex items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1 text-center">
                                    <IoMdAdd className="mr-1" />
                                    Criar plano
                                </button>
                            </div>

                            {planList?.length > 0 ? (
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full mb-4">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                                    Nome
                                                </th>
                                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                                    Cidades vinculadas
                                                </th>
                                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {planList?.map((plan, index) => {
                                                return (
                                                    <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                            {plan.name}
                                                        </th>
                                                        <td className="px-6 py-4 bg-gray-50">
                                                            <div>
                                                                {plan?.TVPlanCities?.map((city: any, index: number) => {
                                                                    return (
                                                                        <div>
                                                                            <span className='text-xs'>{index + 1} - {city?.City?.name}</span>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 bg-gray-50">
                                                            {plan.isActive ? 'Ativo' : 'Inativo'}
                                                        </td>
                                                        <td className="px-6 py-4 flex justify-end">
                                                            <button onClick={() => { detailPlan(plan.id) }} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                                                <MdEdit />
                                                            </button>
                                                            <button onClick={() => { setModal(true), setTarget({ id: plan.id, type: 'plan', name: plan.name }) }} className="hover:text-white hover:bg-red-600 p-2 rounded-full">
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
                                            <span className='text-gray-500'>Nenhum plano cadastrado</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>

                {/* Container para Categorias */}
                <div>
                    {content === 2 ? (
                        <div className='pt-8'>
                            <div className='mb-2'>
                                <button type="button" onClick={() => { setShowModalCategory(true), getCity([]) }} className="flex items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1 text-center">
                                    <IoMdAdd className="mr-1" />
                                    Criar categoria
                                </button>
                            </div>

                            {categoryList?.length > 0 ? (
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full mb-4">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                                    Nome
                                                </th>
                                                <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {categoryList?.map((category, index) => {
                                                return (
                                                    <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                            {category.name}
                                                        </th>
                                                        <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                                            {category.isActive ? 'Ativo' : 'Inativo'}
                                                        </td>
                                                        <td className="px-6 py-4 flex justify-end">
                                                            <button onClick={() => { detailCategory(category.id) }} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                                                <MdEdit />
                                                            </button>
                                                            <button onClick={() => { setModal(true), setTarget({ id: category.id, type: 'category', name: category.name }) }} className="hover:text-white hover:bg-red-600 p-2 rounded-full">
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
                                            <span className='text-gray-500'>Nenhuma categoria cadastrada</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>

                {/* Container para Canais */}
                <div>
                    {content === 3 ? (
                        <div className='pt-8'>
                            <div className='mb-2'>
                                <button type="button" onClick={() => { setShowModalChannel(true), getCity([]) }} className="flex items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1 text-center">
                                    <IoMdAdd className="mr-1" />
                                    Criar canal
                                </button>
                            </div>

                            {channelList?.length > 0 ? (

                                <div className="relative overflow-x-auto sm:rounded-lg w-full mb-4">

                                    {channelList?.map((channel => {
                                        return (
                                            <div key={channel.id} className='mb-4 shadow-md'>
                                                <div className='p-4'>
                                                    <span className='text-sm font-medium'>Categoria: {channel.name} ({channel?.Channel?.length})</span>
                                                </div>

                                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                                                Nome
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                                                Imagem
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                                                Status
                                                            </th>
                                                            <th scope="col" className="px-6 py-3"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {channel?.Channel?.map((child: any) => {
                                                            return (
                                                                <tr key={child.id} className="border-b border-gray-200 dark:border-gray-700">
                                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                                        {child.name}
                                                                    </th>
                                                                    <th scope="row" className="p-1">
                                                                        <img src={child.image} alt="" className='max-w-20' />
                                                                    </th>
                                                                    <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                                                        {child.isActive ? 'Ativo' : 'Inativo'}
                                                                    </td>
                                                                    <td className="px-6 py-4 flex justify-end">
                                                                        <button onClick={() => { detailChannel(child.id) }} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                                                            <MdEdit />
                                                                        </button>
                                                                        <button onClick={() => { setModal(true), setTarget({ id: child.id, type: 'channel', name: child.name }) }} className="hover:text-white hover:bg-red-600 p-2 rounded-full">
                                                                            <BsFillTrash2Fill />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )
                                    }))}

                                </div>
                            ) : (
                                <div className='flex justify-center items-center h-[200px]'>
                                    {isLoading ? (
                                        <div>
                                            <LoadingAlares />
                                        </div>
                                    ) : (
                                        <div>
                                            <span className='text-gray-500'>Nenhum canal cadastrado</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>


            </div>
        </>
    )

}
