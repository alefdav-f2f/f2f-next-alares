'use client'
import React, { useState } from 'react'
import { searchControls } from '../zustand/search.zustand'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export default function Search() {

    const isOpen = searchControls((state: any) => state.is_open)
    const close = searchControls((state: any) => state.close)
    const [searchList, setSearchList] = useState<any[]>([]);
    const router = useRouter();
    const { register, getValues } = useForm();

    function closeSearch() {
        close()
    }

    const mainSearch = [
        {
            type: '',
            children: [
                {
                    title: 'Internet',
                    subtitle: 'Para você',
                    path: '/internet',
                    active: false
                },
                {
                    title: 'Dúvidas frequentes',
                    subtitle: 'Para você',
                    path: '/autoatendimento?scroll=faq',
                    active: false
                }
            ]
        },
        {
            type: 'Buscas Sugeridas',
            children: [
                {
                    title: '2a via do boleto',
                    subtitle: 'Para você',
                    path: '/alares-2a-via-de-boleto',
                    active: false
                },
                {
                    title: 'Fale conosco',
                    subtitle: 'Para você',
                    path: '/autoatendimento?scroll=fale-conosco',
                    active: false
                },
                {
                    title: 'Portal de Negociação',
                    subtitle: '',
                    path: 'https://negociacao.alaresinternet.com.br/',
                    active: false
                },
            ]
        }
    ]


    function activeItem(index: number, index2: number, status: boolean) {

        const list = [...mainSearch];

        list[index].children[index2].active = status;

        setSearchList(list)
    }

    function search() {
        const value = getValues('search');
        close();
        router.replace(`/search?search=${value}`);
    }

    function eventFilter(event: any) {
        console.log(event.key)
        if (event?.key === 'Enter') {
            search()
        }
    }

    React.useEffect(() => {
        setSearchList(mainSearch)
    }, [])

    return (
        <>
            {isOpen ? (
                <div className='h-screen bg-black/30 fixed z-50 w-screen flex justify-end'>

                    <div className='right-0 lg:w-[33%] sm:min-w-[500px] w-screen h-full bg-white'>
                        <div onClick={() => closeSearch()} className='flex justify-end sm:pr-2'>
                            <div className='w-10 h-10 bg-blue-700 flex justify-center items-center hover:cursor-pointer hover:bg-blue-800'>
                                <span className='text-3xl text-white'>X</span>
                            </div>
                        </div>
                        <div className='text-center text-main p-2 mb-4'>
                            <span className='text-[45px]'>Pesquise no site</span>
                        </div>

                        <div className='flex items-center'>
                            <div className='flex justify-center sm:p-6 p-2 mb-4 w-full'>
                                <div className='w-full relative'>
                                    <div className="absolute inset-y-0 end-5 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-sub" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input  {...register('search')} onKeyDown={(e) => eventFilter(e)} type="text" className="bg-white border border-main text-sm rounded-3xl focus:ring-blue-500 block w-full p-2.5 text-[#04D683]" placeholder="Digite o que está procurando" required />
                                </div>
                            </div>

                            <div className='pb-4 pr-6'>
                                <button onClick={() => search()} className='bg-main hover:bg-hover text-white py-2 sm:px-8 px-4 rounded-full'>
                                    Procurar
                                </button>
                            </div>
                        </div>

                        <div className='px-8 block'>
                            {searchList?.map((item: any, index) => {
                                return (
                                    <div className='mb-6'>
                                        <div className='mb-2'>
                                            <span className='text-2xl text-sub'>{item.type}</span>
                                        </div>
                                        {item.children.map((i: any, index2: number) => {
                                            return (
                                                <div onClick={() => { router.push(i.path), closeSearch() }} className='flex'>
                                                    <div className='mb-2 hover:cursor-pointer' onMouseEnter={() => { activeItem(index, index2, true) }} onMouseLeave={() => { activeItem(index, index2, false) }}>
                                                        <div>
                                                            <span className='text-xl text-main mr-2'>{i.title}</span>
                                                            <span className='text-main'>{i.subtitle}</span>
                                                        </div>
                                                        <div className='min-w-[100px] h-[4px]'>
                                                            <div className={i.active ? 'h-[2px] bg-main animation_path' : ''}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}
