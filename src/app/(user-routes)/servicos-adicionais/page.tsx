"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import banner from '@/img/banners/ALA_142591_Atualizacao_dos_Banners_Interna_Desktop_1920_360_v3.png';
import bannerMobile from '@/img/banners/ALA_142591_Atualizacao_dos_Banners_Interna_Mobile_850_345_v3.png';
import bannerSVA from '@/img/banners/banner_sva.png';

import logo from '@/img/alares-icon2.png'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import { useRouter, useSearchParams } from 'next/navigation';
import Contact from '@/app/components/Contact';
import { SVATypes } from '@/app/types/SVA';
import { useForm } from 'react-hook-form';
import RegexService from '@/app/services/validations/regex.service';
import Contact2 from '@/app/components/Contact2';
import Footer from '@/app/components/Footer';



export default function ServicosAdicionais() {
  const [svaList, setSVAList] = React.useState<any[]>([]);
  const [filteredSvaList, setFilteredSVAList] = React.useState<any[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [content, setContent] = useState(1);
  const { register, getValues } = useForm();

  async function getSVA() {

    const request = await axiosInterceptorInstance.get('/sva/paginate-without-auth', {
      params: {
        isActive: true
      }
    })

    if (request.status === 200) {
      const data = request.data;
      setSVAList(data)
    }
  }

  async function navigateSVA(slug: string) {

    const current = new URLSearchParams(Array.from(searchParams.entries()));

    router.push(`servicos-adicionais/${slug}/?${current}`)
  }

  function scroll(id: string) {
    const el = document.getElementById(id);
    el?.scrollIntoView();
  }

  function filterType() {

    const value = getValues('filter')
    if (value === "") {
      setContent(1)
    } else {

      const array = [...svaList];
      const filtered = array.filter(item => (item.name.toLowerCase()).includes(value));
      setFilteredSVAList(filtered)
      setContent(2)
    }
  }


  React.useEffect(() => {
    getSVA();
  }, [])

  function svaCard(sva: any) {
    return (
      <div className='w-[257px] pb-10'>
        <div className='flex justify-between absolute w-[255px] mt-[-45px]'>
          <div className='pl-2'>
            <img src={sva.image} alt="" className='w-[80px] h-[80px] object-cover rounded-full border-[5px] border-gray-200' />
          </div>
          <div className='text-end pt-4 pr-2'>
            <span className='text-xs font-semibold'>{(sva.name).toUpperCase()}</span>
          </div>
        </div>
        <div className='bg-[#F1F1FA]'>
          <div className='border border-gray-200 mt-10 rounded-br-3xl bg-white'>
            <div className='w-[255px]  mb-4'>
              <div>
                <img src={sva?.SvaContent[0]?.image} alt="" className='w-[255px] h-[166px] object-cover rounded-br-3xl' />
              </div>
            </div>

            <div className='flex justify-center mb-1 items-center'>
              {sva?.included ? (
                <p className='text-black text-xl font-semibold'>Incluso</p>
              ) : (
                <>
                  {sva?.price !== '0.00' ? (
                    <>
                      <span className='text-gray-500 text-sm mr-1'>R$</span> <p className='text-black text-xl font-semibold'>{RegexService.changeDot(String(sva?.price))}</p> <span className='text-gray-500 ml-1 text-sm'>/mês*</span>
                    </>
                  ) : null}
                </>
              )}
            </div>
            <div className='flex justify-center'>

              <button onClick={() => navigateSVA(sva.slug)} className='px-8 py-2 rounded-full text-black bg-sub hover:bg-hover hover:scale-110 hover:text-white'>
                Saiba mais
              </button>
            </div>
            <div className={`text-center mb-4  text-gray-500`}>
              <span className='text-xs'>Consultar condições</span>
            </div>
          </div>
        </div>
        <div className='p-6 bg-[#F1F1FA] rounded-br-3xl'>
          <div className='text-sm' dangerouslySetInnerHTML={{ __html: sva.description }}></div>
        </div>
      </div>
    )
  }

  function contentNoFiltered() {
    return (
      <div>
        <div>
          {SVATypes.map((type: any, index: number) => {
            return (
              <div id={type.name}>
                {index === 0 ? null : (
                  <div className='w-screen relative flex items-center justify-center'>
                    <div className='text-center absolute'>
                      <span className='text-white font-medium'>{type.text}</span>
                    </div>
                    <Image src={bannerSVA} alt={''} />
                  </div>
                )}
                <div className='flex justify-center pt-10 px-4'>
                  <div key={index} className='max-w-[1200px] lg:w-[1200px] w-full'>
                    <div>
                      <h2 className='text-2xl font-normal'>{type.name}</h2>
                    </div>

                    <div className='flex flex-wrap pt-8'>
                      {svaList?.map((sva: any) => {
                        return (
                          <div>
                            {sva.type === type.value ? (
                              <div className='lg:pr-8'>
                                {svaCard(sva)}
                              </div>
                            ) : null}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  function contentFiltered() {
    return (
      <div className='flex justify-center pt-10 min-h-[500px]'>
        <div className='max-w-[1200px] lg:w-[1200px] w-full'>

          <div className='mb-4'>
            <h2 className='text-4xl'>Resultados da busca</h2>
          </div>

          {filteredSvaList?.length === 0 ? (
            <span className='text-sm text-gray-400'>Nenhum resultado encontrado</span>
          ) : null}

          <div className='flex flex-wrap pt-8'>
            {filteredSvaList?.map((sva: any) => {
              return (
                <div className='lg:pr-8'>
                  {svaCard(sva)}
                </div>
              )
            })}
          </div>
        </div>
      </div>

    )
  }


  return (
    <div>
      <div className='h-[150px] flex justify-center items-center bg-[#3C34F2]'>
        <div className='w-[1000px] flex justify-between items-center'>
          <div className='pl-2'>
            <div className='flex items-center'>
              <span className='text-sm font-medium text-sub'>HOME</span>
              <IoIosArrowForward className='text-white' />
              <span className='text-sm text-white'>SERVIÇOS ADICIONAIS</span>
            </div>
            <div>
              <span className='text-4xl text-white'>Serviços adicionais</span>
            </div>
          </div>
          <div className='sm:flex hidden h-[150px]'>
            <Image src={logo} alt={''} className='object-none h-[150px]' />
          </div>
        </div>
      </div>

      <div className='mb-4'>
        <Image src={banner} alt={''} className='w-full sm:block hidden' />
        <Image src={bannerMobile} alt={''} className='w-full sm:hidden block' />
      </div>

      <div>
        <div className='flex lg:justify-center justify-evenly flex-wrap h-[100px] items-center'>
          {SVATypes.map((type) => {
            return (
              <div>
                <button onClick={() => scroll(type.name)} className='py-2 px-8 bg-[#F1F1FA] text-xs font-medium lg:mr-2 rounded-full hover:bg-[#D3D4DD]'>
                  {type.name?.toUpperCase()}
                </button>
              </div>
            )
          })}
        </div>
        <div className='flex justify-center mb-10'>

          <div className='lg:w-[600px] w-full p-4'>
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              </div>
              <input {...register('filter')} className="block w-full p-2 ps-4 text-sm border border-gray-300 rounded-full bg-gray-50" placeholder="Digite a sua busca aqui" required />
              <button onClick={() => filterType()} className="text-white absolute end-[1px] bottom-[1px] bg-main hover:bg-hover  font-medium rounded-full text-sm px-10 py-2">Buscar</button>
            </div>
          </div>

        </div>
      </div>

      <div className='mb-10'>
        {content === 1 ? contentNoFiltered() : null}
        {content === 2 ? contentFiltered() : null}
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
