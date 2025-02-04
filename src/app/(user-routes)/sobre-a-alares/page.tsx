"use client"
import React from 'react'
import topnavban from '@/img/banners/topbarnv.png';
import sobreTop from '@/img/icon/sobreTop.svg';
import logo from '@/img/alares-icon2.png';
import Image from 'next/image';
import { IoIosArrowForward } from 'react-icons/io';
import WhyUs from '@/app/components/WhyUs';
import TimeLine from '@/app/components/TimeLine';
import Conquest from '@/app/components/Conquest';
import Head from 'next/head';


export default function SobreAAlares() {

    React.useEffect(() => {

    }, [])

    return (
        <>
            <div>
                <div className='flex justify-center bg-main'>
                    <div className=' h-[120px]'>
                        <Image src={topnavban} alt={''} className='sm:flex hidden h-[120px] w-screen' />
                        <div className='flex justify-center'>
                            <div className='sm:w-[1200px] flex justify-start'>
                                <div className='sm:mt-[-130px] sm:pl-12 flex justify-center sm:justify-start'>
                                    <div className='mt-8'>
                                        <div className='flex items-center'>
                                            <span className='text-sm font-medium text-sub'>HOME</span>
                                            <IoIosArrowForward className='text-white' />
                                            <span className='text-sm text-white'>SOBRE ALARES</span>
                                        </div>
                                        <div>
                                            <h2 className='text-4xl text-white'>Conheça a <strong>Alares</strong></h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center items-center mb-8'>
                    <div className='max-w-[1000px] sm:h-[500px] sm:flex'>
                        <div className='p-2 sm:scale-100 scale-75 sm:mr-4'>
                            <div className='bg-main rounded-br-[70px] lg:w-[420px] h-[420px] shadow_1'>
                                <div className='h-10 bg-white'></div>
                                <Image src={sobreTop} alt={''} className='min-w-[350px] absolute mt-[-80px]' />
                            </div>
                        </div>

                        <div className='flex justify-center items-center p-8'>
                            <div>
                                <div className='bg-main px-6 py-2 rounded-br-full mb-4 max-w-[280px]'>
                                    <span className='text-white font-semibold text-sm'>Nossa internet, suas asas</span>
                                </div>
                                <div className='mb-4'>
                                    <h2 className='text-2xl'>Sobre a Alares</h2>
                                </div>
                                <div className='text-justify font-light text-sm mb-10'>
                                    <span>Somos mais de 2.100 colaboradores e estamos presentes em mais de 120 cidades, em 7 estados do Brasil, com a missão de empoderar as pessoas para que possam ir cada vez mais longe. Nossa ultra banda larga já alcança mais de 510.000 lares e empresas em todo o país.
                                        <br></br>
Com toda essa abrangência, adaptamo-nos à realidade de cada local onde atuamos. Entendemos a importância de falar de forma próxima, respeitando os diferentes sotaques, pois acreditamos que estar perto é essencial para ajudar a ir mais longe.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='sm:flex justify-center items-center bg-main'>
                    <div className='max-w-[1000px] sm:flex justify-between items-center min-h-[126px] p-2'>
                        <div className='flex items-center mr-32 relative'>
                            <span className='lg:text-3xl text-xl text-white whitespace-nowrap'>Nossos <strong>valores</strong></span>
                            <Image src={logo} alt={''} className='w-[100px] absoute mt-[-70px] ml-[-30px]' />
                        </div>

                        <div className='flex items-center'>
                            <span className='text-white lg:text-sm text-xs'>Pessoas são o nosso eixo central, com suas culturas, diversidade e sonhos. Estar perto delas é o que nos move. Por isso, levamos a banda larga, para impulsionar a vida das pessoas para que possam ir além sempre.</span>
                        </div>
                    </div>
                </div>

                <div>
                    <WhyUs />
                </div>

                <div className='mb-8'>
                    <TimeLine />
                </div>

                <div>
                    <Conquest />
                </div>
            </div>
        </>
    )
}
