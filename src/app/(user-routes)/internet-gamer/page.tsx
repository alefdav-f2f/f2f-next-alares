'use client'
import LoadingAlares from '@/app/components/loadings/LoadingAlares';
import Logo from '@/app/components/Logo/Logo'
import PlanService from '@/app/services/api/plan.service';
import { navigation } from '@/app/services/navigation-service'
import { getCookie, setCookie } from 'cookies-next';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react'
import { FiMenu } from "react-icons/fi";
import exitlag from '@/img/icon/exitlaglogo.png';
import ultragamer from '@/img/icon/ultragamer.png';
import icon_cabo from '@/img/icon/icon-cabo.png';
import wifigamer from '@/img/icon/wifigamer.png';
import basegamer from '@/img/icon/basegamer.png';
import Image from 'next/image';
import { FaDownload, FaTools, FaUpload } from 'react-icons/fa';
import RegexService from '@/app/services/validations/regex.service';
import Loading from '@/app/components/loadings/Loading';

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { externalURL } from '@/app/api/externalURL';
import Footer from '@/app/components/Footer';
import { ButtonWhatsapp } from '@/app/components/ButtonWhatsapp';
import CookieNotification from '@/app/components/CookieNotification';
import SystemService from '@/app/services/api/system.service';
import { internalPATH } from '@/app/api/internalPATH';


export default function page() {

    const route = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isGamer, setIsGamer] = useState(false);
    const [planGamer, setPlanGamer] = useState<any>();
    const [socialMedia, setSocialMedia] = useState<any[]>([]);
    const searchParams = useSearchParams();
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const router = useRouter();

    const benefits = [
        {
            title: 'Ultravelocidade',
            icon: ultragamer,
            text: '1 Giga de velocidade para downloads rápidos e streaming em alta qualidade com baixa latência'
        },
        {
            title: 'ExitLag',
            icon: exitlag,
            text: 'Otimização da rota da sua conexão por IA, redução de lag e ping para jogar sempre como um pro player'
        },
        // {
        //     title: 'Super Wi-Fi 6',
        //     icon: wifigamer,
        //     text: 'Máxima estabilidade de conexão para aproveitar ao máximo suas partidas'
        // },
        {
            title: '1 ponto cabeado gratuito',
            icon: icon_cabo,
            text: 'Para aproveitar cada minuto de jogo com uma conexão estável e rápida'
        }
    ]


    async function getPlan() {

        const city_id = getCookie('city_id');

        if (!city_id) {
            setCookie('return_path', '/internet-gamer');
            return route.push('/')
        }

        const response = await PlanService.getPlan(String(city_id), getCookie('session_id'));

        if (response) {
            const plans = response?.data?.plans;
            checkPlanGamer(plans)
        }
    }

    function checkPlanGamer(plans: Array<any>) {

        if (plans?.length > 0) {

            plans?.map((plan: any) => {
                console.log(plan.name)
                if (String(plan?.name).includes('Gamer')) {
                    console.log(plan)
                    setPlanGamer(plan);
                    setIsGamer(true);
                    setIsLoading(false);
                }
            })

            setIsLoading(false);

        } else {
            setIsGamer(false);
            setIsLoading(false);
        }
    }

    function navigateContract(path: string, plan: any) {

        setIsLoading(true)

        setTimeout(() => {
            current.delete('plano');
            router.push(`${path}/?${current}&plano=${plan?.id}`);
        }, 1000)

    }

    async function openChannel(text: string) {

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        console.log('is mobile =' + isMobile)
        const whatsappLink = isMobile
            ? externalURL.whatsappMobile // Para dispositivos móveis
            : externalURL.whatsappDesktop // Para navegadores de desktop

        window.open(whatsappLink + '&text=' + encodeURIComponent(text), '_blank');
    }


    async function getSocilaMedia() {

        const response = await SystemService.getSocialMedia();

        if (response) {
            const data = response?.data;
            setSocialMedia(data)
        }
    }

    function scroll(element: any) {
        const el = document.getElementById(element);
        el?.scrollIntoView();
    }

    React.useEffect(() => {
        getPlan();
        getSocilaMedia();
    }, [])

    return (
        <section className='bg-[#171925]'>
            {isLoading ? (
                <div className='flex justify-center items-center h-screen'>
                    <LoadingAlares color="white" />
                </div>
            ) : (
                <>
                    {isGamer ? (
                        mainTemplate()
                    ) : (
                        noGamerTemplate()
                    )}

                    <div className="fixed bottom-0 right-0 z-50">
                        <div className='flex justify-end'>
                            <ButtonWhatsapp />
                        </div>
                        <div>
                            <CookieNotification />
                        </div>
                    </div>
                </>
            )}
        </section>
    )

    function mainTemplate() {
        return (
            <div className='fade50'>
                <div className='bg-[#29164a]'>
                    <div className=' flex justify-center w-full pt-4'>
                        <img className='md:h-[822px] h-[440px] object-cover w-full' src="https://storage.googleapis.com/alaresspace/Site%20Alares/src/internet-gamer/bgGamer.png" alt="" />
                        <div className='absolute max-w-[1110px] w-full'>
                            <div className='flex justify-between items-center w-full p-4'>
                                <a rel="canonical" href={navigation(0, false, 'home', '')}>
                                    <div className='w-[190px]'>
                                        <Logo color="white" />
                                    </div>
                                </a>

                                <div className='md:flex hidden items-center'>
                                    <div className='mr-[100px]'>
                                        <span onClick={() => scroll('d_vantagens')} className='text-white hover:cursor-pointer hover:underline'>Vantagens</span>
                                    </div>
                                    <div>
                                        <span className='text-white hover:cursor-pointer hover:underline' onClick={() => scroll('perguntas')}>Perguntas Frequentes</span>
                                    </div>
                                </div>

                                <div className='md:flex hidden'>
                                    <button onClick={() => openChannel('')} className='py-2 px-10 bg-sub text-xs rounded-full hover:bg-main hover:text-white'>
                                        FALE CONOSCO
                                    </button>
                                </div>

                                <div className='md:hidden flex pr-4'>
                                    <Menubar className='rounded-md bg-sub'>
                                        <MenubarMenu>
                                            <MenubarTrigger className='rounded-md bg-sub p-3'>
                                                <FiMenu className='text-[#29164A]' />
                                            </MenubarTrigger>
                                            <MenubarContent>
                                                <MenubarItem onClick={() => scroll('m_vantagens')}>
                                                    Vantagens
                                                </MenubarItem>
                                                <MenubarSeparator />
                                                <MenubarItem onClick={() => scroll('perguntas')}>Perguntas Frequentes</MenubarItem>
                                            </MenubarContent>
                                        </MenubarMenu>
                                    </Menubar>
                                </div>
                            </div>

                            <div className='md:flex p-4'>
                                <div>
                                    <div className='md:pt-[120px] pt-[50px] md:mb-[25px] mb-2 md:w-[400px] w-[200px]'>
                                        <div>
                                            <div>
                                                <p className='text-[#00FF86] md:text-3xl text-[15px] text font-medium'>Desperte seu potencial</p>
                                            </div>
                                            <div className='mt-[10px] mb-[20px]'>
                                                <img className="" src="https://storage.googleapis.com/alaresspace/Site%20Alares/src/internet-gamer/gamer.png" alt="" />
                                            </div>
                                            <div className='max-w-[410px] mb-[25px]'>
                                                <p className='text-white md:text-[22px] text-[12px] font-medium'>Mais estabilidade com ultravelocidade e menor lag *</p>
                                            </div>
                                            <div className='mb-[25px]'>
                                                <img className="" src="https://storage.googleapis.com/alaresspace/Site%20Alares/src/internet-gamer/precogamer.png" alt="" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mb-[25px] md:block hidden'>
                                        <button onClick={() => navigateContract('/contrate-ja', planGamer)} className='py-2 px-12 bg-sub text-xs rounded-full font-semibold hover:bg-main hover:text-white'>
                                            CONTRATE JÁ
                                        </button>
                                    </div>

                                    <div className='md:flex hidden max-w-[410px] leading-3 text-justify'>
                                        <span className='text-[9px] text-white '>*A Alares oferece uma experiência com tecnologia avançada que reduz significativamente a latência durante suas partidas online. A redução do lag pode variar de acordo com as condições de rede e o equipamento utilizado pelo usuário. Consulte nossos termos de serviço para mais informações.</span>
                                    </div>
                                </div>

                                <div className='md:hidden flex mt-[-240px] z-20 absolute right-0'>
                                    <div>
                                        <img className='' src="https://storage.googleapis.com/alaresspace/Site%20Alares/src/internet-gamer/bgmobilegamer.png" alt="" />
                                    </div>
                                </div>

                                <div className='md:flex hidden justify-between xl:pt-[100px] pt-[380px] z-20'>
                                    <div>
                                        <img className='xl:w-[600px] w-[300px] absolute' src="https://storage.googleapis.com/alaresspace/Site%20Alares/src/internet-gamer/raposa.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='md:block hidden'>
                        <img className='xl:w-[490px] w-[290px] absolute right-0 xl:mt-[-390px] mt-[-240px] z-20' src="https://storage.googleapis.com/alaresspace/Site%20Alares/src/internet-gamer/monitor.png" alt="" />
                        <img className='xl:w-[1100px] w-[800px] absolute right-0 mt-[-50px] ' src="https://storage.googleapis.com/alaresspace/Site%20Alares/src/internet-gamer/footermesa.png" alt="" />
                    </div>

                    <div>
                        <img className='absolute mt-[-180px] xl:flex hidden z-20' src="https://storage.googleapis.com/alaresspace/Site%20Alares/src/internet-gamer/joygamer.png" alt="" />
                    </div>
                </div>

                {isGamer ? (planGamerContent()) : (noPlan())}

                <div className='bg-black min-h-[320px] max-h-[320px]'>
                    <div className='mt-[200px] absolute md:flex hidden justify-center w-full items-center'>
                        <button onClick={() => navigateContract('/contrate-ja', planGamer)} className='py-2 px-12 bg-sub text-xs rounded-full font-semibold hover:bg-main hover:text-white'>
                            CONTRATE JÁ
                        </button>
                    </div>
                    <img className='h-[320px] sm:flex hidden object-cover z-30' src="https://storage.googleapis.com/alaresspace/Site%20Alares/src/internet-gamer/contrategamer.png" alt="" />
                    <img onClick={() => navigateContract('/contrate-ja', planGamer)} className='h-[320px] object-cover z-30 w-screen sm:hidden block' src="https://storage.googleapis.com/alaresspace/Site%20Alares/src/internet-gamer/contrategamermobile.png" alt="" />
                </div>

                <div id="perguntas" className='bg-[#060D1E]'>
                    <div className='px-4 pb-8 flex md:justify-center'>
                        <div className='max-w-[1100px] md:pt-[86px] pt-[40px] flex xl:justify-center'>
                            <div>
                                <div className='xl:text-center'>
                                    <strong className='text-white text-[28px]'>PERGUNTAS FREQUENTES</strong>
                                </div>
                                <div className='mt-[20px] flex md:justify-center'>
                                    <Image src={basegamer} alt={''} ></Image>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        <div className='xl:flex block justify-between max-w-[1100px]'>
                            <div className='xl:min-w-[500px] max-w-[1100px] h-[750px] overflow-auto rtl:ml-0 m-8' style={{ direction: 'rtl' }}>
                                <Accordion type="single" collapsible className='mb-2 xl:min-w-[400px] w-full p-4' style={{ direction: 'ltr' }}>
                                    <AccordionItem value="item-1" className='border-none w-full mb-4'>
                                        <div className='flex items-center mb-2 w-full'>
                                            <AccordionTrigger className='mr-2 bg-sub text-black rounded-full p-2 flex justify-center'></AccordionTrigger>
                                            <span className='text-white font-bold w-full'>Como consulto a disponibilidade do plano de Internet Giga Gamer Alares na minha região e no meu endereço?</span>
                                        </div>
                                        <AccordionContent className='w-full h-full max-w-[1100px]'>
                                            <div className='bg-black/90 w-full h-full border whitespace-pre-wrap border-gray-200 rounded-br-[40px] p-4 text-white'>
                                                <p>Para consultar a disponibilidade dos planos de internet Alares na sua região, você precisa simular uma contratação online na <a rel="canonical" href={`https://www.alaresinternet.com.br/contrate-ja/?plano=${planGamer?.id}`} className='text-blue-600'>página de compra</a> do nosso site. Após inserir o CEP do seu endereço, você receberá uma mensagem informando a disponibilidade do plano de internet para a sua região. </p><br />
                                                <p>Caso o plano de internet que você deseja adquirir não esteja na área de cobertura , aparecerá a mensagem “Endereço não encontrado”. Se houver disponibilidade para o CEP informado, você será direcionado para a etapa seguinte do processo de contratação online.</p><br />
                                                <p>Se tiver alguma dúvida, entre em contato com os canais de atendimento ao cliente Alares:</p><br />
                                                <p>WhatsApp: <a rel="canonical" href="" className='text-blue-600'>(19) 2080-0600</a></p><br />
                                                <p>Central de Atendimento: <a rel="canonical" href="tel:10600" className='text-blue-600'>10600</a></p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-2" className='border-none w-full mb-4'>
                                        <div className='flex items-center mb-2 w-full'>
                                            <AccordionTrigger className='mr-2 bg-sub text-black rounded-full p-2 flex justify-center'></AccordionTrigger>
                                            <span className='text-white font-bold w-full'>Qual o prazo de aprovação da compra do meu plano de Internet Giga Gamer Alares?</span>
                                        </div>
                                        <AccordionContent className='w-full h-full max-w-[1100px]'>
                                            <div className='bg-black/90 w-full h-full border whitespace-pre-wrap border-gray-200 rounded-br-[40px] p-4 text-white'>
                                                <p>O prazo de aprovação da compra do seu plano de internet Alares é imediato. Alguns minutos após a aprovação, você deverá receber o e-mail de confirmação da aquisição do seu plano e também a data prevista para a instalação.</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-3" className='border-none w-full mb-4'>
                                        <div className='flex items-center mb-2 w-full'>
                                            <AccordionTrigger className='mr-2 bg-sub text-black rounded-full p-2 flex justify-center'></AccordionTrigger>
                                            <span className='text-white font-bold w-full'>Quais são os meios de pagamento disponíveis para a contratação do meu plano de Internet Giga Gamer Alares?</span>
                                        </div>
                                        <AccordionContent className='w-full h-full max-w-[1100px]'>
                                            <div className='bg-black/90 w-full h-full border whitespace-pre-wrap border-gray-200 rounded-br-[40px] p-4 text-white'>
                                                <p>Os meios de pagamento disponíveis para a contratação do seu plano de internet Alares são:</p><br />
                                                <p>– Boleto bancário (conta digital)</p><br />
                                                <p>– Cartão de crédito (deverá ser cadastrado através da <a rel="canonical" href='https://assinante.alaresinternet.com.br/' className='text-blue-600'>Central do Assinante</a>)</p><br />
                                                <br />
                                                <p>Escolha o que melhor se adeque às suas necessidades durante a aquisição do seu plano e, se tiver dúvidas, faça contato através do nosso <a rel="canonical" href="tel:10600" className='text-blue-600'>canal de atendimento</a>.</p><br />
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-4" className='border-none w-full mb-4'>
                                        <div className='flex items-center mb-2 w-full'>
                                            <AccordionTrigger className='mr-2 bg-sub text-black rounded-full p-2 flex justify-center'></AccordionTrigger>
                                            <span className='text-white font-bold w-full'>Já tenho internet Alares e quero a Internet Giga Gamer. Posso mudar?</span>
                                        </div>
                                        <AccordionContent className='w-full h-full max-w-[1100px]'>
                                            <div className='bg-black/90 w-full h-full border whitespace-pre-wrap border-gray-200 rounded-br-[40px] p-4 text-white'>
                                                <p>Sim! Você pode fazer a troca do seu plano de internet Alares para a nossa Internet Giga Gamer. Para isso, basta entrar em contato com a <a rel="canonical" href="https://assinante.alaresinternet.com.br/" className='text-blue-600'>Central de Atendimento</a> e solicitar a mudança.</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-5" className='border-none w-full mb-4'>
                                        <div className='flex items-center mb-2 w-full'>
                                            <AccordionTrigger className='mr-2 bg-sub text-black rounded-full p-2 flex justify-center'></AccordionTrigger>
                                            <span className='text-white font-bold w-full'>Em quanto tempo será feita a instalação após ter contratado um plano de internet Alares?</span>
                                        </div>
                                        <AccordionContent className='w-full h-full max-w-[1100px]'>
                                            <div className='bg-black/90 w-full h-full border whitespace-pre-wrap border-gray-200 rounded-br-[40px] p-4 text-white'>
                                                <p>A data da instalação do seu plano de internet Alares poderá ser agendada durante o seu processo de compra, na tela de agendamento. Se você concluir a aquisição do seu plano até às 20h, você receberá, em até 24h, um e-mail confirmando a sua compra e também o dia do agendamento da instalação. Caso realize a aquisição após às 20h, o prazo para receber o e-mail de agendamento da instalação é de 48h.</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-6" className='border-none w-full mb-4'>
                                        <div className='flex items-center mb-2 w-full'>
                                            <AccordionTrigger className='mr-2 bg-sub text-black rounded-full p-2 flex justify-center'></AccordionTrigger>
                                            <span className='text-white font-bold w-full'>O Que é o ExitLag?</span>
                                        </div>
                                        <AccordionContent className='w-full h-full max-w-[1100px]'>
                                            <div className='bg-black/90 w-full h-full border whitespace-pre-wrap border-gray-200 rounded-br-[40px] p-4 text-white'>
                                                <p>O ExitLag é um software que busca melhorar a performance de jogos online ao otimizar a conexão de internet do usuário. Para isso, ele utiliza inteligência artificial para minimizar o lag (atraso), reduzir o jitter (variação no atraso) e evitar que a internet tenha sua performance prejudicada durante a transmissão.</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-7" className='border-none w-full mb-4'>
                                        <div className='flex items-center mb-2 w-full'>
                                            <AccordionTrigger className='mr-2 bg-sub text-black rounded-full p-2 flex justify-center'></AccordionTrigger>
                                            <span className='text-white font-bold w-full'>Quais são as vantagens do ExitLag?</span>
                                        </div>
                                        <AccordionContent className='w-full h-full max-w-[1100px]'>
                                            <div className='bg-black/90 w-full h-full border whitespace-pre-wrap border-gray-200 rounded-br-[40px] p-4 text-white'>
                                                <p>As vantagens do ExitLag são: </p><br />
                                                <p>– Melhora na performance de jogos online;</p><br />
                                                <p>– Redução de perda de pacotes de dados durante as partidas;</p><br />
                                                <p>– Compatibilidade com mais de 1.000 jogos;</p><br />
                                                <p>– Compatibilidade com os mais famosos games mundiais, como: League of Legends, ⁠Valorant, Dota 2, Fortnite, Counter-Strike e Call of Duty;</p><br />
                                                <p>– Acesso via Celular e Tablet (ambos disponíveis no sistema Android), além de Computador.</p><br />
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-8" className='border-none w-full mb-4'>
                                        <div className='flex items-center mb-2 w-full'>
                                            <AccordionTrigger className='mr-2 bg-sub text-black rounded-full p-2 flex justify-center'></AccordionTrigger>
                                            <span className='text-white font-bold w-full'>De que forma o ExitLag colabora na performance nos jogos online?</span>
                                        </div>
                                        <AccordionContent className='w-full h-full max-w-[1100px]'>
                                            <div className='bg-black/90 w-full h-full border whitespace-pre-wrap border-gray-200 rounded-br-[40px] p-4 text-white'>
                                                <p><strong>Otimização em tempo real</strong></p><br />
                                                <p>O ExitLag garante rotas de conexão melhores e mais rápidas para servidores de jogos, eliminando problemas de conexão com o pressionar de um único botão.</p><br />
                                                <p><strong>Modelador de Tráfego</strong></p><br />
                                                <p>O ExitLag molda e otimiza seus dados de tráfego para fluir pelas rotas mais rápidas disponíveis, garantindo uma transmissão de dados eficiente.</p><br />
                                                <p><strong>Multi-Internet</strong></p><br />
                                                <p>Utilize múltiplas conexões para uma jogabilidade ininterrupta, alternando automaticamente para uma conexão funcional em caso de falha.</p><br />
                                                <p><strong>Aumento de FPS</strong></p><br />
                                                <p>Melhore a sua experiência de jogo otimizando as configurações do sistema operacional do seu PC, aumentando os frames e maximizando o desempenho.</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-9" className='border-none w-full mb-4'>
                                        <div className='flex items-center mb-2 w-full'>
                                            <AccordionTrigger className='mr-2 bg-sub text-black rounded-full p-2 flex justify-center'></AccordionTrigger>
                                            <span className='text-white font-bold w-full'>Como ativar o ExitLag?</span>
                                        </div>
                                        <AccordionContent className='w-full h-full max-w-[1100px]'>
                                            <div className='bg-black/90 w-full h-full border whitespace-pre-wrap border-gray-200 rounded-br-[40px] p-4 text-white'>
                                                <p>Para ativar o ExitLag nos seus dispositivos, siga o passo a passo: </p><br />
                                                <p><strong>Passo 1:</strong> Após contratar o produto, você receberá um e-mail de boas-vindas do ExitLag e clica no botão “CRIE SUA SENHA!”, localizado no corpo do e-mail;</p><br />
                                                <p><strong>Passo 2:</strong> Crie sua senha na página do ExitLag, confirme e clique em “CRIAR MINHA SENHA”;</p><br />
                                                <p><strong>Passo 3:</strong> A página do ExitLag será aberta para você inserir seus dados pessoais. Após isso, clique em “SALVAR ALTERAÇÕES”;</p><br />
                                                <p><strong>Passo 4:</strong> Clique no item “DOWNLOAD”, localizado no menu superior da página. Em seguida, clique no botão “DOWNLOAD EXITLAG” e baixe o software do ExitLag;</p><br />
                                                <p><strong>Passo 5:</strong> Após o download ser concluído, insira seu e-mail e sua senha na tela do software;</p><br />
                                                <p><strong>Passo 6:</strong> É aberta a tela inicial do ExitLag. Há um tutorial para você verificar os primeiros passos.</p><br />
                                                <p>Pronto! Após isso, o Exitlag faz a varredura automática dos jogos que você já tem instalado em seu dispositivo e você já poderá jogar normalmente.</p><br />
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-10" className='border-none w-full mb-4'>
                                        <div className='flex items-center mb-2 w-full'>
                                            <AccordionTrigger className='mr-2 bg-sub text-black rounded-full p-2 flex justify-center'></AccordionTrigger>
                                            <span className='text-white font-bold w-full'>Como devo proceder se não receber o e-mail de ativação do ExitLag?</span>
                                        </div>
                                        <AccordionContent className='w-full h-full max-w-[1100px]'>
                                            <div className='bg-black/90 w-full h-full border whitespace-pre-wrap border-gray-200 rounded-br-[40px] p-4 text-white'>
                                                <p>Primeiramente, verifique sua caixa de spam. Se o e-mail de ativação não for recebido em até 48 horas, entre em contato com o Atendimento da Alares.</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-11" className='border-none w-full mb-4'>
                                        <div className='flex items-center mb-2 w-full'>
                                            <AccordionTrigger className='mr-2 bg-sub text-black rounded-full p-2 flex justify-center'></AccordionTrigger>
                                            <span className='text-white font-bold w-full'>O ExitLag funciona em quais dispositivos?</span>
                                        </div>
                                        <AccordionContent className='w-full h-full max-w-[1100px]'>
                                            <div className='bg-black/90 w-full h-full border whitespace-pre-wrap border-gray-200 rounded-br-[40px] p-4 text-white'>
                                                {/* <p>O acesso é pela internet e pode ser realizado por celular e tablet (ambos disponíveis no sistema Android), além de computador.</p> */}
                                                <p>O acesso é pela internet e pode ser realizado por celular e tablet (ambos disponíveis no sistema Android e iOS), além de computador e notebook (Windows e iOS).</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-12" className='border-none w-full mb-4'>
                                        <div className='flex items-center mb-2 w-full'>
                                            <AccordionTrigger className='mr-2 bg-sub text-black rounded-full p-2 flex justify-center'></AccordionTrigger>
                                            <span className='text-white font-bold w-full'>Quais jogos são compatíveis com o ExitLag?</span>
                                        </div>
                                        <AccordionContent className='w-full h-full max-w-[1100px]'>
                                            <div className='bg-black/90 w-full h-full border whitespace-pre-wrap border-gray-200 rounded-br-[40px] p-4 text-white'>
                                                <p>O ExitLag oferece melhora na performance de mais 1.000 jogos, que são atualizados constantemente. A solução conta com os mais famosos games mundiais, como: League of Legends, ⁠Valorant, Dota 2, Fortnite, Counter-Strike e Call of Duty.</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-13" className='border-none w-full mb-4'>
                                        <div className='flex items-center mb-2 w-full'>
                                            <AccordionTrigger className='mr-2 bg-sub text-black rounded-full p-2 flex justify-center'></AccordionTrigger>
                                            <span className='text-white font-bold w-full'>Consigo utilizar o ExitLag em diferentes aplicações ao mesmo tempo?</span>
                                        </div>
                                        <AccordionContent className='w-full h-full max-w-[1100px]'>
                                            <div className='bg-black/90 w-full h-full border whitespace-pre-wrap border-gray-200 rounded-br-[40px] p-4 text-white'>
                                                <p>Sim. Não existe uma limitação para quantas aplicações você pode abrir dentro do ExitLag ao mesmo tempo. Por exemplo, você pode querer otimizar suas rotas no League of Legends enquanto está fazendo o download de um outro jogo na Steam. Ambas as aplicações podem ser selecionadas na ExitLag simultaneamente.</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-14" className='border-none w-full mb-4'>
                                        <div className='flex items-center mb-2 w-full'>
                                            <AccordionTrigger className='mr-2 bg-sub text-black rounded-full p-2 flex justify-center'></AccordionTrigger>
                                            <span className='text-white font-bold w-full'>Não consegui achar meu jogo no ExitLag. E agora?</span>
                                        </div>
                                        <AccordionContent className='w-full h-full max-w-[1100px]'>
                                            <div className='bg-black/90 w-full h-full border whitespace-pre-wrap border-gray-200 rounded-br-[40px] p-4 text-white'>
                                                <p>A plataforma do ExitLag está sempre adicionando novos games ao catálogo. Caso o seu jogo não apareça na lista, você pode solicitar diretamente ao suporte! </p><br />
                                                <p>O ExitLag tem um time que faz todas as verificações necessárias para que você tenha a melhor experiência.</p><br />
                                                <p>O catálogo completo de compatibilidade dos jogos com a ExitLag pode ser consultado aqui: <a rel="canonical" href="https://www.ExitLag.com/games" className='text-blue-600'>https://www.ExitLag.com/games</a></p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="item-15" className='border-none w-full mb-4'>
                                        <div className='flex items-center mb-2 w-full'>
                                            <AccordionTrigger className='mr-2 bg-sub text-black rounded-full p-2 flex justify-center'></AccordionTrigger>
                                            <span className='text-white font-bold w-full'>O que preciso para contratar o ExitLag?</span>
                                        </div>
                                        <AccordionContent className='w-full h-full max-w-[1100px]'>
                                            <div className='bg-black/90 w-full h-full border whitespace-pre-wrap border-gray-200 rounded-br-[40px] p-4 text-white'>
                                                <p>É necessário ter um serviço de banda larga Alares contratado.</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                            <div className='flex xl:justify-end justify-center w-full'>
                                <img className='xl:w-full w-[300px]' src="https://storage.googleapis.com/alaresspace/Site%20Alares/src/internet-gamer/couplegamer.png" alt="" />
                            </div>
                        </div>
                    </div>

                    <a rel="canonical" href="/internet">
                        <div>
                            <img className='sm:block hidden w-full object-cover' src="https://storage.googleapis.com/alaresspace/Site%20Alares/src/internet-gamer/opcdesk.png" alt="" />
                            <img className='sm:hidden block w-full object-cover' src="https://storage.googleapis.com/alaresspace/Site%20Alares/src/internet-gamer/opcmob.png" alt="" />
                        </div>
                    </a>

                </div>

                {footer()}

            </div>
        )
    }

    function noPlan() {
        return (
            <>
                <div className='relative max-h-[250px]'>
                    <div className='flex justify-center items-center absolute h-full w-full'>
                        <span className='text-white  font-medium z-10 text-xl'>Nenhum Plano encontrado</span>
                    </div>
                    <img className='h-[250px]  w-screen object-cover' src="https://storage.googleapis.com/alaresspace/Site%20Alares/src/internet-gamer/conhecagamerbg.png" alt="" />
                </div>
            </>
        )
    }

    function planGamerContent() {
        return (
            <>
                <div id="d_vantagens">
                    <div className='relative'>
                        <img className='xl:flex hidden absolute w-[351px] right-[-50px] bottom-[-100px]' src="https://storage.googleapis.com/alaresspace/Site%20Alares/src/internet-gamer/vrgamer.png" alt="" />
                        <div className='flex justify-center absolute h-full w-full'>
                            <div className='p-2'>
                                <div className='flex justify-center'>
                                    <div className='pt-[100px] pb-[40px] max-w-[1100px]'>
                                        <div id="m_vantagens" className='lg:mr-4 md:mr-4 lg:hidden md:hidden sm:hidden block mb-8 p-2'>
                                            {gamerCard()}
                                        </div>
                                        <div className='max-w-[668px] text-center pb-[40px]'>
                                            <span className='text-[#00FF7F] text-[36px] font-bold'>Conheça as vantagens da nossa Internet Giga Gamer</span>
                                        </div>
                                        <div className='max-w-[668px] text-center'>
                                            <span className='text-white text-[22px]'>Com a internet gamer da Alares, você tem benefícios exclusivos para melhorar a sua experiência ao jogar online!</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex justify-center md:mt-[90px] mt-[10px]'>
                                    <div className=' flex'>

                                        <div className='lg:mr-4 md:mr-4 lg:block md:block hidden'>
                                            {gamerCard()}
                                        </div>

                                        <div className='lg:grid xl:grid md:grid hidden grid-cols-2 gap-4'>
                                            {benefits.map((benefit: any) => {
                                                return (
                                                    <div className='xl:w-[405px] w-[320px] min-h-[190px] bg-black/30 border border-[#28257e] px-8 py-4 rounded-r-[50px] xl:flex block align-middle items-center col-span-1'>
                                                        <div className='mr-2'>
                                                            <div className='mb-2 flex justify-center min-w-[140px]'>
                                                                <Image src={benefit.icon} alt={''} ></Image>
                                                            </div>
                                                            <div className='text-center'>
                                                                <span className='text-sub font-bold'>{benefit.title}</span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <span className='text-white text-[13px]'>{benefit.text}</span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        <div className='md:hidden block'>
                                            <Carousel className="w-full max-w-xs">
                                                <CarouselContent>
                                                    {benefits.map((benefit: any, index) => {
                                                        return (
                                                            <CarouselItem key={index} className='basis-3/3'>
                                                                <div className='w-[250px] min-h-[288px] bg-black/30 border border-[#28257e] px-8 py-4 rounded-r-[50px] inline-block float-none' >
                                                                    <div className='mr-2 h-[150px] flex justify-center items-center '>
                                                                        <div>
                                                                            <div className='mb-2 flex justify-center min-w-[140px]'>
                                                                                <Image src={benefit.icon} alt={''} ></Image>
                                                                            </div>
                                                                            <div className='text-center'>
                                                                                <span className='text-sub font-bold'>{benefit.title}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <span className='text-white text-[13px]'>{benefit.text}</span>
                                                                    </div>
                                                                </div>
                                                            </CarouselItem>
                                                        )
                                                    })}
                                                </CarouselContent>
                                            </Carousel>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <img className='object-cover xl:max-h-[1000px] lg:min-h-[1000px]  md:min-h-[1000px] sm:min-h-[1000px] min-h-[1200px] max-h-[1200px]  z-10 w-full' src="https://storage.googleapis.com/alaresspace/Site%20Alares/src/internet-gamer/conhecagamerbg.png" alt="" />

                    </div>
                </div>
            </>
        )
    }

    function gamerCard() {
        return (
            <div className='bg-black/30 border border-[#28257e] px-8 py-4 rounded-br-[50px] min-w-[250px] h-full'>
                <div className='text-center mb-1'>
                    <strong className='text-[40px] text-white'>{`${planGamer?.title} Giga`}</strong>
                </div>
                <div className='flex justify-center mb-4'>
                    <Image src={exitlag} alt={''} ></Image>
                </div>
                <div className='mb-2'>
                    <div className='flex mb-2 justify-center'>
                        <FaTools className={`w-5 h-5 mr-2 text-sub`} />
                        <span className={`text-white text-base`}>{planGamer?.contents[1]?.name}</span>
                    </div>

                    <div className='flex mb-2 justify-center'>
                        <FaDownload className={`w-5 h-5 mr-2 text-sub`} />
                        <span className={`text-white text-base`}>{planGamer?.contents[2]?.name}</span>
                    </div>

                    <div className='flex mb-2 justify-center'>
                        <FaUpload className={`w-5 h-5 mr-2 text-sub`} />
                        <span className={`text-white text-base`}>{planGamer?.contents[3]?.name}</span>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='flex text-white items-center'>
                        <div>
                            <span>R$</span>
                        </div>
                        <div>
                            <span className='text-5xl'>{RegexService.getWordPosition(planGamer?.price, 0)}</span>
                        </div>
                        <div className='pt-2'>
                            <div>
                                <span>{RegexService.getWordPrice(planGamer.price)}</span>
                            </div>
                            <div className='mt-[-7px]'>
                                <span className='text-xs'>/mês</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-center mt-[-5px] mb-4'>
                    <span className='text-white text-xs'>Na conta digital</span>
                </div>
                <div className='flex justify-center items-center'>
                    <button onClick={() => navigateContract('/contrate-ja', planGamer)} className='w-full py-2 rounded-full  bg-sub text-black hover:bg-hover hover:scale-110 hover:text-white'>
                        {isLoading ? <><Loading /></> : 'Contrate Já'}
                    </button>
                </div>
                <div className='text-center'>
                    <a rel="canonical" href={navigation(0, `${'?' + String(current)}`, 'document', '')}>
                        <span className='text-xs text-white font-medium'>consulte condições</span>
                    </a>
                </div>
            </div>
        )
    }

    function footer() {
        return (
            <>
                <div className='sm:h-[400px] flex justify-center items-center bg-[#100F41]'>
                    <div className='md:flex block justify-center items-center'>

                        <div className='flex justify-center p-4'>
                            <div className='pr-[80px] h-full mb-6'>
                                <div className='w-[200px] mb-8'>
                                    <Logo colors="white" />
                                </div>
                                <div className='flex flex-wrap'>
                                    {socialMedia?.map((social: any) => {
                                        return (
                                            <div className='mr-2 mb-2'>
                                                <img src={social?.logo} alt="" className='w-4 h-4 object-cover custom-green-image' />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className='h-[180px] bg-[#4B18D6] w-[1px] md:block hidden'></div>

                        <div className='px-[57px] h-full mb-6 p-4'>
                            <div className='mb-2'>
                                <span className='text-[22px] text-[#4B18D6]'>A Alares</span>
                            </div>
                            <div className='mb-2'>
                                <a rel="canonical" href={internalPATH.sobre_alares} className='text-white hover:underline'>Conheça a Alares</a>
                            </div>
                            <div className='mb-2'>
                                <a rel="canonical" href={internalPATH.trabalhe_conosco} className='text-white hover:underline'>Trabalhe conosco</a>
                            </div>
                            <div className='mb-2'>
                                <a rel="canonical" href={internalPATH.indo_alem} className='text-white hover:underline'>Indo além</a>
                            </div>
                        </div>

                        <div className='h-[180px] bg-[#4B18D6] w-[1px] md:block hidden'></div>

                        <div className='px-[57px] h-full mb-6'>
                            <div className='mb-2'>
                                <span className='text-[22px] text-[#4B18D6]'>Para você</span>
                            </div>
                            <div className='mb-2'>
                                <a rel="canonical" href={internalPATH.internet} className='text-white hover:underline'>Planos de internet</a>
                            </div>
                            <div className='mb-2'>
                                <a rel="canonical" href={internalPATH.servicos_adicionais} className='text-white hover:underline'>+ Conteúdos</a>
                            </div>
                            <div className='mb-2'>
                                <a rel="canonical" href={internalPATH.segunda_via_do_boleto} target='_blank' className='text-white hover:underline'>2ªvia do boleto</a>
                            </div>
                            <div className='mb-2'>
                                <a rel="canonical" href={internalPATH.autoatendimento} target='_blank' className='text-white hover:underline'>Autoatendimento</a>
                            </div>
                            <div className='mb-2'>
                                <a rel="canonical" href={externalURL.center} target='_blank' className='text-white hover:underline'>Central do assinante</a>
                            </div>
                        </div>

                        <div className='h-[180px] bg-[#4B18D6] w-[1px] md:block hidden'></div>

                        <div className='px-[57px] h-full mb-6'>
                            <div className='mb-2'>
                                <span className='text-[22px] text-[#4B18D6]'>Para sua empresa</span>
                            </div>
                            <div className='mb-2'>
                                <a rel="canonical" href={externalURL.alares_business} className='text-white hover:underline'>Pequenas e médias empresas</a>
                            </div>
                            <div className='mb-2'>
                                <a rel="canonical" href={`${externalURL.alares_business}/grandes-empresas/`} className='text-white hover:underline'>Grandes empresas</a>
                            </div>
                            <div className='mb-2'>
                                <a rel="canonical" href={`${externalURL.alares_business}/governo/`} className='text-white hover:underline'>Governo</a>
                            </div>
                            <div className='mb-2'>
                                <a rel="canonical" href={`${externalURL.alares_business}/atacado/`} className='text-white hover:underline'>Atacado</a>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='w-full h-[80px] bg-[#0A0933] flex items-center justify-center'>
                    <span className='text-sm text-white'>alares © todos os direitos reservados</span>
                </div>
            </>
        )
    }

    function noGamerTemplate() {
        return (
            <>
                <div className='w-screen h-screen bg-'>
                    <div className='absolute z-20 h-screen w-screen p-4 block content-center'>
                        <div className='text-center mb-4'>
                            <span className='text-white'>Plano Gamer indisponível para {String(getCookie('city_name'))}</span>
                        </div>
                        <div className='flex justify-center items-center'>
                            <a rel="canonical" href={internalPATH.internet}>
                                <button className='py-2 px-12 bg-sub text-xs rounded-full font-semibold hover:bg-main hover:text-white'>
                                    CONSULTAR PLANOS
                                </button>
                            </a>
                        </div>
                    </div>
                    <img className='object-cover h-screen' src="https://storage.googleapis.com/alaresspace/Site%20Alares/src/internet-gamer/conhecagamerbg.png" alt="" />
                </div>
            </>
        )
    }
}


