'use client'
import React from "react";
import { useRouter } from 'next/navigation'

import Loading from "../components/loadings/Loading";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import axiosInterceptorInstance from "../api/axiosInterceptor";
import Logo from "../components/Logo/Logo";


export default function ForgetLoginPage() {

    const { register, handleSubmit } = useForm();
    const router = useRouter();
    const [isLoading, setLoading] = React.useState(false);
    const [isSended, setSended] = React.useState(false);
    const [isError, setError] = React.useState(false);
    const [userData, setData] = React.useState({ name: '', email: '' });


    async function handlePassword(data: any) {

        const email = data.email;

        setLoading(true)

        try {

            const request: any = await axiosInterceptorInstance.get(`/users/send-email-to-reset-password/${email}`)

            if (request.status === 200) {
                setSended(true)
            }

        }
        catch (error) {
            toast.error('E-mail inválido ou inexistente');
            setLoading(false)
            return;
        }

    }


    return (
        <>
            <div className="w-[375px]">
                <div className="mb-5 max-w-sm p-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                    {isSended ? (
                        <>
                            <div>
                                <div className="text-center text-sm mb-4">
                                    <span>Um e-mail para recuperação de senha foi enviado!</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-center pl-5 mb-4">
                                <div className="mb-4">
                                    <div className="mb-[-17px]">
                                        <span className="text-main font-medium text-xl">Painel</span>
                                    </div>
                                    <Logo color="purple" className="w-40" />
                                </div>
                            </div>

                            <div>
                                <div className="text-center mb-2">
                                    <span>Recuperação de senha</span>
                                </div>
                            </div>

                            <form action="" className="mb-4" onSubmit={handleSubmit(handlePassword)}>

                                <div className="mb-4">
                                    <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 dark:text-white">
                                        E-mail</label>
                                    <input type="text" id="user" disabled={isLoading} {...register('email')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                </div>

                                <div className="flex justify-center mb-1">
                                    <button type="submit" disabled={isLoading} className="text-white bg-main hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                        {isLoading ? <div><Loading /></div> : 'Enviar'}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}