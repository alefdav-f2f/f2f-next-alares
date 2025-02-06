'use client'
import React from 'react'
import logo from '@/img/logo-white.png'
import Image from 'next/image'
import { externalURL } from '../api/externalURL'
import { internalPATH } from '../api/internalPATH'

import { useRouter, useSearchParams } from 'next/navigation'
import axiosInterceptorInstance from '../api/axiosInterceptor'

export default function Footer() {
    const searchParams = useSearchParams();
    const [socialList, setSocialList] = React.useState<any[]>([]);


    function getParams() {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        return `?${params}`;
    }

    async function getSocialMedia() {

        const request: any = await axiosInterceptorInstance.get(`company/get-all-social-media`);

        if (request.status >= 200) {
            const data = request.data;
            setSocialList(data)
        }
    }

    React.useEffect(() => {
        getSocialMedia()
    }, [])

    return (
        <div className='min-h-[350px] bg-main pt-6 border-t-4 border-sub flex-row justify-between'>
            <div className='flex justify-center mb-10'>
                <Image
                    alt="Logo Alares Internet"
                    src={logo}
                    className="w-32" />
            </div>

            <div className='flex justify-center mb-8'>
                <div className='sm:w-[1000px] flex justify-center flex-wrap'>
                    <div className='flex mr-2'>
                        <div className='mr-2'>
                            <a rel="canonical" href={externalURL.ethic} target="_blank" className='text-sub hover:underline hover:cursor-pointer'>Central de ética</a>
                        </div>
                        <div className='h-5 bg-white w-[1px]'></div>
                    </div>

                    <div className='flex mr-2'>
                        <div className='mr-2'>
                            <a rel="canonical" href={externalURL.investor_relation} target="_blank" className='text-sub hover:underline hover:cursor-pointer'>Relação com investidores</a>
                        </div>
                        <div className='h-5 bg-white w-[1px]'></div>
                    </div>

                    <div className='flex mr-2'>
                        <div className='mr-2'>
                            <a rel="canonical" href='/alares-na-imprensa' className='text-sub hover:underline hover:cursor-pointer'>Sala de Imprensa</a>
                        </div>
                        <div className='h-5 bg-white w-[1px]'></div>
                    </div>

                    <div className='flex mr-2'>
                        <div className='mr-2'>
                            <a rel="canonical" href={`${internalPATH.politica_de_privacidade_e_cookies}${getParams()}`} className='text-sub hover:underline hover:cursor-pointer'>Política de Privacidade e Cookies</a>
                        </div>
                        <div className='h-5 bg-white w-[1px]'></div>
                    </div>

                    <div className='flex mr-2'>
                        <div className='mr-2'>
                            <a rel="canonical" href={`${internalPATH.contratos_e_regulamentos}${getParams()}`} className='text-sub hover:underline hover:cursor-pointer'>Contratos e regulamentos</a>
                        </div>
                        <div className='h-5 bg-white w-[1px]'></div>
                    </div>

                    <div className='flex mr-2'>
                        <div className='mr-2'>
                            <a rel="canonical" href={externalURL.negociation} target="_blank" className='text-sub hover:underline hover:cursor-pointer'>Portal de Negociação</a>
                        </div>
                        <div className='h-5 bg-white w-[1px]'></div>
                    </div>

                    <div className='flex mr-2'>
                        <div className='mr-2'>
                            <a rel="canonical" href={`${internalPATH.lojas}${getParams()}`} className='text-sub hover:underline hover:cursor-pointer'>Encontre uma loja</a>
                        </div>
                        <div className='h-5 bg-white w-[1px]'></div>
                    </div>
                </div>
            </div>

            <div className='flex justify-center mb-10'>
                {socialList?.map((social, index) => {
                    return (
                        <a rel="canonical" href={social.url} target='_blank'>
                            <div key={index} className='mr-2 w-[40px] h-[40px] rounded-full bg-white hover:bg-sub hover:cursor-pointer flex justify-center items-center object-contain p-2'>
                                <img src={social?.logo} alt="" />
                            </div>
                        </a>
                    )
                })}
            </div>

            <div className='text-white flex justify-center'>
                <div className='text-center'>
                    <span>alares © todos os direitos reservados</span>
                </div>
            </div>
        </div>
    )
}
