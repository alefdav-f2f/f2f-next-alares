"use client"
import React from 'react'
import { ButtonWhatsapp } from '../components/ButtonWhatsapp'
import Navigation from '../components/Navigation'
import NavigationSelector from '../components/NavigationSelector'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import axiosInterceptorInstance from '../api/axiosInterceptor'
import LoadingAlares from '../components/loadings/LoadingAlares'
import EcommerceService from '../services/api/ecommerce.service'
import Search from '../components/Search'
import { searchControls } from '../zustand/search.zustand'
import { useIsOpen } from '../zustand/button-whatsapp.zustand'
import { navigationZustand } from '../zustand/navigation.zustand';
import { hasTV } from "@/app/zustand/hasTV.zustand";
import PlanService from '../services/api/plan.service'

interface templateProps {
    children: React.ReactNode
}

export default function MainTemplate({ children }: templateProps) {

    const searchParams = useSearchParams();
    const pathname = usePathname()
    const [display, setDisplay] = React.useState(false);
    const router = useRouter();
    const city_slug = searchParams.get('city');
    const plan = searchParams.get('plano');
    const fbclid = searchParams.get('fbclid');
    const utm_source = searchParams.get('utm_source');
    const utm_medium = searchParams.get('utm_medium');
    const utm_campaign = searchParams.get('utm_campaign');
    const city_cookie_slug = getCookie('city_slug');
    const [session_id, setSessionID] = React.useState('');
    const close = searchControls((state: any) => state.close);
    const hideWhatsapp = useIsOpen((state: any) => state.hide);
    const showWhatsapp = useIsOpen((state: any) => state.show);
    const hidden = useIsOpen((state: any) => state.hidden)
    const hideNavigation = navigationZustand((state: any) => state.hide);
    const showNavigation = navigationZustand((state: any) => state.show);
    const activeHasTV = hasTV((state: any) => state.active);
    const inactiveHasTV = hasTV((state: any) => state.inactive);
    const [pathnameWindow, setPathnameWindow] = React.useState('');
    
    const pathWithoutCity = ["/sobre-a-alares", "/trabalhe-conosco", "/alares-2a-via-de-boleto", "/autoatendimento"];
    

    async function checkCity() {

        // Verifica parâmetro de cidade
        let selected = '';

        if (city_cookie_slug) {
            selected = String(city_cookie_slug);
        } else if (city_slug) {
            selected = city_slug
        } else {
            clearCookie()
        }


        try {
            const request: any = await axiosInterceptorInstance.get(`/city/get-city-by-slug/${selected}`);

            const data = request?.data;
            const city = `${data.name} - ${data.uf}`;
            setCookie('city_id', data.id);
            setCookie('city_name_uf', city);
            setCookie('city_name', data.name);
            setCookie('uf_name', data.uf);
            setCookie('city_slug', data.slug);
            setCookie('city_external', data.external_code);
            deleteCookie('citycode');
            setCookie('citycode', data.wordpress_id);

            setTimeout(() => {
                setDisplay(true)
            }, 100)
        }
        catch (error) {
            clearCookie()
        }
    }

    function clearCookie() {

        if (pathWithoutCity.includes(window.location.pathname)) {
            return null;
        }

        deleteCookie('city_name_uf');
        deleteCookie('city_id');
        deleteCookie('city_slug');
        deleteCookie('city_external');
        deleteCookie('citycode');
        setCookie('pathname', pathname)

        if (plan) {
            setCookie('plan', plan)
        }

        router.replace('/')
    }

    function getUTMParams() {

        if (fbclid) {
            setCookie('fbclid', fbclid);
            setCookie('medium', 'facebook');
        }

        if (utm_source) {
            setCookie('medium', 'google');
            setCookie('utm_source', utm_source);
            setCookie('utm_campaign', utm_campaign ?? '');
            setCookie('utm_medium', utm_medium ?? '');
        }
    }

    async function checkSession() {
        const session_cookie = getCookie('session_id');
        setPathnameWindow(window.location.pathname)

        if (pathWithoutCity.includes(window.location.pathname)) {
            setDisplay(true)
            return null;
        }

        if (session_cookie) {
            setSessionID(session_cookie)
        } else {
            const request = await EcommerceService.count();
            const new_session = request?.data?.session_id;
            setSessionID(new_session);
            setCookie('session_id', new_session);
        }
    }

    //Esconde o botão do whatsapp caso esteja no /contrate-ja
    function checkHide() {
        if (pathWithoutCity.includes(window.location.pathname)) {
            hideWhatsapp();
            hideNavigation();
        } else {
            showWhatsapp();
            showNavigation();
        }
    }

    async function checkTV(type: string) {

        if (pathWithoutCity.includes(window.location.pathname)) {
            return null;
        }

        const city_id = String(getCookie("city_id"));
        const session_id = getCookie("session_id");
        const request = await PlanService.getPlan(city_id, session_id, type);

        if (request.status === 200) {
            const hasTV = request.data?.hasTV;

            if (hasTV) {
                activeHasTV();
            } else {
                inactiveHasTV();
            }
        }
    }

    React.useEffect(() => {
        checkTV("Internet");
        checkHide();
        checkSession();
        checkCity();
        getUTMParams();
        close();
    }, [city_slug])

    return (
        <>
            <section className='w-full h-full'>
                <Search />
                <div className="fixed bottom-0 right-0 z-50">
                    {hidden ? null : (
                        <div className='flex justify-end'>
                            <ButtonWhatsapp />
                        </div>
                    )}
                </div>
                <div>
                    {pathWithoutCity.includes(pathnameWindow) ? <NavigationSelector /> : <Navigation />}
                </div>
                {display ? (
                    <div>
                        {children}
                    </div>
                ) : (
                    <div className='h-[500px] flex justify-center items-center'>
                        <LoadingAlares />
                    </div>
                )}
            </section>
        </>

    )
}
