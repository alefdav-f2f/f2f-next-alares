'use client'
import DataLayerService from '@/app/services/api/datalayer.service';
import { getCookie } from 'cookies-next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { FaDownload, FaTools, FaUpload, FaWifi } from 'react-icons/fa';
import Loading from '../loadings/Loading';
import { externalURL } from "../../api/externalURL";

export default function CardInternet({ plan }: any) {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    function getFirst(price: any) {
        const value = (String(price)).split('.')[0];
        return value
    }

    function getSecond(price: any) {
        const value = (String(price)).split('.')[1];

        if (value) {
            return ',' + value
        } else {
            return ',00'
        }
    }

    function navigateContract(path: string, plan: any) {

        postButtonClick(plan)

        const current = new URLSearchParams(Array.from(searchParams.entries()));

        setTimeout(() => {
            current.delete('plano');
            router.push(`${path}/?${current}&plano=${plan.id}`);
        }, 1000)

    }

    function ctaPlanPro(value: boolean, plan: any){
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const whatsappLink = isMobile
      ? externalURL.whatsappMobile // Para dispositivos móveis
      : externalURL.whatsappDesktop; // Para navegadores de desktop

    
        if(value){
            return () => window.open(whatsappLink + "&text=" + encodeURIComponent('Tenho interesse em contratar o plano Alares Pro ' + plan.title + ' ' +plan.subtitle + ' no valor de R$ ' + plan.price), "_blank");
        }else{
            return () => navigateContract('/contrate-ja', plan)
        }
    }
    // Envio de evento datalayer
    function postButtonClick(plan: any) {

        setIsLoading(true)

        const pathname = window.location.pathname;

        const data = {
            event: 'click_cta_contrate_ja',
            city: String(getCookie('city_name')),
            state: String(getCookie('uf_name')),
            selected_plan: plan.name,
            value: plan.title,
            oferta_id: plan.id,
            local_page: String(pathname)
        }

        DataLayerService.postButtonClick(data);

    }

    function getParams() {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        return `?${params}`;
    }

    function checkIlimitedFone(text: string) {
        const lower = text?.toLocaleLowerCase();

        if (lower?.includes('fone ilimitado')) {
            return true
        } else {
            return false
        }
    }

    function checkGamer(plan: any) {
        if(plan?.name.includes('Gamer')) {
            return true
        } else {
            return false
        }
    }

    function getCardStyles(plan: any, isText: boolean = false, isIcon: boolean = false) {
        const styles = {
            blackFriday: {
                background: 'bg-black',
                text: 'text-white',
                icon: 'text-[#D5F316]'
            },
            highlight: {
                background: 'bg-main',
                text: 'text-white',
                icon: 'text-sub'
            },
            default: {
                background: 'bg-[#F1F1FA]',
                text: 'text-black',
                icon: 'text-sub'
            }
        };

        const styleType = plan.blackFriday ? 'blackFriday' : 
                         plan.highlight ? 'highlight' : 
                         'default';

        if (isText) {
            return isIcon ? styles[styleType].icon : styles[styleType].text;
        }

        return styles[styleType].background;
    }

    return (
        <div className='max-w-[250px]'>
            {plan.highlight ? (
                <div className={`whitespace-nowrap flex items-center ${plan.blackFriday ? 'bg-[#D5F316]' : 'bg-sub'} h-[30px] px-6 rounded-br-[40px] absolute mb-4`}>
                    {plan.highlight}
                </div>
            ) : null}

            <div className='pt-4'>
                <div className={`px-2 py-8 min-h-[500px] rounded-br-[50px] border border-gray-300 ${getCardStyles(plan, false, false)}`}>
                    <div className='text-center pt-4 mb-6'>
                        <div className={`text-4xl ${getCardStyles(plan, true, false)}`}>
                            <span className={`text-5xl font-semibold ${getCardStyles(plan, true, false)}`}>{plan.title}</span>
                            {checkIlimitedFone(plan.subtitle) === true ? (
                                <span>Mega</span>
                            ) : (
                                <span>{plan.subtitle}</span>
                            )}
                            <div className='mt-[-15px]'>
                                {checkIlimitedFone(plan.subtitle) === true ? (
                                    <span className='text-sm'>+ Fone Ilimitado</span>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    {plan?.services?.map((service: any) => {
                        return (
                            <>
                                {service.emphasis === true ? (
                                    <div key={service.id} className='mb-4'>
                                        <div className='flex justify-center'>
                                            <div className='flex justify-center w-[100px] rounded-full  py-1 px-2 bg-white'>
                                                <img src={service.iconEmphasis} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                            </>
                        )
                    })}


                    <div className='mb-4'>
                        <div className='pl-4 mb-1'>
                            <div className='flex mb-2'>
                                <FaWifi className={`w-5 h-5 mr-2 ${plan.alaresPro ? 'text-[#42A5D0]' : getCardStyles(plan, true, true)}`} />
                                <span className={`text-sm ${getCardStyles(plan, true, false)}`}>{plan?.contents[0].name}</span>
                            </div>

                            <div className='flex mb-2'>
                                <FaTools className={`w-5 h-5 mr-2 ${plan.alaresPro ? 'text-[#42A5D0]' : getCardStyles(plan, true, true)}`} />
                                <span className={`text-sm ${getCardStyles(plan, true, false)}`}>{plan?.contents[1]?.name}</span>
                            </div>

                            <div className='flex mb-2'>
                                <FaDownload className={`w-5 h-5 mr-2 ${plan.alaresPro ? 'text-[#42A5D0]' : getCardStyles(plan, true, true)}`} />
                                <span className={`text-sm ${getCardStyles(plan, true, false)}`}>{plan?.contents[2]?.name}</span>
                            </div>

                            <div className='flex mb-2'>
                                <FaUpload className={`w-5 h-5 mr-2 ${plan.alaresPro ? 'text-[#42A5D0]' : getCardStyles(plan, true, true)}`} />
                                <span className={`text-sm ${getCardStyles(plan, true, false)}`}>{plan?.contents[3]?.name}</span>
                            </div>

                            <div className='flex mb-2'>
                                <span className={`text-sm ${plan.alaresPro ? 'text-[#42A5D0]' : getCardStyles(plan, true, false)}`}>{['promo', 'promo20'].includes(plan?.contents[4]?.name) ? '' : plan?.contents[4]?.name}</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-evenly'>
                        {plan?.services?.map((service: any) => {
                            return (
                                <div className='flex bg-white rounded-xl w-12 h-12'>
                                    <img src={service.icon} alt="" className='object-contain rounded-xl' />
                                </div>
                            )
                        })}
                    </div>

                    {plan?.promo === false ? (
                        <div>
                            <div className={`flex justify-center items-center mt-8 ${getCardStyles(plan, true, false)}`}>
                                <div className='flex items-center'>
                                    <span className='text-xl font-medium'>R$</span>
                                </div>
                                <div className='mr-1'>
                                    <span className='text-4xl'> {getFirst(plan.price)}</span>
                                </div>
                                <div>
                                    <div className='mb-[-10px]'>
                                        <span className='text-xs'> {getSecond(plan.price)}</span>
                                    </div>
                                    <div className={`${plan.highlight ? 'text-white' : 'text-gray-500'}`}>
                                        <span className='text-xs mt-[-10px]'>mês</span>
                                    </div>
                                </div>
                            </div>

                            <div className={`text-center mb-4  ${plan.highlight ? 'text-white' : 'text-gray-500'}`}>
                                <span className='text-xs'>Na conta digital</span>
                            </div>

                            <div className='flex justify-center items-center'>
                                <button onClick={ctaPlanPro(plan.alaresPro, plan)} className={`px-6 py-1 rounded-full ${plan.alaresPro ? 'bg-[#42A5D0]' : plan.blackFriday ? 'bg-[#D5F316]' : 'bg-sub'} text-black hover:bg-hover hover:scale-110 hover:text-white w-[150px]`}>
                                    {isLoading ? <><Loading /></> : 'Contrate Já'}
                                </button>
                            </div>

                            <div className={`text-center  ${plan.highlight ? 'text-white' : 'text-gray-500'}`}>
                                <a rel="canonical" href={`/contratos-e-regulamentos${getParams()}`}>
                                    <span className={`${plan.highlight ? 'text-white' : 'text-main'} text-xs hover:underline`}>Consulte condições</span>
                                </a>
                            </div>
                        </div>
                    ) : null}

                    {plan?.promo === true ? (
                        <div>
                            <div className={`flex justify-center items-center mt-8 ${getCardStyles(plan, true, false)}`}>
                                <div className='flex items-center'>
                                    <span className='text-xl font-medium'>R$</span>
                                </div>
                                <div className='mr-1'>
                                    <span className='text-4xl'> {getFirst(plan.promo_price)}</span>
                                </div>
                                <div>
                                    <div className='mb-[-10px]'>
                                        <span className='text-xs'> {getSecond(plan.promo_price)}</span>
                                    </div>
                                    <div className={`${plan.highlight ? 'text-white' : 'text-gray-500'}`}>
                                        <span className='text-xs mt-[-10px]'>mês</span>
                                    </div>
                                </div>
                            </div>

                            <div className={`text-center mb-1  ${plan.highlight ? 'text-white' : 'text-gray-500'}`}>
                                <span className='text-xs'>{`Por ${plan.promo_period} meses`}</span>
                            </div>

                            <div className={`text-center mb-4  ${plan.highlight ? 'text-white' : 'text-gray-500'}`}>
                                <span className='text-xs'>{`A partir do ${(Number(plan.promo_period) + 1)}º mês R$ ${plan.price}`}</span>
                            </div>

                            <div className='flex justify-center items-center'>
                                <button onClick={() => navigateContract('/contrate-ja', plan)} className={`px-6 py-1 rounded-full ${plan.blackFriday ? 'bg-[#D5F316] ' : 'bg-sub text-black'} hover:bg-hover hover:scale-110 hover:text-white w-[150px]`}>
                                    {isLoading ? <><Loading /></> : 'Contrate Já'}
                                </button>
                            </div>

                            <div className={`text-center  ${plan.highlight ? 'text-white' : 'text-gray-500'}`}>
                                <a rel="canonical" href={`/contratos-e-regulamentos${getParams()}`}>
                                    <span className='text-xs hover:underline'>Consulte condições</span>
                                </a>
                            </div>
                        </div>
                    ) : null}

                    {checkGamer(plan) ? (
                        <div className='text-center'>
                            <a rel="canonical" href="/internet-gamer">
                                <span className={`${plan.highlight ? 'text-white' : 'text-main'} text-xs hover:underline`}>Saiba mais</span>
                            </a>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
