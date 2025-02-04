'use client'
import Banner from '@/app/components/Banner';
import PageTitle from '@/app/components/PageTitle';
import StoreService from '@/app/services/api/store-service';
import React, { useState } from 'react'
import Icon from "@/img/icon/icon-autoatendimento.svg";
import StateService from '@/app/services/api/state-service';
import LoadingAlares from '@/app/components/loadings/LoadingAlares';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { FaBus, FaCar, FaSearchPlus } from 'react-icons/fa';
import { FaHouse, FaLocationDot } from 'react-icons/fa6';
import Footer from '@/app/components/Footer';
import { MdOutlineAccessible } from 'react-icons/md';

export default function Lojas() {
  const [isLoading, setIsLoading] = useState<any>([])
  const [storeList, setStoreList] = useState<any>([])
  const [stateList, setStateList] = useState<any>([])

  const [selectedState, setSelectedState] = useState<any>('')



  async function getStores() {
    const response = await StoreService.combolist();

    if (response) {
      const data = response.data;
      setStoreList(data);
    }
  }

  async function getStates() {

    const response = await StateService.combolistBPA();

    if (response) {
      const data = response.data?.data;
      setStateList(data);
      setIsLoading(false)
    }
  }

  async function filterStore(state: string) {
    setSelectedState(state);
  }

  function checkFilter(state: string) {

    if (selectedState === '') {
      return true;
    } else if (state === selectedState) {
      return true
    } else {
      return false
    }
  }

  React.useEffect(() => {
    getStores();
    getStates()
  }, [])

  return (
    <div className='h-full'>
      {isLoading ? (
        <div className='h-[500px] flex justify-center items-center'>
          <LoadingAlares></LoadingAlares>
        </div>
      ) : (
        <div >
          <PageTitle icon={Icon} title='Lojas' />
          <div className="mb-6">
            <Banner type={5} />
          </div>
          <div className='p-4 flex justify-center flex-wrap mb-4'>
            <button onClick={() => filterStore('')} className={`mb-2 text-sm px-4 py-1 rounded-full mr-2 ${'' === selectedState ? 'bg-main text-white' : 'bg-white text-main border border-main'}`}>
              Todos
            </button>
            {stateList?.map((state: any) => {
              return (
                <div>
                  <button onClick={() => filterStore(state.id)} className={`mb-2 text-sm px-4 py-1 rounded-full mr-2 ${state.id === selectedState ? 'bg-main text-white' : 'bg-white text-main border border-main'}`}>
                    {state.name}
                  </button>
                </div>
              )
            })}
          </div>

          <div className='p-4'>


            {stateList?.map((state: any) => {
              return (

                <>
                  {checkFilter(state.id) ? (
                    <div className='mb-6 border-b-4 pt-4 border-sub pb-6'>
                      <div className='text-center p-4'>
                        <span className='text-4xl text-main'>{state.name}</span>
                      </div>

                      <div className='flex justify-center'>
                        <div className=' lg:max-w-[1000px] w-full px-10'>
                          <Carousel>
                            <CarouselContent>
                              {storeList?.map((store: any) => {
                                return (
                                  <>
                                    {store.uf_id === state.id ? (
                                      <CarouselItem className='p-4 lg:basis-1/3 basis-1/1'>
                                        <div className='shadow-lg rounded-lg lg:p-4 p-8 max-w-[300px]'>
                                          <div className='flex'>
                                            <div>
                                              <div className='rounded-full bg-main p-4 mr-4'>
                                                <FaHouse className='text-white' />
                                              </div>
                                            </div>
                                            <div className='mb-4'>
                                              <div className='mb-4'>
                                                <div className='pt-2'>
                                                  <span className='text-white bg-main px-4 py-1 rounded-full'>{store.city}</span>
                                                </div>
                                              </div>
                                              <div className='mb-1'>
                                                <span className='text-xl text-main'>{store.address}</span>
                                              </div>
                                              <div className='border-b-4 border-sub mb-4 pb-4'>
                                                <span className='text-main text-sm'>Horário de atendimento:</span><br />
                                                <span className='text-sm'>{store.openingHours}</span>
                                              </div>
                                              <div>
                                                <Dialog>
                                                  <DialogTrigger>
                                                    <div className='flex items-center'>
                                                      <FaSearchPlus className='mr-2 text-main' />
                                                      <span className='text-main'>Mais detalhes</span>
                                                    </div>
                                                  </DialogTrigger>
                                                  <DialogContent>
                                                    <DialogHeader>
                                                      <DialogTitle>
                                                        <span className='text-main text-2xl'>{store.city} - {store.uf}</span><br />
                                                        <span className='text-black'>{store.address}</span>
                                                      </DialogTitle>
                                                    </DialogHeader>
                                                    <div className='text-main'>
                                                      <div className='mb-4'>
                                                        <span>Horário de atendimento</span>
                                                        <div>
                                                          <span>{store.openingHours}</span>
                                                        </div>
                                                      </div>

                                                      <div className='mb-4'>
                                                        {store.bus_station ? (
                                                          <div className='flex items-center'>
                                                            <FaBus className='mr-2' />
                                                            <span>Próximo do transporte público</span>
                                                          </div>
                                                        ) : null}

                                                        {store.parking ? (
                                                          <div className='flex items-center'>
                                                            <FaCar className='mr-2' />
                                                            <span>Possui estacionamento no local</span>
                                                          </div>
                                                        ) : null}
                                                      </div>

                                                      <div className='mb-4'>
                                                        <span>Ponto de referência: </span><br />
                                                        <div className='flex'>
                                                          <div className='pt-1 mr-2'>
                                                            <FaLocationDot />
                                                          </div>
                                                          <span>{store.reference_point}</span>
                                                        </div>
                                                      </div>

                                                      <div>
                                                        {store.parking ? (
                                                          <div className='flex items-center'>
                                                            <MdOutlineAccessible className='mr-2' />
                                                            <span>Loja acessível</span>
                                                          </div>
                                                        ) : null}
                                                      </div>

                                                    </div>
                                                  </DialogContent>
                                                </Dialog>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                      </CarouselItem>
                                    ) : null}
                                  </>
                                )
                              })}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                          </Carousel>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </>

              )
            })}


          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
