"use client"
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import Loading from '@/app/components/loadings/Loading';
import { getCookie } from 'cookies-next';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { MdDoneOutline } from "react-icons/md";
import done from '@/img/icon/done.png';
import caution from '@/img/icon/caution.webp';

import Image from 'next/image';
import { externalURL } from '@/app/api/externalURL';
import { InputMask } from '@react-input/mask';
import toast from 'react-hot-toast';
import RegexService from '@/app/services/validations/regex.service';
import EcommerceService from '@/app/services/api/ecommerce.service';
import DataLayerService from '@/app/services/api/datalayer.service';


export default function ContrateJa() {

    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState(1);
    const { register, handleSubmit, setValue } = useForm();
    const router = useRouter();
    const searchParams = useSearchParams();

    function sendDataLayer() {
        const data = {
            event: 'enviar_formulario',
            city: String(getCookie('city_name')),
            state: String(getCookie('uf_name')),
            local_formulario: "contrate-agora"
        }

        console.log(data)
        DataLayerService.sender(data)
    }


    async function navigate(path: string, external: boolean) {

        const current = new URLSearchParams(Array.from(searchParams.entries()));

        if (external) {
            window.open(path, '_blank')
        } else {
            router.push(`${path}/?${current}`)
        }
    }

    async function openChannel(text: string) {

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        console.log('is mobile =' + isMobile)
        const whatsappLink = isMobile
            ? externalURL.whatsappMobile // Para dispositivos móveis
            : externalURL.whatsappDesktop // Para navegadores de desktop

        window.open(whatsappLink + '&text=' + encodeURIComponent(text), '_blank');
        navigate('/home', false)
    }

    //Envia informações de lead pra RD Station
    async function sendLead(form: any) {

        if (await RegexService.singleWord(form.name)) {
            toast.error('Insira um nome válido')
            return
        }

        if (await RegexService.countNumbers(form.phone) < 10) {
            toast.error('Insira um número de telefone válido');
            return
        }

        setIsLoading(true)

        const data = {
            name: form.name,
            city: String(getCookie('city_name')),
            email: form.email,
            phone: form.phone,
            i_am_client: form.customer,
            url: String(window.location.href),
            source: searchParams.get('utm_source'),
            medium: searchParams.get('utm_medium'),
            campaign: searchParams.get('utm_campaign'),
            value: '',
            page_title: String(document.title),
            identification: ''
        }

        const response = await EcommerceService.postRDStation(data);

        if (response) {
            const data = response.data;

            if (data.status === true) {
                setContent(2)
                setIsLoading(false);
                sendDataLayer();
            }
        } else {
            setContent(3)
            setIsLoading(false)
            return
        }
    }

    function form() {
        return (
            <form onSubmit={handleSubmit(sendLead)} className='mb-10 p-2'>

                <div className='text-center p-8'>
                    <span className='text-main text-3xl'>Contrate agora</span>
                </div>

                <div className='flex justify-center px-2 mb-4'>
                    <div className='sm:w-[800px] w-full'>
                        <label htmlFor="name" className="flex items-center mb-2 text-main text-base">
                            Seu nome*</label>
                        <input type="text" id="user" disabled={isLoading} {...register('name')} className="bg-gray-50 border border-sub text-gray-900 text-sm rounded-3xl focus:ring-blue-500 block w-full p-2.5" placeholder="" required />
                    </div>
                </div>

                <div className='flex justify-center px-2 mb-4'>
                    <div className='sm:w-[800px] w-full'>
                        <label htmlFor="email" className="flex items-center mb-2 text-main text-base">
                            Seu celular (com DDD)*</label>
                        <InputMask mask='(__) _____-____)' replacement={{ _: /\d/ }} min={11} type="text" id="user" disabled={isLoading} {...register('phone')} className="bg-gray-50 border border-sub text-gray-900 text-sm rounded-3xl focus:ring-blue-500 block w-full p-2.5" placeholder="" required />
                    </div>
                </div>

                <div className='flex justify-center px-2 mb-4'>
                    <div className='sm:w-[800px] w-full'>
                        <label htmlFor="email" className="flex items-center mb-2 text-main text-base">
                            Seu e-mail*</label>
                        <input type="email" id="user" disabled={isLoading} {...register('email')} className="bg-gray-50 border border-sub text-gray-900 text-sm rounded-3xl focus:ring-blue-500 block w-full p-2.5" placeholder="" required />
                    </div>
                </div>

                <div className='flex justify-center px-2 mb-4'>
                    <div className='sm:w-[800px] w-full'>
                        <label htmlFor="customer" className="flex items-center mb-2 text-main text-base">
                            Você já é cliente?*</label>
                        <select disabled={isLoading} {...register('customer')} className="bg-gray-50 border border-sub text-gray-900 text-sm rounded-3xl focus:ring-blue-500 block w-full p-2.5" required>
                            <option value="Quero ser cliente">Quero ser cliente</option>
                            <option value="Já sou cliente">Já sou cliente</option>
                        </select>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <div className='text-center mb-4 sm:w-[600px]'>
                        <span className='text-main text-xs'>*Nos comprometemos em não utilizar seus dados para SPAM. Você receberá o contato de um consultor Alares, assim como comunicações e novidades exclusivas da marca.</span>
                    </div>
                </div>

                <div className='flex justify-center mb-8'>
                    <button className="bg-main hover:bg-hover text-white py-2 px-4 rounded-full">
                        {isLoading ? <div className='pt-1'><Loading></Loading></div> : 'Receber contato'}
                    </button>
                </div>

                <div className='text-center'>
                    <span onClick={() => { navigate('home', false) }} className='hover:text-sub hover:cursor-pointer hover:underline text-main'>{`< Voltar`}</span>
                </div>
            </form>
        )
    }

    function successContent() {
        return (
            <div className='w-full min-h-[500px] flex justify-center items-center p-4'>
                <div className='flex flex-col items-center'>
                    <Image src={done} alt={''} className='w-52 mb-8' />
                    <div className='text-center'>
                        <span className='font-bold'>Recebemos o seu contato! Entraremos em contato o mais rápido possível.</span>
                    </div>
                    <br />
                    <button onClick={() => { navigate('/home', false) }} className='px-8 py-2 rounded-full bg-main text-white hover:bg-hover'>
                        Voltar no início
                    </button>
                </div>
            </div>
        )
    }

    function errorContent() {
        return (
            <div className='w-full min-h-[500px] flex justify-center items-center'>
                <div className='flex flex-col items-center'>
                    <Image src={caution} alt={''} className='w-52 mb-8' />
                    <span className='font-bold'>Desculpe! Houve um erro inesperado. Clique no botão abaixo para entrar em contato.</span>
                    <br />
                    <button onClick={() => { openChannel('Olá!+Quero+assinar.') }} className='px-8 py-2 rounded-full bg-main text-white hover:bg-hover'>
                        Entrar em contato
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div>
            {content === 1 ? form() : null}
            {content === 2 ? successContent() : null}
            {content === 3 ? errorContent() : null}
        </div>
    )
}
