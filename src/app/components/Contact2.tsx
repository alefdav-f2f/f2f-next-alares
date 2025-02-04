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
import logo from '@/img/alares-icon2.png';
import Image from 'next/image';
import { TbPhoneCall } from 'react-icons/tb'


export default function Contact2() {
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
            <div className='relative'>
                <div className='mb-6'>
                    <div className='col-span-1 flex justify-center items-center'>
                        <h2 className='text-gray-800 text-2xl'>Contrate <strong>já</strong></h2>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <div className='max-w-[1000px] w-full flex justify-center'>

                        <div className='w-[50%] px-4 pt-8 rounded-tl-[50px] bg-[#F1F1FA] flex justify-center mr-1 md:pb-[180px]'>
                            <div>
                                <div className='flex justify-center mb-1'>
                                    <FaWhatsapp className='text-main text-4xl' />
                                </div>
                                <div className='mb-4 text-center'>
                                    <span className='text-2xl text-gray-800'>Fale conosco via <strong>WhatsApp</strong></span>
                                </div>
                                <div className='flex justify-center'>
                                    <button type='button' onClick={() => { activeButton() }} className='z-20 hover:bg-hover hover:cursor-pointer text-white text-sm bg-main rounded-full px-6 py-2 font-bold'>
                                        ENVIAR
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='w-[50%] px-4 pt-8 rounded-tr-[50px] bg-[#F1F1FA] flex justify-center md:pb-[180px]'>
                            <div>
                                <div className='flex justify-center mb-1'>
                                    <TbPhoneCall  className='text-main text-4xl' />
                                </div>
                                <div className='mb-4 text-center'>
                                    <span className='text-2xl text-gray-800'><strong>Nós</strong> te ligamos</span>
                                </div>
                                <div className='flex justify-center'>
                                    <a rel="canonical" href={`${internalPATH.contrate_agora}${getParams()}`}>
                                        <button type='button' className='z-20 hover:bg-hover hover:cursor-pointer text-white text-sm bg-main rounded-full px-6 py-2 font-bold'>
                                            ENVIAR
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='md:block hidden justify-center absolute w-full bottom-0'>
                    <div className='flex justify-center w-full mb-[-40px]'>
                        <Image src={logo} alt={''} className='w-24 z-10' />
                    </div>
                    <div className='flex justify-center'>
                        <div className='flex justify-center w-[533px] bg-white rounded-t-[20px] pt-9 pb-9'>
                            <div className='text-center'>
                                <span className='text-3xl'>Ligue <strong>agora! (10600)</strong></span><br />
                                <span className='font-extralight text-xs'>Nossa equipe entrará em contato.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
