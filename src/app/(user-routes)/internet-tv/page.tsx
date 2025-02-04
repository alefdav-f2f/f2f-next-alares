'use client'
import React, { useState } from 'react'
import Icon_6 from "@/img/icon/icon-internet-tv.svg";
import Image from 'next/image';
import Plan from '@/app/components/Plan';
import Contact from '@/app/components/Contact';
import Footer from '@/app/components/Footer';
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import PageTitle from '@/app/components/PageTitle';
import BannerTV from '@/app/components/BannerTV';
import { getCookie } from 'cookies-next';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import toast from 'react-hot-toast';
import { Badge } from "@/components/ui/badge"
import mini_banner_1 from "@/img/banners/mini-banner-1.jpg"
import mini_banner_2 from "@/img/banners/mini-banner-2.jpg"
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { internalPATH } from '@/app/api/internalPATH';

export default function page() {

  const [planList, setPlanList] = React.useState<any[]>([]);
  const [categoryList, setCategory] = React.useState<any[]>([]);
  const [channelList, setChannelList] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [display, setDisplay] = useState(false);
  const cityName = getCookie('city_name_uf');
  const city_id = getCookie('city_id');
  const [selectedPlan, setSelectedPlan] = React.useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  async function getPlan() {
    const request = await axiosInterceptorInstance.get('/plan-tv/get-tv-plans-by-city', {
      params: {
        isActive: null,
        cityId: city_id
      }
    })

    if (request.status === 200) {
      const data = request.data?.tvPlans;
      const selected = data[0].id ? String(data[0].id) : '';
      setPlanList(data);
      getCategory(selected);

    }
  }

  async function getCategory(plan_id: string) {

    setSelectedPlan(plan_id);

    const request = await axiosInterceptorInstance.get('/category-channel/get-all', {
      params: {
        isActive: null,
        selected_plan_id: plan_id
      }
    })

    if (request.status === 200) {
      const data = request.data;

      data.map((d: any) => {
        d.selected = true;
      })

      setCategory(data);
    }
  }


  async function checkTV() {

    const request = await axiosInterceptorInstance.get(`/plan/check-plan-tv/${city_id}`);

    const data = request?.data?.status;
    if (data) {
      setDisplay(true)
      setIsLoading(false)
    } else {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      router.push(`./${internalPATH.home}?${params}`)
    }
  }

  async function activeCategory(index: number) {

    const array = [...categoryList];

    array[index].selected = !array[index].selected;

    setCategory(array)
  }


  React.useEffect(() => {
    checkTV();
    getPlan();
  }, [])


  return (
    <div>
      {isLoading ? (
        <div className='h-[300px] flex justify-center items-center'>
          <div>
            <div className="mb-4">
              <LoadingAlares />
            </div>
            <span className='text-gray-500'>Buscando planos de TV ...</span>
          </div>
        </div>
      ) : (
        <div>
          {display ? (
            mainContent()
          ) : (
            noPlanToCity()
          )}
        </div>
      )}
    </div>
  )

  function mainContent() {
    return (
      <div>
        <PageTitle icon={Icon_6} title='Planos de Internet + TV' />

        <div className='mb-4'>
          <BannerTV />
        </div>

        <div className='mb-4'>
          <Plan plan_type="internet-tv" />
        </div>


        <div className='mb-12 p-4'>
          <div className='text-main text-center mb-6'>
            <span className='text-4xl'>Grade de canais</span><br />
            <span className='font-light'>Compra os canais disponíveis em nossos planos</span>
          </div>

          <div className='flex justify-center px-10 mb-4'>
            <div className='lg:max-w-[800px] max-w-[99vw] w-full flex justify-center flex-wrap'>
              {planList?.map((plan) => {
                return (
                  <button onClick={() => { getCategory(plan.id) }} type="button" className={`mr-2 border-sub font-medium rounded-full text-sm px-5 py-1 text-center me-2 mb-2 ${plan.id === selectedPlan ? 'text-white bg-main hover:bg-hover' : 'text-main bg-white hover:bg-gray-200 border border-secondary'}`}>
                    {plan.name}
                  </button>
                )
              })}
            </div>
          </div>

          <div className='flex justify-center'>
            <div className='lg:w-[1000px] w-[99vw]'>
              <div className='w-full bg-main h-[1px] mb-8'></div>

              <div className='flex justify-center flex-wrap mb-8'>
                {categoryList?.map((category: any, index) => {
                  return (
                    <div>
                      {category?.Channel?.length > 0 ? (
                        <Badge onClick={() => activeCategory(index)} key={index} variant="outline" className={`mr-2 font-normal hover:cursor-pointer hover:bg-sub px-4 py-1 mb-1 ${category.selected === true ? 'bg-main text-white' : 'text-main'}`}>{category.name}</Badge>
                      ) : null}
                    </div>
                  )
                })}
              </div>

              <div className='flex justify-center'>
                <div className='max-w-[750px] w-full p-4'>
                  {categoryList?.map((category: any, index: number) => {
                    return (
                      <div className='fade50'>
                        {category.selected === true && category?.Channel?.length > 0 ? (
                          <div className='mb-8 border-b-[1px] border-main'>
                            <div className='mb-1'>
                              <span className='text-main text-lg'>{category.name}</span>
                            </div>

                            <div className='flex flex-wrap justify-start mb-2'>
                              {category?.Channel?.map((channel: any) => {
                                return (
                                  <>
                                    {channel.channelCategoryId === category.id ? (
                                      <div className='max-w-[120px] mr-4 p-2'>
                                        <img src={channel.image} alt={'channel.name'} title={channel.name} className={`rounded-lg lg:w-[90px] w-[50px] lg:h-[90px] h-[50px] object-contain ${channel.oppacity ? '' : 'opacity-20 grayscale'}`} />
                                      </div>
                                    ) : null}
                                  </>
                                )
                              })}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

          </div>

        </div>

        <Footer/>
      </div>
    )
  }

  function noPlanToCity() {
    return (
      <div className='h-[50vh] flex justify-center items-center'>
        <div>
          <div>
            <span>Sem planos de TV disponíveis para {cityName}</span>
          </div>
        </div>
      </div>
    )
  }

}
