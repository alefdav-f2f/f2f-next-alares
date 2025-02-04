
'use client'
import React, { useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import axiosInterceptorInstance from "../api/axiosInterceptor";
import { getCookie } from "cookies-next";
import Skeleton from "./skeleton/Skeleton";
import DataLayerService from "../services/api/datalayer.service";
import { useSearchParams } from "next/navigation";
import { internalPATH } from "../api/internalPATH";

interface bannerProps {
    type: number
}


export default function Banner({ type }: bannerProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [bannerList, setBannerList] = useState<any[]>([]);
    const searchParams = useSearchParams();

    function sendDataLayer(banner: any, index: number) {
        const data = {
            event: 'select_promotion',
            ecommerce: {
                creative_name: String(banner.image),
                creative_slot: String(index +1),
                promotion_id: String(banner.path),
                promotion_name: String(banner.path),
                city: String(getCookie('city_name')),
                state: String(getCookie('uf_name')),
            }
        }

        console.log(data)
        DataLayerService.sender(data)
    }

    async function getBanner() {

        const city_id = getCookie('city_id');

        try {
            const request: any = await axiosInterceptorInstance.get(`/banner/get-banner-by-city/${city_id}`, {
                params: {
                    type: type
                }
            })

            if (request.status >= 200) {
                const data = request.data.banners;
                setBannerList(data)
                setIsLoading(false)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    function getParams() {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        return `?${params}`;
    }

    function getNavigation(banner: any) {
        
        const type = banner?.redirection_type;

        switch(type) {
            // Redirecionamento externo
            case 1: {
                return String(`${banner.path}`);
            }
            // Redirecionamento interno
            case 2: {
                return String(`${banner.path}?city=${getCookie('city_slug')}`);
            }
            // Redirecionamento para Contrate-já
            case 3: {
                return String(`${internalPATH.contrate_ja}?city=${getCookie('city_slug')}&plano=${banner.path}`);
            }
        }
    }

    React.useEffect(() => {
        getBanner()
    }, [])

    return (
        <div>
            {isLoading ? (
                <div className="p-4">
                    <div className="flex mb-2">
                        <Skeleton className="rounded-xl w-full h-[100px] mb-1" />
                    </div>
                    <div className="flex mb-2">
                        <Skeleton className="rounded-xl w-full h-[100px] mb-1" />
                    </div>
                    <div className="flex mb-2">
                        <Skeleton className="rounded-xl w-full h-[100px] mb-1" />
                    </div>
                </div>
            ) : (
                <div>
                    <Swiper
                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        onSwiper={(swiper) => console.log()}
                        onSlideChange={() => console.log()}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                    >
                        {bannerList?.map((banner, index) => {
                            return (
                                <SwiperSlide key={index} onClick={() => { sendDataLayer(banner, index) }} className="hover:opacity-90 hover:cursor-pointer fade75">
                                    <a rel="canonical" href={`${getNavigation(banner)}`}>
                                        <img alt="Logo Alares Internet"
                                            src={banner.image}
                                            className="w-full sm:flex hidden" />
                                        <img
                                            alt="Logo Alares Internet"
                                            src={banner.imageMobile}
                                            className="w-full sm:hidden flex" />
                                    </a>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            )}
        </div>
    )
}
