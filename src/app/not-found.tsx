'use client'
import React from 'react'
import MainTemplate from './templates/MainTemplate'
import Footer from './components/Footer'
import notfound from '@/img/not-found.webp'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation';
import image404 from '@/img/404.png'
import { useForm } from 'react-hook-form';
import iconFAQ from '@/img/icon/404/Vector.png';
import icon2aVia from '@/img/icon/404/Rectangle-565.png';
import iconWhatsapp from '@/img/icon/404/Rectangle-566.png';
import iconCenter from '@/img/icon/404/Rectangle-567.png';
import { externalURL } from './api/externalURL'
import { internalPATH } from './api/internalPATH'

export default function NotFound() {
  const searchParams = useSearchParams();
  const { register, getValues } = useForm();
  const router = useRouter();

  function getParams() {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    return `?${params}`;
  }

  function search() {
    const value = getValues('search');
    close();
    router.replace(`/search?search=${value}`);
  }

  function eventFilter(event: any) {
    console.log(event.key)
    if (event?.key === 'Enter') {
      search()
    }
  }

  const items = [
    {
      tab: false,
      title: 'FAQ',
      icon: iconFAQ,
      path: internalPATH.FAQ
    },
    {
      tab: false,
      title: '<strong>2ª via</strong> do boleto',
      icon: icon2aVia,
      path: internalPATH.segunda_via_do_boleto
    },
    {
      tab: true,
      title: 'Contrate agora pelo <strong>Whatsapp</strong> ',
      icon: iconWhatsapp,
      path: openChannel()
    },
    {
      tab: true,
      title: 'Central do <strong>Assinante</strong>',
      icon: iconCenter,
      path: externalURL.center
    },
  ];

  function openChannel() {

    let whatsappLink;

    if (typeof navigator !== 'undefined') {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      console.log('is mobile = ' + isMobile);
      whatsappLink = isMobile
        ? externalURL.whatsappMobile // Para dispositivos móveis
        : externalURL.whatsappDesktop; // Para navegadores de desktop
    } else {
      // Valor padrão se 'navigator' não estiver disponível (SSR)
      whatsappLink = externalURL.whatsappDesktop;
    }

    return whatsappLink
  }

  return (
    <MainTemplate>
      <div>
        <Image src={image404} alt={''} className='w-full mb-10 border-b-2 border-sub' />
        <div className='flex flex-col items-center'>
          <div className='mb-1'>
            <span className='font-medium text-3xl'>Ops!</span>
          </div>
          <div className='max-w-[500px] p-2'>
            <div className='mb-4 text-center'>
              <span className='text-sm text-gray-400'>Parece que a página que você procura está fora do ar.
                Fique tranquilo, vamos te ajudar a ir além e encontrar o que precisa.</span>
            </div>
            <div className='mb-4 text-center'>
              <span className='text-sm text-gray-400'>Faça uma busca em nosso site e tente novamente:</span>
            </div>
          </div>

          <div className='mb-4'>
            <div className='flex items-center'>
              <div className='md:flex block justify-center sm:p-6 p-2 mb-4 w-full relative'>
                <div>
                  <input  {...register('search')} onKeyDown={(e) => eventFilter(e)} type="text" className=" bg-white border z-20 border-gray-400 text-sm rounded-3xl focus:ring-blue-500 block w-full p-2.5 text-[#04D683] md:w-[600px] mb-4" placeholder="Digite sua busca aqui!" required />
                </div>
                <div className='mb-4'>
                  <button onClick={() => search()} className='border border-gray-400 absolute end-0 bg-main hover:bg-hover text-white py-2 sm:px-8 px-4 rounded-full hover:cursor-pointer z-30 md:w-[120px] w-full'>
                    Buscar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='flex justify-center mb-6 pt-4 p-1'>
            <div className='max-w-[1000px] grid md:grid-cols-4 grid-cols-2 sm:gap-2 gap-4'>
              {items.map((item) => {
                return <>
                  <a rel="canonical" href={item.path} target={item.tab ? '_blank' : '_self'}>
                    <div className='col-span-1 bg-main rounded-2xl p-4 w-[170px] h-[170px] flex justify-center items-center hover:bg-hover hover:cursor-pointer'>
                      <div>
                        <div className='flex justify-center mb-2'>
                          <Image src={item.icon} alt={''} className='w-10 h-10' />
                        </div>
                        <div className='text-center'>
                          <div dangerouslySetInnerHTML={{ __html: item.title }} className='text-white'></div>
                        </div>
                      </div>
                    </div>
                  </a>
                </>
              })}
            </div>
          </div>

          <div className='mb-8 pt-6'>
            <a rel="canonical" href={`home`}>
              <button className='px-4 py-2 rounded-full bg-sub text-black hover:underline text-sm font-medium hover:text-blue-500'>
                VOLTAR À PÁGINA INICIAL
              </button>
            </a>
          </div>

        </div>
      </div>
      <Footer />
    </MainTemplate>
  )
}
