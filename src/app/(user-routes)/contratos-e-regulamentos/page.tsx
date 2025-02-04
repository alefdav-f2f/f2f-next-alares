'use client'
import PageTitle from '@/app/components/PageTitle';
import React, { useState } from 'react';
import icon from '@/img/icon/business-icon.png';
import banner from '@/img/banners/banner-contratos-regulamentos.png';
import bannerMobile from '@/img/banners/Banners_Mobile_Contratos_V5.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { externalURL } from '@/app/api/externalURL';
import RegulationService from '@/app/services/api/regulation.service';
import { MdEditDocument } from 'react-icons/md';
import logo from '@/img/icon/menu-icon-1.png';
import logo2 from '@/img/icon/menu-icon-1-b.png';


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


export default function ContractPage() {

    const router = useRouter();
    const [regulationList, setRegulationList] = useState<any>([]);
    const [isLoading, setLoading] = useState(false);
    const [isActive, setIsActive] = useState(true);

    async function getRegulations(status: boolean) {
        setIsActive(status)
        setLoading(true)

        const params = {
            isActive: status
        }

        const response = await RegulationService.paginate(params);

        if (response) {
            const data = response.data;
            setRegulationList(data)
            setLoading(false)
        }
    }

    React.useEffect(() => {
        getRegulations(true)
    }, [])

    return (
        <div className='p-4'>
            <PageTitle icon={icon} title='Contratos e Regulamentos' />

            <div onClick={() => router.push(externalURL.gupy)} className='hover:cursor-pointer w-full'>
                <Image src={banner} alt={''} className='hidden sm:flex w-full' />
                <Image src={bannerMobile} alt={''} className='sm:hidden flex' />
            </div>

            <div className='p-8 flex w-full justify-center items-center'>
                <button onClick={() => { getRegulations(true) }} className={`rounded-full py-1 px-4 mr-4 ${isActive === true ? `bg-main text-white` : `text-main bg-white border border-sub`}`}>
                    Em vigência
                </button>
                <button onClick={() => { getRegulations(false) }} className={`rounded-full py-1 px-4 ${isActive === false ? `bg-main text-white` : `text-main bg-white border border-sub`}`}>
                    Comercialização encerrada
                </button>
            </div>

            <div className='border-b-4 border-sub pb-5'>
                <div className='flex justify-center mb-10'>
                    <div className='pt-10 px-2 max-w-[800px]'>
                        <div className='text-center flex items-center'>
                            <MdEditDocument className='scale-[200%] text-sub mr-4' />
                            <span className='text-sub text-4xl'> Contratos </span>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <div className='max-w-[1000px] grid gap-4 lg:grid-cols-2'>
                        {regulationList?.map((regulation: any) => {
                            return (
                                <>
                                    {regulation.type === 'contract' ? (
                                        <div className='flex justify-center'>
                                            <div className='flex flex-col justify-between rounded-xl bg-main p-4 lg:w-[300px] w-full min-h-[150px]'>
                                                <div className='mb-4 flex items-start'>
                                                    <Image src={logo} alt={''} className='w-6 mr-2' />
                                                    <span className='text-white'>{regulation.title?.toUpperCase()}</span>
                                                </div>
                                                <div className='flex justify-center'>
                                                    <a rel="canonical" href={`${regulation?.pdf}`} target='_blank'>
                                                        <button className='px-2 bg-white text-main rounded-full text-sm hover:bg-gray-100'>
                                                            Abrir
                                                        </button>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div>
                <div className='flex justify-center mb-10'>
                    <div className='pt-10 px-2 max-w-[800px]'>
                        <div className='text-center flex items-center'>
                            <MdEditDocument className='scale-[200%] text-sub mr-4' />
                            <span className='text-sub text-4xl'> Regulamentos </span>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <div className='max-w-[1000px] grid gap-4 lg:grid-cols-2'>
                        {regulationList?.map((regulation: any) => {
                            return (
                                <>
                                    {regulation.type === 'regulation' ? (
                                        <div className='flex justify-center'>
                                            <div className='flex flex-col justify-between rounded-xl bg-white border border-sub p-4 lg:w-[300px] w-full min-h-[150px]'>
                                                <div className='mb-4 flex items-start'>
                                                    <Image src={logo2} alt={''} className='w-6 mr-2' />
                                                    <span className='text-main'>{regulation.title?.toUpperCase()}</span>
                                                </div>
                                                <div className='flex justify-center'>
                                                    <a rel="canonical" href={`${regulation?.pdf}`} target='_blank'>
                                                        <button className='px-2 bg-main text-white rounded-full text-sm hover:bg-gray-100'>
                                                            Abrir
                                                        </button>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
