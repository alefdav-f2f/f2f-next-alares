'use client'
import React, { SyntheticEvent, useContext, useState } from "react";
import { useRouter } from 'next/navigation'

import { FaArrowRightLong } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import Loading from "../components/loadings/Loading";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import Logo from "../components/Logo/Logo";
import { login } from "../services/auth-service";


const AdminLogin: React.FC = () => {

    const { register, handleSubmit } = useForm();
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);

    async function handleLogin(form: any) {

        setLoading(true)

        const request: any = await login(form)
        console.log(request)
        if(request) {
            router.replace('/admin');
        } else {
            setLoading(false)
        }

        
        /* const result: any = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })
        differenceInSeconds
        if (result?.error) {
            toast.error(result?.error)
            setLoading(false)
            return
        } */

    }

    return (
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
                <form action="" className="mb-4" onSubmit={handleSubmit(handleLogin)}>
                    <div className="mb-4">
                        <label htmlFor="user" className="flex items-center mb-2 text-sm text-gray-900 dark:text-white">
                            <FaUser className="mr-1 text-gray-500" />
                            Endereço de e-mail</label>
                        <input type="email" id="user" disabled={isLoading} {...register('email')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="flex items-center mb-2 text-sm text-gray-900 dark:text-white">
                            <RiLockPasswordFill className="mr-1 text-gray-500" />
                            Senha
                        </label>
                        <input type="password" disabled={isLoading} id="password" {...register('password')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                    </div>

                    {/* <div className="mb-6">
                        <div className="flex items-center">
                            <input id="remenber" disabled={isLoading} type="checkbox" value="" className="w-4 h-4 text-main bg-gray-100 border-gray-300 rounded focus:ring-2" />
                            <label htmlFor="default-checkbox" className="ms-2 text-sm  text-gray-900">Lembrar meu acesso</label>
                        </div>
                    </div> */}

                    <div className="flex justify-center mb-1">
                        <button type="submit" disabled={isLoading} className="text-white bg-main hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5">
                            {isLoading ? <div><Loading /></div> : 'Entrar'}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <a rel="canonical" href="/forget-password">
                    <span className="text-xs hover:text-main hover:cursor-pointer hover:underline">Esqueci minha senha</span>
                    </a>
                </div>
            </div>

            <div className="flex justify-center">
                <button type="button" onClick={() => router.push('/')} className="flex justify-center items-center pr-4 hover:bg-hover p-2 rounded-lg text-white hover:text-white">
                    <FaArrowRightLong className="mr-2" />
                    <span className="font-medium">Voltar para Alares Internet</span>
                </button>
            </div>
        </div>
    )
}

export default AdminLogin;