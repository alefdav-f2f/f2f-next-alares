'use client'
import DataLayerService from '@/app/services/api/datalayer.service';
import { navigation } from '@/app/services/navigation-service';
import RegexService from '@/app/services/validations/regex.service';
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaDownload, FaTools, FaUpload, FaWifi } from 'react-icons/fa'
import Loading from '../loadings/Loading';


export default function CardOffer({ offer, params }: any) {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const current = new URLSearchParams(Array.from(searchParams.entries()));


    function navigateContract(path: string, plan: any) {

        setIsLoading(true)

        postButtonClick(plan)


        setTimeout(() => {
            current.delete('plano');
            router.push(`${path}/?${current}&plano=${plan.id}`);
        }, 1000)

    }

    // Envio de evento datalayer
    function postButtonClick(plan: any) {

        const pathname = window.location.pathname;

        const data = {
            event: 'click_cta_contrate_ja',
            city: String(getCookie('city_name')),
            state: String(getCookie('uf_name')),
            selected_plan: plan.name,
            value: plan.title,
            oferta_id: plan.id,
            local_page: pathname
        }

        console.log(data)

        DataLayerService.postButtonClick(data);

    }

    return (
        <div key={offer.id} className={`sm:scale-90 scale-75 rounded-lg sm:m-2 pb-4 h-full fade50 ${params === 'home-2' ? 'flex-1' : ''} ${params === 'home-2-mob' ? '-mt-[80px]'  : ''}`}>
            <div className={`shadow-xl rounded-lg ${params === 'home-2' ? 'w-full mx-auto'  : ''} ${params === 'home-2-mob' ? 'w-full py-4'  : ''}`}>
                <div className='h-[40px] mb-[-20px] relative flex justify-center items-center'>
                    {offer.highlight ? (
                        <div className={`flex justify-center rounded-full px-8 py-2 border-2 border-white ${offer.blackFriday ? 'bg-[#D5F316]' : 'bg-sub'}`}>
                            <span className={`font-medium text-${offer.blackFriday ? 'black' : 'main'}`}>{offer.highlight}</span>
                        </div>
                    ) : null}
                </div>
                <div className={`${offer.blackFriday ? 'bg-black' : 'bg-main'} rounded-t-lg h-[130px] flex items-center justify-center`}>
                    {offer.title?.length > 3 ? (<span className='text-white sm:text-4xl text-4xl font-medium'>{offer.title}</span>) : null}
                    {offer.title?.length <= 3 ? (<span className='text-white sm:text-7xl text-6xl font-semibold'>{offer.title}</span>) : null}
                </div>
                <div className={`flex justify-center mt-[-20px] mb-[-1px] ${offer.blackFriday ? 'bg-black' : ''}`}>
                    <div className={`rounded-full bg-white py-1 px-8 border-2 border-w border-main`}>
                        <span className='text-main font-medium'>{offer.subtitle}</span>
                    </div>
                </div>

                <div className={`${offer.blackFriday ? 'bg-black' : ''}`}>

                    {offer?.services?.map((service: any) => {
                        return (
                            <>
                                {service.emphasis === true ? (
                                    <div key={service.id} className='mb-2'>
                                        <div className='flex justify-center'>
                                            <span className='text-main font-bold'>+</span>
                                        </div>
                                        <div className='flex justify-center'>
                                            <div className='flex justify-center w-[100px] rounded-full shadow-md py-1 px-2'>
                                                <img src={service.iconEmphasis} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                            </>
                        )
                    })}
                </div>

                <div className={`p-4 ${offer.blackFriday ? 'bg-black' : ''}`}>

                    {/* SERVIÇOS */}
                    <div className='mb-1'>
                        <div className='pl-4 mb-1 flex flex-col items-center'>
                            <div className='flex mb-2'>
                                <FaWifi className={`w-5 h-5 mr-2 ${offer.blackFriday ? 'text-white' : 'text-main'}`} />
                                <span className={`text-sm ${offer.blackFriday ? 'text-white' : 'text-main'}`}>{offer?.contents[0]?.name}</span>
                            </div>

                            <div className='flex mb-2'>
                                <FaTools className={`w-5 h-5 mr-2 ${offer.blackFriday ? 'text-white' : 'text-main'}`} />
                                <span className={`text-sm ${offer.blackFriday ? 'text-white' : 'text-main'}`}>{offer?.contents[1]?.name}</span>
                            </div>

                            <div className={`flex mb-2`}>
                                <FaDownload className={`w-5 h-5 mr-2 ${offer.blackFriday ? 'text-white' : 'text-main'}`} />
                                <span className={`text-sm ${offer.blackFriday ? 'text-white' : 'text-main'}`}>{offer?.contents[2]?.name}</span>
                            </div>

                            <div className={`flex mb-2`}>
                                <FaUpload className={`w-5 h-5 mr-2 ${offer.blackFriday ? 'text-white' : 'text-main'}`} />
                                <span className={`text-sm ${offer.blackFriday ? 'text-white' : 'text-main'}`}>{offer?.contents[3]?.name}</span>
                            </div>

                            <div className='flex mb-2 h-5'>
                                <span className={`text-sm ${offer.blackFriday ? 'text-white' : 'text-main'}`}>{['promo', 'promo20'].includes(offer?.contents[4]?.name) ? '' : offer?.contents[4]?.name}</span>
                            </div>
                        </div>
                    </div> 

                    {/* APP DE CONTEÚDO */}
                    <div className='mb-6'>
                        <div className='flex items-center justify-center mb-2'>
                            <div className='mb-1'>
                                <img src="https://hmg.alaresinternet.com.br/wp-content/themes/alares-PR168/assets/_dist/images/template/icon-apps.svg" alt="" className='mr-2 w-4' />
                            </div>
                            <div>
                                <span className={`${offer.blackFriday ? 'text-white' : 'text-main'} font-light`}>Apps de conteúdo:</span>
                            </div>
                        </div>

                        <div className='flex items-center justify-center flex-wrap mb-1'>
                            {offer?.services?.map((service: any, index_service: number) => {
                                return (
                                    <div>
                                        <div className='p-1' key={service.name}>
                                            <div className='w-[60px] h-[60px] rounded-full shadow-lg flex justify-center hover:scale-150'>
                                                <img src={service.icon} alt="" className='object-contain rounded-full' />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {/* <div className='h-5 w-full flex items-center justify-center'>
                                {offer?.services?.length > 3 ? (
                                    <span onClick={() => showService()} className='text-sm hover:underline text-gray-500'>Exibir mais</span>
                                ) : null}
                            </div> */}
                        </div>

                    </div>

                    {/* PREÇO */}
                    {offer?.promo === false ? (
                        <div className='mb-4'>
                            <div className='flex justify-center'>
                                <div className={`flex text-${offer.blackFriday ? 'white' : 'main'}`}>
                                    <div>
                                        <span>R$</span>
                                    </div>
                                    <div>
                                        <span className='text-5xl'>{RegexService.getWordPosition(offer.price, 0)}</span>
                                    </div>
                                    <div>
                                        <div>
                                            <span>{RegexService.getWordPrice(offer.price)}</span>
                                        </div>
                                        <div className='mt-[-4px]'>
                                            <span className='text-xs'>/mês</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='text-center mt-[-5px]'>
                                <span className='text-sub text-xs'>Na conta digital</span>
                            </div>
                        </div>
                    ) : null}

                    {offer?.promo === true ? (
                        <div className='mb-2'>
                            <div className='flex justify-center'>
                                <div className={`flex text-${offer.blackFriday ? 'white' : 'main'}`}>
                                    <div>
                                        <span>R$</span>
                                    </div>
                                    <div>
                                        <span className='text-5xl'>{RegexService.getWordPosition(offer.promo_price, 0)}</span>
                                    </div>
                                    <div>
                                        <div>
                                            <span>{RegexService.getWordPrice(offer.promo_price)}</span>
                                        </div>
                                        <div className='mt-[-4px]'>
                                            <span className='text-xs'>/mês</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='text-center mt-[-5px] mb-2'>
                                <span className={`text-${offer.blackFriday ? 'white' : 'sub'} text-xs`}>{`Por ${offer.promo_period} meses`}</span>
                            </div>

                            <div className='text-center'>
                                <span className={`text-${offer.blackFriday ? 'white' : 'main'} text-xs`}>{ `A partir do ${(Number(offer.promo_period) + 1)}º mês R$ ${offer.price}` }</span>
                            </div>
                        </div>
                    ) : null}


                    {/* CONSULTE CONDIÇÕES     */}
                    <div className='text-center mb-6'>
                        <a rel="canonical" href={navigation(0, `${'?' + String(current)}`, 'document', '')}>
                            <span className={`text-sm text-${offer.blackFriday ? 'white' : 'main'} hover:cursor-pointer hover:underline`}>{`<< Consulte condições >>`}</span>
                        </a>
                    </div>

                    <div className='flex justify-center items-center'>
                        <button onClick={() => navigateContract('/contrate-ja', offer)} className={`px-4 py-2 rounded-full border-2 hover:border-main ${offer.blackFriday ? 'bg-[#D5F316] text-black' : 'bg-sub text-main'}  hover:bg-hover hover:scale-110 w-[150px] hover:text-white`}>
                            {isLoading ? <><Loading /></> : 'Contrate Já'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
