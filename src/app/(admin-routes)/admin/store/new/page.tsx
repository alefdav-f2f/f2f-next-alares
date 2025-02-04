'use client'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import Loading from '@/app/components/loadings/Loading';
import TitlePage from '@/app/components/TitlePage';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import { BiSolidStore } from 'react-icons/bi';
import { StoreProps } from '@/app/types/interface/store.interface';
import { CityProps } from '@/app/types/interface/state.interface';
import CityService from '@/app/services/api/city-service';

export default function StoreForm({ storeId }: any) {

    const [isEditing, setEditing] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const router = useRouter();
    const [cityList, setCity] = React.useState<CityProps[]>([])
    const [isReceiving, setReceive] = useState(true);

    async function getCity() {

        const params = {
            page: 1,
            perPage: 9999999,
            isActive: null
        }

        const response = await CityService.paginate(params);

        if (response) {
            const data = response.data?.data;
            setCity(data);
        }
    }

    async function storeStore(storeData: any) {

        if (storeData.cityId === "") {
            toast.error("Selecione a cidade")
            return
        }

        setLoading(true);

        let response: any;

        try {

            const data: StoreProps = {
                id: storeId,
                name: storeData?.name,
                longitude: storeData?.longitude,
                latitude: storeData?.latitude,
                address: storeData?.address,
                openingHours: storeData?.openingHours,
                cityId: storeData?.cityId,
                accessibility: storeData.accessibility === 'true' ? true : false,
                isActive: storeData.isActive === 'true' ? true : false,
                bus_station: storeData.bus_station === 'true' ? true : false,
                parking: storeData.parking === 'true' ? true : false,
                reference_point: storeData.reference_point,
            }

            if (isEditing) {
                response = await axiosInterceptorInstance.patch('/store/update', data)
            } else {
                response = await axiosInterceptorInstance.post('/store/create', data)
            }

            router.push('/admin/store')
            toast.success(`Loja ${isEditing ? 'atualizada' : 'cadastrada'} com sucesso`)

        } catch (error: any) {
            toast.error(error.response?.data?.message)
            setLoading(false);
        }
    }

    async function getStore(id: string) {

        setReceive(true);

        const request: any = await axiosInterceptorInstance.get(`/store/detail/${id}`)
        const response = request.data

        if (request.status > 400) {
            toast.error(response.message)
            setReceive(false);
            return
        }

        if (request.status === 200) {
            setValue('name', response?.name)
            setValue('longitude', response?.longitude)
            setValue('latitude', response?.latitude)
            setValue('address', response?.address)
            setValue('openingHours', response?.openingHours)
            setValue('cityId', response?.city?.id)
            setValue('isActive', String(response?.isActive))
            setValue('accessibility', String(response?.accessibility))
            setValue('bus_station', String(response?.bus_station))
            setValue('parking', String(response?.parking))
            setValue('reference_point', String(response?.reference_point))
            setReceive(false);
        }

    }

    React.useEffect(() => {
        getCity()

        if (storeId) {
            setEditing(true)
            getStore(storeId)
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
                        <TitlePage icon={<BiSolidStore />} title={isEditing ? 'Atualizar loja' : 'Nova loja'} />
                        <button onClick={() => router.push('/admin/store')} disabled={isLoading} className="text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                            Voltar
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(storeStore)}>

                        <div className="mb-6">
                            <div className='sm:w-96'>
                                <label htmlFor="name" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    Nome da loja</label>
                                <input type="text" id="name" disabled={isLoading} {...register('name')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                            </div>
                        </div>

                        <div className='sm:w-52 mb-6'>
                            <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                            <select id="status"  {...register('isActive')} disabled={isLoading} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option value="true">Ativo</option>
                                <option value="false">Inativo</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <div className='sm:w-96'>
                                <label htmlFor="latitude" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    Latitude</label>
                                <input type="text" id="latitude" disabled={isLoading} {...register('latitude')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" />
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className='sm:w-96'>
                                <label htmlFor="longitude" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    Longitude</label>
                                <input type="text" id="longitude" disabled={isLoading} {...register('longitude')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" />
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className='sm:w-[800px]'>
                                <label htmlFor="address" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    Endereço</label>
                                <input type="text" id="address" disabled={isLoading} {...register('address')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" />
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className='sm:w-[800px]'>
                                <label htmlFor="openingHours" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    Horário de funcionamento</label>
                                <input type="text" id="openingHours" disabled={isLoading} {...register('openingHours')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" />
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className='sm:w-96 mb-6'>
                                <label htmlFor="states" className="block mb-2 text-sm font-medium text-gray-900">Cidade</label>
                                <select id="states" disabled={isLoading} {...register('cityId')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                    <option value="">--Selecione a cidade--</option>
                                    {cityList?.map((city, index) => {
                                        return (
                                            <option key={index} value={city.id}>{city.name}</option>
                                        )
                                    })}
                                </select>
                            </div>

                            <div className="mb-6">
                                <div className='sm:w-96'>
                                    <label htmlFor="latitude" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                        Próximo ao ponto de ônibus?</label>
                                    <select id="status"  {...register('bus_station')} disabled={isLoading} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option value="true">Sim</option>
                                        <option value="false">Não</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className='sm:w-96'>
                                    <label htmlFor="latitude" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                        Estacionamento?</label>
                                    <select id="status"  {...register('parking')} disabled={isLoading} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option value="true">Sim</option>
                                        <option value="false">Não</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className='sm:w-96'>
                                    <label htmlFor="latitude" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                        Acessibilidade?</label>
                                    <select id="status"  {...register('accessibility')} disabled={isLoading} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option value="true">Sim</option>
                                        <option value="false">Não</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-6">
                            <div className='sm:w-[800px]'>
                                <label htmlFor="openingHours" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    Ponto de referência</label>
                                <input type="text" id="openingHours" disabled={isLoading} {...register('reference_point')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" />
                            </div>
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
