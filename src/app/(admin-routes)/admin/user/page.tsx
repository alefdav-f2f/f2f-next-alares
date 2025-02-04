'use client'
import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import LoadingAlares from "@/app/components/loadings/LoadingAlares";
import TitlePage from "@/app/components/TitlePage";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ImUsers } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { BsFillTrash2Fill } from "react-icons/bs";
import ModalConfirmation from "@/app/components/ModalConfirmation";
import { IoOpenOutline } from "react-icons/io5";
import ProfileService from "@/app/services/api/profile.service";

const User: React.FC = () => {
    const router = useRouter();
    const [list, setData] = React.useState<any[]>([])
    const [isLoading, setLoading] = useState(true);
    const [showModal, setModal] = useState(false);
    const [targetUser, setUser] = useState<any>({});

    async function deleteUser() {

        setLoading(true)

        const request = await axiosInterceptorInstance.delete(`users/delete/${targetUser.id}`);

        if (request.status > 400) {
            toast.error('Erro ao excluir usuário')
            setLoading(false)
            return
        }

        if (request.status >= 200) {
            toast.success('Usuário excluído com sucesso')
            setLoading(false)
            getData();
            return
        }
    }

    async function getData() {
        const request = await axiosInterceptorInstance.get('/users/get-all', {
            params: {
                page: 1,
                perPage: 99999
            }
        })
        const data = await request.data?.data;
        setData(data)
        setLoading(false)
    };

    React.useEffect(() => {
        getData();
    }, [])

    return (
        <>
            {showModal ?
                <ModalConfirmation text={`Deseja excluir ${targetUser?.name}?`} buttons={<>
                    <button onClick={() => setModal(false)} className="mr-2 p-2 rounded-md hover:bg-gray-100">Cancelar</button>
                    <button onClick={() => { deleteUser(), setModal(false); }} className="p-2 bg-confirm hover:bg-confirmHover text-white rounded-md">Confirmar</button>
                </>} fields={undefined} />
                : null}
            <div className="p-4 w-full">
                <div className="flex items-center mb-4">
                    <TitlePage icon={<ImUsers />} title="Usuários" />
                    <div>
                        <button type="button" onClick={() => { router.push('/admin/user/new') }} className="flex items-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-1 text-center">
                            <IoMdAdd className="mr-1" />
                            Criar usuário
                        </button>
                    </div>
                </div>

                {list.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full mb-4">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Nome
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        E-mail
                                    </th>
                                    <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                        Permissão
                                    </th>
                                    <th scope="col" className="px-6 py-3">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {list?.map((user, index) => {
                                    return (
                                        <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                                {user.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                                {user.profile_name}
                                            </td>
                                            <td className="py-4 flex justify-center">
                                                <button onClick={() => window.open('/admin/user/' + user.id, '_blank')} className="hover:text-white hover:bg-orange-500 p-2 rounded-full">
                                                    <IoOpenOutline />
                                                </button>
                                                <button onClick={() => router.push('/admin/user/' + user.id)} className="hover:text-white hover:bg-orange-500 p-2 rounded-full mr-2">
                                                    <MdEdit />
                                                </button>
                                                <button onClick={() => { setModal(true), setUser(user) }} className="hover:text-white hover:bg-red-600 p-2 rounded-full">
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
                                <span className='text-gray-500'>Nenhum usuário cadastrado</span>
                            </div>
                        )}
                    </div>
                )}

                {/*  <div className="px-4">
                <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <a rel="canonical" href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Anterior</a>
                        </li>
                        <li>
                            <a rel="canonical" href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                            <a rel="canonical" href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a rel="canonical" href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>
                        <li>
                            <a rel="canonical" href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                            <a rel="canonical" href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                        </li>
                        <li>
                            <a rel="canonical" href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Próximo</a>
                        </li>
                    </ul>
                </nav>
            </div> */}

            </div>
        </>
    )
}

export default User;