"use client";
import { getCookie } from "cookies-next";
import React, { Suspense, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import logo from "@/img/alares-icon2.png";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import WhyUs from "@/app/components/WhyUs";
import Footer from "@/app/components/Footer";
import CardInternet from "@/app/components/cards/CardInternet";
import SkeletonCard from "@/app/components/skeleton/SkeletonCard";
import { navigation } from "@/app/services/navigation-service";
import PlanService from "@/app/services/api/plan.service";
import { hasTV } from "@/app/zustand/hasTV.zustand";
import Contact2 from "@/app/components/Contact2";
import axiosInterceptorInstance from "@/app/api/axiosInterceptor";

export default function Internet() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function getParams() {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    return `?${params}`;
  }

  return router.push(`/planos-de-internet${getParams()}`);
  const [cityName, setCityName] = useState<any | null>(null);
  const value = getCookie("city_name_uf");
  const [planList, setPlan] = useState<any[]>([]);
  const [activePlanType, setActivePlanType] = useState<string[]>([]);
  const [svaList, setSVAList] = useState<string[]>([]);
  const [planType, setPlanType] = useState("Internet");
  const [ready, setReady] = useState(false);
  const [isGamer, setIsGamer] = useState(false);
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  async function getPlan(type: string) {
    setReady(false);

    const city_id = String(getCookie("city_id"));
    const session_id = getCookie("session_id");
    const request = await PlanService.getPlan(city_id, session_id, type);
    setPlanType(type);

    if (request.status === 200) {
      const data = request.data?.plans;
      const types = request.data?.types;
      const hasTV = request.data?.hasTV;
      const isGamer = request.data?.isGamer;
      setActivePlanType(types);
      setPlan(data);
      setIsGamer(isGamer);

      setReady(true);
    }
  }

  async function getSVA() {
    const request = await axiosInterceptorInstance.get(
      "/sva/paginate-without-auth",
      {
        params: {
          isActive: null,
        },
      }
    );

    if (request.status === 200) {
      const data = request.data;
      setSVAList(data);
    }
  }

  React.useEffect(() => {
    setCityName(value);
    getPlan("Internet");
    getSVA();
  }, []);

  function mainContent() {
    return (
      <div className="flex justify-center pt-8">
        <Carousel className="hover:cursor-pointer sm:max-w-[1000px] w-full px-4 mb-4">
          <div className="hidden sm:flex justify-end">
            <CarouselPrevious className="relative top-0 right-0 mr-[-30px] text-black bg-sub rounded-none rounded-l-full hover:bg-main hover:text-white" />
            <CarouselNext className="relative top-0 right-0 mr-[-30px] text-black bg-sub rounded-none rounded-r-full hover:bg-main hover:text-white" />
          </div>
          <CarouselContent>
            {planList?.map((plan) => {
              return (
                <div className="mx-3">
                  <CarouselItem className={`basis-1/3 min-w-[250px]`}>
                    <CardInternet plan={plan} />
                  </CarouselItem>
                </div>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    );
  }

  return (
    <div>
      <div className="flex sm:hidden h-1.5 w-full bg-sub"></div>
      <div className="h-[120px] flex justify-center items-center bg-[#3C34F2]">
        <div className="w-[1000px] flex sm:justify-between justify-center items-center">
          <h2 className="flex items-center">
            <span className="text-sm font-medium text-sub">HOME</span>
            <IoIosArrowForward className="text-white" />
            <span className="text-sm text-white">
              {cityName?.toUpperCase()}
            </span>
          </h2>
          <div className="sm:flex hidden h-[120px]">
            <Image src={logo} alt={""} className="object-none h-[120px]" />
          </div>
        </div>
      </div>
      <div className="flex sm:hidden h-1.5 w-full bg-sub"></div>

      <div className="flex justify-center pt-12 pl-4 md:mb-[-45px]">
        <div className="flex w-full justify-start pl-4 sm:max-w-[1000px]">
          {activePlanType?.includes("Internet") ? (
            <div
              onClick={() => getPlan("Internet")}
              className={`mr-4 text-sm font-semibold hover:cursor-pointer p-1 hover:bg-gray-50 ${
                planType === "Internet" ? "border-b-4 border-blue-600" : ""
              }`}
            >
              <span className="sm:text-base text-xs">INTERNET</span>
            </div>
          ) : null}

          {activePlanType?.includes("Internet + Telefone") ? (
            <div
              onClick={() => getPlan("Internet + Telefone")}
              className={`mr-4 text-sm font-semibold hover:cursor-pointer p-1 hover:bg-gray-50 ${
                planType === "Internet + Telefone"
                  ? "border-b-4 border-blue-600"
                  : ""
              }`}
            >
              <span className="sm:text-base text-xs">INTERNET + TELEFONE</span>
            </div>
          ) : null}

          {isGamer ? (
            <div
              onClick={() => getPlan("Internet Gamer")}
              className={`mr-4 text-sm font-semibold hover:cursor-pointer p-1 hover:bg-gray-50 ${
                planType === "Internet Gamer"
                  ? "border-b-4 border-blue-600"
                  : ""
              }`}
            >
              <span className="sm:text-base text-xs">INTERNET GIGA</span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="min-h-[700px]">
        <div>{ready ? mainContent() : SkeletonCard()}</div>
      </div>

      <div className="lg:h-[320px] h-[550px] w-full flex relative mb-[8vh]">
        <div className="bg-[#F1F1FA] w-full h-full rounded-bl-[100px]"></div>
        <div className="bg-blue-700 w-full h-full rounded-br-[100px] lg:block hidden"></div>

        <div className="lg:flex mb-12 justify-center absolute">
          <div className=" h-[350px] p-10 sm:w-full rounded-bl-2xl flex lg:justify-end justify-center">
            <div className="pl-14 max-w-[400px]">
              <div className="mb-4">
                <span className="text-4xl">
                  Serviços <strong>digitais</strong>
                </span>
              </div>
              <div className="mb-2">
                <span className="text-sm">
                  Com a Alares, você tem os melhores aplicativos para aproveitar
                  com toda a família
                </span>
              </div>

              <div className="mb-4">
                <span className="text-sm">
                  Filmes, séries, novelas, documentários, músicas e muito mais,
                  quando quiser!
                </span>
              </div>

              <div className="flex">
                <a
                  rel="canonical"
                  href={navigation(0, `?${String(current)}`, "services", "")}
                >
                  <button className="px-6 py-1 rounded-full text-black bg-sub hover:bg-hover hover:scale-110 hover:text-white">
                    Contrate já
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="lg:bg-opacity-0 bg-blue-700">
            <img
              src="https://storage.googleapis.com/alaresspace/Site%20Alares/Banners/Est%C3%A1ticas/banner-conteudos.webp"
              alt=""
            />
            {/* <Image src={bannerConteuds} alt={''} className='w-full ' /> */}
          </div>
        </div>
      </div>

      <div className="lg:mb-[100px] mb-[120px]  md:block hidden">
        <Carousel
          className="w-full hover:cursor-pointer"
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 1500,
            }),
          ]}
        >
          <CarouselContent>
            {svaList?.map((sva: any) => {
              return (
                <div className="mx-3">
                  <CarouselItem className={`basis-1/3`}>
                    <img
                      src={sva.image}
                      alt=""
                      className="h-[120px] min-w-[120px] object-contain rounded-lg"
                    />
                  </CarouselItem>
                </div>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex md:hidden justify-center flex-wrap">
        {svaList?.map((sva: any) => {
          return (
            <div className="mx-3">
              <img
                src={sva.image}
                alt=""
                className="h-[80px] min-w-[80px] object-contain rounded-lg"
              />
            </div>
          );
        })}
      </div>

      <div>
        <WhyUs />
      </div>

      <div>
        <Contact2 />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
