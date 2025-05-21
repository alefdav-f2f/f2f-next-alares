'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import logo from '@/img/alares-icon2.png';
import bar from '@/img/bar-imprensa.png';
import contatoImprensa from '@/img/email-imprensa.png';
import asaImprensa from '@/img/asa-imprensa.png';
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import Footer from '@/app/components/Footer';
import Contact_novo from '@/app/components/Contact-novo';

import Recaptcha from '@/app/components/recaptchas/recaptcha.google';
import ReCAPTCHA from 'react-google-recaptcha';
import useReCaptcha from '@/app/zustand/recaptcha.store';
import toast from 'react-hot-toast';

export default function SalaImprensa() {
  const [posts, setPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const refCAPTCHA = React.useRef<ReCAPTCHA | null>(null);
  const { setRecaptchaToken } = useReCaptcha();
  const development = String(process.env.NEXT_PUBLIC_DEVELOPMENT);
  const [isMobile, setIsMobile] = React.useState(false);

  const handleRecaptchaVerify = async (token: string | null) => {
    if (token) {
      setRecaptchaToken(token);
    } else {
      toast.error('Erro de reCAPTCHA, tente novamente.');
    }
  };

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInterceptorInstance.get(
          'https://www.alaresinternet.com.br/indoalem/wp-json/custom/v1/posts/category/alares-em-foco?per_page=4',
        );

        setPosts(response.data.posts);
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const postsFixed = [
    {
      id: 1,
      title:
        'Alares inclui Disney+ em planos e reforça atuação com serviços digitais',
      excerpt: 'Ponto ISP',
      link: 'https://www.pontoisp.com.br/alares-inclui-disney-em-planos-e-reforca-atuacao-com-servicos-digitais/',
      date: '2025-04-25T11:17:40+00:00',
      acf_fields: {
        banner_principal:
          'https://www.alaresinternet.com.br/indoalem/wp-content/uploads/2025/05/250425-Lancamento-Disney.jpg',
      },
    },
    {
      id: 2,
      title:
        'Alares acelera uso de IA na operação de banda larga',
      excerpt: 'TeleTime',
      link: 'https://teletime.com.br/09/05/2025/alares-acelera-uso-de-ia-na-operacao-de-banda-larga/',
      date: '2025-05-09T11:17:40+00:00',
      acf_fields: {
        banner_principal:
          'https://www.alaresinternet.com.br/indoalem/wp-content/uploads/2025/05/250509-Uso-de-IA-na-operacao.jpg',
      },
    },
    {
      id: 3,
      title:
        'Alares Empresas cria oferta conjunta de segurança, gestão e conectividade',
      excerpt: 'TeleSíntese',
      link: 'https://telesintese.com.br/alares-empresas-cria-oferta-conjunta-de-seguranca-gestao-e-conectividade/',
      date: '2025-05-12T11:17:40+00:00',
      acf_fields: {
        banner_principal:
          'https://www.alaresinternet.com.br/indoalem/wp-content/uploads/2025/05/250512-Solucoes-Inteligentes.jpeg',
      },
    },
    {
      id: 4,
      title:
        'Alares mantém crescimento, reduz alavancagem e acelera nas ações ESG',
      excerpt: 'Gazeta Mercantil',
      link: 'https://www.gazetamercantil.digital/noticia/1297/sao-paulo/empresas/alares-mantem-crescimento-reduz-alavancagem-e-acelera-nas-acoes-esg.html',
      date: '2025-05-14T11:17:40+00:00',
      acf_fields: {
        banner_principal:
          'https://www.alaresinternet.com.br/indoalem/wp-content/uploads/2025/05/250514-Resultados-1T25.jpg',
      },
    },
    {
      id: 5,
      title:
        'Alares aprimora atendimento aos clientes com programa de capacitação de técnicos',
      excerpt: 'ClienteSA',
      link: 'https://portal.clientesa.com.br/alares-aprimora-atendimento-aos-clientes-com-programa-de-capacitacao-de-tecnicos/',
      date: '2025-04-28T11:17:40+00:00',
      acf_fields: {
        banner_principal:
          'https://www.alaresinternet.com.br/indoalem/wp-content/uploads/2025/04/imp-alares-aprimora-atendimento_compressed-scaled.jpeg',
      },
    },
    {
      id: 6,
      title:
        'Telecom: Alares fortalece raízes, expande redes e busca o lucro com fibra',
      excerpt: 'Brazil Economy',
      link: 'https://brazileconomy.com.br/2025/04/telecom-alares-fortalece-raizes-expande-redes-e-busca-o-lucro-com-fibra/',
      date: '2025-04-02T11:13:40+00:00',
      acf_fields: {
        banner_principal:
          'https://www.alaresinternet.com.br/indoalem/wp-content/uploads/2025/04/Denis-Ferreira-2024.jpg.webp',
      },
    },
    {
      id: 7,
      title: 'Alares busca equilíbrio entre crescimento e redução da dívida',
      excerpt: 'Estadão Online',
      link: 'https://www.estadao.com.br/economia/coluna-do-broad/alares-busca-equilibrio-entre-crescimento-e-reducao-da-divida/',
      date: '2025-01-22T11:17:40+00:00',
      acf_fields: {
        banner_principal:
          'https://www.alaresinternet.com.br/indoalem/wp-content/uploads/2025/02/Alares-busca-equilibrio-entre-crescimento-e-reducao-da-divida-scaled.jpg',
      },
    },
    {
      id: 8,
      title:
        'Alares conclui aquisição da Azza Telecom e se torna o 4° maior ISP do estado de São Paulo',
      excerpt: 'TeleSíntese',
      link: 'https://telesintese.com.br/alares-conclui-aquisicao-da-azza-telecom-e-se-torna-o-4-maior-isp-do-estado-de-sao-paulo/#google_vignette',
      date: '2024-10-01T11:17:40+00:00',
      acf_fields: {
        banner_principal:
          'https://www.alaresinternet.com.br/indoalem/wp-content/uploads/2025/02/Alares-conclui-aquisicao-da-Azza-Telecom-e-se-torna-o-4°-maior-ISP-do-estado-de-Sao-Paulo-scaled.jpg',
      },
    },
  ];

  function renderPosts() {
    return (
      <div className="max-w-[1200px] mx-auto py-8 pl-4 pr-0 lg:px-0">
        <div className="flex justify-between items-center mb-1 lg:mb-4">
          <h2 className="text-[20px] lg:text-4xl font-bold text-[#363643]">
            Alares na mídia:{' '}
            <span className="font-normal">matérias e publicações</span>
          </h2>
        </div>

        <p className="text-[#363643] text-sm lg:text-base mb-4">
          Confira as principais inserções da Alares na mídia.
        </p>

        <Carousel
          className="w-full"
          opts={{
            align: 'start',
            slidesToScroll: 1,
            containScroll: 'trimSnaps',
          }}
        >
          <div className="hidden sm:flex justify-end mb-0">
            <CarouselPrevious className="relative top-[-80px] right-0 left-[-10px] text-black bg-[#00F0B5] rounded-none rounded-l-full hover:bg-main hover:text-white" />
            <CarouselNext className="relative top-[-80px] right-0 text-black bg-[#00F0B5] rounded-none rounded-r-full hover:bg-main hover:text-white" />
          </div>
          <CarouselContent className="-ml-4">
            {postsFixed.map((post) => (
              <CarouselItem
                key={post.id}
                className="pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pb-2"
              >
                <div className="bg-white rounded-br-3xl overflow-hidden shadow hover:shadow-lg transition-shadow border-2 border-[#F1F1FA]">
                  <div className="relative">
                    <Image
                      src={post.acf_fields.banner_principal}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-[200px] object-cover border border-gray-200 rounded-br-3xl bg-white"
                    />
                  </div>

                  <div className="p-6">
                    <div className="text-center text-gray-500 text-sm">
                      {new Date(post.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </div>
                    <h2 className="text-[18px] lg:text-xl text-center font-bold mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <div
                      className="text-gray-600 mb-4 line-clamp-3 text-center text-[12px] lg:text-sm "
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    <a
                      href={post.link}
                      target="_blank"
                      className=" text-[13px] bg-main text-white block text-center font-bold mx-auto hover:bg-[#00F0B5] hover:text-black px-4 py-2 rounded-full transition-all duration-300"
                    >
                      LER MAIS
                    </a>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    );
  }

  function renderPostsAPI() {
    return (
      <div className="my-10 py-16 lg:py-20 bg-[#F1F1FA] pr-0 pl-4 lg:px-0">
        <div className="max-w-[1200px] mx-auto ">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center lg:mb-4">
            <h2 className="text-[20px] lg:text-4xl font-bold text-[#363643]">
              Alares em foco:{' '}
              <span className="font-normal">últimos releases</span>
            </h2>
            <button
              className="bg-[#00F0B5] text-black px-6 py-2 rounded-full hidden lg:block text-[13px] font-semibold hover:bg-main hover:text-white transition-all duration-300"
              onClick={() => {
                window.location.href =
                  'https://www.alaresinternet.com.br/indoalem/alares-em-foco/';
              }}
            >
              MAIS RELEASES
            </button>
          </div>

          <p className="text-[#363643] text-[16px] lg:text-base mb-8 w-3/4 lg:w-1/2">
            Veja as novidades, lançamentos de produtos, comunicados e
            iniciativas corporativas mais recentes da Alares.
          </p>

          <button
            className="bg-[#00F0B5] text-black px-6 py-2 rounded-full block lg:hidden mb-8 text-[13px] font-semibold hover:bg-main hover:text-white transition-all duration-300"
            onClick={() => {
              window.location.href =
                'https://www.alaresinternet.com.br/indoalem/alares-em-foco/';
            }}
          >
            MAIS RELEASES
          </button>

          <Carousel
            className="w-full"
            opts={{
              align: 'start',
              slidesToScroll: 1,
              containScroll: 'trimSnaps',
            }}
          >
            <CarouselContent className="-ml-4">
              {posts.map((post) => (
                <CarouselItem
                  key={post.id}
                  className="pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pb-2"
                >
                  <div className="bg-white rounded-br-3xl overflow-hidden shadow hover:shadow-lg transition-shadow border-2 border-[#F1F1FA]">
                    <div className="relative">
                      <Image
                        src={post.acf_fields.banner_principal}
                        alt={post.title}
                        width={400}
                        height={250}
                        className="w-full h-[200px] object-cover border border-gray-200 rounded-br-3xl bg-white"
                      />
                    </div>

                    <div className="p-6">
                      <div className="text-center text-gray-500 text-sm">
                        {new Date(post.date).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </div>
                      <h2 className="text-[18px] lg:text-xl text-center font-bold mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      <div
                        className="text-gray-600 mb-4 line-clamp-3 text-center text-[12px] lg:text-sm "
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                      />
                      <a
                        href={post.link}
                        target="_blank"
                        className=" text-[13px] bg-main text-white block text-center font-bold mx-auto hover:bg-[#00F0B5] hover:text-black px-4 py-2 rounded-full transition-all duration-300"
                      >
                        LER MAIS
                      </a>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className="h-[88px] lg:h-[150px] flex justify-center items-center bg-[#3C34F2] relative border-b-4 border-sub lg:border-none"
        style={{
          backgroundImage: `url(${bar.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-[1200px] w-full flex justify-center lg:justify-between items-center">
          <div className="">
            <div className="flex items-center">
              <span className="text-sm font-medium text-sub">HOME</span>
              <IoIosArrowForward className="text-white" />
              <span className="text-sm text-white">SALA DE IMPRENSA</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] w-full mx-auto flex flex-col justify-between items-start mb-[0px] lg:mt-8 lg:mb-8 px-4 lg:px-0">
        <h1 className="text-left lg:text-center text-3xl lg:text-5xl font-bold text-[#363643] mt-10 mb-2">
          Sala de imprensa
        </h1>

        <p className="text-[#363643] text-[16px] lg:text-base">
          O suporte para jornalistas e profissionais de mídia com informações
          oficiais sobre a Alares.
        </p>
      </div>

      {renderPosts()}

      {loading ? (
        <div className="text-center py-8">Carregando notícias...</div>
      ) : (
        renderPostsAPI()
      )}

      <div className="max-w-[900px] lg:w-[900px] mx-auto w-full flex justify-between min-h-[430px] relative z-10 lg:hidden px-4">
        <div className="flex flex-col gap-4 w-full lg:w-1/2 mt-8 lg:mt-[25px]">
          <h2 className="text-[20px] lg:text-2xl font-bold text-[#363643]">
            Contato para a imprensa
          </h2>

          <p className="text-[#363643]">
            Se você é jornalista ou trabalha na imprensa e precisa falar
            conosco, entre em contato com a nossa assessoria:
          </p>

          <div className="flex flex-col gap-1 bg-[#F1F1FA] p-4 rounded-br-3xl">
            <span className="font-bold">RPMA Comunicação</span>
            <span className="font-bold">+55 (11) 5501-4655 (fixo)</span>
            <span className="font-bold">+55 (14) 99807-1006 (Whatsapp)</span>
            <span className="font-bold">alares@rpmacomunicacao.com.br</span>
          </div>

          <Image
            src={asaImprensa}
            className="mx-auto mt-10"
            alt="asa"
            width={100}
            height={100}
          />
        </div>
      </div>

      <div
        className="max-w-[900px] lg:w-[900px] mx-auto w-full justify-between min-h-[430px] relative z-10 hidden lg:flex"
        style={{
          backgroundImage: `url(${contatoImprensa.src})`,
          backgroundSize: 'contain',
          backgroundPosition: '90%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="flex flex-col gap-4 w-full lg:w-[55%] mt-[25px]">
          <h2 className="text-2xl font-bold text-[#363643] text-[30px]">
            Contato para a imprensa
          </h2>

          <p className="text-[#363643]">
            Se você é jornalista ou trabalha na imprensa e precisa falar
            conosco, entre em contato com a nossa assessoria:
          </p>

          <div className="flex flex-col gap-1 bg-[#F1F1FA] p-8 rounded-br-3xl">
            <span className="font-bold">RPMA Comunicação</span>
            <span className="font-bold">+55 (11) 5501-4655 (fixo)</span>
            <span className="font-bold">+55 (14) 99807-1006 (Whatsapp)</span>
            <span className="font-bold">alares@rpmacomunicacao.com.br</span>
          </div>
        </div>
      </div>

      <div className="bg-[#F1F1FA] mt-[-52px] py-16 mb-2 lg:mb-8">
        <div className="max-w-[1200px] mx-auto w-full flex flex-col justify-center min-h-[430px] items-center px-4 lg:px-0">
          <h2 className="text-[20px] lg:text-[30px] text-left lg:text-center font-bold text-[#363643] w-full lg:w-2/5 ">
            Newsletter Indo Além:{' '}
            <span className="font-normal">
              receba nossos conteúdos exclusivos
            </span>
          </h2>

          <div className="flex flex-col items-center w-full lg:w-3/4 mt-8 rounded-br-3xl rounded-tr-3xl rounded-bl-3xl bg-white p-6 lg:p-16 mx-8 lg:mx-0">
            <div className="w-full flex flex-col lg:flex-row lg:items-end gap-4">
              <div className="flex flex-col gap-1 w-full lg:w-1/2">
                <label htmlFor="email">Seu e-mail</label>
                <input
                  type="email"
                  placeholder="Digite seu e-mail"
                  className=" h-[35px] px-4 py-3 rounded-br-xl rounded-tr-xl border border-gray-200 focus:outline-none focus:border-[#00F0B5]"
                />
              </div>
              <div className="flex justify-center mt-[13px] lg:mt-[36px]">
                {development === 'true'
                  ? ''
                  : isMobile && (
                      <Recaptcha
                        onVerify={handleRecaptchaVerify}
                        refcaptcha={refCAPTCHA}
                        className="mb-6"
                      />
                    )}
              </div>
              <button className="bg-sub text-[13px] h-[35px] text-black rounded-full hover:bg-main hover:text-white font-bold w-full lg:w-1/2 transition-all duration-300">
                INSCREVER-SE
              </button>
            </div>

            <div className="flex justify-center mt-[13px] lg:mt-[36px]">
              {development === 'true'
                ? ''
                : !isMobile && (
                    <Recaptcha
                      onVerify={handleRecaptchaVerify}
                      refcaptcha={refCAPTCHA}
                      className="mb-6"
                    />
                  )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Contact_novo />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
