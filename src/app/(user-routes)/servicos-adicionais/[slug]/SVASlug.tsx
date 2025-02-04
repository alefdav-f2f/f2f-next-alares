"use client"
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import Image from 'next/image';
import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io';
import logo from '@/img/alares-icon2.png'
import secondBannerText from '@/img/banners/segundo-banners-interno-1.png';
import secondBannerTextMobile from '@/img/banners/segundo-banners-interno-mobile-1.png';
import thirdBannerText from '@/img/banners/terceiro-banners-interno.png';
import thirdBannerTextMobile from '@/img/banners/terceiro-banners-interno-mobile.png';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Contact from '@/app/components/Contact';
import { useRouter } from 'next/navigation';
import { internalPATH } from '@/app/api/internalPATH';
import { navigation } from '@/app/services/navigation-service';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import CardInternet from '@/app/components/cards/CardInternet';
import SkeletonCard from '@/app/components/skeleton/SkeletonCard';
import PlanService from '@/app/services/api/plan.service';
import { getCookie } from 'cookies-next';
import Footer from '@/app/components/Footer';
import Contact2 from '@/app/components/Contact2';


export default function SVASlug({ sva_slug }: any) {

  const [isLoading, setLoading] = useState(true);
  const [isLoadingPlan, setLoadingPlan] = useState(true);
  const [showPlan, setShowPlan] = useState(true);
  const [svaData, setSvaData] = useState<any>('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [planList, setPlan] = useState<any[]>([]);

  function getParams() {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    return `?${params}`;
  }

  async function getSVADetail() {

    setLoading(true);

    const response = await axiosInterceptorInstance(`sva/get-by-slug/${sva_slug}`);

    if (response.status >= 200) {
      const data = response.data;
      setSvaData(data)
      setLoading(false);
      getPlan(data.external_id, data)
    } else {
      router.replace(`./${navigation(7, getParams(), '')} `)
    }

  }

  async function getPlan(external_id: any, sva: any) {
    const city_id = String(getCookie('city_id'))
    const session_id = getCookie('session_id')
    const response = await PlanService.getPlan(city_id, session_id);

    if (response) {

      let array: any = [];
      const plans = response?.data?.plans;
      console.log(plans)

      setTimeout(() => {
        plans?.map((plan: any) => {
          plan?.services?.map((service: any) => {
            if (String(service.icon) === String(external_id)) {
              array.push(plan);
            }
          })
        })

        if (array?.length === 0) {
          setShowPlan(false)
        }

        setPlan(array);
        setLoadingPlan(false);
      }, 1000)


    }
  }

  React.useEffect(() => {
    getSVADetail();
  }, [])

  function planContent() {
    return (
      <>
        <Carousel className='hover:cursor-pointer sm:max-w-[1000px] w-full px-4'>
          <div className='hidden sm:flex justify-end'>
            <CarouselPrevious className='relative top-0 right-0 mr-[-30px] text-black bg-sub rounded-none rounded-l-full hover:bg-main hover:text-white' />
            <CarouselNext className='relative top-0 right-0 mr-[-30px] text-black bg-sub rounded-none rounded-r-full hover:bg-main hover:text-white' />
          </div>
          <CarouselContent>
            {planList?.map((plan) => {
              return (
                <div className='mx-3'>
                  <CarouselItem className={`basis-1/3 min-w-[250px]`}>
                    <CardInternet plan={plan} />
                  </CarouselItem>
                </div>
              )
            })}
          </CarouselContent>
        </Carousel>
      </>
    )
  }

  function svaContent() {
    return (
      <div>
        <div className='h-[120px] flex justify-center items-center bg-[#3C34F2] relative'>
          <div className='w-[1000px] flex sm:justify-between justify-center items-center '>
            <div className='flex items-center'>
              <div>
                <div className='flex items-center'>
                  <span className='text-sm font-medium text-sub'>HOME</span>
                  <IoIosArrowForward className='text-white' />
                  <span className='text-sm text-white'>SERVIÇOS ADICIONAIS</span>
                </div>
                <div>
                  <span className='text-4xl text-white'>{svaData.name}</span>
                </div>
              </div>
            </div>
            <div className='sm:flex hidden h-[120px] absolute right-20'>
              <Image src={logo} alt={''} className='w-[300px] object-cover' />
            </div>
          </div>
        </div>

        <div className='mb-10'>
          <img src={svaData.banner} alt="" className='sm:block hidden w-full' />
          <img src={svaData.bannerMobile} alt="" className='block sm:hidden w-full' />
        </div>

        {/* <div className='flex justify-center p-4'>
          <div className='w-full max-w-[1000px]'>
            <h2 className='text-4xl'>Planos com <strong>{svaData.name}</strong></h2>
          </div>
          <div className='px-10'>
            <Carousel>
              <CarouselContent>
                <CarouselItem>...</CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div> */}

        {showPlan ? (
          <div className='flex justify-center mb-4'>
            <div className='max-w-[1000px] w-full p-2'>
              <div className='flex justify-between items-center mb-8'>
                <div>
                  <span className='text-3xl'>Planos com <strong>{svaData.name}</strong></span>
                </div>
                <div>
                  <a rel="canonical" href={`/${internalPATH.internet}`}>
                    <button className='bg-sub px-4 py-2 text-black text-sm font-semibold rounded-full hover:bg-hover hover:text-white'>
                      MAIS PLANOS
                    </button>
                  </a>
                </div>
              </div>

              <div>
                {isLoadingPlan ? SkeletonCard() : planContent()}
              </div>
            </div>
          </div>
        ) : null}



        <div className='mb-10'>
          <div className='relative flex items-center'>
            <div className='absolute flex justify-center w-full max-w-screen p-4'>
              <span className='text-white font-medium'>{svaData.description}</span>
            </div>
            <img src={svaData.bannerText} alt="" className='lg:h-full h-[200px]  w-full object-cover' />
          </div>
        </div>

        {svaData?.questions?.length > 0 ? (
          <div className='flex justify-center'>
            <div className='w-[1000px] lg:flex p-4'>
              <div>
                <img src="https://storage.googleapis.com/alaresspace/Site%20Alares/src/img-woman-faq.png" alt="" className='lg:w-[400px]' />
              </div>
              <div className='p-4'>
                <div className='mb-8'>
                  <span className='text-2xl'>Tire aqui <strong>suas dúvidas</strong></span>
                </div>
                <div className='w-[400px]'>
                  {svaData.questions?.map((question: any, index: number) => {
                    return (
                      <Accordion key={index} type="single" collapsible className='mb-2'>
                        <AccordionItem value="item-1" className='border-none'>
                          <div className='flex items-center mb-2'>
                            <AccordionTrigger className='mr-2 bg-sub text-black rounded-full p-2 flex justify-center'></AccordionTrigger>
                            <span className='text-gray-500 font-bold'>{question.order}. {question.question}</span>
                          </div>
                          <AccordionContent className='w-full h-full'>
                            <div className='bg-white w-full h-full border whitespace-pre-wrap border-gray-200 rounded-br-[40px] p-4'>
                              <div dangerouslySetInnerHTML={{ __html: question.answer }}></div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className='mb-10'>
          <div className='relative flex items-center'>
            <div className='absolute flex justify-center w-full'>
              <span className='text-white text-2xl'>Ainda não tem <strong>{svaData.name}</strong> ?</span>
            </div>
            <Image src={secondBannerText} alt={''} className='sm:block hidden w-full' />
            <Image src={secondBannerTextMobile} alt={''} className='block sm:hidden w-full' />
          </div>
        </div>

        <div className='p-4'>
          <div className='text-center'>
            <span className='text-3xl'>Como acessar <strong>{svaData.name}</strong></span>
          </div>

          <div className='mb-10'>
            <div className='flex justify-center pt-10'>
              <Carousel className='hover:cursor-pointer sm:max-w-[1000px] w-full px-4'>
                <div className='hidden sm:flex justify-end'>
                  <CarouselPrevious className='relative top-0 right-0 mr-[-30px] text-black bg-sub rounded-none rounded-l-full hover:bg-main hover:text-white' />
                  <CarouselNext className='relative top-0 right-0 mr-[-30px] text-black bg-sub rounded-none rounded-r-full hover:bg-main hover:text-white' />
                </div>
                <CarouselContent>
                  {svaData?.sva_steps?.map((step: any, index: number) => {
                    return (
                      <div key={index} className='mx-3'>
                        <CarouselItem className={`basis-1/3 min-w-[250px]`}>
                          <div className='w-[230px] relative mr-2'>
                            <div className='absolute py-1 px-8 bg-[#F1F1FA] rounded-br-[40px]'>
                              <span>{step.title}</span>
                            </div>
                            <div className=' bg-white border-2 border-[#F1F1FA] mb-2'>
                              <img src={step.image} alt="" />
                            </div>
                            <div className='bg-[#F1F1FA] p-4 text-center rounded-br-[30px]'>
                              <div dangerouslySetInnerHTML={{ __html: step.description }}></div>
                            </div>
                          </div>
                        </CarouselItem>

                      </div>
                    )
                  })}
                </CarouselContent>

              </Carousel>
            </div>
          </div>

        </div>

        <div className='mb-10'>
          <div className='relative flex items-center w-screen'>
            <Image src={thirdBannerText} alt={''} className='sm:block hidden w-full' />
            <Image src={thirdBannerTextMobile} alt={''} className='block sm:hidden w-full' />
          </div>
        </div>

        <div>
          <Contact2 />
        </div>

        <div>
          <Footer />
        </div>
      </div>
    )
  }

  return (

    <div>
      {isLoading ? (
        <div className='h-[300px] flex items-center justify-center'>
          <LoadingAlares />
        </div>

      ) : (
        svaContent()
      )}
    </div>

  )
}
