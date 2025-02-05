"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import logo from '@/img/alares-icon2.png';
import bar from '@/img/bar-imprensa.png';
import contatoImprensa from '@/img/email-imprensa.png';
import asaImprensa from '@/img/asa-imprensa.png'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import Footer from '@/app/components/Footer';
import Contact_novo from "@/app/components/Contact-novo";



export default function SalaImprensa() {
  const [posts, setPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInterceptorInstance.get(
          'https://www.alaresinternet.com.br/indoalem/wp-json/custom/v1/posts/category/alares-em-foco?per_page=4'
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

  const postsFixed = [
    {
        "id": 1,
        "title": "Alares enfatiza liderança em velocidade de banda larga",
        "excerpt": "Grandes Nomes da Propaganda",
        "link": "https://grandesnomesdapropaganda.com.br/mercado-digital/alares-enfatiza-lideranca-em-velocidade-de-banda-larga/",
        "date": "2025-01-27T11:17:40+00:00",
        "acf_fields": {
            "banner_principal": "https://www.alaresinternet.com.br/indoalem/wp-content/uploads/2025/02/250127-Campanha-Velocidade.png",
        }
    },
    {
        "id": 2,
        "title": "Alares busca equilíbrio entre crescimento e redução da dívida",
        "excerpt": "Estadão Online",
        "link": "https://www.estadao.com.br/economia/coluna-do-broad/alares-busca-equilibrio-entre-crescimento-e-reducao-da-divida/",
        "date": "2025-01-22T11:17:40+00:00",
        "acf_fields": {
            "banner_principal": "https://www.alaresinternet.com.br/indoalem/wp-content/uploads/2025/02/Alares-busca-equilibrio-entre-crescimento-e-reducao-da-divida-scaled.jpg",
        }
    },
    {
        "id": 3,
        "title": "Alares inclui Wi-Fi 7 na banda larga residencial e amplia rede XGS-PON",
        "excerpt": "Teletime",
        "link": "https://teletime.com.br/09/12/2024/alares-inclui-wi-fi-7-na-banda-larga-residencial-e-amplia-rede-xgs-pon/",
        "date": "2024-12-09T11:17:40+00:00",
        "acf_fields": {
            "banner_principal": "https://www.alaresinternet.com.br/indoalem/wp-content/uploads/2025/02/241209-Wi-Fi-7-no-Carnatal.jpg",
        }
    },
    {
        "id": 4,
        "title": "Carnatal 2024: internet oficial do evento traz tecnologia de última geração",
        "excerpt": "Tribuna do Norte",
        "link": "https://tribunadonorte.com.br/especiais-tribuna-do-norte/carnatal/carnatal-2024-internet-oficial-do-evento-traz-tecnologia-de-ultima-geracao/",
        "date": "2024-12-05T11:17:40+00:00",
        "acf_fields": {
            "banner_principal": "https://www.alaresinternet.com.br/indoalem/wp-content/uploads/2025/02/241205-Patrocinio-Carnatal-1.jpg",
        }
    },
    {
        "id": 5,
        "title": "Alares abre loja modelo no RN com novo conceito de atendimento",
        "excerpt": "Ponto ISP",
        "link": "https://www.pontoisp.com.br/alares-abre-loja-modelo-no-rn-com-novo-conceito-de-atendimento/",
        "date": "2024-11-26T11:17:40+00:00",
        "acf_fields": {
            "banner_principal": "https://www.alaresinternet.com.br/indoalem/wp-content/uploads/2025/02/241126-Loja-modelo-RN.jpeg",
        }
    },
    {
        "id": 6,
        "title": "Alares conclui aquisição da Azza Telecom e se torna o 4° maior ISP do estado de São Paulo",
        "excerpt": "TeleSíntese",
        "link": "https://telesintese.com.br/alares-conclui-aquisicao-da-azza-telecom-e-se-torna-o-4-maior-isp-do-estado-de-sao-paulo/#google_vignette",
        "date": "2024-10-01T11:17:40+00:00",
        "acf_fields": {
            "banner_principal": "https://www.alaresinternet.com.br/indoalem/wp-content/uploads/2025/02/Alares-conclui-aquisicao-da-Azza-Telecom-e-se-torna-o-4°-maior-ISP-do-estado-de-Sao-Paulo-scaled.jpg",
        }
    },
    {
        "id": 7,
        "title": "Aquisições trazem aumento de receita à Alares",
        "excerpt": "Teletime",
        "link": "https://teletime.com.br/15/08/2024/aquisicoes-trazem-aumento-de-receita-a-alares/",
        "date": "2024-08-15T11:17:40+00:00",
        "acf_fields": {
            "banner_principal": "https://www.alaresinternet.com.br/indoalem/wp-content/uploads/2025/02/Aquisicoes-trazem-aumento-de-receita-a-Alares-scaled.jpg",
        }
    },
    {
        "id": 8,
        "title": "Alares cria a Alares Empresas, de olho em ISPs e B2B",
        "excerpt": "TeleSíntese",
        "link": "https://blog-alares.homolog-f2f-digital.xyz/tendencia-informacao/filmes-para-assistir-dia-da-consciencia-negra/",
        "date": "2024-06-12T11:17:40+00:00",
        "acf_fields": {
            "banner_principal": "https://www.alaresinternet.com.br/indoalem/wp-content/uploads/2025/02/240612-Alares-Empresas.jpg",
        }
    },
];

  function renderPosts() {
    return (
      <div className="max-w-[1200px] mx-auto py-8 px-4 lg:px-0">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl lg:text-4xl font-bold text-[#363643]">
            Alares na mídia: <span className="font-normal">matérias e publicações</span>
          </h2>
        </div>
        
        <p className="text-[#363643] text-sm lg:text-base mb-8">
          Confira as principais inserções da Alares na mídia.
        </p>

        <Carousel 
          className="w-full"
          opts={{
            align: "start",
            slidesToScroll: 1,
            containScroll: "trimSnaps"
          }}
        >
          <div className="hidden sm:flex justify-end mb-4">
            <CarouselPrevious className="relative top-0 right-0 left-[-10px] text-black bg-[#00F0B5] rounded-none rounded-l-full hover:bg-main hover:text-white" />
            <CarouselNext className="relative top-0 right-0 text-black bg-[#00F0B5] rounded-none rounded-r-full hover:bg-main hover:text-white" />
          </div>
          <CarouselContent className="-ml-4">
            {postsFixed.map(post => (
              <CarouselItem key={post.id} className="pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pb-2">
                <div className="bg-white rounded-br-3xl overflow-hidden shadow hover:shadow-lg transition-shadow">
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
                        year: 'numeric'
                      })}
                    </div>
                    <h2 className="text-xl text-center font-bold mb-3 line-clamp-2">{post.title}</h2>
                    <div 
                      className="text-gray-600 mb-4 line-clamp-3 text-center text-sm " 
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    <a href={post.link} target='_blank' className="bg-main text-white block text-center font-bold mx-auto hover:bg-[#00F0B5] hover:text-black px-4 py-2 rounded-full">
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
      <div className='my-10 py-20 bg-[#F1F1FA] px-8 lg:px-0'>
        <div className="max-w-[1200px] mx-auto ">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:mb-8">
            <h2 className="text-2xl lg:text-4xl font-bold text-[#363643]">
              Alares em foco: <span className="font-normal">últimos releases</span>
            </h2>
            <button className="bg-[#00F0B5] text-black px-6 py-2 rounded-full hidden lg:block">
              MAIS RELEASES
            </button>
          </div>
          
          <p className="text-[#363643] text-sm lg:text-base mb-8">
            Veja as novidades, lançamentos de produtos, comunicados e iniciativas corporativas mais recentes da Alares.
          </p>

          <button className="bg-[#00F0B5] text-black px-6 py-2 rounded-full block lg:hidden mb-8">
              MAIS RELEASES
            </button>


          <div className="w-full overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-x-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-max md:min-w-0">
              {posts.map(post => (
                <div key={post.id} className="w-[280px] md:w-auto bg-white rounded-br-3xl overflow-hidden shadow hover:shadow-lg transition-shadow">
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
                        year: 'numeric'
                      })}
                    </div>
                    <h2 className="text-xl text-center font-bold mb-3 line-clamp-2">{post.title}</h2>
                    <div 
                      className="text-gray-600 mb-4 line-clamp-3" 
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    <a href={post.link} target='_blank' className="bg-main text-white block text-center font-bold mx-auto hover:bg-[#00F0B5] hover:text-black px-4 py-2 rounded-full">
                      LER MAIS 
                    </a>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div 
        className='h-[150px] flex justify-center items-center bg-[#3C34F2] relative'
        style={{
          backgroundImage: `url(${bar.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className='max-w-[1200px] lg:w-[1200px] w-full flex justify-between items-center'>
          <div className=''>
            <div className='flex items-center'>
              <span className='text-sm font-medium text-sub'>HOME</span>
              <IoIosArrowForward className='text-white' />
              <span className='text-sm text-white'>SALA DE IMPRENSA</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] lg:w-[1200px] w-full mx-auto flex flex-col justify-between items-start mt-8 mb-8 px-4 lg:px-0">
          <h1 className="text-left lg:text-center text-3xl lg:text-5xl font-bold text-[#363643] mb-2">
            Sala de imprensa
          </h1>

          <p className="text-[#363643] mb-8 text-sm lg:text-base">
            O suporte para jornalistas e profissionais de mídia com informações oficiais sobre a Alares.
          </p>
        </div>


      {renderPosts()}

      {loading ? (
        <div className="text-center py-8">Carregando notícias...</div>
      ) : (
        renderPostsAPI()
      )}

      <div className='max-w-[900px] lg:w-[900px] mx-auto w-full flex justify-between min-h-[430px] relative z-10 lg:hidden px-4'>

        <div className='flex flex-col gap-4 w-full lg:w-1/2 mt-8 lg:mt-[55px]'>

          <h2 className='text-2xl font-bold text-[#363643]'>
            Contato para a imprensa
          </h2>

          <p className='text-[#363643]'>
            Se você é jornalista ou trabalha na imprensa e precisa falar conosco, entre em contato com a nossa assessoria:
          </p>

          <div className='flex flex-col gap-1 bg-[#F1F1FA] p-4 rounded-br-3xl'>
            <span className='font-bold'>RPMA Comunicação</span> 
            <span className='font-bold'>+55 99 99988 0011</span>
            <span className='font-bold'>alares@rpmacomunicacao.com.br</span>
          </div>

          <Image src={asaImprensa} className='mx-auto mt-10' alt='asa' width={100} height={100} />

        </div>
      </div>


      <div className='max-w-[900px] lg:w-[900px] mx-auto w-full justify-between min-h-[430px] relative z-10 hidden lg:flex'
      style={{
          backgroundImage: `url(${contatoImprensa.src})`,
          backgroundSize: 'contain',
          backgroundPosition: '90%',
          backgroundRepeat: 'no-repeat'
        }}>

        <div className='flex flex-col gap-4 w-full lg:w-1/2 mt-[55px]'>


          <h2 className='text-2xl font-bold text-[#363643]'>
            Contato para a imprensa
          </h2>

          <p className='text-[#363643]'>
            Se você é jornalista ou trabalha na imprensa e precisa falar conosco, entre em contato com a nossa assessoria:
          </p>

          <div className='flex flex-col gap-1 bg-[#F1F1FA] p-4 rounded-br-3xl'>
            <span className='font-bold'>RPMA Comunicação</span> 
            <span className='font-bold'>+55 99 99988 0011</span>
            <span className='font-bold'>alares@rpmacomunicacao.com.br</span>
          </div>



        </div>
      </div>

      <div className='bg-[#F1F1FA] mt-[-52px] py-5 mb-8'>
        <div className='max-w-[1200px] lg:w-[1200px] mx-auto w-full flex flex-col justify-center min-h-[430px] items-center px-2 lg:px-0'>
          <h2 className="text-2xl text-left lg:text-center font-bold text-[#363643] w-full lg:w-1/3">
              Newsletter Indo Além: <span className="font-normal">receba nossos conteúdos exclusivos</span>
            </h2>

            <div className="flex flex-col items-end w-full lg:w-3/4 mt-8 rounded-br-3xl rounded-tr-3xl rounded-bl-3xl bg-white p-8">
              <div className="w-full flex flex-col lg:flex-row lg:items-end gap-4">
                
                <div className='flex flex-col gap-1 w-full lg:w-1/2'>
                  <label htmlFor="email">Seu e-mail</label>
                  <input 
                  type="email" 
                  placeholder="Digite seu e-mail" 

                  className=" h-[35px] px-4 py-3 rounded-br-xl rounded-tr-xl border border-gray-200 focus:outline-none focus:border-[#00F0B5]"
                />
                </div>
                <button className="bg-main h-[35px] text-white rounded-full hover:bg-[#00F0B5] hover:text-black font-bold w-full lg:w-1/2">
                  INSCREVER-SE


                </button>
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
  )
}
