'use client'
import React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { CityProps, StateProps } from '../types/interface/state.interface';
import axiosInterceptorInstance from '../api/axiosInterceptor';
import Logo from './Logo/Logo';
import LoadingAlares from './loadings/LoadingAlares';
import Loading from './loadings/Loading';
import DataLayerService from '../services/api/datalayer.service';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

interface props {
    reload: boolean,
    check_city: boolean
}

export default function CitySelector({ reload, check_city }: props) {
    
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [stateList, setState] = React.useState<StateProps[]>([])
    const [cityList, setCity] = React.useState<CityProps[]>([])
    const [filteredList, setFilteredCity] = React.useState<CityProps[]>([])
    const [isLoading, setLoading] = React.useState(true);
    const [loadingState, setLoadingState] = React.useState(false);
    const [loadingCity, setLoadingCity] = React.useState(false);
    const [open, setOpen] = React.useState(false)
    const [source, setSource] = React.useState<any>()
    const city_slug = getCookie('city_slug');


    function sendDataLayer(dataCity: any) {
        const data = {
            city: dataCity.name,
            state: dataCity.uf,
            version_website: 'versao-nova',
            gclid: searchParams.get('gclid') ?? '',
            utm_source: searchParams.get('utm_source') ?? '',
            utm_campaign: searchParams.get('utm_campaign') ?? '',
            user_id: searchParams.get('utm_campaign') ?? '',
        }

        console.log(data)
        DataLayerService.sender(data)
    }


    async function getState() {

        setLoadingState(true);

        const request = await axiosInterceptorInstance.get('/uf/paginate-without-auth', {
            params: {
                isActive: true,
                page: 1,
                perPage: 99999
            }
        })

        if (request.status === 200) {

            const data = request.data?.data;
            setState(data)
            setLoadingState(false);
            return
        }
    }

    async function getCity(event: any) {

        const value = event?.target?.value;

        setLoadingCity(true);

        const request = await axiosInterceptorInstance.get(`/city/get-by-uf-without-auth`, {
            params: {
                id: value,
                isActive: true
            }
        });

        if (request.status === 200) {
            const data = request.data;
            const el = document.getElementById('inputCity');
            data?.forEach(function (element: any) {
                element.value = element.name.toLowerCase();
            });

            setCity(data);
            setFilteredCity(data)
            setLoadingCity(false);
            el?.focus();
            return
        }
    }

    async function setCookieFunction(value: any) {

        clearCookie();

        let path = '';
        const plan_cookie = String(getCookie('plan'));
        const pathname_cookie = String(getCookie('pathname'));
        const return_path = getCookie('return_path')

        if (pathname_cookie === 'undefined') {
            path = '/home';

            if (return_path) {
                path = String(return_path);
                deleteCookie('return_path');
            }

        } else {
            path = pathname_cookie ?? pathname
        }

        const redirect = `${path}?city=${value}${plan_cookie && plan_cookie !== 'undefined' ? `&plano=${plan_cookie}` : ''}${source ? `&${source}` : ''}`;

        setLoading(true);

        const request: any = await axiosInterceptorInstance.get(`/city/get-city-by-slug/${value}`);

        const data = request?.data;

        if (request.status >= 400) {
            toast.error(request.error.message)
            setLoading(false)
            return
        }

        if (request.status === 200) {
            setCookie('city_id', data?.id)
            setCookie('city_slug', data?.slug)
            setTimeout(() => {
                router.push(redirect)

                if (reload) {
                    setTimeout(() => {
                        window.location.reload()
                    }, 1000)
                }
            }, 1000);
            sendDataLayer(data);
        }
    }

    function filterCity(event: any) {
        const value = event.target.value;

        const array = cityList.filter(c => (c.value).includes(value.toLowerCase()));

        if (value === '') {
            setOpen(false);
            setFilteredCity(cityList)
        } else {
            setOpen(true)
            setFilteredCity(array)
        }

    }

    function clearCookie() {
        deleteCookie('city_name_uf');
        deleteCookie('city_id');
        deleteCookie('city_slug');
        deleteCookie('city_external');
        deleteCookie('citycode');
    }

    function checkCookie() {

        if (city_slug && check_city) {
            setCookieFunction(city_slug)
        } else {
            setLoading(false)
        }
    }

    React.useEffect(() => {

        const queryString = window.location.search.substring(1);
        const params = new URLSearchParams(queryString);

        const paramToDelete = 'city';

        if (params.has(paramToDelete)) {
            // Excluir o parâmetro
            params.delete(paramToDelete);
        
            // Atualizar a URL sem recarregar a página
            const newUrl = `${window.location.pathname}?${params.toString()}`;
            window.history.replaceState({}, '', newUrl);

            setSource(params.toString())
        } else {
            if(queryString){
                setSource(queryString)
            }
        }

        

        checkCookie();
        getState();
    }, [])

    return (
        <>
            <div className='w-screen h-screen bg-main flex justify-center fixed pt-4'>
                <div className='sm:w-[1000px] w-full'>

                    {isLoading ? <div className='flex items-center justify-center h-[300px]'><LoadingAlares color="white" /></div> : (
                        <div>

                            <div className='mb-4 flex justify-center'>
                                <Logo className="w-36" color="white" />
                            </div>

                            <div className='py-2 px-4'>
                                <div className='h-1 bg-sub w-full mb-4'></div>
                            </div>

                            <div className='text-center mb-1'>
                                <span className='text-white text-base'>Selecione o seu estado/cidade</span>
                            </div>

                            <form action="">
                                <div className="flex flex-col items-center p-2">

                                    <div className='flex'>
                                        <div className='w-14'></div>
                                        <div className='sm:w-96 w-64'>
                                            <label htmlFor="states" className="block mb-2 text-sm font-medium text-gray-900"></label>
                                            <select id="states" onChange={() => getCity(event)} className="bg-main border border-secondary text-white text-base font-medium  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                                <option value="">Escolha um estado</option>
                                                {stateList?.map((state, index) => {
                                                    return (
                                                        <option key={index} value={state.id}>{state.uf}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div className='w-14 flex items-center justify-center'>
                                            {loadingState ? <Loading /> : null}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-2 flex flex-col items-center p-2">
                                    <div className="flex">
                                        <div className='w-14'></div>
                                        <div className='sm:w-96 w-64'>
                                            <input id="inputCity" type="text" onFocus={() => setOpen(true)} onClick={() => setOpen(true)} onChange={(e) => filterCity(e)} placeholder='Localizar cidade' className='bg-main border border-secondary text-base text-white font-medium rounded-lg block w-full h-[40px] pl-4' />
                                            {open ? (
                                                <div className='rounded-md bg-gray-200 max-h-[200px] overflow-auto shadow-lg'>
                                                    <div>
                                                        <div className='border-2 border-b-gray-400'>
                                                            {filteredList?.map((city: any, index: number) => {
                                                                return (
                                                                    <div>
                                                                        {city.onTop === true ? (
                                                                            <div key={index} onClick={() => setCookieFunction(city.slug)}>
                                                                                <div className={`pl-2 py-1 hover:bg-sub  hover:cursor-pointer`}>
                                                                                    <span>{city.name}</span>
                                                                                </div>
                                                                            </div>
                                                                        ) : null}
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                        {filteredList?.map((city: any, index: number) => {
                                                            return (
                                                                <div>
                                                                    {city.onTop === false ? (
                                                                        <div key={index} onClick={() => setCookieFunction(city.slug)}>
                                                                            <div className={`pl-2 py-1 hover:bg-sub  hover:cursor-pointer`}>
                                                                                <span>{city.name}</span>
                                                                            </div>
                                                                        </div>
                                                                    ) : null}
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>

                                            ) : (null)}

                                        </div>
                                        <div className='w-14 flex items-center justify-center h-10'>
                                            {loadingCity ? <Loading /> : null}
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}
