'use client'
import React, { useState } from 'react'
import Logo from '@/app/components/Logo/Logo'
import PageTitle from '@/app/components/PageTitle'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import icon from '@/img/icon/icon-politica.png';
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import Footer from '@/app/components/Footer';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import RegulationService from '@/app/services/api/regulation.service';


export default function page() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const [document, setDocument] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    async function navigate(path: string, external: boolean) {

        const current = new URLSearchParams(Array.from(searchParams.entries()));

        if (external) {
            window.open(path, '_blank')
        } else {
            router.push(`${path}/?${current}`)
        }
    }

    async function getTerm() {

        const response = await RegulationService.termsAndConditions();

        if (response) {
            const data = response.data;
            setDocument(data?.data?.text);
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        getTerm();
    }, [])

    return (
        <section className='scroll-smooth'>
            <nav className="h-[90px] sm:h-[160px] max-w-screen">
                <div className="flex justify-center items-center sm:relative h-[90px] bg-main w-[100%] border-secondary border-b-[5px]">

                    <div className="flex items-center justify-center sm:w-[1200px] w-full px-5">
                        <button className="hover:bg-hover rounded-md py-2 px-4" onClick={() => { navigate('/', false) }}>
                            <Logo className="w-28 sm:w-36 sm:mr-8" color="white" />
                        </button>

                        <div className="flex sm:hidden"></div>
                    </div>
                </div>
            </nav>

            <div className='min-h-screen mb-10'>
                <div className='block items-center w-full'>
                    {isLoading ? (
                        <LoadingAlares />
                    ) : (
                        <>
                            <PageTitle icon={''} title='Termos e condições' />
                            <div className='flex justify-center'>
                                <div dangerouslySetInnerHTML={{ __html: document }} className='text-justify p-8 max-w-[1140px]'></div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <Footer />
        </section>
    )
}
