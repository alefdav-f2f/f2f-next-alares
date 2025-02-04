"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'

import logo from '@/img/alares-icon2.png'
import axiosInterceptorInstance from '@/app/api/axiosInterceptor';
import { useRouter, useSearchParams } from 'next/navigation';
import Contact2 from '@/app/components/Contact2';
import Footer from '@/app/components/Footer';

export default function SalaImprensa() {
  const [posts, setPosts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  // teste
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
      <div className="max-w-[1200px] mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Alares na mídia: <span className="font-normal">matérias e publicações</span>
          </h1>
          <button className="bg-[#00F0B5] text-black px-6 py-2 rounded-full">
            
          </button>
        </div>
        
        <p className="text-gray-600 mb-8">
          Confira as principais inserções da Alares na mídia.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {postsFixed.map(post => (
            <div key={post.id} className="bg-white rounded-br-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image 
                  src={post.acf_fields.banner_principal} 
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-full h-[200px] object-cover border border-gray-200 rounded-br-lg bg-white"
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
    );
  }

  function renderPostsAPI() {
    return (
      <div className="max-w-[1200px] mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Alares em foco: <span className="font-normal">últimos releases</span>
          </h1>
          <button className="bg-[#00F0B5] text-black px-6 py-2 rounded-full">
            MAIS RELEASES
          </button>
        </div>
        
        <p className="text-gray-600 mb-8">
          Veja as novidades, lançamentos de produtos, comunicados e iniciativas corporativas mais recentes da Alares.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-br-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image 
                  src={post.acf_fields.banner_principal} 
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-full h-[200px] object-cover border border-gray-200 rounded-br-lg bg-white"
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
    );
  }

  return (
    <div>
      <div className='h-[150px] flex justify-center items-center bg-[#3C34F2]'>
        <div className='max-w-[1200px] lg:w-[1200px] w-full flex justify-between items-center'>
          <div className=''>
            <div className='flex items-center'>
              <span className='text-sm font-medium text-sub'>HOME</span>
              <IoIosArrowForward className='text-white' />
              <span className='text-sm text-white'>SERVIÇOS ADICIONAIS</span>
            </div>
          </div>
          <div className='sm:flex hidden h-[150px]'>
            <Image src={logo} alt={''} className='object-none h-[150px]' />
          </div>
        </div>
      </div>


      {renderPosts()}

      {loading ? (
        <div className="text-center py-8">Carregando notícias...</div>
      ) : (
        renderPostsAPI()
      )}

      <div>
        <Contact2 />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  )
}
