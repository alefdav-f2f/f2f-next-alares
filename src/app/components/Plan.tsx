'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import DataLayerService from '../services/api/datalayer.service';
import SkeletonCard from './skeleton/SkeletonCard';
import React, { useState } from "react";
import CardOffer from "./cards/CardOffer";
import PlanService from "../services/api/plan.service";
import { hasTV } from "../zustand/hasTV.zustand";

export default function Plan({ plan_type }: any) {

  const searchParams = useSearchParams();
  const [activedSlide, setActived] = useState(1);
  const [ready, setReady] = useState(false);
  const [displayCount, setCount] = useState(3);
  const [planList, setPlan] = useState<any[]>([]);

  function getParams() {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete('plano')
    return `?${params}`;
  }

  function setActiveSlide(swiper: any) {

    const index = swiper.activeIndex;

    setActived(index)
  }

  async function getPlan() {
    const city_id = String(getCookie('city_id'));
    const session_id = getCookie('session_id')
    const request = await PlanService.getPlan(city_id, session_id)
    let array: any = [];
    let highlighs: any = [];

    if (request.status >= 400) {
      toast.error('Plan error')
      return
    }

    if (request.status === 200) {
      const data = request.data?.plans;

      data?.map((d: any) => {
        d.showService = false;
        d.blackFriday = checkBlackFriday(d);
      })

      setPlan(data);
      setReady(true);
    }
  }

  function checkDisplay() {

    const width = window.innerWidth;

    if (width > 1000) {
      setCount(3)
    } else {
      setCount(1)
    }
  }


  React.useEffect(() => {

    getPlan()
    checkDisplay();

    window.addEventListener('resize', function (event) {
      checkDisplay();
    }, true)
  }, [])


  function checkFilterPlan(offer: any) {

    if (plan_type === 'home' && offer.type === 'Internet') {
      return true;
    }

    if (plan_type === 'internet-tv' && offer.type === 'Internet + TV') {
      return true;
    }
  }

  function checkBlackFriday(offer: any) {
    if (offer.classification.length > 0) {
        return offer.classification.some((element: any) => 
            element.description.includes('blacknovember')
        );
    }
    return false;
}



  function mainContent() {
    return (
      <>
        {planList?.length > 0 ? (
          <section className='mb-10 max-w-[95vw]'>
            <div className='flex justify-center px-2 pt-4'>
              <h2 className='text-4xl text-offer drop-shadow-sm'>Nossas ofertas</h2>
            </div>

            <div className='flex justify-center'>
              {plan_type === 'internet-tv' ? (
                <button className='rounded-full py-1 px-5 bg-main text-white border border-sub'>
                  Internet + TV
                </button>
              ) : null}
            </div>

            <div className='hidden lg:flex justify-center px-4 hover:cursor-pointer select-none'>
              <div className='lg:w-[1000px] w-[200px] h-full]'>
                <Carousel>
                  <CarouselContent>
                    {planList?.map((offer: any, index) => {
                      return (
                        <>
                          {checkFilterPlan(offer) ? (
                            <CarouselItem key={index} className='sm:pb-8 pb-8 sm:basis-1/3 h-full'>
                              <CardOffer offer={offer} path={getParams()} />
                            </CarouselItem>
                          ) : null}
                        </>
                      )
                    })}
                  </CarouselContent>
                  <CarouselPrevious className='text-main' />
                  <CarouselNext className='text-main' />
                </Carousel>
              </div>
            </div>

            <div className='flex lg:hidden justify-center p-4 hover:cursor-pointer select-none'>
              <div className='lg:w-[1000px] w-[375px] h-full mt-[-90px] '>
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                  spaceBetween={2}
                  slidesPerView={displayCount}
                  navigation
                  pagination={{ clickable: true }}
                  onSwiper={(swiper) => setActiveSlide(swiper)}
                  onSlideChange={(swiper) => { }}
                >
                  {planList?.map((offer: any, index) => {
                    return (
                      <SwiperSlide key={index} className='px-2 pt-2 max-w-[400px] h-full'>
                        <CardOffer offer={offer} path={getParams()} />
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </div>
            </div>
          </section>
        ) : (
          <>
            <div className='flex justify-center h-[300px] items-center'>
              <span className='text-2xl'>Nenhuma oferta encontrada</span>
            </div>
          </>
        )}
      </>
    )
  }

  return (
    <>
      {ready ? mainContent() : SkeletonCard()}
    </>
  )

}
