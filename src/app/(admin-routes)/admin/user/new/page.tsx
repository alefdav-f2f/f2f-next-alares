'use client'
import TitlePage from '@/app/components/TitlePage'
import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import Loading from '@/app/components/loadings/Loading';
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import ProfileService from '@/app/services/api/profile.service';

interface userProps {
  id: string
  name: string
  email: string
  profile: string
}

export function UserForm({ userId }: any) {

  const [isEditing, setEditing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isReceiving, setReceive] = useState(true);
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();
  const [profileList, setProfileList] = React.useState<any[]>([])


  async function sendUser(userData: any) {

    setLoading(true)

    const data: userProps = {
      id: userId,
      name: userData.name,
      email: userData.email,
      profile:  userData.profile,
    }

    let response: any;

    try {

      if (isEditing) {
        response = await axiosInterceptorInstance.patch('/users/update', data)
      } else {
        response = await axiosInterceptorInstance.post('/users/create', data)
      }

      if (response.status >= 200) {
        toast.success('Usuário ' + (isEditing ? 'atualizado' : 'criado') + ' com sucesso')
        router.push('/admin/user')
      }


    } catch (error: any) {

      if (error.response?.status >= 400) {
        toast.error(error.message)
      }

      setLoading(false)
    }
  }

  async function getUser(id: number) {

    setReceive(true);

    const request: any = await axiosInterceptorInstance.get(`/users/detail/${id}`)
    const response = request.data

    if (request.status > 400) {
      toast.error(response.message)
      setReceive(false);
      return
    }

    if (request.status === 200) {
      setValue('name', response?.name)
      setValue('email', response?.email)
      setValue('profile', response?.profile_id)
      setReceive(false);
    }

  }

  async function getProfile() {

    const request = await ProfileService.list();
    const data = await request.data?.data;
    setProfileList(data);

    if (userId) {
      setEditing(true)
      getUser(userId)
    } else {
      setReceive(false);
    }
  }

  React.useEffect(() => {
    getProfile();
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
            <TitlePage icon={<FaUser />} title={isEditing ? 'Atualizar usuário' : 'Novo usuário'} />
            <button onClick={() => router.push('/admin/user')} className="text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
              Voltar
            </button>
          </div>

          <form onSubmit={handleSubmit(sendUser)}>

            <div className="mb-6">
              <div className='sm:w-96'>
                <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                  Nome</label>
                <input type="text" id="user" disabled={isLoading} {...register('name')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
              </div>
            </div>

            <div className="mb-6">
              <div className='sm:w-96'>
                <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                  Endereço de e-mail</label>
                <input type="text" id="user" disabled={isLoading} {...register('email')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
              </div>
            </div>

            <div className="mb-6">
              <div className='sm:w-96'>
                <label className="block mb-2 text-sm font-medium text-gray-900">Perfil</label>
                <select {...register('profile')} disabled={isLoading} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option  value="">-- Selecione o perfil --</option>
                  {profileList?.map((profile: any, index) => {
                    return (
                      <option key={index} value={profile.id}>{ profile.name }</option>
                    )
                  })}
                </select>
              </div>
            </div>

            <div className='flex'>
              <button type="submit" className="text-white bg-main mr-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                {isLoading ? <Loading /> : (isEditing ? 'Atualizar usuário' : 'Criar usuário')}
              </button>
            </div>
          </form>
        </div>
      </>
    )
  }
}

export default UserForm;