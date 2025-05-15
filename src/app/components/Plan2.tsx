"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";

import SkeletonCard from "./skeleton/SkeletonCard";
import React, { useState } from "react";
import CardOffer from "./cards/CardOffer";
import CardHomeMobile from "./cards/CardHomeMobile";
import PlanService from "../services/api/plan.service";

import { useRouter } from "next/navigation";

export default function Plan2({ plan_type }: any) {
  const router = useRouter();
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

    setActived(index);
  }
  async function getPlan() {
    const city_id = String(getCookie("city_id"));
    const session_id = getCookie("session_id");
    const request = await PlanService.getPlan(city_id, session_id);
    let array: any = [];
    let highlighs: any = [];

    if (request.status >= 400) {
      toast.error("Plan error");
      return;
    }
    if (request.status === 200) {
      const data = request.data?.plans;

      data?.map((d: any) => {
        d.showService = false;
      });

      const filteredAndSortedOffers = getOffersWithCardClassification(data);
      setPlan(filteredAndSortedOffers);
      setReady(true);
    }
  }
  function getOffersWithCardClassification(
    data: { classification: { description: string }[] }[]
  ) {
    return data
      .map((offer) => ({
        ...offer,
        classification: offer.classification.filter((classification) =>
          classification.description.includes("CARD")
        ),
      }))
      .filter((offer) => offer.classification.length > 0)
      .sort((a, b) => {
        const numA =
          parseInt(
            a.classification[0].description.replace("CARD", "").trim()
          ) || 0;
        const numB =
          parseInt(
            b.classification[0].description.replace("CARD", "").trim()
          ) || 0;
        return numA - numB;
      });
  }

  function checkDisplay() {
    const width = window.innerWidth;

    if (width > 1000) {
      setCount(4);
    } else {
      setCount(1);
    }
  }

  React.useEffect(() => {
    getPlan();
    checkDisplay();

    window.addEventListener(
      "resize",
      function (event) {
        checkDisplay();
      },
      true
    );
  }, []);

  function mainContent() {
    return (
      <>
        {planList?.length > 0 ? (
          <section className="mb-20 max-w-[95vw] mx-auto">
            <div className="flex justify-between items-center pt-4 max-w-[1120px] mx-auto">
              <h2 className="text-2xl lg:text-4xl text-offer drop-shadow-sm text-left ">
                Nossas Ofertas
              </h2>
              <div
                onClick={() => router.push(`/planos-de-internet`)}
                className={`flex text-sm font-semibold hover:cursor-pointer p-2 sm:px-8 sm:py-4 max-[450px]:h-12 text-[#b8b8b8] border-[#b8b8b8] border-b-2 bg-transparent items-center`}
              >
                <span className="text-xs">VER MAIS</span>
              </div>
            </div>
          
            <div className="hidden lg:flex justify-center px-4 hover:cursor-pointer select-none mt-6">
              <div className="lg:w-[1200px] w-[200px] h-full]">
                <div className="flex justify-start">
                  {planList?.map((offer: any, index) => {
                    return (
                      <>
                        <CardOffer offer={offer} params={plan_type} />
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            {plan_type === 'home-2' && (
              <div className="flex lg:hidden justify-start hover:cursor-pointer select-none h-[300px]">
                <div className="lg:w-[1000px] w-full ">
                  <Swiper
                  className="h-[300px]"
                  modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                  spaceBetween={25}
                  slidesPerView={1.2}
                  navigation={false}
                  centeredSlides={false}
                  pagination={false}
                  onSwiper={(swiper) => setActiveSlide(swiper)}
                  onSlideChange={(swiper) => {}}
                >
                  {planList?.map((offer: any, index) => {
                    return (
                      <SwiperSlide
                        key={index}
                        className="pt-2b py-3"
                      >
                        <CardHomeMobile offer={offer} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
            )}
            {plan_type === 'home' && (
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
            )}
          </section>
        ) : (
          <>
            <div className="flex justify-center h-[300px] items-center">
              <span className="text-2xl">Nenhuma oferta encontrada</span>
            </div>
          </>
        )}
      </>
    );
  }

  return <>{ready ? mainContent() : SkeletonCard()}</>;
}
