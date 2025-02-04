
'use client'
import React, { useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Logo from "./Logo/Logo";
import Loading from "./loadings/Loading";
import axiosInterceptorInstance from "../api/axiosInterceptor";
import { getCookie } from "cookies-next";
import Skeleton from "./skeleton/Skeleton";


export default function BannerTV() {
    const [isLoading, setIsLoading] = useState(true);
    const [bannerList, setBannerList] = useState<any[]>([]);

    async function getBanner() {

        const city_id = getCookie('city_id');
        const TV_type = 2;

        try {
            const request: any = await axiosInterceptorInstance.get(`/banner/get-banner-by-city/${city_id}`, {
                params: {
                    type: TV_type
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

    async function openLink(url: any) {
        window.open(url, '_blank')
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
                    >
                        {bannerList?.map((banner, index) => {
                            return (
                                <SwiperSlide key={index} onClick={() => { openLink(banner.path) }} className="hover:opacity-90 hover:cursor-pointer">
                                    <img alt="Logo Alares Internet"
                                        src={banner.image}
                                        className="w-full sm:flex hidden" />
                                    <img
                                        alt="Logo Alares Internet"
                                        src={banner.imageMobile}
                                        className="w-full sm:hidden flex" />
                                </SwiperSlide>
                            )
                        })}

                    </Swiper>
                </div>
            )}
        </div>
    )
}
