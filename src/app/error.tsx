'use client'
import React from 'react'
import SystemService from './services/api/system.service';
import { usePathname, useSearchParams } from 'next/navigation';
import MainTemplate from './templates/MainTemplate'
import Footer from './components/Footer'
import notfound from '@/img/not-found.webp'
import Image from 'next/image'

export default function error({ error, reset }: { error: Error; reset: () => void }) {

    const pathname = usePathname();

    async function report() {

        const data = {
            text_error: error.message,
            path: String(pathname)
        }

        const respose = await SystemService.reportError(data);
    }

    const searchParams = useSearchParams();

    function getParams() {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        return `?${params}`;
    }

    React.useEffect(() => {
        report()
    }, []);

    return (
        <MainTemplate>
            <div className='h-[70vh] flex justify-center items-center'>
                <div className='flex flex-col items-center'>
                    <Image src={notfound} alt={''} className='w-[150px] mb-4' />
                    <div className='mb-1'>
                        <span className='font-bold text-2xl'>Houve um erro inesperado</span>
                    </div>
                    <div className='mb-4'>
                        <a rel="canonical" href={`home/${getParams()}`}>
                            <button className='px-4 py-2 rounded-full border-2 hover:border-main bg-main text-white hover:bg-sub hover:text-main'>
                                Voltar ao início
                            </button>
                        </a>
                    </div>

                </div>
            </div>
            <Footer />
        </MainTemplate>
    )
}
