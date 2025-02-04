'use client'
import PageTitle from '@/app/components/PageTitle';
import React, { useState } from 'react';
import icon from '@/img/icon/business-icon.png';
import banner from '@/img/banners/Banner_Para_Empresas_Desk.png';
import bannerMobile from '@/img/banners/Banner_ParaEmpresas_Mobile.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { externalURL } from '@/app/api/externalURL';
import icon_1 from '@/img/business/icon-link-dedicado.png';
import icon_2 from '@/img/business/icon-transporte-de-dados.png';
import icon_3 from '@/img/business/icon-cloud-backup.png';
import icon_4 from '@/img/business/icon-links.png';
import icon_5 from '@/img/business/cloud-phone-3.png';
import icon_6 from '@/img/business/tronco-digital-e1.png';
import icon_7 from '@/img/business/Tronco-SIP_op2_white.png';
import icon_8 from '@/img/business/rede-wi-fi-prime.png';
import { IoMdClose } from 'react-icons/io';
import { useForm } from 'react-hook-form';

export default function BusinessPage() {

    const router = useRouter();
    const [isOpen, setModal] = React.useState(false)
    const [selectedService, setService] = React.useState<any>(null)
    const [isLoading, setLoading] = useState(false);
    const { register, handleSubmit, setValue } = useForm();

    const services = [
        {
            name: 'Link Dedicado',
            icon: icon_1,
            description: 'Com o link dedicado a rede da sua empresa é conectada à rede da Alares através de fibras ópticas e recursos tecnológicos de última geração, como o GPON, garantindo alto desempenho e performance, com simetria de banda e estabilidade de conexão.',
            types: [
                {
                    title: 'Vantagens com a internet dedicada:',
                    topics: [
                        '+Velocidades simétricas, com garantia de velocidade de download igual à velocidade de upload;',
                        '+Contrato com permissão de revenda (Provedores);',
                        '+1 IP Público fixo sem custo adicional;',
                        '+Possibilidade de contratação de faixa de IP;',
                        '+ONT (Optical Network Terminal) em modo Bridge.'
                    ]
                },
                {
                    title: 'Diferenciais Alares:',
                    topics: [
                        '+Suporte técnico especializado com monitoramento da disponibilidade do Link;',
                        '+Atendimento remoto 24 horas por dia, 7 dias por semana;',
                        '+Atendimento de suporte técnico exclusivo em até 3 horas;',
                        '+SLA (Service Level Agreement – acordo de nível de serviços ou garantia de desempenho) de disponibilidade dos serviços envolvidos na solução objeto dos contratos relacionados, em 99% mensal;',
                        '+Executivo de contas para atendimento e gestão de contrato.'
                    ]
                }
            ]
        },
        {
            name: 'Transporte de Dados (Lan-To-Lan)',
            icon: icon_2,
            description: 'Essa é a solução ideal para empresas que precisam de servidor central, data center, alto tráfego de dados com sigilo e comunicação em tempo real com suas filiais. Trata-se de circuitos dedicados, exclusivos e permanentes, disponibilizados em altas velocidades de transmissão.',
            types: [
                {
                    title: 'Vantagens com o transporte de dados:',
                    topics: [
                        '+Interligando matrizes e filiais de empresas com segurança, sigilo, qualidade e comunicação em tempo real;',
                        '+Serviço de transporte de dados entre pontos geograficamente distintos, sem necessidade de internet;',
                        '+Transporte de dados Ponto-a-Ponto (PTP) ou Ponto-Multiponto;',
                        '+Comunicação com baixa latência entre os pontos;',
                        '+Links simétricos com possibilidade de banda de até 1GB;'
                    ]
                },
                {
                    title: 'Diferenciais Alares:',
                    topics: [
                        '+Suporte técnico especializado com monitoramento da disponibilidade do Link;',
                        '+Atendimento remoto 24 horas por dia, 7 dias por semana;',
                        '+Atendimento de suporte técnico exclusivo em até 3 horas;',
                        '+SLA (Service Level Agreement – acordo de nível de serviços ou garantia de desempenho) de disponibilidade dos serviços envolvidos na solução objeto dos contratos relacionados, em 99% mensal;',
                        '+Executivo de contas para atendimento e gestão de contrato.'
                    ]
                }
            ]
        },
        {
            name: 'Cloud Backup',
            icon: icon_3,
            description: 'Contamos com a Acronis Cyber Cloud, um serviço que acumula prêmios, líder no mercado de proteção de ambiente virtual, físico e de nuvem, protegendo dados em mais de 20 plataformas. Segurança no armazenamento e compartilhamento de dados da sua empresa.',
            types: [
                {
                    title: 'Vantagens com o cloud backup:',
                    topics: [
                        '+Self-Service Backup e Recovery;',
                        '+Serviço de Backup em Ambientes Híbridos, por diferentes dispositivos;',
                        '+Backup e Recuperação em nível de Disco;',
                        '+Backup e Recuperação em nível de Arquivo;',
                        '+Relatórios Personalizados;',
                        '+Proteção ativa contra Ransomware;',
                        '+Recuperação de dados de fácil configuração.'
                    ]
                },
                {
                    title: 'Diferenciais Alares:',
                    topics: [
                        '+Suporte técnico especializado com monitoramento da disponibilidade do Link;',
                        '+Atendimento remoto 24 horas por dia, 7 dias por semana;',
                        '+Atendimento de suporte técnico exclusivo em até 3 horas;',
                        '+SLA (Service Level Agreement – acordo de nível de serviços ou garantia de desempenho) de disponibilidade dos serviços envolvidos na solução objeto dos contratos relacionados, em 99% mensal;',
                        '+Executivo de contas para atendimento e gestão de contrato.'
                    ]
                }
            ]
        },
        {
            name: 'Link Temporário – Eventos',
            icon: icon_4,
            description: 'Fornecemos projetos especiais voltados ao público de eventos com equipamentos de última geração, e equipe técnica altamente capacitada para atender: shows, festivais, feiras corporativas, lives e outros eventos.',
            types: [
                {
                    title: 'Vantagens com o link temporário:',
                    topics: [
                        '+Vistorias ao projeto sem custo;',
                        '+Rede estruturada e cobertura Wi-Fi conforme demanda;',
                        '+Equipamentos de alta performance;',
                        '+Links dedicados de internet com 100% de banda disponível;'
                    ]
                },
                {
                    title: 'Diferenciais Alares:',
                    topics: [
                        '+Suporte técnico especializado com monitoramento da disponibilidade do Link;',
                        '+Atendimento remoto 24 horas por dia, 7 dias por semana;',
                        '+Atendimento de suporte técnico exclusivo em até 3 horas;',
                        '+SLA (Service Level Agreement – acordo de nível de serviços ou garantia de desempenho) de disponibilidade dos serviços envolvidos na solução objeto dos contratos relacionados, em 99% mensal;',
                        '+Executivo de contas para atendimento e gestão de contrato;',
                        '+Equipe técnica exclusiva.'
                    ]
                }
            ]
        },
        {
            name: 'Cloud Phone',
            icon: icon_5,
            description: 'Com o Cloud Phone, você pode integrar o serviço de telefonia e ramais em mensagens e compartilhar arquivos, áudios, vídeos e fazer videoconferências em uma única ferramenta.',
            types: [
                {
                    title: 'Vantagens do Cloud Phone:',
                    topics: [
                        '+Acesso via WEB;',
                        '+Aplicativo para Windows/MacOS /Linux;',
                        '+Aplicativo para smartphone e telefone IP;',
                        '+URA personalizável;',
                        '+Chat com chamadas por vídeo e envio de arquivos;',
                        '+Compartilhamento de telas em uma chamada ou videoconferência;',
                        '+Histórico de chamadas e gravações.'
                    ]
                },
                {
                    title: 'Diferenciais Alares:',
                    topics: [
                        '+Sem custo de instalação;',
                        '+Atendimento Remoto 24 horas por dia, 7 dias por semana;',
                        '+Equipe técnica exclusiva.'
                    ]
                }
            ]
        },
        {
            name: 'Tronco Digital E1',
            icon: icon_6,
            description: 'Por meio do Tronco Digital E1, o PABX da sua empresa será conectado à rede pública de telefonia (PSTN) de maneira segura e estável. Com isso é possível fazer ou receber até 30 chamadas simultaneamente com total com segurança. É uma linha digital entregue via tecnologia E1, padrão que suporta uma grande quantidade de canais de voz, sendo excelente para empresas com demandas de alto tráfego de chamadas. Verifique a disponibilidade do produto na sua região.',
            types: [
                {
                    title: 'Vantagens do Tronco Digital E1:',
                    topics: [
                        '+Possibilidade de contratação de até 30 canais em sinalizações ISDN ou R2 Digital;',
                        '+Um único número permite efetuar e receber chamadas simultâneas;',
                        '+Preços acessíveis para ligações locais, nacionais e internacionais;',
                        '+Facilidade de portabilidade numérica;',
                        '+Disponibilidade de DDR – Discagem Direta a Ramal.'
                    ]
                },
                {
                    title: 'Diferenciais Alares:',
                    topics: [
                        '+Franquia com preços acessíveis, adequada para a sua empresa;',
                        '+Atendimento de Suporte Técnico em até 3 horas;',
                        '+Atendimento Remoto 24 horas por dia, 7 dias por semana.'
                    ]
                }
            ]
        },
        {
            name: 'Tronco SIP',
            icon: icon_7,
            description: 'Por meio do Tronco SIP, o PABX IP da sua empresa será conectado à rede pública de telefonia (PSTN) de maneira segura e estável. É uma linha tronco com as mesmas funcionalidades de uma conexão digital E1 e que funciona por meio de transferências de dados via internet. O Tronco SIP suporta uma grande quantidade de canais de voz, sendo excelente para empresas com demandas de alto tráfego de chamadas. Verifique a disponibilidade do produto na sua região.',
            types: [
                {
                    title: 'Vantagens do Tronco SIP:',
                    topics: [
                        '+Possibilidade de contratação de até 150 canais;',
                        '+Único número para efetuar e receber chamadas simultâneas;',
                        '+Melhores preços de mercado para ligações locais, nacionais e internacionais;',
                        '+Facilidade de portabilidade numérica;',
                        '+Disponibilidade de DDR – Discagem Direta a Ramal.'
                    ]
                },
                {
                    title: 'Diferenciais Alares:',
                    topics: [
                        '+Franquia com preços acessíveis, adequada para a sua empresa;',
                        '+Atendimento de Suporte Técnico em até 3 horas;',
                        '+Atendimento Remoto 24 horas por dia, 7 dias por semana.',
                    ]
                }
            ]
        },
        {
            name: 'Rede Wi-Fi Prime',
            icon: icon_8,
            description: 'Sistema Wi-Fi com alto desempenho que combina performance de primeira linha, escalabilidade ilimitada e preço baixo. Por meio de um equipamento de amplo alcance, sua empresa terá Wi-Fi de qualidade para muitos usuários ao mesmo tempo. Verifique a disponibilidade do produto na sua região.',
            types: [
                {
                    title: 'Vantagens do Wi-Fi Prime:',
                    topics: [
                        '+Serviço inteligente de fornecimento de internet pelo Wi-Fi;',
                        '+Grande capacidade de acesso simultâneo (até 50 clientes por antena);',
                        '+Modem com design moderno e elegante;',
                        '+Equipamento de alta performance;',
                        '+Fácil instalação (Estrutura PoE);'
                    ]
                },
                {
                    title: 'Diferenciais Alares:',
                    topics: [
                        '+Preço acessível;',
                        '+Vistoria de áreas de acesso (sem custo);',
                        '+Suporte 24 horas por telefone.'
                    ]
                }
            ]
        }
    ]

    async function openModal(data: any) {
        setService(data);
        setModal(true)
    }


    return (
        <>
            {isOpen ? (
                <div className='flex items-center bg-gray-600 justify-center fixed top-0 left-0 w-screen h-screen z-50 bg-opacity-25 p-4'>
                    <div className='opacity-100 bg-white rounded-2xl p-8 lg:w-[500px] lg:h-[700px] lg:max-h-screen max-h-[95vh] overflow-auto'>

                        <div className='flex justify-between mb-2'>
                            <div></div>
                            <div className='text-center'>
                                <div className='flex justify-center'>
                                    <Image src={selectedService?.icon} alt={''} className='w-14 mb-4' />
                                </div>
                                <span className='text-main'>{selectedService?.name}</span>
                            </div>
                            <div>
                                <button onClick={() => setModal(false)} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold p-2 border rounded-full">
                                    <IoMdClose />
                                </button>
                            </div>
                        </div>

                        <div className='mb-4'>
                            <span className='font-light text-sm text-justify text-main'>{selectedService?.description}</span>
                        </div>

                        {selectedService?.types?.map((type: any, index: any) => {
                            return (
                                <div key={index} className='text-sm'>
                                    <div className='mb-2'>
                                        <span>{type.title}</span>
                                    </div>
                                    {type?.topics?.map((topic: any) => {
                                        return (
                                            <div className='mb-1 flex items-center text-main'>
                                                <span className='font-light'>{topic}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : null}
            <div className='pb-8'>
                <PageTitle icon={icon} title='Para Empresas' />

                <div onClick={() => router.push(externalURL.gupy)} className='hover:cursor-pointer'>
                    <Image src={banner} alt={''} className='hidden sm:flex' />
                    <Image src={bannerMobile} alt={''} className='sm:hidden flex' />
                </div>

                <div className='flex justify-center'>
                    <div className='py-16 px-2 max-w-[800px]'>
                        <div className='text-center mb-4'>
                            <span className='text-sub text-4xl'> Nossas Soluções </span>
                        </div>

                        <div className='text-center mb-2'>
                            <span className='text-main font-primary'> Confira os serviços que oferecemos para sua empresa alcançar o topo. </span>
                        </div>
                    </div>
                </div>

                <div className='flex justify-center p-2 mb-8'>
                    <div className='grid gap-4 sm:grid-cols-4 grid-cols-2 w-[1000px]'>
                        {services?.map((serv, index) => {
                            return (
                                <div onClick={() => openModal(serv)} className='sm:col-span-1 col-span-2 bg-main hover:bg-hover hover:cursor-pointer rounded-lg p-6'>
                                    <div className='flex justify-center mb-4'>
                                        <Image src={serv.icon} alt={''} className='brightness-0 invert w-20' />
                                    </div>
                                    <div className='text-center'>
                                        <span className='text-white font-light'>{serv.name}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div>
                    <div className='py-10 bg-sub text-center mb-10'>
                        <span className='text-main text-3xl'>Fale com um gerente de contas</span>
                    </div>

                    <div className='flex justify-center p-4'>
                        <div className='w-[800px]'>
                            <div className='lg:flex'>
                                <div className='flex justify-center px-2 mb-4 w-full'>
                                    <div className='w-full'>
                                        <label htmlFor="user" className="flex items-center mb-2 text-main text-base">
                                            Seu nome*</label>
                                        <input type="text" id="user" disabled={isLoading} {...register('name')} className="bg-gray-50 border border-sub text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                    </div>
                                </div>

                                <div className='flex justify-center px-2 mb-4 w-full'>
                                    <div className='w-full'>
                                        <label htmlFor="user" className="flex items-center mb-2 text-main text-base">
                                            Seu celular (com DDD)*</label>
                                        <input type="text" id="user" disabled={isLoading} {...register('number')} className="bg-gray-50 border border-sub text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                    </div>
                                </div>
                            </div>

                            <div className='lg:flex'>
                                <div className='w-full px-2 mb-4'>
                                    <label htmlFor="user" className="flex items-center mb-2 text-main text-base">
                                        Seu e-mail*</label>
                                    <input type="text" id="user" disabled={isLoading} {...register('email')} className="bg-gray-50 border border-sub text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                </div>

                                <div className='w-full px-2 mb-4'>
                                    <label htmlFor="user" className="flex items-center mb-2 text-main text-base">
                                        CNPJ</label>
                                    <input type="text" id="user" disabled={isLoading} {...register('cnpj')} className="bg-gray-50 border border-sub text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                </div>
                            </div>

                            <div className='lg:flex mb-10'>
                                <div className='w-full px-2 mb-4'>
                                    <label htmlFor="user" className="flex items-center mb-2 text-main text-base">
                                        Endereço*</label>
                                    <input type="text" id="user" disabled={isLoading} {...register('address')} className="bg-gray-50 border border-sub text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                                </div>
                            </div>

                            <div className='flex flex-col justify-center mb-10'>
                                <div className='text-center mb-4'>
                                    <span className='text-main font-medium'>Qual seu interesse?</span>
                                </div>

                                <div className='flex justify-center text-main'>
                                    <div className='mr-10'>
                                        <div className='mb-2'>
                                            <input type="checkbox" disabled={isLoading} {...register('internet')} className='mr-2' />
                                            <label>Internet</label>
                                        </div>

                                        <div className='mb-2'>
                                            <input type="checkbox" disabled={isLoading} {...register('telephone')} className='mr-2' />
                                            <label>Telefonia</label>
                                        </div>

                                        <div className='mb-2'>
                                            <input type="checkbox" disabled={isLoading} {...register('wi-fi-prime')} className='mr-2' />
                                            <label>Wi-fi Prime</label>
                                        </div>
                                    </div>

                                    <div>
                                        <div className='mb-2'>
                                            <input type="checkbox" disabled={isLoading} {...register('cloud-backup')} className='mr-2' />
                                            <label>Cloud Backup</label>
                                        </div>

                                        <div className='mb-2'>
                                            <input type="checkbox" disabled={isLoading} {...register('link-events')} className='mr-2' />
                                            <label>Link para eventos</label>
                                        </div>

                                        <div className='mb-2'>
                                            <input type="checkbox" disabled={isLoading} {...register('isp-provider')} className='mr-2' />
                                            <label>Provedor/ISP</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-center mb-10'>
                                <button className="bg-sub hover:bg-hover hover:text-white text-black py-1 px-4 rounded-full w-full">
                                    RECEBER CONTATO
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
