'use client'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import Loading from '@/app/components/loadings/Loading';
import TitlePage from '@/app/components/TitlePage';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import { PiFlagBannerFill } from 'react-icons/pi';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { format } from 'path';
import { getHours } from 'date-fns';

export default function BannerForm({ bannerId }: any) {

    const [isEditing, setEditing] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [typeList, setTypeList] = useState<any[]>([]);
    const [redirectionTypeList, setRedirectionTypeList] = useState<any[]>([]);
    const [selectedRedirectType, setSelectedRedirectType] = useState(0);
    const [cityList, setCityList] = useState<any[]>([]);
    const [isAll, setIsAll] = useState(false);
    const [hasUpdate, setHasUpdate] = useState(false);
    const [content, setContent] = useState('config');
    const { register, handleSubmit, setValue, getValues } = useForm();
    const router = useRouter();
    const [isReceiving, setReceive] = useState(true);
    const [redirectPath, setRedirectPath] = useState('');

    const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(null);
    const [selectedFileMobile, setSelectedFileMobile] = useState<string | ArrayBuffer | null>(null);
    const [changed, setChanged] = useState(false);

    const [file, setFile] = useState('');
    const [fileMobile, setFileMobile] = useState('');
    const [changedMobile, setChangedMobile] = useState(false);


    async function storeBanner(bannerData: any) {

        setLoading(true);

        let response: any;

        const formData = new FormData()

        try {

            formData.append('name', bannerData?.name);
            formData.append('isActive', bannerData?.isActive);
            formData.append('image', file);
            formData.append('imageMobile', fileMobile);
            formData.append('type', bannerData?.type);
            formData.append('path', bannerData?.path);
            formData.append('redirection_type', bannerData?.redirection_type);
            formData.append('position', bannerData?.position);
            formData.append('beginningOfTerm', new Date(bannerData?.beginningOfTerm).toISOString());
            formData.append('endOfTerm', new Date(bannerData?.endOfTerm).toISOString());
            formData.append('isAll', String(isEditing ? isAll : 'true'));
            formData.append('changed', String(changed));
            formData.append('changedMobile', String(changedMobile));

            if (isEditing) {
                formData.append('id', bannerId);
                response = await axiosInterceptorInstance.patch('/banner/update', formData)
            } else {
                response = await axiosInterceptorInstance.post('/banner/create', formData)
            }

            router.push('/admin/banner')
            toast.success('Banner ' + (isEditing ? 'atualizado' : 'criado') + ' com sucesso')


        } catch (error: any) {
            toast.error(error.response?.data?.message)
            setLoading(false);
        }
    }

    async function getTypes() {

        const request = await axiosInterceptorInstance.get('/banner/type');

        const data = request.data;

        if(request) {
            if (bannerId) {
                setEditing(true)
                getBanner(bannerId)
            } else {
                getCities();
                setReceive(false);
            }
        }

        setTypeList(data?.types);
        setRedirectionTypeList(data?.redirection_types);
    }

    async function getBanner(id: string) {

        setReceive(true);

        const request: any = await axiosInterceptorInstance.get(`/banner/detail/${id}`)
        const data = request.data

        if (request.status > 400) {
            toast.error(data.message)
            setReceive(false);
            return
        }
        setSelectedFile
        if (request.status === 200) {
            setValue('name', data?.name);
            setSelectedFile(data?.image)
            setSelectedFileMobile(data?.imageMobile)
            setValue('isActive', String(data?.isActive));
            setValue('path', data?.path);
            setValue('redirection_type', data?.redirection_type);
            setSelectedRedirectType(data?.redirection_type);
            setValue('position', data?.position);
            setValue('beginningOfTerm', revertDateTime(data?.beginningOfTerm));
            setValue('endOfTerm', revertDateTime(data?.endOfTerm));
            setValue('type', data?.type);
            setIsAll(data?.isAll)
            getCities();
            setReceive(false);
        }

    }

    function revertDateTime(dateISO: string) {

        const isoDate = new Date(dateISO);
        const hour = getHours(isoDate);
        isoDate.setHours(hour - 3);
        const final = isoDate.toISOString().replace(':00.000Z', '');
        return String(final);
    }

    async function changeContent(content: string) {

        if (isEditing) {
            setContent(content);
        }
    }

    async function getCities() {

        const request: any = await axiosInterceptorInstance.get(`/city/get-all`, {
            params: {
                isActive: null,
                page: 1,
                perPage: 99999,
                search: null,
                order: 'asc'
            }
        })

        const data = request.data?.data;
        data.map((d: any) => d.checked = false)

        if (bannerId) {
            const request2: any = await axiosInterceptorInstance.get(`/banner/get-all-cities-by-banner/${bannerId}`);
            const selected = request2?.data?.cities;

            data?.map((c: any) => {
                selected.map((s: any) => {
                    if (c.id === s.id) {
                        c.checked = true;
                    }
                })
            })


        }
        setCityList(data);
    }

    async function selectCity(checked: boolean, index: number) {

        const array = [...cityList];
        array[index].checked = checked;
        setHasUpdate(true);
        setCityList(array);
    }

    async function replicateBannerInCities() {

        const selectedCities = cityList.filter(c => c.checked === true);
        let array: any[] = [];
        if (isAll) {
            array = [];
        } else {
            selectedCities?.map(s => array.push(s.id))
        }

        const request: any = await axiosInterceptorInstance.post(`/banner/replicate-banner-in-cities`, {
            cityId: array,
            banners: [
                {
                    id: bannerId,
                    order: 1
                }
            ]
        })

        if (request.status >= 200) {
            toast.success('Cidades habilitadas com sucesso');
            setHasUpdate(false)
        }
    }

    function handleImageUpload(event: any) {
        const input = event.target;
        const file = input.files[0];
        const reader = new FileReader();

        setChanged(true);
        setFile(file);

        reader.onload = () => {
            setSelectedFile(reader.result);
        };

        reader.readAsDataURL(file);
    }

    function handleImageUploadMobile(event: any) {
        const input = event.target;
        const file = input.files[0];
        const reader = new FileReader();

        setChangedMobile(true);
        setFileMobile(file);
         
        reader.onload = () => {
            setSelectedFileMobile(reader.result);
        };

        reader.readAsDataURL(file);
    }

    React.useEffect(() => {

        getTypes();
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
                        <TitlePage icon={<PiFlagBannerFill />} title={isEditing ? 'Atualizar banner' : 'Novo banner'} />
                        <button onClick={() => router.push('/admin/banner')} disabled={isLoading} className="text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                            Voltar
                        </button>
                    </div>

                    <div className='mb-8'>
                        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
                            <li className="me-2">
                                <a rel="canonical" onClick={() => changeContent('config')} aria-current="page" className={`inline-block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-t-lg hover:cursor-pointer ${content === 'config' ? 'bg-gray-100' : ''}`}>Configurações</a>
                            </li>
                            {isEditing ? (
                                <li className="me-2">
                                    <a rel="canonical" onClick={() => changeContent('cities')} className={`inline-block px-4 py-2 text-blue-600 hover:bg-gray-100 rounded-t-lg hover:cursor-pointer ${content === 'cities' ? 'bg-gray-100' : ''}`}>Cidades</a>
                                </li>
                            ) : null}
                        </ul>
                    </div>

                    {content === 'config' ? (
                        <div>
                            <form onSubmit={handleSubmit(storeBanner)}>

                                <div className="mb-8 flex flex-wrap">
                                    <div className='sm:w-96 mr-2'>
                                        <label className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                            Nome do banner</label>
                                        <input type="text" id="user" disabled={isLoading} {...register('name')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                    </div>

                                    <div className='sm:w-52'>
                                        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                                        <select id="status"  {...register('isActive')} disabled={isLoading} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                            <option value="true">Ativo</option>
                                            <option value="false">Inativo</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='sm:w-96 mr-2 mb-4'>
                                    <label className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                        Posição de prioridade</label>
                                    <input type="number" maxLength={3} minLength={1} disabled={isLoading} {...register('position')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                    <small>Máximo 3 dígitos</small>
                                </div>

                                <div className='mb-6'>
                                    <div className='sm:w-52'>
                                        <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Destino do banner (página)</label>
                                        <select id="status"  {...register('type')} disabled={isLoading} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
                                            <option value="">-- Selecione o destino --</option>
                                            {typeList?.map((type, index) => {
                                                return (
                                                    <option value={type.value}>{type.label}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className='mb-6'>
                                    <div>
                                        <label className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                            Vigência do banner</label>
                                    </div>
                                    <div className='flex flex-wrap items-center'>
                                        <div className='sm:w-52'>
                                            <label className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                                Início</label>
                                            <input type="datetime-local" id="user" disabled={isLoading} {...register('beginningOfTerm')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                        </div>

                                        <div className='hidden sm:flex m-4 pt-4'>
                                            <FaLongArrowAltRight />
                                        </div>

                                        <div className='sm:w-52'>
                                            <label className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                                Final</label>
                                            <input type="datetime-local" id="user" disabled={isLoading} {...register('endOfTerm')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className='mb-6 flex'>
                                        <div className='sm:w-52 mr-2'>
                                            <label className="block mb-2 text-sm font-medium text-gray-900">Tipo de redirecionamento</label>
                                            <select  {...register('redirection_type')} disabled={isLoading} onChange={(e: any) => { setSelectedRedirectType(Number(e.target.value)), console.log(e.target.value) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                                {redirectionTypeList?.map((type, index) => {
                                                    return (
                                                        <option value={type.value}>{type.label}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>

                                        <div className='sm:w-full'>
                                            <label className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                                {selectedRedirectType === 1 ? 'URL de redirecionamento' : null}
                                                {selectedRedirectType === 2 ? 'Redirecionamento' : null}
                                                {selectedRedirectType === 3 ? 'ID externo do plano' : null}
                                            </label>
                                            <input type="text" id="user" disabled={isLoading} {...register('path')} onKeyUp={() => setRedirectPath(getValues('path'))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                            <div>
                                                <div>
                                                    {selectedRedirectType === 1 ? <span className='text-xs'>Ex: https://www.google.com</span> : null}
                                                    {selectedRedirectType === 2 ? <span className='text-xs'>Ex: /indo-alem/conteudo</span> : null}
                                                    {selectedRedirectType === 3 ? <span className='text-xs'>Ex: 1234 </span> : null}
                                                </div>

                                                <div>
                                                    {selectedRedirectType === 1 ? <span className='text-xs'>Redirecionamento para: {redirectPath}</span> : null}
                                                    {selectedRedirectType === 2 ? <span className='text-xs'>Redirecionamento para: {process.env.NEXT_PUBLIC_BASE_URL}{redirectPath}</span> : null}
                                                    {selectedRedirectType === 3 ? <span className='text-xs'>Redirecionamento para: {process.env.NEXT_PUBLIC_BASE_URL}/contrate-ja?city=city_slug&plano={redirectPath} </span> : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='mb-6'>

                                    <label className="block mb-1 text-sm font-medium">Imagem desktop</label>
                                    <input onChange={handleImageUpload} className="block w-full text-sm text-gray-900 border mb-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="file_input" type="file" />

                                    <div className='mb-1'>
                                        <img src={selectedFile as string} alt="" className='max-h-52' />
                                    </div>
                                </div>

                                <div className='mb-4'>

                                    <label className="block mb-1 text-sm font-medium">Imagem mobile</label>
                                    <input onChange={handleImageUploadMobile} className="block w-full text-sm text-gray-900 border mb-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="file_input" type="file" />

                                    <div className='mb-1'>
                                        <img src={selectedFileMobile as string} alt="" className='max-h-52' />
                                    </div>
                                </div>

                                <div className='flex'>
                                    <button type="submit" className="text-white bg-main mr-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5">
                                        {isLoading ? <Loading /> : (isEditing ? 'Atualizar' : 'Criar')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : null}

                    {content === 'cities' ? (
                        <div>
                            <div className='mb-4'>
                                <div className='flex items-center justify-between'>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={isAll} onChange={(e) => (setIsAll(e.target.checked), setHasUpdate(true))} className="sr-only peer" />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-sm font-medium text-gray-900">Habilitar para todas as cidades</span>
                                    </label>
                                    <div>
                                        <button onClick={() => { replicateBannerInCities() }} disabled={!hasUpdate} className={`mr-4 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-2.5 ${hasUpdate ? 'text-white bg-main  hover:bg-blue-800' : 'text-gray-400 bg-gray-100  hover:bg-gray-200'}`}>
                                            Salvar
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {isAll ? (
                                null
                            ) : (
                                <div className='pl-1'>
                                    {cityList?.map((city, index) => {
                                        return (
                                            <div key={city.id}>
                                                <div className='flex items-center'>
                                                    <div>
                                                        <label className="inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" checked={city.checked} onChange={(e) => selectCity(e.target.checked, index)} className="sr-only peer" />
                                                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                            <span className="ms-3 text-sm font-medium text-gray-900">{city.name}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>
            </>
        )
    }
}
