"use client";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import logo from "@/img/alares-icon2.png";
import imgConectividade from "@/img/internet-nova/conectividade.png";
import imgCobertura from "@/img/internet-nova/cobertura.png";
import imgEconomia from "@/img/internet-nova/economia.png";
import imgEntretenimento from "@/img/internet-nova/entretenimento.png";
import imgEstabilidade from "@/img/internet-nova/estabilidade.png";
import imgExcelencia from "@/img/internet-nova/excelencia.png";
import imgFacilidade from "@/img/internet-nova/facilidade.png";
import imgPratica from "@/img/internet-nova/pratica.png";
import imgRocket from "@/img/internet-nova/rocket.png";
import imgVelocidade from "@/img/internet-nova/velocidade.png";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "@/app/components/Footer";
import CardInternet from "@/app/components/cards/CardInternet";
import SkeletonCard from "@/app/components/skeleton/SkeletonCard";
import PlanService from "@/app/services/api/plan.service";
import Contact_novo from "@/app/components/Contact-novo";
import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import RegexService from "@/app/services/validations/regex.service";

// Criar variável global fora do componente
let alaresProPlansGlobal: any[] = [];

export default function Internet() {
  const searchParams = useSearchParams();
  const [cityName, setCityName] = useState<any | null>(null);
  const value = getCookie("city_name_uf");
  const [planList, setPlan] = useState<any[]>([]);
  const [activePlanType, setActivePlanType] = useState<string[]>([]);
  const [svaList, setSVAList] = useState<string[]>([]);
  const [planType, setPlanType] = useState("Internet");
  const [ready, setReady] = useState(false);
  const [isGamer, setIsGamer] = useState(false);
  const current = new URLSearchParams(Array.from(searchParams.entries()));
  const [currentSvaIndex, setCurrentSvaIndex] = useState(0);
  const [svaListUpdate, setSvaListUpdate] = useState<string[]>([]);
  const [alaresPro, setAlaresPro] = useState<any>([]);
  const router = useRouter();
  let alaresProPlans:any[] = [];

  type TypeSva =
    | "STREAMING E MÚSICA"
    | "EDUCAÇÃO"
    | "SEGURANÇA DIGITAL"
    | "SAÚDE E BEM-ESTAR";

  const getTypesWithIndices = () => {
    // Criar um objeto com os tipos e seus respectivos índices começando do 1
    const types: Record<number, TypeSva> = {
      1: "STREAMING E MÚSICA",
      2: "EDUCAÇÃO",
      3: "SEGURANÇA DIGITAL",
      4: "SAÚDE E BEM-ESTAR",
    };

    return types;
  };

  async function navigateSVA(slug: string) {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    router.push(`servicos-adicionais/${slug}/?${current}`);
  }

  async function getPlan(type: string) {
    setReady(false);

    const city_id = String(getCookie("city_id"));
    const session_id = getCookie("session_id");
    const request = await PlanService.getPlan(city_id, session_id, type);
    setPlanType(type);

    if (request.status === 200) {
      const data = request.data?.plans;
      const types = request.data?.types;
      const hasTV = request.data?.hasTV;
      const isGamer = request.data?.isGamer;

      setActivePlanType(types);

      data?.map((d: any) => {
        d.blackFriday = checkBlackFriday(d);
        d.alaresPro = checkAlaresPro(d);

        // Adicionar à variável global se for alaresPro
        if (d.alaresPro && !alaresProPlansGlobal.some(plan => plan.id === d.id)) {
          alaresProPlansGlobal.push(d);
          d.blackFriday = true;
        }
      });

      if(type =='Internet Gamer') {
        data.push(...alaresProPlansGlobal);
        setPlan(data);
      }else{
        setPlan(data.filter((plan: any) => !plan.alaresPro));
      }

      setIsGamer(isGamer);
      setReady(true);
    }
  }

  function checkAlaresPro(offer: any) {
    if (offer.classification.length > 0) {
        return offer.classification.some((element: any) => 
            element.description.includes('alarespro')
        );
    }
    return false;
}

  function checkBlackFriday(offer: any) {
    if (offer.classification.length > 0) {
        return offer.classification.some((element: any) => 
            element.description.includes('blacknovember')
        );
    }
    return false;
}

  async function getSVA() {
    const request = await axiosInterceptorInstance.get(
      "/sva/paginate-without-auth",
      {
        params: {
          isActive: null,
        },
      }
    );

    if (request.status === 200) {
      const data = request.data;
      setSVAList(data);
      setSvaListUpdate(data);
    }
  }

  function setSvaSearch(index: number) {
    if (index === currentSvaIndex) {
      setCurrentSvaIndex(0);
      setSvaListUpdate(svaList);
      return;
    }

    if (index !== currentSvaIndex) {
      setCurrentSvaIndex(index);
      const svaListUpdate: any = [];
      svaList.forEach((element: any) => {
        if (element.type == index) {
          svaListUpdate.push(element);
        }
      });
      setSvaListUpdate(svaListUpdate);
      return;
    }
  }

  React.useEffect(() => {
    setCityName(value);
    getPlan("Internet");
    getSVA();
  }, []);

  useEffect(() => {}, [svaListUpdate]);

  function mainContent() {
    return (
      <div className="flex justify-center pt-8">
        <Carousel className="hover:cursor-pointer sm:max-w-[1000px] w-full px-4 mb-4">
          <div className="hidden sm:flex justify-end">
            <CarouselPrevious className="relative top-0 right-0 -mt-12 mr-[-35px] text-black bg-sub rounded-none rounded-l-full hover:bg-main hover:text-white" />
            <CarouselNext className="relative top-0 right-0 -mt-12 mr-[-0px] text-black bg-sub rounded-none rounded-r-full hover:bg-main hover:text-white" />
          </div>
          <CarouselContent>
            {planList?.map((plan) => {
              return (
                <div className="mx-3">
                  <CarouselItem className={`basis-1/3 min-w-[250px]`}>
                    <CardInternet plan={plan} />
                  </CarouselItem>
                </div>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>
    );
  }

  function svaContent() {
    const uniqueTypes = Array.from(
      new Set(svaList.map((item: any) => item.type))
    );
    const typesWithIndices = getTypesWithIndices();
    return (
      <div>
        <div className="flex justify-center pt-8 pl-4 md:mb-[-25px]">
          <div className="flex justify-start sm:pl-4 sm:max-w-[1000px] w-[750px] sm:w-full overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {uniqueTypes?.map((typesSva: any) => {
              return (
                <div
                  key={typesSva}
                  onClick={() => setSvaSearch(typesSva)}
                  className={`mr-1 sm:mr-3 text-sm font-semibold hover:cursor-pointer p-1 hover:bg-gray-5 w-[250px] sm:w-auto flex sm:block`}
                >
                  <span
                    className={`sm:text-sm text-xs border-2 py-2 px-3 border-main rounded-full block w-full sm:w-auto whitespace-nowrap sm:whitespace-normal ${
                      currentSvaIndex === typesSva ? "bg-main text-white" : ""
                    }`}
                  >
                    {typesWithIndices[typesSva]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <Carousel className="hover:cursor-pointer sm:max-w-[1000px] w-full px-4 mb-4">
            <div className="hidden sm:flex justify-end">
              <CarouselPrevious className="relative top-0 right-0 -mt-8 mr-[-40px] text-black bg-sub rounded-none rounded-l-full hover:bg-main hover:text-white" />
              <CarouselNext className="relative top-0 right-0 -mt-8 mr-[-0px] text-black bg-sub rounded-none rounded-r-full hover:bg-main hover:text-white" />
            </div>
            <CarouselContent>
              {svaListUpdate?.map((sva: any) => {
                return (
                  <div className="mx-3 pt-3">
                    <CarouselItem className={`basis-1/3 min-w-[210px] px-0`}>
                      <div className="w-[210px] pb-10">
                        <div className="flex justify-between absolute w-[210px] mt-[-65px]">
                          <div className="pl-2">
                            <img
                              src={sva.image}
                              alt=""
                              className="w-[80px] h-[80px] max-w-fit object-cover rounded-full border-[5px] border-gray-200"
                            />
                          </div>
                          <div className="text-end flex items-center pr-2">
                            <span className="text-xs font-semibold">
                              {sva.name.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="">
                          <div className="border min-h-64 flex flex-col justify-between border-gray-200 mt-14 rounded-xl bg-white">
                            <div className="w-[255px]  mb-4">
                              <div>
                                <img
                                  src={sva?.SvaContent[0]?.image}
                                  alt=""
                                  className="w-[209px] h-[166px] object-cover rounded-br-3xl"
                                />
                              </div>
                            </div>

                            <div
                              className={`justify-center mb-1 items-center ${
                                sva?.price == "0.00" ? "hidden" : "flex"
                              }`}
                            >
                              {sva?.included ? (
                                <p className="text-black text-xl font-semibold">
                                  Incluso
                                </p>
                              ) : (
                                <>
                                  {sva?.price !== "0.00" ? (
                                    <>
                                      <span className="text-gray-500 text-sm mr-1">
                                        R$
                                      </span>{" "}
                                      <p className="text-black text-xl font-semibold">
                                        {RegexService.changeDot(
                                          String(sva?.price)
                                        )}
                                      </p>{" "}
                                      <span className="text-gray-500 ml-1 text-sm">
                                        /mês*
                                      </span>
                                    </>
                                  ) : null}
                                </>
                              )}
                            </div>
                            <div className="flex h-100 justify-center">
                              <button
                                onClick={() => navigateSVA(sva.slug)}
                                className="uppercase font-bold px-6 py-1 w-3/4 mb-4 text-xs rounded-full text-black bg-sub hover:bg-hover hover:scale-110 hover:text-white"
                              >
                                Saiba mais
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  </div>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex sm:hidden h-1.5 w-full bg-sub"></div>
      <div className="h-[120px] flex justify-center items-center bg-[#3C34F2]">
        <div className="w-[1000px] flex sm:justify-between justify-center items-center">
          <h2 className="flex items-center">
            <span className="text-sm font-medium text-sub">HOME</span>
            <IoIosArrowForward className="text-white" />
            <span className="text-sm text-white">
              {cityName?.toUpperCase()}
            </span>
          </h2>
          <div className="sm:flex hidden h-[120px]">
            <Image src={logo} alt={""} className="object-none h-[120px]" />
          </div>
        </div>
      </div>
      <div className="flex sm:hidden h-1.5 w-full bg-sub"></div>

      <div className="flex flex-col justify-start sm:max-w-[950px] mx-auto pt-14 px-7 sm:px-0">
        <h5 className="sm:text-3xl text-2xl max-[375px]:text-xl  pb-4">
          Planos de Internet <b>Fibra Óptica</b>
        </h5>
        <p className="sm:text-lg text-base max-[375px]:text-base">
          Encontre o plano de internet ideal para a sua casa:
        </p>
      </div>

      <div className="flex justify-center sm:pt-12 pt-7 pl-4">
        <div className="flex justify-start pl-4 sm:max-w-[1000px] py-1 w-[750px] sm:w-full overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {activePlanType?.includes("Internet") ? (
            <div
              onClick={() => getPlan("Internet")}
              className={`mr-4 text-sm font-semibold hover:cursor-pointer p-1 hover:bg-gray-5`}
            >
              <span
                className={`sm:text-xs text-xs border-2 py-2 px-7 border-main rounded-full whitespace-nowrap ${
                  planType === "Internet" ? "bg-main text-white" : ""
                }`}
              >
                INTERNET
              </span>
            </div>
          ) : null}

          {activePlanType?.includes("Internet + Telefone") ? (
            <div
              onClick={() => getPlan("Internet + Telefone")}
              className={`mr-4 text-sm font-semibold hover:cursor-pointer p-1 hover:bg-gray-50`}
            >
              <span
                className={`sm:text-xs text-xs border-2 py-2 px-7 border-main rounded-full whitespace-nowrap ${
                  planType === "Internet + Telefone" ? "bg-main text-white" : ""
                }`}
              >
                INTERNET + TELEFONE
              </span>
            </div>
          ) : null}

          {isGamer ? (
            <div
              onClick={() => getPlan("Internet Gamer")}
              className={`mr-4 text-sm font-semibold hover:cursor-pointer p-1 hover:bg-gray-50`}
            >
              <span
                className={`sm:text-xs text-xs border-2 py-2 px-7 border-main rounded-full whitespace-nowrap ${
                  planType === "Internet Gamer" ? "bg-main text-white" : ""
                }`}
              >
                INTERNET GIGA
              </span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="min-h-[700px]" id="cardsOnline">
        <div>{ready ? mainContent() : SkeletonCard()}</div>
      </div>
      <div className="bg-[#F1F1FA] w-full">
        <div className="flex flex-col justify-start sm:max-w-[950px] mx-auto pt-12 px-7 sm:px-0">
          <h5 className="sm:text-3xl text-2xl max-[375px]:text-xl pb-4">
            Por que contratar <b>Alares Fibra Óptica</b>
          </h5>
          <p className="sm:text-lg text-base max-[375px]:text-base">
            Conheça as vantagens da internet residencial banda larga para a
            melhor experiência on-line.
          </p>
          <div className="flex flex-col overflow-x-scroll w-full pt-4  pb-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className=" w-[1025px] flex sm:w-full justify-between pt-8 pb-4">
              <div className="flex flex-row sm:flex-col justify-center sm:justify-start items-center sm:items-start bg-white rounded-lg w-[330px] sm:w-[31%] py-6 px-2 sm:p-6">
                <Image
                  src={imgEstabilidade}
                  alt=""
                  className="sm:pb-5 w-12 sm:w-auto"
                />
                <div className="flex flex-col w-4/5 sm:w-full pl-2 sm:px-0">
                  <b className="text-base pb-4">Mais estabilidade</b>
                  <span className="text-sm">
                    Baixe arquivos, assista a seus conteúdos favoritos em HD e
                    jogue online.
                  </span>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col justify-center sm:justify-start items-center sm:items-start bg-white rounded-lg w-[330px] sm:w-[31%] py-6 px-2 sm:p-6">
                <Image
                  src={imgVelocidade}
                  alt=""
                  className="sm:pb-5 w-12 sm:w-auto"
                />
                <div className="flex flex-col w-4/5 sm:w-full pl-2 sm:px-0">
                  <b className="text-base pb-4">Mais velocidade</b>
                  <span className="text-sm">
                    Taxas de upload de 50% da velocidade de download para você
                    se conectar com ultravelocidade.
                  </span>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col justify-center sm:justify-start items-center sm:items-start bg-white rounded-lg w-[330px] sm:w-[31%] py-6 px-2 sm:p-6">
                <Image
                  src={imgConectividade}
                  alt=""
                  className="sm:pb-5 w-12 sm:w-auto"
                />
                <div className="flex flex-col w-4/5 sm:w-full pl-2 sm:px-0">
                  <b className="text-base pb-4">Mais conectividade</b>
                  <span className="text-sm">
                    32 mil quilômetros de extensão de Fibra Óptica de última geração para uma internet de qualidade.
                  </span>
                </div>
              </div>
            </div>

            <div className="w-[1025px] flex sm:w-full justify-between py-4">
              <div className="flex flex-row sm:flex-col justify-center sm:justify-start items-center sm:items-start bg-white rounded-lg w-[330px] sm:w-[31%] py-6 px-2 sm:p-6">
                <Image
                  src={imgEconomia}
                  alt=""
                  className="sm:pb-5 w-12 sm:w-auto"
                />
                <div className="flex flex-col w-4/5 sm:w-full pl-2 sm:px-0">
                  <b className="text-base pb-4">Mais economia</b>
                  <span className="text-sm">
                    Sem taxas de instalação e adesão, e sem surpresas na conta.
                  </span>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col justify-center sm:justify-start items-center sm:items-start bg-white rounded-lg w-[330px] sm:w-[31%] py-6 px-2 sm:p-6">
                <Image
                  src={imgExcelencia}
                  alt=""
                  className="sm:pb-5 w-12 sm:w-auto"
                />
                <div className="flex flex-col w-4/5 sm:w-full pl-2 sm:px-0">
                  <b className="text-base pb-4">Mais excelência</b>
                  <span className="text-sm">
                    Qualidade em serviços de internet premiada e reconhecida
                    nacionalmente.
                  </span>
                </div>
              </div>
                <div className="flex flex-row sm:flex-col justify-center sm:justify-start items-center sm:items-start bg-white rounded-lg w-[330px] sm:w-[31%] py-6 px-2 sm:p-6">
                <Image
                  src={imgPratica}
                  alt=""
                  className="sm:pb-5 w-12 sm:w-auto"
                />
                <div className="flex flex-col w-4/5 sm:w-full pl-2 sm:px-0">
                  <b className="text-base pb-4">Mais praticidade</b>
                  <span className="text-sm">
                    Dezenas de lojas físicas espalhadas pelo Brasil para te
                    proporcionar o melhor atendimento.
                  </span>
                </div>
              </div>
            </div>

            <div className="w-[1025px] flex sm:w-full justify-between pt-4">
              <div className="flex flex-row sm:flex-col justify-center sm:justify-start items-center sm:items-start bg-white rounded-lg w-[330px] sm:w-[31%] py-6 px-2 sm:p-6">
                <Image
                  src={imgEntretenimento}
                  alt=""
                  className="sm:pb-5 w-12 sm:w-auto"
                />
                <div className="flex flex-col w-4/5 sm:w-full pl-2 sm:px-0">
                  <b className="text-base pb-4">Mais entretenimento</b>
                  <span className="text-sm">
                    Planos completos com serviços adicionais como aplicativos de
                    streaming, livros digitais, revistas, segurança digital e
                    mais!
                  </span>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col justify-center sm:justify-start items-center sm:items-start bg-white rounded-lg w-[330px] sm:w-[31%] py-6 px-2 sm:p-6">
                <Image
                  src={imgFacilidade}
                  alt=""
                  className="sm:pb-5 w-12 sm:w-auto"
                />
                <div className="flex flex-col w-4/5 sm:w-full pl-2 sm:px-0">
                  <b className="text-base pb-4">Mais facilidade</b>
                  <span className="text-sm">
                    Contratação 100% online e opção de fatura digital, além do
                    app Alares para consultar débitos, 2ª via e outras
                    funcionalidades.
                  </span>
                </div>
              </div>
              <div className="flex flex-row sm:flex-col justify-center sm:justify-start items-center sm:items-start bg-transparent rounded-lg w-[330px] sm:w-[31%] py-6 px-2 sm:p-6">
                
              </div>
            </div>
          </div>
        </div>

        <span className="text-left sm:max-w-[950px] mx-auto block pt-4 pb-12 text-sm sm:px-0 px-7">
          * Verifique a disponibilidade na sua região
        </span>
      </div>

      <div className="bg-white w-full">
        <div className="flex flex-col justify-start sm:max-w-[950px] mx-auto pt-12 px-7 sm:px-0">
          <h5 className="sm:text-3xl text-2xl max-[375px]:text-xl  pb-4">
            Internet <b>+ Serviços Adicionais</b>
          </h5>
          <p className="sm:text-lg text-base max-[375px]:text-base max-w-4xl">
            Apps de conteúdo e entretenimento parceiros para aproveitar livros
            digitais, cursos, filmes, séries, novelas, documentários, músicas e
            muito mais, quando quiser.
          </p>
        </div>
        {svaContent()}
      </div>

      <div className="bg-[#F1F1FA] w-full">
        <div className="flex flex-col justify-start sm:max-w-[950px] mx-auto pt-12 px-7 sm:px-0">
          <h5 className="sm:text-3xl text-2xl max-[375px]:text-xl  pb-4 text-left sm:w-3/5">
            Saiba qual a velocidade de <b>internet perfeita para você</b>
          </h5>
          <p className="sm:text-lg text-base max-[375px]:text-base text-left max-w-4xl pt-4 pb-20">
            Conheça nossas opções de planos de internet Fibra Óptica. Nós te
            ajudamos a escolher a melhor velocidade para suprir as necessidades
            da sua rotina!
          </p>

          <div className="flex flex-col sm:flex-row justify-between w-full">
            <div className="flex flex-col justify-evenly min-h-[236px] sm:min-h-[421px] sm:max-w-[262px] w-100 rounded-lg bg-white px-6 sm:mx-0 sm:pb-0 pb-6">
              <Image
                src={imgRocket}
                alt=""
                className="-mt-16 sm:-mt-20 -ml-6 w-[80px] h-[80px] "
              />
              <b className="text-base">
                Planos de internet Alares até 250 Mega
              </b>
              <p className="text-sm">
                Estabilidade para executar tarefas do dia a dia, como assistir a
                streamings de vídeo em definição padrão (SD) e alta definição
                (HD). Esta velocidade de internet já permite que você tenha
                várias conexões simultâneas em uma mesma casa.
              </p>
            </div>
            <div className="flex flex-col justify-evenly min-h-[236px] sm:min-h-[421px] sm:max-w-[262px] w-100 rounded-lg bg-white px-6 mt-20 sm:mt-0 sm:ml-5 sm:mr-3 sm:pb-0 pb-6">
              <Image
                src={imgRocket}
                alt=""
                className="-mt-16 sm:-mt-20 -ml-6 w-[80px] h-[80px] "
              />
              <b className="text-base">
                Planos de internet Alares de 300 a 500 Mega
              </b>
              <p className="text-sm">
                Ideais para famílias maiores e moradores que fazem uso intensivo
                de internet. Os planos de internet residencial de 300 a 500 Mega
                oferecem velocidade e estabilidade para streaming de vídeo em
                4K, jogos online, videoconferências e trabalho remoto.
              </p>
            </div>
            <div className="flex flex-col justify-evenly min-h-[236px] sm:min-h-[421px] sm:max-w-[262px] w-100 rounded-lg bg-white mt-20 sm:mt-0 px-6 sm:ml-3 sm:mr-5 sm:pb-0 pb-6">
              <Image
                src={imgRocket}
                alt=""
                className="-mt-16 sm:-mt-20 -ml-6 w-[80px] h-[80px] "
              />
              <b className="text-base">
                Planos de internet Alares de 500 Mega a 1 Giga
              </b>
              <p className="text-sm">
                Velocidade de conexão perfeita para áreas metropolitanas e para
                quem faz uso intensivo de internet! Este plano de internet
                residencial atende casas com muitos dispositivos conectados e
                necessidades de alta largura de banda.
              </p>
            </div>
            <div className="flex flex-col justify-evenly min-h-[236px] sm:min-h-[421px] sm:max-w-[262px] w-100 rounded-lg bg-white mt-20 sm:mt-0 px-6 sm:mx-0 sm:pb-0 pb-6">
              <Image
                src={imgRocket}
                alt=""
                className="-mt-16 sm:-mt-20 -ml-6 w-[80px] h-[80px] "
              />
              <b className="text-base w-11/12">
                Planos de internet Alares acima de 1 Giga *
              </b>
              <p className="text-sm">
                Estabilidade e velocidade para jogar sem lag! Os planos de
                internet residencial acima de 1 Giga são ideais para os gamers,
                principalmente os que fazem streaming de jogos. Além disso,
                oferecem vantagens também para produtores de conteúdo e
                youtubers.
              </p>
            </div>
          </div>

          <span className="text-left text-sm  sm:max-w-[950px] mr-auto pt-6 pb-14">
            * Verifique a disponibilidade na sua região
          </span>
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
