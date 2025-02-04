'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { IoNewspaperOutline } from 'react-icons/io5'
import { MdPerson } from 'react-icons/md'
import { PiChats } from 'react-icons/pi'
import { VscCallIncoming, VscCallOutgoing } from 'react-icons/vsc'
import { internalPATH } from "@/app/api/internalPATH";
import { externalURL } from "@/app/api/externalURL";
import { useIsOpen } from '../zustand/button-whatsapp.zustand'



export default function Contact() {
    const searchParams = useSearchParams();
    const isOpen = useIsOpen((state: any) => state.is_open)
    const activeButton = useIsOpen((state: any) => state.active)

    function getParams() {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        return `?${params}`;
    }

    function openChannel(text: string) {

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        console.log('is mobile =' + isMobile)
        const whatsappLink = isMobile
            ? externalURL.whatsappMobile // Para dispositivos móveis
            : externalURL.whatsappDesktop // Para navegadores de desktop

        window.open(whatsappLink + '&text=' + encodeURIComponent(text), '_blank');

    }

    return (
        <>
            <div className='pb-10'>
                <div className='mb-10'>
                    <div className='col-span-1 flex justify-center items-center'>
                        <h2 className='text-main text-4xl'>Contrate já</h2>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <div className=''>
                        <div className='mb-20 lg:grid grid-cols-2 max-w-[1000px]'>

                            <div className='col-span-1 flex items-center justify-between mb-4 hover:underline hover:cursor-pointer border-b-2 border-secondary pb-2'>
                                <button onClick={() => { activeButton() }} className='flex items-center'>
                                    <FaWhatsapp className='text-main text-4xl mr-4' />
                                    <span className='text-lg text-main'>Contrate via WhatsApp</span>
                                </button>
                                <IoIosArrowForward className='text-sub text-4xl' />
                            </div>

                            <a rel="canonical" href={`${internalPATH.contrate_agora}${getParams()}`}>
                                <div className='col-span-1 flex items-center justify-between mb-4 hover:underline hover:cursor-pointer border-b-2 border-secondary pb-2'>
                                    <div className='flex items-center'>
                                        <VscCallIncoming className='text-main text-4xl mr-4' />
                                        <span className='text-lg text-main'>Receba ligação</span>
                                    </div>
                                    <IoIosArrowForward className='text-sub text-4xl' />
                                </div>
                            </a>


                            <a rel="canonical" href="tel:10600">
                                <div className='col-span-1 flex items-center justify-between mb-4 hover:underline hover:cursor-pointer border-b-2 border-secondary pb-2'>
                                    <div className='flex items-center'>
                                        <VscCallOutgoing className='text-main text-4xl mr-4' />
                                        <span className='text-lg text-main'>Ligue agora para 10600</span>
                                    </div>
                                    <IoIosArrowForward className='text-sub text-4xl' />
                                </div>
                            </a>


                            <a rel="canonical" href="tel:1936659000">
                                <div className='col-span-1 flex items-center justify-between mb-4 hover:underline hover:cursor-pointer border-b-2 border-secondary pb-2'>
                                    <div className='flex items-center'>
                                        <VscCallOutgoing className='text-main text-4xl mr-4' />
                                        <span className='text-lg text-main'>Ligue agora para 19 3665-9000</span>
                                    </div>
                                    <IoIosArrowForward className='text-sub text-4xl' />
                                </div>
                            </a>
                        </div>

                        <div className='flex justify-center'>
                            <div className='lg:grid gap-4 grid-cols-2 lg:w-[1000px]'>
                                <div className='col-span-1 flex justify-center items-center mb-8'>
                                    <div className='text-center'>
                                        <div className='text-3xl text-main mb-2'>
                                            <span>Autoatendimento</span><br />
                                            <span>para clientes</span>
                                        </div>
                                        <div className='text-gray-600 text-sm'>
                                            <span>Resolva o que precisa em poucos cliques</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex flex-row flex-wrap justify-center'>
                                        <a rel="canonical" href={`${internalPATH.segunda_via_do_boleto}${getParams()}`}>
                                            <div className='rounded-lg bg-main hover:bg-hover hover:cursor-pointer p-4 w-[175px] h-[150px] m-2'>
                                                <div className='flex justify-center mb-4'>
                                                    <IoNewspaperOutline className='text-6xl text-white' />
                                                </div>
                                                <div className='text-center text-white'>
                                                    <span>2ª via do boleto</span>
                                                </div>
                                            </div>
                                        </a>

                                        <a rel="canonical" href={`${externalURL.center}`} target='_blank'>
                                            <div className='rounded-lg bg-main hover:bg-hover hover:cursor-pointer p-4 w-[175px] h-[150px] m-2'>
                                                <div className='flex justify-center mb-4'>
                                                    <MdPerson className='text-6xl text-white' />
                                                </div>
                                                <div className='text-center text-white'>
                                                    <span>Central do assinante</span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>

                                    <div className='flex flex-row flex-wrap justify-center'>
                                        <a rel="canonical" href={`${internalPATH.FAQ}${getParams()}&faq=true`}>
                                            <div className='rounded-lg bg-main hover:bg-hover hover:cursor-pointer p-4 w-[175px] h-[150px] m-2'>
                                                <div className='flex justify-center mb-4'>
                                                    <PiChats className='text-6xl text-white' />
                                                </div>
                                                <div className='text-center text-white'>
                                                    <span>FAQ</span>
                                                </div>
                                            </div>
                                        </a>

                                        <div onClick={() => openChannel('')} className='rounded-lg bg-main hover:bg-hover hover:cursor-pointer p-4 w-[175px] h-[150px] m-2'>
                                            <div className='flex justify-center mb-4'>
                                                <FaWhatsapp className='text-6xl text-white' />
                                            </div>
                                            <div className='text-center text-white'>
                                                <span>Atendimento via WhatsApp</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
