'use client'
import { externalURL } from '@/app/api/externalURL';
import { internalPATH } from '@/app/api/internalPATH';
import Loading from '@/app/components/loadings/Loading';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import CmsService from '@/app/services/api/cms.service';
import { searchControls } from '@/app/zustand/search.zustand';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaWhatsapp } from 'react-icons/fa';
import { IoNewspaperOutline } from 'react-icons/io5';
import { MdPerson } from 'react-icons/md';
import { PiChats } from 'react-icons/pi';

export default function page() {
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [contentList, setContentList] = useState<any[]>([]);
    const { register, getValues, setValue } = useForm();
    const router = useRouter();
    const [hasSearched, setHasSearched] = useState(false);

    async function getContent(value: string) {

        setSearchValue(String(value))
        setIsLoading(true);

        const params = {
            search: value
        }

        const request = await CmsService.getContent(params);

        if (request) {
            const data = request?.data;
            setContentList(data)
            setIsLoading(false);
            setHasSearched(true);
        }
    }

    function search() {
        const value = getValues('search');

        router.replace(`/search?search=${value}`);
        getContent(String(value))
    }

    function eventFilter(event: any) {
        if (event?.key === 'Enter') {
            const value = getValues('search');

            router.replace(`/search?search=${value}`);
            getContent(String(value))
        }
    }

    React.useEffect(() => {
        const search = searchParams.get('search');
        setValue('search', search)
        getContent(String(search))
    }, [searchParams])

    function sanitizeString(str: string) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\w\s]/g, '');
    }

    const keywords = ['renegociar', 'negociar', 'dividas', 'debitos', 'portal de negociacao'];
    const sanitizedValue = sanitizeString(searchValue);

    return (
        <div>
            <div className='text-center text-main p-2 mb-4'>
                <span className='text-[45px]'>Pesquise no site</span>
            </div>

            <div className='flex items-center justify-center w-full'>
                <div className='flex justify-center sm:p-6 p-2 mb-4 w-full'>
                    <div className='mr-2'>
                        <div className='w-full relative max-w-[800px] lg:min-w-[800px] min-w-[300px]'>
                            <div className="absolute inset-y-0 end-5 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-sub" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input  {...register('search')} type="text" onKeyDown={(e) => eventFilter(e)} className="bg-white border border-main text-sm rounded-3xl focus:ring-blue-500 block w-full p-2.5 text-[#04D683]" placeholder="Digite o que está procurando" required />
                        </div>
                    </div>

                    <div className='pb-4 pr-6'>
                        <button onClick={() => search()} className='bg-main hover:bg-hover text-white py-2 sm:px-8 px-2 rounded-full'>
                            Procurar
                        </button>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className='h-[500px] flex justify-center'>
                    <Loading />
                </div>
            ) : (
                <div>
                    <div className='text-center text-main p-2 mb-4'>
                        <span className='text-[30px]'>Resultado para: "{searchValue}"</span>
                    </div>
                    <div className='mb-4'>
                        {hasSearched && keywords.includes(sanitizedValue) && (
                            <div className='w-full text-center mb-1'>
                                <a rel="canonical" href='https://negociacao.alaresinternet.com.br/'>
                                    <span className='hover:underline text-[20px] text-main'>Portal de Negociação</span>
                                </a>
                            </div>
                        )}
                        {contentList.map((content: any) => {
                            return (
                                <div className='w-full text-center mb-1' key={content.id}>
                                    <a rel="canonical" href={content?.url}>
                                        <span className='hover:underline text-[20px] text-main' dangerouslySetInnerHTML={{ __html: content?.title }}></span>
                                    </a>
                                </div>
                            )
                        })}
                        {contentList?.length === 0 && !keywords.includes(sanitizedValue) ?
                            <div className='text-center p-4'>
                                <span className='text-[20px] text-main'>Sem resultados para "{searchValue}"</span>
                            </div>
                            : null}
                    </div>

                    <div className='pb-4 pr-6 flex justify-center pt-4'>
                        <button onClick={() => router.push('/home')} className='bg-main hover:bg-hover text-white py-2 px-8 rounded-full'>
                            {`< Voltar`}
                        </button>
                    </div>

                    <div>
                        <div className='text-center text-main p-2 mb-4'>
                            <span className='text-[25px]'>Talvez você esteja procurando por isto:</span>
                        </div>
                        <div className='flex justify-center'>
                            <div className='lg:w-[1000px] flex flex-wrap justify-center'>

                                <a rel="canonical" href={`${internalPATH.segunda_via_do_boleto}`}>
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
                                <a rel="canonical" href={`${internalPATH.FAQ}`}>
                                    <div className='rounded-lg bg-main hover:bg-hover hover:cursor-pointer p-4 w-[175px] h-[150px] m-2'>
                                        <div className='flex justify-center mb-4'>
                                            <PiChats className='text-6xl text-white' />
                                        </div>
                                        <div className='text-center text-white'>
                                            <span>FAQ</span>
                                        </div>
                                    </div>
                                </a>

                                <a rel="canonical" href={`${externalURL.whatsappMobile}`} target='_blank'>
                                    <div className='rounded-lg bg-main hover:bg-hover hover:cursor-pointer p-4 w-[175px] h-[150px] m-2'>
                                        <div className='flex justify-center mb-4'>
                                            <FaWhatsapp className='text-6xl text-white' />
                                        </div>
                                        <div className='text-center text-white'>
                                            <span>Atendimento via WhatsApp</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}
