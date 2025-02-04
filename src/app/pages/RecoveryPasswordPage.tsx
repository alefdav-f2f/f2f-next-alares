'use client'
import React, { SyntheticEvent, useContext, useState } from "react";
import { useRouter } from 'next/navigation'

import Loading from "../components/loadings/Loading";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import LoadingAlares from "../components/loadings/LoadingAlares";
import axiosInterceptorInstance from "../api/axiosInterceptor";
import Logo from "../components/Logo/Logo";

interface props {
    hash: string
}

export default function RecoveryPasswordPage({ hash }: props) {

    const { register, handleSubmit } = useForm();
    const router = useRouter();
    const [isLoading, setLoading] = React.useState(true);
    const [isLoading2, setLoading2] = React.useState(false);
    const [isError, setError] = React.useState(false);
    const [userData, setData] = React.useState({ name: '', email: '' });

    async function validateHash() {

        const request = await axiosInterceptorInstance.get(`/users/validate-token-to-reset-password/${hash}`);

        if (request.status >= 400) {
            toast.error('Token inválido');
            router.push('/auth');
            return;
        }

        if (request.status >= 200) {
            const data = request.data;
            setData(data)
            setLoading(false);
        }
    }

    async function handlePassword(data: any) {

        const password = data.password;
        const confirm = data.confirm;

        if (password !== confirm) {
            setError(true);
            return;
        }

        setLoading2(true)

        try {
            const request: any = await axiosInterceptorInstance.put('/users/reset-password', {
                email: userData.email,
                password: password,
                token: hash
            })

            if (request.status === 200) {
                toast.success('Senha atualizado com sucesso!');
                router.push(`/auth?email=${userData.email}`);
            }
        }
        catch (error) {
            toast.error('Houve um erro inesperado');
            setLoading2(false)
            return;
        }

    }

    async function firstWord(word: string) {
        return word.replace(/ .*/, '');
    }

    React.useEffect(() => {
        validateHash();
    }, []);


    return (
        <>
            {isLoading ? <LoadingAlares /> : (
                <div className="w-[375px]">
                    <div className="mb-5 max-w-sm p-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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

                            <div className="mb-4 text-sm text-gray-600">
                                <div className="text-center">
                                    <span>{userData.email}</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="flex items-center mb-2 text-sm text-gray-900 dark:text-white">
                                    Senha</label>
                                <input type="password" id="password" disabled={isLoading2} {...register('password')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="confirm" className="flex items-center mb-2 text-sm text-gray-900 dark:text-white">
                                    Confirmar Senha
                                </label>
                                <input type="password" disabled={isLoading2} id="password" {...register('confirm')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                            </div>

                            <div className="text-center mb-4">
                                {isError ? <span className="text-red-600 text-sm">Senhas não coincidem</span> : null}
                            </div>

                            <div className="flex justify-center mb-1">
                                <button type="submit" disabled={isLoading2} className="text-white bg-main hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                                    {isLoading2 ? <div><Loading /></div> : 'Atualizar senha'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </>
    )
}