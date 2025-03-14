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
import ModalCardMobile from '../ModalCardMobile';


export default function CardHomeMobile({ offer, params }: any) {

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
        <div key={offer.id} className={`w-full pt-[30px]`}>
            <div className={`relative rounded-br-[30px] border border-[#e2e2f4] bg-[#f1f1fa] flex flex-col gap-y-2 px-[20px] py-[13px]`}>
                <div className='flex justify-center items-center absolute left-[-3px] top-[-20px] '>
                    {offer.highlight ? (
                        <div className={`flex justify-center rounded-br-[50px] pl-[15px] pr-[25px] py-2 border-2 border-white bg-main`}>
                            <span className={`font-[700] text-white text-[13px]`}>{offer.highlight}</span>
                        </div>
                    ) : null}
                </div>
                <div className='flex justify-between items-center pb-[14px] pt-[16px]'>
                    <div className='flex flex-col gap-y-[12px]'>
                        <div className={`flex items-center justify-start gap-2`}>
                            {offer.title?.length > 3 ? (<span className='text-[#363643] text-[28px] font-[700]'>{offer.title}</span>) : null}
                            {offer.title?.length <= 3 ? (<span className='text-[#363643]  text-[28px] font-[700]'>{offer.title}</span>) : null}
                            <span className='text-[#363643] text-[28px] font-[400]'>{offer.subtitle}</span>
                        </div>

                        {/* SERVIÇOS */}
                        
                        <div className=' flex flex-col items-start gap-y-2'>
                            <div className='flex'>
                                <FaWifi className={`w-[13px] h-[13px] mr-2 ${offer.blackFriday ? 'text-white' : 'text-main'}`} />
                                <span className={`text-xs ${offer.blackFriday ? 'text-white' : 'text-main'}`}>{offer?.contents[0]?.name}</span>
                            </div>

                            <div className='flex'>
                                <FaTools className={`w-[13px] h-[13px] mr-2 ${offer.blackFriday ? 'text-white' : 'text-main'}`} />
                                <span className={`text-xs ${offer.blackFriday ? 'text-white' : 'text-main'}`}>{offer?.contents[1]?.name}</span>
                            </div>
                        </div>

                    </div>

                    <div className='h-[99px] border-r border-[#CFCFF0] self-center'></div>

                    {/* PREÇO */}
                    {offer?.promo === false ? (
                        <div className=''>
                            <div className='flex flex-col justify-center'>
                                <div className={`flex text-black`}>
                                    <div className='flex items-center'>
                                        <span className='text-[18px] font-[700]'>R$</span>
                                    </div>
                                    <div>
                                        <span className='text-[38px] font-[400]'>{RegexService.getWordPosition(offer.price, 0)}</span>
                                    </div>
                                    <div className='flex flex-col items-start justify-center'>
                                        <div>
                                            <span className='text-[16px] font-[700]'>{RegexService.getWordPrice(offer.price)}</span>
                                        </div>
                                        <div className='flex align-start'>
                                            <span className='text-[10px] text-[#B5B5B5] font-bold'>mês</span>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className='text-center mt-[-15px]'>
                                <span className='text-[#646471] text-[10px] font-[400]'>Na conta digital</span>
                            </div>
                            <ModalCardMobile buttonText='ver detalhes' offer={offer} className="transition-all duration-300 ease-in-out" />
                        </div>
                    ) : null}

                    {offer?.promo === true ? (
                        <div className=''>
                            <div className='flex flex-col justify-center'>
                                <div className={`flex text-black`}>
                                    <div className='flex items-center'>
                                        <span className='text-[18px] font-[700]'>R$</span>
                                    </div>
                                    <div>
                                        <span className='text-[38px] font-[400]'>{RegexService.getWordPosition(offer.price, 0)}</span>
                                    </div>
                                    <div className='flex flex-col items-start justify-center'>
                                        <div>
                                            <span className='text-[16px] font-[700]'>{RegexService.getWordPrice(offer.price)}</span>
                                        </div>
                                        <div className='flex align-start'>
                                            <span className='text-[10px] text-[#B5B5B5] font-bold'>mês</span>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className='text-center mt-[-15px]'>
                                <span className='text-[#646471] text-[10px] font-[400]'>Na conta digital</span>
                            </div>
                            <ModalCardMobile buttonText='ver detalhes' offer={offer} className="transition-all duration-300 ease-in-out" />
                        </div>
                    ) : null}

                </div>
                {/* APP DE CONTEÚDO */}
                    <div className='flex flex-row gap-x-2 border-t border-[#CFCFF0] pt-[10px]'>
                        <div className='flex items-center justify-center mb-2'>
                            <div>
                                <span className={`font-[600] text-[#363643] text-[14px]`}>Inclusos:</span>
                            </div>
                        </div>

                        <div className='flex items-center justify-start flex-nowrap mb-1 gap-2 overflow-x-hidden [&::-webkit-scrollbar]:hidden'>
                            {offer?.services?.map((service: any, index_service: number) => {
                                return (
                                    <>
                                        {service.emphasis === true ? (                                            
                                            <div key={service.id} className=''>
                                                <div className='flex justify-center'>
                                                    <div className='flex justify-center w-[100px] rounded-full py-1 px-2 bg-white'>
                                                        <img src={service.iconEmphasis} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : 
                                        <div>
                                            <div className='' key={service.name}>
                                                <div className='w-[35px] h-[35px] rounded-full flex justify-center border-3 border-white bg-white'>
                                                    <img src={service.icon} alt="" className='object-contain rounded-full' />
                                                </div>
                                            </div>
                                        </div>
                                        }
                                    </>
                                    
                                )
                            })}
                        </div>

                    </div>

                <div className={` ${offer.blackFriday ? 'bg-black' : ''}`}>
                    


                    {/* CONSULTE CONDIÇÕES     */}
                    {/* <div className='text-center mb-6'>
                        <a rel="canonical" href={navigation(0, `${'?' + String(current)}`, 'document', '')}>
                            <span className={`text-sm text-${offer.blackFriday ? 'white' : 'main'} hover:cursor-pointer hover:underline`}>{`<< Consulte condições >>`}</span>
                        </a>
                    </div> */}

                    <div className='flex justify-center items-center absolute left-24 z-10'>
                        <button onClick={() => navigateContract('/contrate-ja', offer)} className={`px-4 pb-2 pt-4 rounded-full w-[150px] bg-[#00F3A8] text-[#363643] border border-[#e2e2f4] font-[700] text-[13px] `}>
                            {isLoading ? <><Loading /></> : 'Contrate Já'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
