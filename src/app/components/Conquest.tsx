"use client";
import React, { useState } from "react";
import melhorPlanoLogo from "@/img/src/Melhor-plano.png";
import melhorBotelhos from "@/img/src/melhor-botelhos.png";
import anatelLogo from "@/img/src/anatel-logo.png";
import abtLogo from "@/img/src/abt.png";
import abemdLogo from "@/img/src/abemd.png";
import { FaStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import image_1 from "@/img/photo/img01.jpg";
import image_3 from "@/img/photo/img03.jpg";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import Contact from "./Contact";

export default function Conquest() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [yearList, setYearList] = useState<any[]>([]);
  const [conquestList, setConquestList] = useState<any[]>([]);
  const link_2 =
    "https://telesintese.com.br/grupo-conexao-muda-de-nome-e-passa-a-se-chamar-alares/#google_vignette";
  const link_1 =
    "https://tribunadonorte.com.br/especiais-tribuna-do-norte/top-natal/confira-os-vencedores-dos-29-segmentos-do-premio-top-natal-2023/";

    const alares = 'Alares';
    const conexao = 'Conexão';
    const cabotelecom = 'Cabo Telecom';
    const starweb = 'Starweb';
    const webby = 'Webby';
    const outcenter = 'Outcenter';
    const multiplay = 'Multiplay';
    const tecnet = 'Tecnet';
  
    const aguaDaPrata = 'Águas da Prata (SP)';
    const bastos = 'Bastos (SP)';
    const bernardino = 'Bernardino de Campos (SP)';
    const botelhos = 'Botelhos (MG)';
    const caldas = 'Caldas (MG)';
    const candidoMota = 'Candido Mota (SP)';
    const capestre = 'Capestre (MG)';
    const casaBranca = 'Casa Branca (SP)';
    const caconde = 'Caconde (SP)';
    const caucaia = 'Caucaia (CE)';
    const cristina = 'Cristina (MG)';
    const cruzilia = 'Cruzilia (MG)';
    const conceicaoDoRioVerde = 'Conceição do Rio Verde (MG)';
    const divinolandia = 'Divinolândia (SP)';
    const jacarezinho = 'Jacarezinho (PR)';
    const mococa = 'Mococa (SP)';
    const martinopolis = 'Martinópolis (SP)';
    const natal = 'Natal (RN)';
    const ipaussu = 'Ipaussu (SP)';
    const ibirarema = 'Ibirarema (SP)';
    const itamonte = 'Itamonte (MG)';
    const itajuaba = 'Itajubá (MG)';
    const itanhandu = 'Itanhadu (MG)';
    const itobi = 'Itobi (SP)';
    const ourinhos = 'Ourinhos (SP)';
    const palmital = 'Palmital (SP)';
    const passoQuatro = 'Passso Quatro (MG)';
    const parapua = 'Parapuã (SP)';
    const piraju = 'Piraju (SP)';
    const passaQuatro = 'Passa Quatro (MG)';
    const pousoAlto = 'Pouso Alto (MG)';
    const pousoAlegre = 'Pouso Alegre (MG)';
    const portoSeguro = 'Porto Seguro (BA)';
    const pocosDeCaldas = 'Poços de Caldas (MG)';
    const santaMariana = 'Santa Mariana (PR)';
    const saltoGrande = 'Salto Grande (SP)';
    const santaCruzCabralia = 'Santa Cruz Cabrália (BA)';
    const saoJoaoDaBoaVista = 'São João da Boa Vista (SP)';
    const saoLourenco = 'São Lourenço (MG)';
    const saoGoncaloDoAmarante = 'São Gonçalo do Amarante (RN)';
    const siqueiraCampos = 'Siqueira Campos (PR)';
    const taguai = 'Taguaí (SP)';
    const tapiratiba = 'Taguaí (SP)';
    const tresPontas = 'Três Pontas (MG)';
    const tupa = 'Tupã (SP)';
    const varginha = 'Varginha (MG)';
    const vargemGrandeDoSul = 'Vargem Grande Do Sul (SP)';
  
    const CE = 'CE';
    const RN = 'RN';
  
    const conquerList = [
      {
        title: "1º Lugar Melhor Botelhos",
        logo: melhorBotelhos,
        conquests: [
          { year: 2025, brand: alares, city: botelhos },
          { year: 2024, brand: alares, city: pocosDeCaldas }
        ],
      },
      {
        title: '1º Lugar Melhor Velocidade',
        logo: melhorPlanoLogo,
        conquests: [
          { year: 2025, brand: alares, city: caldas },
          { year: 2025, brand: alares, city: conceicaoDoRioVerde },
          { year: 2025, brand: alares, city: itanhandu },
          { year: 2025, brand: alares, city: passaQuatro },
          { year: 2025, brand: alares, city: tresPontas },
          { year: 2025, brand: alares, city: saoLourenco },
          { year: 2025, brand: alares, city: pousoAlto },
          { year: 2025, brand: alares, city: passaQuatro },
          { year: 2022, brand: starweb, city: itanhandu },
          { year: 2024, brand: webby, city: bastos },
          { year: 2024, brand: webby, city: palmital },
          { year: 2024, brand: webby, city: ipaussu },
          { year: 2024, brand: webby, city: candidoMota },
          { year: 2024, brand: webby, city: piraju },
          { year: 2024, brand: webby, city: santaMariana },
          { year: 2024, brand: webby, city: saltoGrande },
          { year: 2024, brand: webby, city: martinopolis },
          { year: 2024, brand: webby, city: bernardino },
          { year: 2024, brand: webby, city: ibirarema },
          { year: 2024, brand: webby, city: parapua },
          { year: 2024, brand: webby, city: siqueiraCampos },
          { year: 2024, brand: webby, city: jacarezinho },
          { year: 2024, brand: webby, city: taguai },
          { year: 2024, brand: webby, city: tupa },
          { year: 2024, brand: webby, city: ourinhos },
  
          { year: 2023, brand: outcenter, city: divinolandia },
          { year: 2023, brand: outcenter, city: casaBranca },
          { year: 2023, brand: outcenter, city: caconde },
          { year: 2023, brand: outcenter, city: itobi },
          { year: 2023, brand: starweb, city: varginha },
          { year: 2023, brand: starweb, city: pousoAlto },
          { year: 2023, brand: starweb, city: passoQuatro },
          { year: 2023, brand: starweb, city: itanhandu },
          { year: 2023, brand: starweb, city: itamonte },
          { year: 2023, brand: starweb, city: conceicaoDoRioVerde },
          { year: 2023, brand: outcenter, city: capestre },
          { year: 2023, brand: outcenter, city: botelhos },
          { year: 2022, brand: outcenter, city: vargemGrandeDoSul },
          { year: 2022, brand: conexao, city: tapiratiba },
          { year: 2022, brand: outcenter, city: casaBranca },
          { year: 2022, brand: outcenter, city: caconde },
          { year: 2022, brand: conexao, city: aguaDaPrata },
          { year: 2022, brand: starweb, city: pousoAlto },
          { year: 2022, brand: starweb, city: itamonte },
          { year: 2022, brand: starweb, city: itajuaba },
          { year: 2022, brand: starweb, city: conceicaoDoRioVerde },
          { year: 2022, brand: outcenter, city: botelhos },
          { year: 2022, brand: outcenter, city: santaCruzCabralia },
          { year: 2022, brand: multiplay, city: CE },
  
          { year: 2021, brand: outcenter, city: vargemGrandeDoSul },
          { year: 2021, brand: outcenter, city: caconde },
          { year: 2021, brand: starweb, city: pousoAlegre },
          { year: 2021, brand: tecnet, city: caucaia },
          { year: 2021, brand: outcenter, city: portoSeguro },
          { year: 2021, brand: conexao, city: mococa },
  
          { year: 2020, brand: conexao, city: vargemGrandeDoSul },
          { year: 2020, brand: conexao, city: mococa },
          { year: 2020, brand: cabotelecom, city: natal },
          { year: 2020, brand: starweb, city: pousoAlegre },
          { year: 2020, brand: outcenter, city: portoSeguro },
          { year: 2019, brand: cabotelecom, city: RN },
        ],
      },
      {
        title: '1º Lugar Maior Satisfação',
        logo: melhorPlanoLogo,
        conquests: [
          { year: 2024, brand: webby, city: martinopolis },
          { year: 2023, brand: outcenter, city: saoJoaoDaBoaVista },
          { year: 2023, brand: starweb, city: varginha },
          { year: 2023, brand: outcenter, city: pocosDeCaldas },
          { year: 2023, brand: starweb, city: itanhandu },
        ],
      },
      {
        title: '1º Lugar Melhor Satisfação',
        logo: melhorPlanoLogo,
        conquests: [
          { year: 2025, brand: alares, city: varginha },
          { year: 2025, brand: alares, city: saoLourenco },
          { year: 2021, brand: conexao, city: mococa },
          { year: 2022, brand: conexao, city: mococa },
          { year: 2020, brand: conexao, city: mococa },
        ],
      },
      {
        title: '1º Lugar Melhor Provedor',
        logo: melhorPlanoLogo,
        conquests: [
          { year: 2025, brand: alares, city: varginha },
          { year: 2025, brand: alares, city: saoLourenco },
          { year: 2024, brand: webby, city: martinopolis },
          { year: 2024, brand: webby, city: ourinhos },
          { year: 2023, brand: outcenter, city: pocosDeCaldas },
          { year: 2022, brand: conexao, city: mococa },
          { year: 2022, brand: starweb, city: varginha },
          { year: 2021, brand: conexao, city: mococa },
          { year: 2021, brand: starweb, city: varginha },
          { year: 2020, brand: cabotelecom, city: natal },
          { year: 2019, brand: cabotelecom, city: RN },
          { year: 2020, brand: conexao, city: mococa },
          { year: 2020, brand: starweb, city: itanhandu },
        ],
      },
      {
        title: '1º Lugar Maior Estabilidade',
        logo: melhorPlanoLogo,
        conquests: [
          { year: 2025, brand: alares, city: caldas },
          { year: 2025, brand: alares, city: cristina },
          { year: 2025, brand: alares, city: cruzilia },
          { year: 2025, brand: alares, city: pousoAlto },
        ],
      },
      {
        title: '1º Lugar Melhor Internet Gamer',
        logo: melhorPlanoLogo,
        conquests: [
          { year: 2025, brand: alares, city: caldas },
          { year: 2025, brand: alares, city: cristina },
          { year: 2025, brand: alares, city: pousoAlto },
          { year: 2023, brand: outcenter, city: itobi },
          { year: 2023, brand: outcenter, city: divinolandia },
          { year: 2023, brand: outcenter, city: casaBranca },
          { year: 2023, brand: outcenter, city: caconde },
          { year: 2023, brand: cabotelecom, city: saoGoncaloDoAmarante },
          { year: 2023, brand: starweb, city: varginha },
          { year: 2023, brand: starweb, city: pousoAlto },
          { year: 2023, brand: starweb, city: passoQuatro },
          { year: 2023, brand: starweb, city: itanhandu },
          { year: 2023, brand: outcenter, city: capestre },
          { year: 2023, brand: starweb, city: itamonte },
          { year: 2023, brand: starweb, city: conceicaoDoRioVerde },
          { year: 2023, brand: outcenter, city: botelhos },
        ],
      },
      {
        title: '1º Lugar Melhor Banda Larga',
        logo: anatelLogo,
        conquests: [
          { year: 2015, brand: cabotelecom, city: '-' },
          { year: 2016, brand: cabotelecom, city: '-' },
          { year: 2017, brand: cabotelecom, city: '-' },
        ],
      },
      {
        title: '2º Lugar Melhor TV por Assinatura',
        logo: anatelLogo,
        conquests: [
          { year: 2016, brand: cabotelecom, city: '-' },
          { year: 2017, brand: cabotelecom, city: '-' },
          { year: 2018, brand: cabotelecom, city: '-' },
        ],
      },
      {
        title: '2º Lugar Prêmio ABT - Atendimento em redes sociais',
        logo: abtLogo,
        conquests: [{ year: 2024, brand: alares, city: '-' }],
      },
      {
        title: '2º Lugar Prêmio ABEMD - Call Center',
        logo: abemdLogo,
        conquests: [{ year: 2024, brand: alares, city: '-' }],
      },
      {
        title: '3º Lugar Prêmio ABT - Operação de cobrança',
        logo: abtLogo,
        conquests: [{ year: 2024, brand: alares, city: '-' }],
      },
    ];

  async function getYears() {
    let array: number[] = [];

    conquerList.map((c) => {
      c.conquests?.map((conquest) => {
        if (!array.includes(conquest.year)) {
          array.push(conquest.year);
        }
      });
    });

    array.sort((a, b) => b - a);

    setYearList(array);
  }

  async function filterConquest(year: any) {
    setSelectedYear(year);

    let array: any[] = [];

    if (year === null) {
      array = conquerList;
    } else {
      conquerList.map((conquest) => {
        conquest.conquests.map((conq) => {
          if (conq.year === year) {
            if (!array.includes(conquest)) {
              array.push(conquest);
            }
          }
        });
      });
    }

    setConquestList(array);
  }

  React.useEffect(() => {
    setConquestList(conquerList);
    getYears();
  }, []);

  return (
    <section>
      <div className="flex justify-center w-full">
        <div className="p-4 lg:max-w-[900px] w-[100vw]">
          <div className="text-center mb-4">
            <span className="text-2xl">
              Nossas <strong>Conquistas</strong>
            </span>
          </div>

          <div className="flex justify-center">
            <div className="flex justify-center flex-wrap mb-10 lg:w-full w-[350px]">
              <div
                onClick={() => filterConquest(null)}
                className={`mb-2 py-1 px-4 hover:cursor-pointer hover:bg-gray-100 ${
                  selectedYear === null ? "border-b-4 border-blue-700 " : ""
                }`}
              >
                <span className="text-gray-600">TODOS</span>
              </div>
              {yearList.map((year) => {
                return (
                  <div
                    onClick={() => filterConquest(year)}
                    className={`mb-2 py-1 px-4 hover:cursor-pointer hover:bg-gray-100 ${
                      selectedYear === year ? "border-b-4 border-blue-700 " : ""
                    }`}
                  >
                    <span className="text-gray-600">{year}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <Carousel
              className="max-w-[1000px]"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {conquestList?.map((conquer, index) => {
                  return (
                    <CarouselItem
                      key={index}
                      className="flex justify-center lg:basis-1/3 select-none px-4"
                    >
                      <div className="p-5 max-w-[250px]">
                        <div className="bg-white flex items-center border-2 border-sub rounded-full py-2 px-4 w-[120px] relative ml-[-20px] mb-[-25px]">
                          <FaStar className="scale-150 mr-3" />
                          <span className="pt-1 font-medium">Prêmio</span>
                        </div>
                        <div className="bg-[#F1F1FA] py-4 rounded-br-[40px]">
                          <div className="mt-5">
                            <div className=" px-8 mb-2">
                              <div className="text-end mb-2">
                                <span>{selectedYear}</span>
                              </div>
                              <div className="text-center">
                                <span className="font-bold">
                                  {conquer.title}
                                </span>
                              </div>
                            </div>

                            <div className="p-2">
                              <div className="p-4 bg-white rounded-b-3xl w-[195px] h-[80px] flex justify-center items-center">
                                <Image
                                  src={conquer.logo}
                                  alt={""}
                                  className="w-100 object-contain px-4"
                                />
                              </div>
                            </div>

                            <AlertDialog>
                              <AlertDialogTrigger className="p-4 flex justify-center w-full">
                                <button className="bg-main text-white py-2 px-4 rounded-full">
                                  SAIBA MAIS
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="overflow-auto max-h-[98vh]">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="flex justify-between items-center">
                                    {conquer.title}
                                    <AlertDialogCancel className="rounded-full">
                                      <IoMdClose />
                                    </AlertDialogCancel>
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    <Table>
                                      <TableHeader>
                                        <TableRow>
                                          {selectedYear === null ? (
                                            <TableHead className="w-[100px] text-main">
                                              Ano
                                            </TableHead>
                                          ) : null}
                                          <TableHead className="text-main">
                                            Marca
                                          </TableHead>
                                          <TableHead className="text-main">
                                            Cidade
                                          </TableHead>
                                        </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                        {conquer.conquests?.map(
                                          (conq: any, index: number) => {
                                            if(selectedYear != null) {
                                            return (
                                              <>
                                                <TableRow key={index}>
                                                  {selectedYear === null ? (
                                                    <TableCell className="font-medium">
                                                      {conq.year}
                                                    </TableCell>
                                                  ) : null}
                                                  {selectedYear === conq.year ? (
                                                  <TableCell>
                                                    {conq.brand}
                                                  </TableCell>
                                                  ) : null}
                                                  {selectedYear === conq.year ? (
                                                  <TableCell>
                                                    {conq.city}
                                                  </TableCell>
                                                  ) : null}
                                                </TableRow>
                                              </>
                                            );
                                            
                                          }else{
                                            return (
                                              <>
                                                <TableRow key={index}>
                                                  {selectedYear === null ? (
                                                    <TableCell className="font-medium">
                                                      {conq.year}
                                                    </TableCell>
                                                  ) : null}
                                                  <TableCell>
                                                    {conq.brand}
                                                  </TableCell>
                                                  <TableCell>
                                                    {conq.city}
                                                  </TableCell>
                                                </TableRow>
                                              </>
                                            );
                                            
                                          }
                                          }
                                        )}
                                      </TableBody>
                                    </Table>
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="lg:flex hidden" />
              <CarouselNext className="lg:flex hidden" />
            </Carousel>
          </div>
        </div>
      </div>

      <div className="lg:bg-main lg:h-[500px] w-full mt-[-150px] pt-[150px] p-4 lg:mb-[400px] mb-10 border-b-4 border-main hidden">
        <div className="flex justify-center">
          <div className="lg:w-[1000px]">
            <div className="mb-4">
              <span className="text-2xl text-white">
                Alares na <strong>mídia</strong>
              </span>
            </div>

            <div className="lg:flex justify-center">
              <div className="max-w-[500px] lg:w-[500px] w-[300px] lg:mr-4 mb-8">
                <a rel="canonical" href={link_1} target="_blank">
                  <Image
                    src={image_3}
                    alt={""}
                    className="rounded-2xl hover:brightness-110 mb-4"
                  />
                </a>
                <div className="mb-4">
                  <a rel="canonical" href={link_1} target="_blank">
                    <span className="text-2xl text-main hover:underline">
                      Top Natal premia marcas mais lembradas pelos natalenses,
                      veja os vencedores
                    </span>
                  </a>
                </div>

                <div className="mb-4">
                  <a rel="canonical" href={link_1} target="_blank">
                    <span className="text-base text-main hover:underline">
                      O prêmio Top Natal 2023 chegou a sua 21ª edição neste ano.
                      Ao todo, 29 marcas foram premiadas com o título de mais
                      lembrada pelos consumidores da capital potiguar no seu
                      segmento.
                    </span>
                  </a>
                </div>
              </div>

              <div className="max-w-[500px] lg:w-[500px] w-[300px] mb-8">
                <a rel="canonical" href={link_2} target="_blank">
                  <Image
                    src={image_1}
                    alt={""}
                    className="rounded-2xl hover:brightness-110 mb-4"
                  />
                </a>
                <div className="mb-4">
                  <a rel="canonical" href={link_2} target="_blank">
                    <span className="text-2xl text-main hover:underline">
                      Grupo Conexão muda de nome e passa a se chamar Alares
                    </span>
                  </a>
                </div>

                <div className="mb-4">
                  <a rel="canonical" href={link_2} target="_blank">
                    <span className="text-base text-main hover:underline">
                      Provedora de banda larga presente em 100 cidades e 6
                      estados, a Alares pretende continuar comprando ISPs, mas
                      não há mais planos de abrir capital.
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Contact />
      </div>
    </section>
  );
}
