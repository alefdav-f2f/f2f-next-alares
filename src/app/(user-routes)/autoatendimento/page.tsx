'use client'
import PageTitle from '@/app/components/PageTitle'
import React from 'react'
import Icon_9 from "@/img/icon/icon-autoatendimento.svg";
import Image from 'next/image';
import banner from '@/img/autoatendimento.png';
import bannerMobile from '@/img/autoatendimentomobile.png';
import Icon_8 from "@/img/icon/icon-2-via-boleto.svg";
import Icon_11 from "@/img/icon/icon-user-3.svg";
import whatsapp_icon from "@/img/icon/whatsapp3.png";
import dialog_icon from "@/img/icon/dialog.png";
import { useRouter, useSearchParams } from 'next/navigation';
import { externalURL } from "@/app/api/externalURL";
import { internalPATH } from "@/app/api/internalPATH";
import passo1 from "@/img/steps/passo1.png";
import passo2 from "@/img/steps/passo2.png";
import passo3 from "@/img/steps/passo3.png";
import passo4 from "@/img/steps/passo4.png";
import passo5 from "@/img/steps/passo5.png";
import passo6 from "@/img/steps/passo6.png";
import passo7 from "@/img/steps/passo7.png";
import passo8 from "@/img/steps/passo8.png";
import central1 from "@/img/steps/1-passo.png";
import central2 from "@/img/steps/2-passo.png";
import central3 from "@/img/steps/3-passo.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import appStore from "@/img/apple.png";
import playStore from "@/img/playstore.webp";
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';

import ringing from "@/img/icon/ringing.png";
import whatsapp4 from "@/img/icon/whatsapp4.png";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Banner from '@/app/components/Banner';
import { getCookie } from 'cookies-next';


export default function page() {

    const router = useRouter();
    const routers = useRouter();
    const [fullDisplay, setDisplay] = React.useState(false);
    const [activeCategory, setCategory] = React.useState<any>({});
    const [activeList, setList] = React.useState<any[]>([]);
    const [questionList, setQuestion] = React.useState<any[]>([]);
    const searchParams = useSearchParams();
    const faq = searchParams.get('faq');

    const accessList = [
        { name: '2ª via do boleto', icon: Icon_8, path: internalPATH.segunda_via_do_boleto, blank: false, id: false },
        { name: 'Central do assinante', icon: Icon_11, path: externalURL.center, blank: true, id: false },
        { name: 'FAQ', icon: dialog_icon, path: internalPATH.FAQ, blank: false, id: '&faq=true' },
        { name: 'Atendimento via WhatsApp', icon: whatsapp_icon, path: externalURL.whatsappMobile, blank: true, id: false },
    ]

    const stepList = [
        {
            stepName: '1º Passo',
            image: passo1,
            description: 'Baixe o app Alares Internet em sua loja de aplicativos.',
            observation: ''
        },
        {
            stepName: '2º Passo',
            image: passo2,
            description: 'Clique em “Primeiro Acesso” e informe o CPF cadastrado em seu contrato.',
            observation: ''
        },
        {
            stepName: '3º Passo',
            image: passo3,
            description: 'Escolha como receberá o código de acesso: e-mail ou telefone',
            observation: ''
        },
        {
            stepName: '4º Passo',
            image: passo4,
            description: 'Preencha o campo com o código recebido e clique em “Validar” ou em “Reenviar Código de Acesso”.',
            observation: ''
        },
        {
            stepName: '5º Passo',
            image: passo5,
            description: 'Após a validação ter sido concluída, escolha o nome pelo qual deseja ser atendido.',
            observation: ''
        },
        {
            stepName: '6º Passo',
            image: passo6,
            description: 'Para finalizar o cadastro, defina uma senha* de acesso.',
            observation: '*Essa senha deverá conter, no mínimo, 6 caracteres, incluindo letras maiúsculas e caracteres especiais.'
        },
        {
            stepName: '7º Passo',
            image: passo7,
            description: 'Com a senha criada, leia e marque a opção “Li e aceito os Termos e Condições da Alares Internet”. Em seguida, clique em “Continuar”.'
        },
        {
            stepName: '8º Passo',
            image: passo8,
            description: 'Pronto! O seu cadastro foi efetuado com sucesso e você já pode fazer o seu primeiro acesso!'
        },
    ]

    const centralList = [
        { name: '1º passo', image: central1, description: 'Clique no ícone da Central do Assinante, localizado na parte superior direita do site de Alares.' },
        { name: '2º passo', image: central2, description: 'Para realizar o primeiro acesso, utilize seu CPF nos campos de login e senha.' },
        { name: '3º passo', image: central3, description: 'Pronto! Agora, você pode acessar suas faturas, contrato e alterar sua senha.' }
    ]

    async function checkDisplay() {

        const width = window.innerWidth;
        if (width > 1000) {
            setDisplay(true)
        } else {
            setDisplay(false)
        }
    }

    async function getCategory() {

        const params = {
            city_id: getCookie('city_id') ? getCookie('city_id') : '9b5dcfa7-15fd-4f5c-b483-aa0f9d43e012'
        }

        const request = await axiosInterceptorInstance.get('/faq/get-all/category-questions', { params });
        const data = request.data
        setQuestion(data);
        setActiveList(data[0])
    }

    async function setActiveList(data: any) {
        setCategory(data?.id)
        setList(data?.questions)
    }

    React.useEffect(() => {

        checkDisplay();
        getCategory();

        window.addEventListener('resize', function (event) {
            checkDisplay();
        }, true)

        const fragment = searchParams.get('scroll');
        if (fragment) {
            const element = document.getElementById(fragment);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }

        if (String(faq) === 'true') {
            const el = document.getElementById('faq');
            el?.scrollIntoView();
        }

    }, [searchParams])

    function getParams() {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        return `?${params}`;
    }

    return (
        <section className='pb-10'>
            <div>
                <PageTitle icon={Icon_9} title='Autoatendimento' />
            </div>

            <div className="mb-6">
                <Banner type={3} />
            </div>

            <div className='mb-10'>
                <div className='text-center p-8'>
                    <span className='text-3xl text-sub'>Acesso fácil</span><br />
                    <span className='text-main'>Resolva o que precisa em poucos cliques</span>
                </div>
                <div className='flex justify-center flex-wrap'>
                    {accessList?.map((access) => {
                        return (
                            <a rel="canonical" href={`${access.path}${getParams()}${access.id ? access.id : ''}`} target={access.blank ? '_blank' : ''}>
                                <div className='p-1 h-full'>
                                    <div className='sm:mr-2 mb-2 rounded-md bg-main flex justify-center w-[200px] h-full px-8 py-4 hover:bg-hover hover:cursor-pointer'>
                                        <div>
                                            <div className='flex justify-center mb-2'>
                                                <Image
                                                    alt=""
                                                    src={access.icon}
                                                    className="h-10 w-10 brightness-0 invert" />
                                            </div>
                                            <div className='text-center'>
                                                <span className='text-white'>{access.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>

                        )
                    })}

                </div>
            </div>

            <div className='flex justify-center mb-10'>
                <div className='h-1 bg-sub w-[1000px]'></div>
            </div>

            <div>
                <div className='text-center p-8'>
                    <span className='text-3xl text-main'>App Alares Internet</span><br />
                    <span className='text-main'>Confira o passo a passo para fazer o primeiro acesso ao app:</span>
                </div>

                <div className='w-full bg-sub pb-14'>
                    <div className='flex justify-center mb-10'>
                        <div className={fullDisplay ? 'w-[1200px] select-none' : 'w-full select-none'}>
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={0}
                                slidesPerView={fullDisplay ? 3 : 1}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                                pagination={{ clickable: true }}
                                navigation
                                initialSlide={0}
                            >
                                {stepList?.map((step, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <div className='p-4'>
                                                <div className={fullDisplay ? 'w-[350px]' : 'flex justify-center'}>
                                                    <Image
                                                        alt=""
                                                        src={step.image}
                                                        className={fullDisplay ? 'w-[350px]' : ''} />
                                                </div>
                                                <div className='px-4'>
                                                    <div className='rounded-3xl bg-main text-sub m-4 text-center py-2'>
                                                        <span>{step.stepName}</span>
                                                    </div>
                                                </div>
                                                <div className='px-4'>
                                                    <div className='rounded-3xl bg-main text-white m-4 text-center p-2'>
                                                        <span>{step.description}</span><br />
                                                        <small>{step.observation}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>

                    <div>
                        <div className='text-center mb-10'>
                            <span className='text-main text-xl'>Disponível na loja de aplicativos do seu celular.</span>
                        </div>
                        <div className='flex justify-center'>
                            <div onClick={() => window.open(externalURL.playStoreAlaresURL, '_blank')} className='hover:cursor-pointer flex items-center bg-main rounded-xl py-1 px-4 border border-white mr-4'>
                                <Image
                                    alt=""
                                    src={playStore}
                                    className="w-8 mr-2" />
                                <span className='font-semibold text-white'>Play Store</span>
                            </div>
                            <div onClick={() => window.open(externalURL.appStoreAlaresURL, '_blank')} className='hover:cursor-pointer flex items-center bg-main rounded-xl py-1 px-4 border border-white'>
                                <Image
                                    alt=""
                                    src={appStore}
                                    className="w-8 mr-2" />
                                <span className='font-semibold text-white'>App Store</span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div>
                <div className='text-center p-8'>
                    <span className='text-3xl text-main'>Central do Assinante</span><br />
                    <span className='text-main'>Confira o passo a passo sobre como acessar:</span>
                </div>

                <div className='bg-main p-8 flex flex-wrap justify-center'>
                    {centralList?.map((central, index) => {
                        return (
                            <div key={index} className='p-4 w-[350px]'>
                                <div className='mb-4'>
                                    <Image
                                        alt=""
                                        src={central.image}
                                        className="w-[350px] mr-2" />
                                </div>
                                <div className='text-center'>
                                    <span className='text-3xl text-sub'>{central.name}</span>
                                </div>
                                <div className='text-center'>
                                    <span className=' text-white'>{central.description}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div id="faq" className='mb-10'>
                <div className='text-center p-8 mb-4'>
                    <span className='text-4xl text-sub'>FAQ</span><br />
                    <span className='text-main text-xl'>Dúvidas Frequentes:</span>
                </div>
                <div className='flex justify-center flex-wrap mb-6'>
                    {questionList?.map((category: any, index) => {
                        return (
                            <div key={index}>
                                <button onClick={() => setActiveList(category)} className={`py-1 px-4 rounded-3xl mr-2 text-sm ${activeCategory === category.id ? 'bg-main text-white' : 'bg-sub text-main'}`}>
                                    {category?.category}
                                </button>
                            </div>
                        )
                    })}
                </div>

                <div className='flex justify-center'>
                    <div>
                        {activeList?.map((question: any, index2: any) => {
                            return (
                                <div key={index2}>
                                    <Accordion type="single" collapsible className='lg:w-[1000px] w-full max-w-[95vw] mb-2 border-b border-sub'>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className='text-main'>
                                                <div>
                                                    <span className=''>{question.question}</span>
                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className='p-4 bg-main text-white rounded-xl'>
                                                    <div dangerouslySetInnerHTML={{ __html: question.response }}></div>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div id="fale-conosco" className='mb-4'>
                <div className='text-center p-8 mb-4'>
                    <span className='text-4xl text-sub'>Fale conosco</span><br />
                </div>
                <div className='flex flex-wrap justify-center'>
                    <div className='w-[300px] text-main sm:mr-4 mb-8'>
                        <div className='flex items-center justify-center mb-2'>
                            <Image
                                alt=""
                                src={whatsapp4}
                                className="w-10 mr-2" />
                            <span>(19) 2080-0600</span>
                        </div>
                        <div className='text-center mb-2'>
                            <span>De segunda a domingo,
                                das 8h às 20h</span>
                        </div>
                        <div className='flex justify-center'>
                            <button onClick={() => window.open(externalURL.whatsapp, '_blank')} className='rounded-3xl bg-main px-4 py-2 text-white hover:bg-hover'>
                                Conversar via Whatsapp
                            </button>
                        </div>
                    </div>

                    <div className='w-[300px] text-main'>
                        <div className='flex items-center justify-center mb-2'>
                            <Image
                                alt=""
                                src={ringing}
                                className="w-10 mr-2" />
                            <span>Ligue agora (10600)</span>
                        </div>
                        <div className='text-center mb-2'>
                            <span>De segunda a sábado,
                                24h e domingos e feriados
                                das 6h às 23:59h</span>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
