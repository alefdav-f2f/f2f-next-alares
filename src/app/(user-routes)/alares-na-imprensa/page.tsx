"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'

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
          'https://blog-alares.homolog-f2f-digital.xyz/wp-json/custom/v1/posts/category/tendencia-informacao?per_page=4'
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
        "id": 5082,
        "title": "4 filmes para assistir no Dia da Consciência Negra",
        "excerpt": "O Dia da Consciência Negra, celebrado em 20 de novembro no Brasil, homenageia Zumbi dos Palmares, líder quilombola e ícone negro brasileiro, e relembra a importância da resistência negra histórica. Arte é algo que, desde os tempos mais antigos, faz o ser humano refletir. Seja sobre sentimentos, acontecimentos ou questões sociais, ela – em todas [&hellip;]",
        "link": "https://blog-alares.homolog-f2f-digital.xyz/tendencia-informacao/filmes-para-assistir-dia-da-consciencia-negra/",
        "featured_image": false,
        "date": "2024-11-19T11:17:40+00:00",
        "categories": [
            "Tendência e informação"
        ],
        "acf_fields": {
            "descricao": "<p><span style=\"font-weight: 400\">Descubra os melhores filmes para celebrar o Dia da Consciência Negra. Conheça personagens inspiradores e histórias emocionantes!</span></p>\n",
            "banner_principal": "https://blog-alares.homolog-f2f-digital.xyz/wp-content/uploads/2024/11/consciencia-negra-1-2.png",
            "banner_principal_mobile": "https://blog-alares.homolog-f2f-digital.xyz/wp-content/uploads/2024/11/consciencia-negra-2-2.png",
            "tempo_de_leitura": "",
            "is_app_post": ""
        }
    },
    {
        "id": 2725,
        "title": "9 plataformas de streaming para você aproveitar em 2024",
        "excerpt": "Plataformas de streaming são serviços online que permitem aos usuários assistir a vídeos, filmes, séries e ouvir músicas, sem a necessidade de fazer download, oferecendo conteúdo sob demanda. Segundo estudo realizado pela Hibou, empresa de pesquisa e insights de mercado e consumo, 7 em cada 10 brasileiros assinam plataformas de streaming. Esses dados revelam que [&hellip;]",
        "link": "https://blog-alares.homolog-f2f-digital.xyz/tendencia-informacao/plataformas-streaming-2024/",
        "featured_image": false,
        "date": "2024-09-11T11:00:15+00:00",
        "categories": [
            "Tendência e informação"
        ],
        "acf_fields": {
            "descricao": "<p><span style=\"font-weight: 400\">Se você está em busca de entretenimento, precisa conhecer nossas dicas de plataformas de streaming!</span></p>\n",
            "banner_principal": "https://blog-alares.homolog-f2f-digital.xyz/wp-content/uploads/2023/10/shutterstock_2179958927-scaled-2.jpg",
            "banner_principal_mobile": "https://blog-alares.homolog-f2f-digital.xyz/wp-content/uploads/2023/10/Screenshot-2023-10-26-at-11.30.55-e1700770255853-1.png",
            "tempo_de_leitura": "8",
            "is_app_post": ""
        }
    },
    {
        "id": 4780,
        "title": "Filmes para o Dia dos Pais: dicas imperdíveis",
        "excerpt": "O Dia dos Pais é uma data especial para agradecer a todos os pais por seu amor, carinho e dedicação. E qual a melhor maneira de celebrar esse momento, se não com uma sessão incrível de filmes? Por isso, abaixo, selecionamos algumas dicas imperdíveis de filmes para o Dia dos Pais. Afinal, nada como aproveitar [&hellip;]",
        "link": "https://blog-alares.homolog-f2f-digital.xyz/tendencia-informacao/filmes-para-o-dia-dos-pais-dicas-imperdiveis/",
        "featured_image": false,
        "date": "2024-08-08T13:51:17+00:00",
        "categories": [
            "Tendência e informação"
        ],
        "acf_fields": {
            "descricao": "<p><span style=\"font-weight: 400\">Descubra os melhores filmes para o Dia dos Pais com nossa seleção especial! Histórias inspiradoras de pais marcantes no Max, Paramount+, Telecine e Globoplay.</span></p>\n",
            "banner_principal": "https://blog-alares.homolog-f2f-digital.xyz/wp-content/uploads/2024/08/filmes-para-o-dia-dos-pais-banner-min-2.png",
            "banner_principal_mobile": "https://blog-alares.homolog-f2f-digital.xyz/wp-content/uploads/2024/08/filmes-para-o-dia-dos-pais-mobile-min-2.png",
            "tempo_de_leitura": "6",
            "is_app_post": ""
        }
    },
    {
        "id": 1119,
        "title": "Wi-Fi 6: o que é e quais as vantagens dessa tecnologia",
        "excerpt": "Wi-Fi 6 é a sexta geração do padrão de redes sem fio. Ele oferece maior velocidade, eficiência e cobertura, especialmente em ambientes com muitos dispositivos conectados. De acordo com uma pesquisa realizada, em 2023, pelo Centro Regional de Estudos para o Desenvolvimento da Sociedade da Informação, instituição que monitora a adoção das tecnologias de informação [&hellip;]",
        "link": "https://blog-alares.homolog-f2f-digital.xyz/tendencia-informacao/wi-fi-6/",
        "featured_image": false,
        "date": "2024-07-12T09:00:01+00:00",
        "categories": [
            "Tendência e informação"
        ],
        "acf_fields": {
            "descricao": "<p>Entenda por que a tecnologia Wi-Fi 6 é uma excelente opção para você e sua família terem uma experiência única de navegação.</p>\n",
            "banner_principal": "https://blog-alares.homolog-f2f-digital.xyz/wp-content/uploads/2023/05/Desktop-1600-x-434-px_v1-2-2.png",
            "banner_principal_mobile": "https://blog-alares.homolog-f2f-digital.xyz/wp-content/uploads/2023/05/Mobile-960-x-991-px-3-2.png",
            "tempo_de_leitura": "4",
            "is_app_post": ""
        }
    }
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

        <div className="w-full overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-x-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 min-w-max md:min-w-0">
          {postsFixed.map(post => (
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
                <a href={post.link} className="bg-main text-white block text-center font-bold mx-auto hover:bg-[#00F0B5] hover:text-black px-4 py-2 rounded-full">
                  LER MAIS 
                </a>
              </div>
            </div>
          ))}
          </div>
        </div>
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
                    <a href={post.link} className="bg-main text-white block text-center font-bold mx-auto hover:bg-[#00F0B5] hover:text-black px-4 py-2 rounded-full">
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
              <span className='text-sm text-white'>SERVIÇOS ADICIONAIS</span>
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
