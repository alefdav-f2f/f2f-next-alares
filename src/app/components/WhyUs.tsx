import React from 'react'
import WhyUsImage from '@/img/why-us-picture.png';
import AlaresLogo from '@/img/alares-icon.png';
import Image from 'next/image';

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';


import slide01 from '@/img/icon/slide01.png';
import slide02 from '@/img/icon/slide02.png';
import slide03 from '@/img/icon/slide03.png';
import slide04 from '@/img/icon/slide04.svg';
import slide05 from '@/img/icon/slide05.svg';
import slide06 from '@/img/icon/slide06.svg';
import slide07 from '@/img/icon/slide07.png';


export default function WhyUs() {

    const [swiperRef, setSwiperRef] = React.useState<SwiperClass>();
    const [displayCount, setCount] = React.useState(1);
    const theSlides = React.useMemo(() => ['slide one', 'slide two'], [])

    const handlePrevious = React.useCallback(() => {
        swiperRef?.slidePrev();
    }, [swiperRef]);

    const list = [
        {
            image: slide01,
            title: 'Prêmios pela excelência',
            description: 'Descubra alguns prêmios e reconhecimentos que conquistamos, ao longo do tempo, em diferentes cidades e estados do país.'
        },
        {
            image: slide02,
            title: '100% Fibra Óptica até você',
            description: 'Com mais de 32 mil quilômetros de extensão, nossa Fibra Óptica de última geração, permite entregar planos de internet com até 2 Giga de velocidade proporcionando cada vez mais qualidade nos nossos serviços.'
        },
        // {
        //     image: slide03,
        //     title: 'Novo Super Wi-Fi 6',
        //     description: 'Somos uma das pioneiras em oferecer o roteador com Wi-Fi 6, a evolução do Wi-Fi, oferecendo muito mais velocidade e estabilidade, sendo ideal para locais com muitos aparelhos conectados.'
        // },
        {
            image: slide04,
            title: 'Alta velocidade de upload',
            description: 'Nossos planos de internet têm upload de 50% da velocidade de download, permitindo que você envie fotos, vídeos e arquivos em geral com muito mais velocidade.'
        },
        {
            image: slide05,
            title: 'Planos mais completos',
            description: 'Em nossos planos estão inclusos aplicativos de entretenimento e utilidades como filmes, séries, livros, revistas, segurança digital e muito mais.'
        },
        {
            image: slide06,
            title: 'Sem taxas, sem letras miúdas',
            description: 'Não cobramos taxa de instalação nem de adesão ao nosso serviço. Não precisa se preocupar com surpresas na sua conta.'
        },
        {
            image: slide07,
            title: 'Estamos perto de você',
            description: 'Contamos com mais de 120 lojas físicas espalhadas pelo Brasil, dentro das nossas áreas de atuação buscando a proximidade com os nossos clientes e colaboradores. '
        }
    ]

    async function resize() {
        const width = window.innerWidth;

        if (width > 1000) {
            setCount(3)
        } else {
            setCount(1)
        }
    }

    React.useEffect(() => {

        resize();
        
        window.addEventListener('resize', function (event) {
            resize();
        }, true)
    }, [])

    return (
        <>
            <div>
                <div className='grid gap-4 grid-cols-2'>
                    <div className='col-span-1 flex justify-center items-center p-4'>
                        <h2 className='text-main text-4xl'>Por que Alares?</h2>
                    </div>
                    <div className='col-span-1 flex justify-center items-center'>
                        <div className='flex'>
                            <Image
                                alt="Logo Alares Internet"
                                src={WhyUsImage}
                                className="w-72 object-cover" />
                            <Image
                                alt="Logo Alares Internet"
                                src={AlaresLogo}
                                className="hidden sm:flex w-20 object-contain mt-4" />
                        </div>
                    </div>
                </div>
                <div className='why_us bg-sub flex justify-center p-10'>
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                        slidesPerView={displayCount}
                        navigation
                        className='sm:w-[1200px] min-h-[370px] flex justify-center'
                    >
                        {list?.map((slide) => {
                            return (
                                <SwiperSlide>
                                    <div className='p-4 h-[300px] lg:scale-90 scale-[80%]'>
                                        <div className='flex justify-center mb-4'>
                                            <div className='rounded-full bg-[#241640] p-4 w-[70px] h-[70px] flex justify-center items-center'>
                                                <Image
                                                    alt=""
                                                    src={slide.image}
                                                    className="w-10" />
                                            </div>
                                        </div>
                                        <div className='text-center mb-4'>
                                            <span className='text-xl text-main font-bold'>{slide.title}</span>
                                        </div>
                                        <div className='text-center p-2'>
                                            <span>{slide.description}</span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        </>
    )
}
