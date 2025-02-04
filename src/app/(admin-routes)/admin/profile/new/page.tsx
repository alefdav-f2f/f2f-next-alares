'use client'
import Loading from '@/app/components/loadings/Loading';
import TitlePage from '@/app/components/TitlePage';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import { ImProfile } from 'react-icons/im';
import ProfileService from '@/app/services/api/profile.service';

export default function ProfileForm({ id }: any) {

    const [isEditing, setEditing] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const router = useRouter();
    const [isReceiving, setReceive] = useState(true);
    const [permissionList, setPermissionList] = useState<any[]>([]);

    async function store(formData: any) {

        setLoading(true);

        let response: any;

        const permissions = permissionList.filter(p => p.checked === true)

        try {
            const data: any = {
                name: formData?.name,
                permissions: permissions
            }

            if (isEditing) {
                data.id = id
                response = await ProfileService.update(data);
            } else {
                response = await ProfileService.create(data);
            }

            router.push('/admin/profile')
            toast.success('Perfil ' + (isEditing ? 'atualizado' : 'criado') + ' com sucesso')


        } catch (error: any) {
            toast.error(error.response?.data?.message)
            setLoading(false);
        }
    }

    async function get(id: string) {

        setReceive(true);

        const request: any = await ProfileService.detail(id)
        const response = request.data

        if (request.status > 400) {
            toast.error(response.message)
            setReceive(false);
            return
        }

        if (request.status === 200) {
            setValue('name', response?.name);

            setTimeout(() => {
                const hasPermission = response?.ProfilePermission;
                const array: any = response?.permissions;
                hasPermission?.map((perm: any) => {
                    const find = array.map((a: any) => {
                        if (String(perm.permission) === String(a.value)) {
                            a.checked = true
                        }
                    });
                })

                setPermissionList(array);

                setReceive(false);
            }, 1000)
        }

    }

    function selectPermission(checked: boolean, index: number) {

        const array = [...permissionList];
        array[index].checked = checked;
        setPermissionList(array);
    }

    async function getPermissions() {

        const request = await ProfileService.getPermission();
        if (request.status > 400) {
            toast.error(request.message)
            setReceive(false);
            return
        }

        if (request.status === 200) {
            const response = request.data;
            setPermissionList(response)

            if (id) {
                setEditing(true)
                get(id)
            } else {
                setReceive(false);
            }
        }
    }

    React.useEffect(() => {
        getPermissions();
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
                        <TitlePage icon={<ImProfile />} title={isEditing ? 'Atualizar perfil' : 'Novo perfil'} />
                        <button onClick={() => router.push('/admin/profile')} disabled={isLoading} className="text-black bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                            Voltar
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(store)}>

                        <div className='flex'>
                            <div className="mb-6 mr-4">
                                <div className='sm:w-96'>
                                    <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                        Nome do perfil</label>
                                    <input type="text" id="user" disabled={isLoading} {...register('name')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                </div>
                            </div>
                        </div>

                        <div className='mb-8'>
                            <div>
                                <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 font-medium">
                                    Permissões</label>
                            </div>

                            <div>
                                {permissionList?.map((p: any, index) => {
                                    return (
                                        <div>
                                            <label key={p.value} className="inline-flex items-center cursor-pointer">
                                                <input type="checkbox" checked={p.checked} onChange={(e) => selectPermission(e.target.checked, index)} className="sr-only peer" />
                                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                <span className="ms-3 text-sm font-medium text-gray-900">{p.label}</span>
                                            </label>
                                        </div>
                                    )
                                })}
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
