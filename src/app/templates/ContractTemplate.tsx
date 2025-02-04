"use client"
import React, { ReactNode } from 'react'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { useSearchParams } from 'next/navigation'
import axiosInterceptorInstance from '../api/axiosInterceptor'
import LoadingAlares from '../components/loadings/LoadingAlares'

interface templateProps {
    children: React.ReactNode
}

export default function ContractTeamplate({ children }: templateProps) {

    const searchParams = useSearchParams();
    const cityName = getCookie('city_name_uf');
    const [display, setDisplay] = React.useState(false);
    const citySelected = searchParams.get('city')


    async function checkCity() {

        // Verifica parâmetro de cidade
        let selected = '';
        const city_slug = searchParams.get('city')
        const citySlug = getCookie('city_slug');

        if (city_slug) {
            selected = city_slug;
        } else {
            selected = String(citySlug);
        }



        try {
            const request: any = await axiosInterceptorInstance.get(`/city/get-city-by-slug/${selected}`);

            const data = request?.data;
            const city = `${data.name} - ${data.uf}`;
            setCookie('city_id', data.id);
            setCookie('city_name_uf', city);
            setCookie('city_slug', data.slug);

            setDisplay(true)
        }
        catch (error) {
            clearCookie()
        }
    }

    async function clearCookie() {
        deleteCookie('city_name_uf');
        deleteCookie('city_id');
        deleteCookie('city_slug');

        window.history.replaceState(null, '', '/')
    }

    React.useEffect(() => {
        checkCity()
    }, [])

    return (
        <>
            {display ? (
                <div>
                    {children}
                </div>
            ) : (
                <div className='h-[500px] flex justify-center items-center'>
                    <LoadingAlares />
                </div>
            )}
        </>
    )
}
