"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import logo from '@/img/alares-icon2.png';

export default function TimeLine() {

    const [selectedYear, setSelectedYear] = useState<any>({});

    const timeList = [
        {
            year: '2023',
            text: 'Crescemos de forma orgânica e inorgânica.'
        },
        {
            year: '2022',
            text: 'Nos tornamos Alares.'
        },
        {
            year: '2021',
            text: 'O fundo Grain Management, especialista em telecomunicações, adquiriu o Grupo Conexão.'
        },
        {
            year: '2020',
            text: 'Unificamos nossos objetivos e passamos a nos chamar Grupo Conexão.'
        },
        {
            year: '2018',
            text: 'Iniciamos a ampliação de nossa rede nos estados de São Paulo, Minas Gerais e Bahia.'
        },
        {
            year: '2015',
            text: 'Fomos adquiridos, iniciando um processo de consolidação e, em seguida, adquirimos outras empresas.'
        },
        {
            year: "Há mais de 20 anos...",
            text: "Surgimos em SP e MG, com o objetivo de oferecer acesso à internet para pequenas e médias empresas no interior. No CE e RN, fomos pioneiros no serviço de TV por assinatura e nas ofertas de banda larga nessas regiões.",
        },
    ]

    function setYear(index: number) {
        const year = timeList[index];
        setSelectedYear(year)
    }

    React.useEffect(() => {
        setSelectedYear(timeList[0]);
    }, [])

    return (
        <div className='flex justify-center'>
            <div className='p-4 max-w-[1000px] w-full'>
                <div className='text-center mb-8'>
                    <span className='text-2xl'>Linha do <strong>tempo</strong></span>
                </div>

                <div className='flex sm:justify-center w-full mb-8 sm:pl-5 pl-3 pt-5 overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden'>
                    {timeList?.map((time, index) => {
                        return (
                            <div>
                                <div>
                                    <div className={`text-start ml-[-9px] w-[20px] pl-1 ${time.year === 'Há mais de 20 anos...' ? 'relative' : ''}`}>
                                        <span className={`${time.year === 'Há mais de 20 anos...' ? 'absolute top-[-47px] w-[100px] text-center left-[-35px]'  : ''} ${selectedYear.year === time.year ? 'text-blue-700 font-medium' : ''}`}>{time.year}</span>
                                    </div>
                                    <div className={`flex items-center relative  ${time.year === 'Há mais de 20 anos...' ? 'mt-[23px]' : ''}`}>
                                        {selectedYear.year === time.year ? (
                                            <div className={`h-5 my-3 ${time.year === 'Há mais de 20 anos...' ? 'w-10' : 'w-5'}`}>
                                                <Image src={logo} alt={''} className={`w-10 absolute mt-[-3px] ml-[-10px]`} />
                                            </div>
                                        ) : (
                                            <div onClick={() => { setYear(index) }} className='w-5 h-5 my-3 border-[4px] border-blue-700 rounded-full hover:cursor-pointer hover:bg-gray-200'></div>
                                        )}
                                        {index + 1 < timeList.length ? (
                                            <div className='sm:w-[100px] w-[100px] h-[6px] bg-blue-700'></div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className='w-full p-12 bg-[#F1F1FA] flex items-center rounded-br-[80px]'>
                    <span>{ selectedYear.text }</span>
                </div>
            </div>
        </div>
    )
}
