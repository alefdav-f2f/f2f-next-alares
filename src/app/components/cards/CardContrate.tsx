"use client";
import DataLayerService from "@/app/services/api/datalayer.service";
import { navigation } from "@/app/services/navigation-service";
import RegexService from "@/app/services/validations/regex.service";
import { getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaDownload, FaTools, FaUpload, FaWifi } from "react-icons/fa";
import ModalPlans from "../../components/ModalPlans";
import Loading from "../loadings/Loading";
import React from "react";

export default function CardContrate({ offer, location }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  function returnTitlePlan(plan: string): string {
    return plan.split(" + ")[0];
  }

  function returnSubtitlePlan(plan: string): string {
    const [, ...sub] = plan.split(" + ");
    const subtitle = sub.join(" + ");
    return subtitle ? "+" + subtitle : subtitle;
  }

  function navigateContract(path: string, plan: any) {
    setIsLoading(true);

    postButtonClick(plan);

    current.delete("plano");
    router.push(`${path}/?${current}&plano=${plan.id}`);

    setTimeout(() => {
      setIsLoading(false);
      window.location.reload();
    }, 900);
  }

  // Envio de evento datalayer
  function postButtonClick(plan: any) {
    const pathname = window.location.pathname;

    const data = {
      event: "click_cta_contrate_ja",
      city: String(getCookie("city_name")),
      state: String(getCookie("uf_name")),
      selected_plan: plan.name,
      value: plan.title,
      oferta_id: plan.id,
      local_page: pathname,
    };

    console.log(data);

    DataLayerService.postButtonClick(data);
  }

  function getParams() {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    return `?${params}`;
  }

  // React.useEffect(() => {
  //   window.location.reload();
  // }, [current.get("plano")]);

  if (location === "carrosel") {
    return (
      <div key={offer.id} className="rounded-lg sm:m-2 pb-4 fade50">
        {offer.id == current.get("plano") ? (
          <span className="bg-sub block w-2/3 text-center text-black py-1 -mb-3 z-50 rounded-br-full relative font-bold">
            PLANO ATUAL{" "}
          </span>
        ) : null}
        <div
          className={`shadow-xl rounded-br-3xl lg:min-h-[450px] 2xl:min-h-[500px] flex flex-col lg:justify-center 2xl:justify-evenly ${
            offer.id == current.get("plano") ? "bg-main" : "bg-white"
          }`}
        >
          <div
            className={`rounded-t-lg flex flex-col items-center justify-center ${
              offer.id == current.get("plano") ? "pt-2 pb-1" : "pt-7 pb-4"
            }`}
          >
            {offer.title?.length > 3 ? (
              <span
                className={`text-4xl font-medium ${
                  offer.id == current.get("plano") ? "text-white" : "text-black"
                }`}
              >
                {returnTitlePlan(offer.name)}
              </span>
            ) : null}
            {offer.title?.length <= 3 ? (
              <span
                className={`2xl:text-4xl text-3xl font-semibold ${
                  offer.id == current.get("plano") ? "text-white" : "text-black"
                }`}
              >
                {returnTitlePlan(offer.name)}
              </span>
            ) : null}
            <span
              className={`text-sm ml-2 ${
                offer.id == current.get("plano") ? "text-white" : "text-black"
              }`}
            >
              {" "}
              {returnSubtitlePlan(offer.name)}
            </span>
          </div>

          <div className="">
            {offer?.services?.map((service: any) => {
              return (
                <>
                  {service.emphasis === true ? (
                    <div key={service.id} className="">
                      <div className="flex justify-center">
                        <div className="flex justify-center 2xl:w-[125px] w-[100px] shadow-md rounded-full">
                          <img
                            className="rounded-full"
                            src={service.iconEmphasis}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </>
              );
            })}
          </div>

          <div className="p-4">
            {/* SERVIÇOS */}
            <div className="mb-1">
              <div className="pl-4 mb-1 flex flex-col w-full mx-auto">
                <div className="flex mb-2">
                  <FaWifi
                    className={`w-5 h-5 mr-2 ${
                      offer.id == current.get("plano")
                        ? "text-sub"
                        : "text-main"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      offer.id == current.get("plano")
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {offer?.contents[0]?.name}
                  </span>
                </div>

                <div className="flex mb-2">
                  <FaTools
                    className={`w-5 h-5 mr-2 ${
                      offer.id == current.get("plano")
                        ? "text-sub"
                        : "text-main"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      offer.id == current.get("plano")
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {offer?.contents[1]?.name}
                  </span>
                </div>

                <div className="flex mb-2">
                  <FaDownload
                    className={`w-5 h-5 mr-2 ${
                      offer.id == current.get("plano")
                        ? "text-sub"
                        : "text-main"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      offer.id == current.get("plano")
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {offer?.contents[2]?.name}
                  </span>
                </div>

                <div className="flex mb-2">
                  <FaUpload
                    className={`w-5 h-5 mr-2 ${
                      offer.id == current.get("plano")
                        ? "text-sub"
                        : "text-main"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      offer.id == current.get("plano")
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {offer?.contents[3]?.name}
                  </span>
                </div>

                {/* <div className='flex mb-2 h-5'>
                                <span className={`text-sm text-main`}>{['promo', 'promo20'].includes(offer?.contents[4]?.name) ? '' : offer?.contents[4]?.name}</span>
                            </div> */}
              </div>
            </div>

            {/* APP DE CONTEÚDO */}
            <div
              className={`${
                offer.id == current.get("plano") ? "mb-6 " : "2xl:mb-6 mb-2"
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <div className="mb-1">
                  <img
                    src="https://hmg.alaresinternet.com.br/wp-content/themes/alares-PR168/assets/_dist/images/template/icon-apps.svg"
                    alt=""
                    className="mr-2 w-4"
                  />
                </div>
              </div>

              <div className="flex items-center justify-center flex-wrap mb-1">
                {offer?.services
                  ?.slice(0, 3)
                  .map((service: any, index_service: number) => {
                    return (
                      <div key={index_service}>
                        <div className="p-1">
                          <div
                            className={`2xl:w-[60px] 2xl:h-[60px] w-[40px] h-[40px] rounded-full shadow-lg flex justify-center hover:scale-150 ${
                              offer.id == current.get("plano") ? "bg-white" : ""
                            }`}
                          >
                            <img
                              src={service.icon}
                              alt=""
                              className="object-contain rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {/* <div className='h-5 w-full flex items-center justify-center'>
                                {offer?.services?.length > 3 ? (
                                    <span onClick={() => showService()} className='text-sm hover:underline text-gray-500'>Exibir mais</span>
                                ) : null}
                            </div> */}
              </div>
            </div>

            {/* PREÇO */}
            {offer?.promo === false ? (
              <div className="mb-4">
                <div className="flex justify-center">
                  <div
                    className={`flex ${
                      offer.id == current.get("plano")
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    <div>
                      <span>R$</span>
                    </div>
                    <div>
                      <span className="text-4xl">
                        {RegexService.getWordPosition(offer.price, 0)}
                      </span>
                    </div>
                    <div>
                      <div>
                        <span>{RegexService.getWordPrice(offer.price)}</span>
                      </div>
                      <div className="mt-[-4px]">
                        <span className="text-xs">/mês</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-[-5px]">
                  <span
                    className={`text-xs ${
                      offer.id == current.get("plano")
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    Na conta digital
                  </span>
                </div>
                {offer.id != current.get("plano") ? (
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() =>
                        navigateContract("/contrate-ja-card", offer)
                      }
                      className="px-6 py-1 rounded-full text-black bg-sub hover:bg-hover hover:scale-110 hover:text-white w-[150px]"
                    >
                      {isLoading ? (
                        <>
                          <Loading />
                        </>
                      ) : (
                        "Selecionar"
                      )}
                    </button>
                  </div>
                ) : null}

                <div
                  className={`text-center  ${
                    offer.highlight ? "text-white" : "text-gray-500"
                  }`}
                >
                  <a
                    href={navigation(
                      0,
                      `${"?" + String(current)}`,
                      "document",
                      ""
                    )}
                  >
                    <span
                      className={`${
                        offer.highlight ? "text-white" : "text-main"
                      } text-xs hover:underline`}
                    >
                      Consulte condições
                    </span>
                  </a>
                </div>
              </div>
            ) : null}

            {offer?.promo === true ? (
              <div className="mb-2">
                <div className="flex justify-center">
                  <div
                    className={`flex ${
                      offer.id == current.get("plano")
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    <div>
                      <span>R$</span>
                    </div>
                    <div>
                      <span className="text-4xl">
                        {RegexService.getWordPosition(offer.promo_price, 0)}
                      </span>
                    </div>
                    <div>
                      <div>
                        <span>
                          {RegexService.getWordPrice(offer.promo_price)}
                        </span>
                      </div>
                      <div className="mt-[-4px]">
                        <span className="text-xs">/mês</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-[-5px] mb-2">
                  <span
                    className={`text-xs ${
                      offer.id == current.get("plano")
                        ? "text-white"
                        : "text-black"
                    }`}
                  >{`Por ${offer.promo_period} meses`}</span>
                </div>

                <div className="text-center">
                  <span
                    className={`text-xs ${
                      offer.id == current.get("plano")
                        ? "text-white"
                        : "text-black"
                    }`}
                  >{`A partir do ${Number(offer.promo_period) + 1}º mês R$ ${
                    offer.price
                  }`}</span>
                </div>
                {offer.id != current.get("plano") ? (
                  <div className="flex justify-center items-center">
                    <button
                      onClick={() =>
                        navigateContract("/contrate-ja-card", offer)
                      }
                      className="px-6 py-1 rounded-full text-black bg-sub hover:bg-hover hover:scale-110 hover:text-white w-[150px]"
                    >
                      {isLoading ? (
                        <>
                          <Loading />
                        </>
                      ) : (
                        "Selecionar"
                      )}
                    </button>
                  </div>
                ) : null}

                <div
                  className={`text-center  ${
                    offer.highlight ? "text-white" : "text-gray-500"
                  }`}
                >
                  <a
                    href={navigation(
                      0,
                      `${"?" + String(current)}`,
                      "document",
                      ""
                    )}
                  >
                    <span
                      className={`${
                        offer.highlight ? "text-white" : "text-main"
                      } text-xs hover:underline`}
                    >
                      Consulte condições
                    </span>
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  if (location === "page") {
    return (
      <div className="sm:w-1/3 w-full sm:px-0 px-4">
        <div
          key={offer.id}
          className="rounded-lg sm:m-2 pb-4 w-full fade50 sm:block hidden"
        >
          <span className="sm:text-2xl text-2xl font-semibold mb-2 block">
            Plano escolhido
          </span>
          <div className="shadow-xl rounded-br-3xl bg-main">
            <div className="rounded-t-lg pt-7 pb-4 flex flex-col items-center justify-center">
              {offer.title?.length > 3 ? (
                <span
                  className={`text-4xl font-medium ${
                    offer.id == current.get("plano")
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  {returnTitlePlan(offer.name)}
                </span>
              ) : null}
              {offer.title?.length <= 3 ? (
                <span
                  className={`2xl:text-4xl text-3xl font-semibold ${
                    offer.id == current.get("plano")
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  {returnTitlePlan(offer.name)}
                </span>
              ) : null}
              <span
                className={`text-sm ml-2 ${
                  offer.id == current.get("plano") ? "text-white" : "text-black"
                }`}
              >
                {" "}
                {returnSubtitlePlan(offer.name)}
              </span>
            </div>

            <div className="">
              {offer?.services?.map((service: any) => {
                return (
                  <>
                    {service.emphasis === true ? (
                      <div key={service.id} className="">
                        <div className="flex justify-center">
                          <div className="flex justify-center w-[125px] shadow-md ">
                            <img
                              className="rounded-full"
                              src={service.iconEmphasis}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </>
                );
              })}
            </div>

            <div className="p-4">
              {/* SERVIÇOS */}
              <div className="mb-1">
                <div className="pl-4 mb-1 flex flex-col w-8/12 mx-auto">
                  <div className="flex mb-2">
                    <FaWifi className={`w-5 h-5 mr-2 text-sub`} />
                    <span className={`text-sm text-white`}>
                      {offer?.contents[0]?.name}
                    </span>
                  </div>

                  <div className="flex mb-2">
                    <FaTools className={`w-5 h-5 mr-2 text-sub`} />
                    <span className={`text-sm text-white`}>
                      {offer?.contents[1]?.name}
                    </span>
                  </div>

                  <div className="flex mb-2">
                    <FaDownload className={`w-5 h-5 mr-2 text-sub`} />
                    <span className={`text-sm text-white`}>
                      {offer?.contents[2]?.name}
                    </span>
                  </div>

                  <div className="flex mb-2">
                    <FaUpload className={`w-5 h-5 mr-2 text-sub`} />
                    <span className={`text-sm text-white`}>
                      {offer?.contents[3]?.name}
                    </span>
                  </div>

                  {/* <div className='flex mb-2 h-5'>
                                <span className={`text-sm text-main`}>{['promo', 'promo20'].includes(offer?.contents[4]?.name) ? '' : offer?.contents[4]?.name}</span>
                            </div> */}
                </div>
              </div>

              {/* APP DE CONTEÚDO */}
              <div className="mb-6">
                <div className="flex items-center justify-center mb-2">
                  <div className="mb-1">
                    <img
                      src="https://hmg.alaresinternet.com.br/wp-content/themes/alares-PR168/assets/_dist/images/template/icon-apps.svg"
                      alt=""
                      className="mr-2 w-4"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center flex-wrap mb-1">
                  {offer?.services?.map(
                    (service: any, index_service: number) => {
                      return (
                        <div>
                          <div className="p-1" key={service.name}>
                            <div
                              className={`w-[60px] h-[60px] rounded-full shadow-lg flex justify-center hover:scale-150 ${
                                offer.id == current.get("plano")
                                  ? "bg-white"
                                  : ""
                              }`}
                            >
                              <img
                                src={service.icon}
                                alt=""
                                className="object-contain rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                  {/* <div className='h-5 w-full flex items-center justify-center'>
                                {offer?.services?.length > 3 ? (
                                    <span onClick={() => showService()} className='text-sm hover:underline text-gray-500'>Exibir mais</span>
                                ) : null}
                            </div> */}
                </div>
              </div>

              {/* PREÇO */}
              {offer?.promo === false ? (
                <div className="mb-4">
                  <div className="flex justify-center">
                    <div className="flex text-white">
                      <div>
                        <span>R$</span>
                      </div>
                      <div>
                        <span className="text-5xl">
                          {RegexService.getWordPosition(offer.price, 0)}
                        </span>
                      </div>
                      <div>
                        <div>
                          <span>{RegexService.getWordPrice(offer.price)}</span>
                        </div>
                        <div className="mt-[-4px]">
                          <span className="text-xs">/mês</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-[-5px]">
                    <span className="text-sub text-xs">Na conta digital</span>
                  </div>
                </div>
              ) : null}

              {offer?.promo === true ? (
                <div className="mb-2">
                  <div className="flex justify-center">
                    <div className="flex text-white">
                      <div>
                        <span>R$</span>
                      </div>
                      <div>
                        <span className="text-5xl">
                          {RegexService.getWordPosition(offer.promo_price, 0)}
                        </span>
                      </div>
                      <div>
                        <div>
                          <span>
                            {RegexService.getWordPrice(offer.promo_price)}
                          </span>
                        </div>
                        <div className="mt-[-4px]">
                          <span className="text-xs">/mês</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-[-5px] mb-2">
                    <span className="text-sub text-xs">{`Por ${offer.promo_period} meses`}</span>
                  </div>

                  <div className="text-center">
                    <span className="text-white text-xs">{`A partir do ${
                      Number(offer.promo_period) + 1
                    }º mês R$ ${offer.price}`}</span>
                  </div>
                </div>
              ) : null}

              {/* CONSULTE CONDIÇÕES     */}
              <div className="text-center mb-6">
                <a
                  href={navigation(
                    0,
                    `${"?" + String(current)}`,
                    "document",
                    ""
                  )}
                >
                  <span className="text-sm text-white hover:cursor-pointer hover:underline">{`<< Consulte condições >>`}</span>
                </a>
              </div>
            </div>
          </div>
          <ModalPlans
            buttonText={"ALTERAR PLANO"}
            local={"Alterar"}
            style={
              "underline font-normal text-main flex justify-center items-center mx-auto pt-3 opacity-40"
            }
          />
        </div>
        <div
          key={offer.id}
          className="rounded-lg sm:m-2 pb-4 w-full fade50 sm:hidden flex flex-col"
        >
          <div className="flex justify-between items-center pb-2">
            <span className="text-xl">Plano escolhido</span>
            <ModalPlans
              buttonText={"ALTERAR PLANO"}
              local={"Alterar"}
              style={
                "font-bold flex justify-end items-center text-main opacity-40"
              }
            />
          </div>
          <div className="rounded-lg bg-main h-24">
            <div className="rounded-lg pt-2 pb-1 flex items-center justify-center">
              {offer.title?.length > 3 ? (
                <span className="text-white sm:text-4xl text-4xl font-medium">
                  {offer.title}
                </span>
              ) : null}
              {offer.title?.length <= 3 ? (
                <span className="text-white sm:text-xl text-xl font-semibold">
                  {offer.title}
                </span>
              ) : null}
              <span className="text-white sm:text-xl text-xl ml-2">
                {" "}
                {offer.subtitle}
              </span>
            </div>

            <div className="">
              {/* PREÇO */}
              <div className="mb-4">
                <div className="flex justify-center">
                  <div className="flex text-black bg-slate-200 w-full rounded-lg p-4 justify-between">
                    <div>
                      <span className="text-xl">
                        <span>R$</span>
                        {RegexService.getWordPosition(offer.promo ? offer.promo_price : offer.price, 0)}
                        <span>{RegexService.getWordPrice(offer.promo ? offer.promo_price : offer.price)}</span>
                        <span className="text-xs">/mês</span>
                      </span>
                    </div>
                    <ModalPlans
                      buttonText={"Detalhes"}
                      local={offer}
                      style={
                        "px-6 py-1 rounded-full text-white bg-main hover:bg-hover hover:scale-110 hover:text-white w-[150px]"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (location === "carrosel-mobile") {
    return (
      <div
        key={offer.id}
        className={`rounded-lg sm:m-2 pb-4 fade50  ${
          offer.id == current.get("plano") ? "hidden" : "block"
        }`}
      >
        <div
          className={`flex flex-row justify-between min-h-[135px] sm:items-start items-center`}
        >
          <div className="rounded-t-lg flex flex-col items-center justify-start sm:pt-7 sm:pb-4 p-0 w-5/12 text-center">
            {offer.title?.length > 3 ? (
              <span
                className={` sm:text-4xl text-4xl font-medium ${
                  offer.id == current.get("plano") ? "text-white" : "text-black"
                }`}
              >
                {offer.title}
              </span>
            ) : null}
            {offer.title?.length <= 3 ? (
              <span
                className={`sm:text-3xl text-3xl font-semibold ${
                  offer.id == current.get("plano") ? "text-white" : "text-black"
                }`}
              >
                {offer.title}
              </span>
            ) : null}
            <span
              className={`sm:text-3xl text-sm sm:ml-2  ${
                offer.id == current.get("plano") ? "text-white" : "text-black"
              }`}
            >
              {" "}
              {offer.subtitle}
            </span>
            <div className="">
              {offer?.services?.map((service: any) => {
                return (
                  <>
                    {service.emphasis === true ? (
                      <div key={service.id} className="">
                        <div className="flex flex-col justify-center items-center">
                          <span className="font-semibold">+</span>
                          <div className="flex justify-center w-[90px] shadow-md rounded-full">
                            <img
                              className="rounded-full"
                              src={service.iconEmphasis}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </>
                );
              })}
            </div>
          </div>

          <div className="sm:p-4 p-0">
            {/* PREÇO */}
            <div className="mb-4">
              <div className="flex justify-center">
                <div
                  className={`flex ${
                    offer.id == current.get("plano")
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  <div>
                    <span>R$</span>
                  </div>
                  <div>
                    <span className="text-3xl px-1">
                      {RegexService.getWordPosition(offer.price, 0)}
                    </span>
                  </div>
                  <div>
                    <div>
                      <span>{RegexService.getWordPrice(offer.price)}</span>
                    </div>
                    <div className="mt-[-4px]">
                      <span className="text-xs">/mês</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-[-5px]">
                <span
                  className={`text-xs ${
                    offer.id == current.get("plano")
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  Na conta digital
                </span>
              </div>
              {offer.id != current.get("plano") ? (
                <div className="flex flex-col justify-center items-center gap-y-2">
                  <button
                    onClick={() => navigateContract("/contrate-ja-card", offer)}
                    className="px-6 py-1 rounded-full text-black bg-sub hover:bg-hover hover:scale-110 hover:text-white w-[150px]"
                  >
                    {isLoading ? (
                      <>
                        <Loading />
                      </>
                    ) : (
                      "Selecionar"
                    )}
                  </button>
                  <ModalPlans
                    buttonText={"Detalhes"}
                    local={offer}
                    style={
                      "px-6 py-1 rounded-full text-sub bg-main hover:bg-hover hover:scale-110 hover:text-white w-[150px]"
                    }
                  />
                </div>
              ) : null}

              <div
                className={`text-center  ${
                  offer.highlight ? "text-white" : "text-gray-500"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (location === "detalhe-mobile") {
    return (
      <div className="sm:w-1/3 w-full sm:px-0 px-4">
        <div
          key={offer.id}
          className="rounded-lg sm:m-2 pb-4 w-full fade50 block"
        >
          <div className="shadow-xl rounded-br-3xl bg-main">
            <div className="rounded-t-lg pt-7 pb-4 flex items-center justify-center flex-col">
              {offer.title?.length > 3 ? (
                <span className={`text-4xl font-medium text-white`}>
                  {returnTitlePlan(offer.name)}
                </span>
              ) : null}
              {offer.title?.length <= 3 ? (
                <span
                  className={`2xl:text-4xl text-3xl font-semibold text-white`}
                >
                  {returnTitlePlan(offer.name)}
                </span>
              ) : null}
              <span className={`text-sm ml-2 text-white`}>
                {" "}
                {returnSubtitlePlan(offer.name)}
              </span>
            </div>

            <div className="">
              {offer?.services?.map((service: any) => {
                return (
                  <>
                    {service.emphasis === true ? (
                      <div key={service.id} className="">
                        <div className="flex justify-center">
                          <div className="flex justify-center w-[125px] shadow-md ">
                            <img
                              className="rounded-full"
                              src={service.iconEmphasis}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </>
                );
              })}
            </div>

            <div className="p-4">
              {/* SERVIÇOS */}
              <div className="mb-1">
                <div className="pl-4 mb-1 flex flex-col w-8/12 mx-auto">
                  <div className="flex mb-2">
                    <FaWifi className={`w-5 h-5 mr-2 text-sub`} />
                    <span className={`text-sm text-white`}>
                      {offer?.contents[0]?.name}
                    </span>
                  </div>

                  <div className="flex mb-2">
                    <FaTools className={`w-5 h-5 mr-2 text-sub`} />
                    <span className={`text-sm text-white`}>
                      {offer?.contents[1]?.name}
                    </span>
                  </div>

                  <div className="flex mb-2">
                    <FaDownload className={`w-5 h-5 mr-2 text-sub`} />
                    <span className={`text-sm text-white`}>
                      {offer?.contents[2]?.name}
                    </span>
                  </div>

                  <div className="flex mb-2">
                    <FaUpload className={`w-5 h-5 mr-2 text-sub`} />
                    <span className={`text-sm text-white`}>
                      {offer?.contents[3]?.name}
                    </span>
                  </div>

                  {/* <div className='flex mb-2 h-5'>
                                <span className={`text-sm text-main`}>{['promo', 'promo20'].includes(offer?.contents[4]?.name) ? '' : offer?.contents[4]?.name}</span>
                            </div> */}
                </div>
              </div>

              {/* APP DE CONTEÚDO */}
              <div className="mb-6">
                <div className="flex items-center justify-center mb-2">
                  <div className="mb-1">
                    <img
                      src="https://hmg.alaresinternet.com.br/wp-content/themes/alares-PR168/assets/_dist/images/template/icon-apps.svg"
                      alt=""
                      className="mr-2 w-4"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-center flex-wrap mb-1">
                  {offer?.services?.map(
                    (service: any, index_service: number) => {
                      return (
                        <div>
                          <div className="p-1" key={service.name}>
                            <div
                              className={`w-[60px] h-[60px] rounded-full shadow-lg flex justify-center hover:scale-150 ${
                                offer.id == current.get("plano")
                                  ? "bg-white"
                                  : ""
                              }`}
                            >
                              <img
                                src={service.icon}
                                alt=""
                                className="object-contain rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                  {/* <div className='h-5 w-full flex items-center justify-center'>
                                {offer?.services?.length > 3 ? (
                                    <span onClick={() => showService()} className='text-sm hover:underline text-gray-500'>Exibir mais</span>
                                ) : null}
                            </div> */}
                </div>
              </div>

              {/* PREÇO */}
              {offer?.promo === false ? (
                <div className="mb-4">
                  <div className="flex justify-center">
                    <div className="flex text-white">
                      <div>
                        <span>R$</span>
                      </div>
                      <div>
                        <span className="text-5xl">
                          {RegexService.getWordPosition(offer.price, 0)}
                        </span>
                      </div>
                      <div>
                        <div>
                          <span>{RegexService.getWordPrice(offer.price)}</span>
                        </div>
                        <div className="mt-[-4px]">
                          <span className="text-xs">/mês</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-[-5px]">
                    <span className="text-sub text-xs">Na conta digital</span>
                  </div>
                </div>
              ) : null}

              {offer?.promo === true ? (
                <div className="mb-2">
                  <div className="flex justify-center">
                    <div className="flex text-white">
                      <div>
                        <span>R$</span>
                      </div>
                      <div>
                        <span className="text-5xl">
                          {RegexService.getWordPosition(offer.promo_price, 0)}
                        </span>
                      </div>
                      <div>
                        <div>
                          <span>
                            {RegexService.getWordPrice(offer.promo_price)}
                          </span>
                        </div>
                        <div className="mt-[-4px]">
                          <span className="text-xs">/mês</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-[-5px] mb-2">
                    <span className="text-sub text-xs">{`Por ${offer.promo_period} meses`}</span>
                  </div>

                  <div className="text-center">
                    <span className="text-white text-xs">{`A partir do ${
                      Number(offer.promo_period) + 1
                    }º mês R$ ${offer.price}`}</span>
                  </div>
                </div>
              ) : null}

              <button
                onClick={() => navigateContract("/contrate-ja-card", offer)}
                className={`px-6 py-1 rounded-full text-black bg-sub hover:bg-hover hover:scale-110 hover:text-white w-[150px] justify-center items-center mx-auto ${
                  offer.id == current.get("plano") ? "hidden" : "flex"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loading />
                  </>
                ) : (
                  "Selecionar"
                )}
              </button>

              {/* CONSULTE CONDIÇÕES     */}
              <div className="text-center mb-6">
                <a
                  href={navigation(
                    0,
                    `${"?" + String(current)}`,
                    "document",
                    ""
                  )}
                >
                  <span className="text-sm text-white hover:cursor-pointer hover:underline">{`<< Consulte condições >>`}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
