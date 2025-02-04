'use client'
import React from 'react'
import axiosInterceptorInstance from '../api/axiosInterceptor'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { navigation } from '../services/navigation-service'
import { useSearchParams } from 'next/navigation'

interface props {
    standart?: React.ReactNode
}

export default function SVA({ standart = true }: props) {
    const [SVAList, setSVA] = React.useState<any[]>([]);
    const [autoPlay, setAutoPlay] = React.useState<any>({});
    const searchParams = useSearchParams();
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    async function getSVA() {

        const request = await axiosInterceptorInstance.get('/sva/paginate-without-auth', {
            params: {
                isActive: null
            }
        })

        if (request.status === 200) {
            const data = request.data;
            setSVA(data)
        }
    }



    React.useEffect(() => {

        if (standart) {
            setAutoPlay({
                // loop: true
            })
        }

        getSVA();
    }, [])

    return (
        <div className='pt-4'>
            {standart ? (
                <div className='text-center p-2 mb-4'>
                    <h2 className='text-main text-4xl'>Serviços Adicionais</h2>
                </div>
            ) : null}

            <div className='min-h-[300px] sm:flex justify-center'>
                <Carousel className='lg:w-[1000px] max-w-[90vw] hover:cursor-pointer select-none'
                /* plugins={[
                    Autoplay(autoPlay),
                ]} */
                //    Desabilitado a pedido do Marketing
                >
                    <CarouselContent>
                        {SVAList?.map((sva, index) => {
                            return (
                                <CarouselItem className='lg:basis-1/3'>
                                    <a rel="canonical" href={navigation(0, `${'?' + String(current)}`, 'sva', sva?.slug)}>
                                        <div key={index} className='mb-10 flex flex-col items-center rounded-md'>
                                            <div className='flex justify-center items-center w-32 h-32'>
                                                <img src={sva.image} alt="" className='w-32 h-32 object-contain rounded-md' />
                                            </div>
                                            <div className='text-center max-w-[300px] p-2 text-main text-sm'>
                                                <div dangerouslySetInnerHTML={{ __html: sva.description }}></div>
                                            </div>
                                        </div>
                                    </a>
                                </CarouselItem>
                            )
                        })}
                    </CarouselContent>
                    <CarouselPrevious className='text-main lg:flex hidden' />
                    <CarouselNext className='text-main lg:flex hidden' />
                </Carousel>

            </div>
        </div>
    )
}
