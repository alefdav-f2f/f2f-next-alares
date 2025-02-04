'use client'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import Loading from '@/app/components/loadings/Loading';
import TitlePage from '@/app/components/TitlePage';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaCity } from 'react-icons/fa';
import toast from 'react-hot-toast';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import { StateProps } from '@/app/types/interface/state.interface';

export default function CityForm({ cityId }: any) {

  const [isEditing, setEditing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();
  const [stateList, setState] = React.useState<StateProps[]>([])
  const [isReceiving, setReceive] = useState(true);

  async function getStates() {

    const request = await axiosInterceptorInstance.get('/uf/paginate', {
      params: {
        isActive: null,
        page: 1,
        perPage: 99999
      }
    })

    if (request.status === 200) {
      const data = request.data?.data;
      setState(data)
      return
    }
  }

  async function storeCity(cityData: any) {

    if (cityData.ufId === "") {
      toast.error("Selecione o estado")
      return
    }

    setLoading(true);

    let response: any;

    try {

      const data = {
        id: cityId,
        name: cityData?.name,
        externalCode: cityData?.externalCode,
        isActive: cityData?.isActive === 'true' ? true : false,
        onTop: cityData?.onTop  === 'true' ? true : false,
        ufId: cityData?.ufId,
        wordpress_id: cityData?.wordpress_id
      }

      if (isEditing) {
        response = await axiosInterceptorInstance.patch('/city/update', data)
      } else {
        response = await axiosInterceptorInstance.post('/city/create', data)
      }

      router.push('/admin/city')
      toast.success('Cidade ' + (isEditing ? 'atualizado' : 'criado') + ' com sucesso')


    } catch (error: any) {
      toast.error(error.response?.data?.message)
      setLoading(false);
    }
  }

  async function getCity(id: string) {

    setReceive(true);

    const request: any = await axiosInterceptorInstance.get(`/city/detail/${id}`)
    const response = request.data

    if (request.status > 400) {
      toast.error(response.message)
      setReceive(false);
      return
    }

    if (request.status === 200) {
      setValue('name', response?.name)
      setValue('externalCode', response?.externalCode)
      setValue('isActive', response?.isActive === true ? 'true' : 'false')
      setValue('onTop', response?.onTop  === true ? 'true' : 'false')
      setValue('ufId', response.uf_id)
      setValue('wordpress_id', response.wordpress_id)
      setReceive(false);
    }

  }

  React.useEffect(() => {

    getStates()

    if (cityId) {
      setEditing(true)
      getCity(cityId)
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
            <TitlePage icon={<FaCity />} title={isEditing ? 'Atualizar cidade' : 'Nova cidade'} />
            <button onClick={() => router.push('/admin/city')} disabled={isLoading} className="text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
              Voltar
            </button>
          </div>

          <form onSubmit={handleSubmit(storeCity)}>

            <div className='flex'>
              <div className="mb-6 mr-4">
                <div className='sm:w-96'>
                  <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                    Nome da cidade</label>
                  <input type="text" id="user" disabled={isLoading} {...register('name')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                </div>
              </div>

              <div className='sm:w-52'>
                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                <select id="status"  {...register('isActive')} disabled={isLoading} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </select>
              </div>
            </div>

            <div className='sm:w-52 mb-4'>
              <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Posicionar no topo da lista</label>
              <select id="status"  {...register('onTop')} disabled={isLoading} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </div>

            <div className="mb-6">
              <div className='sm:w-96'>
                <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                  Código da cidade</label>
                <input type="text" id="user" disabled={isLoading} {...register('externalCode')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" />
              </div>
            </div>

            <div className="mb-6">
              <div className='sm:w-96'>
                <label className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                  Código Wordpress</label>
                <input type="text" id="user" disabled={isLoading} {...register('wordpress_id')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" />
              </div>
            </div>

            <div className="mb-6">
              <div className='sm:w-96'>
                <label htmlFor="states" className="block mb-2 text-sm font-medium text-gray-900">Estado</label>
                <select id="states" {...register('ufId')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option value="">--Selecione o estado--</option>
                  {stateList?.map((state, index) => {
                    return (
                      <option key={index} value={state.id}>{state.name}</option>
                    )
                  })}
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
