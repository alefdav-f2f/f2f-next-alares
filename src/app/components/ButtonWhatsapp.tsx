"use client";
import React, { useState } from "react";
import whatsapp from "@/img/icon/whatsapp.png";
import Image from "next/image";
import { FaPaperPlane } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { externalURL } from "../api/externalURL";
import axiosInterceptorInstance from "../api/axiosInterceptor";
import { useForm } from "react-hook-form";
import { getCookie } from "cookies-next";
import Loading from "./loadings/Loading";
import { FaArrowLeft } from "react-icons/fa";
import { InputMask } from "@react-input/mask";
import RegexService from "../services/validations/regex.service";
import toast from "react-hot-toast";
import EcommerceService from "../services/api/ecommerce.service";
import { useIsOpen } from "../zustand/button-whatsapp.zustand";
import DataLayerService from "../services/api/datalayer.service";
import { useSearchParams } from "next/navigation";
import icon_1 from "@/img/icon/primeiroMobile.png";
import icon_2 from "@/img/icon/segundoMobile.png";

export function ButtonWhatsapp() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [isAccepted, setIsAccepted] = React.useState(true);
  const [content, setContent] = React.useState(1);
  const { register, handleSubmit, setValue, getValues } = useForm();
  const searchParams = useSearchParams();

  const isOpen = useIsOpen((state: any) => state.is_open);
  const activeButton = useIsOpen((state: any) => state.active);

  function openChannel(text: string, close: boolean) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    console.log("is mobile =" + isMobile);
    const whatsappLink = isMobile
      ? externalURL.whatsappMobile // Para dispositivos móveis
      : externalURL.whatsappDesktop; // Para navegadores de desktop

    window.open(whatsappLink + "&text=" + encodeURIComponent(text), "_blank");
  }

  function sendDataLayer() {
    const data = {
      event: "click_whatsapp",
      city: String(getCookie("city_name")),
      state: String(getCookie("uf_name")),
    };

    console.log(data);
    DataLayerService.sender(data);
  }

  function sendDataLayerType(type: string) {
    const data = {
      event: "type_whatsapp",
      city: String(getCookie("city_name")),
      state: String(getCookie("uf_name")),
      contact_type: type,
    };

    console.log(data);
    DataLayerService.sender(data);
  }

  function sendDataLayerView() {
    const data = {
      event: "view_form_whatsapp",
      city: String(getCookie("city_name")),
      state: String(getCookie("uf_name")),
    };

    console.log(data);
    DataLayerService.sender(data);
  }

  function sendDataLayerSend() {
    const data = {
      event: "enviar_formulario",
      city: String(getCookie("city_name")),
      state: String(getCookie("uf_name")),
      local_formulario: "whatsapp-submit",
    };

    console.log(data);
    DataLayerService.sender(data);
  }

  function restartForm() {
    setContent(1);
    setValue("name", "");
    setValue("email", "");
    setValue("phone", "");
    setIsLoading(false);
    activeButton();
  }

  //Envia informações de lead pra RD Station
  async function sendLead(form: any) {
    openChannel("", true);

    if (await RegexService.singleWord(form.name)) {
      toast.error("Insira um nome válido");
      return;
    }

    if ((await RegexService.countNumbers(form.phone)) < 10) {
      toast.error("Insira um número de telefone válido");
      return;
    }

    setIsLoading(true);

    const data = {
      name: String(form.name),
      city: String(getCookie("city_name")),
      email: String(form.email),
      phone: String(form.phone),
      i_am_client: "Quero assinar",
      url: String(window.location.href),
      source: searchParams.get("utm_source"),
      medium: searchParams.get("utm_medium"),
      campaign: searchParams.get("utm_campaign"),
      value: "botão whatsapp",
      page_title: String(document.title),
      identification: "botão whatsapp",
    };

    const request = await EcommerceService.postRDStation(data);

    if (request) {
      sendDataLayerSend();
      restartForm();
    }
  }
  let cityCode = String(getCookie("city_external"));

  const cityCodes = [
  '805511', '537911', '810191', '540541', '813371',
  '814261', '818501', '546151', '820311', '820741',
  '821041', '548441', '823411', '551311', '830541',
  '836581', '837041', '839091', '839331', '839411',
  '840421', '564481', '841401', '841661', '842711',
  '565611', '849991', '852351', '852861', '860701',
  '861771', '862741', '866731', '867381', '867891',
  '870411', '871901', '588401', '872891', '873781',
  '876291', '591291', '877501', '593071', '593821',
  '884391', '885441', '602401', '888031', '889271',
  '889601', '890601', '891681', '608791'
];

  function content1() {
    return (
      <>
        <div className="sm:block hidden fade25 lg:w-[400px] w-full rounded-xl p-4 bg-white shadow-2xl">
          <div className="flex justify-end">
            <button
              onClick={() => {
                restartForm();
              }}
              className="m-2 rounded-full bg-gray-200 hover:bg-gray-400 p-1"
            >
              <IoMdClose className="text-white" />
            </button>
          </div>
          <div className="text-center mb-4">
            <span className="font-normal text-2xl text-main">
              Fale pelo WhatsApp
            </span>
          </div>
          <div className="flex justify-center pb-4">
            <div
              onClick={() => {
                setContent(2),
                  sendDataLayerType("Quero Assinar"),
                  sendDataLayerView();
              }}
              className="w-[160px] h-[200px] flex justify-center items-center border border-gray-300 mr-2 hover:cursor-pointer text-gray-400 hover:bg-main hover:text-white"
            >
              <div className="flex flex-col items-center">
                <FaPaperPlane className=" mb-2 w-10 h-10" />
                <span>Quero assinar</span>
              </div>
            </div>

            <div
              onClick={() => {
                openChannel("Olá!+Tudo+bem+?+Quero+ser+atendido.", true),
                  sendDataLayerType("Já sou cliente");
              }}
              className="w-[160px] h-[200px] flex justify-center items-center border border-gray-300 hover:bg-main hover:cursor-pointer text-gray-400 hover:text-white"
            >
              <div className="flex flex-col items-center">
                <BsFillPeopleFill className=" mb-2 w-10 h-10" />
                <span>Já sou cliente</span>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden block fade25 content-end max-[200px]">
          <div
            onClick={() => {
              openChannel("", true), sendDataLayerType("Já sou cliente");
            }}
            className="flex rounded-l-lg mb-4 justify-end hover:cursor-pointer"
          >
            <div className="flex items-center justify-center rounded-l-lg w-[150px] bg-white mr-[-20px] shadow-2xl">
              <span className="text-gray-500 text-sm flex justify-center items-center">
                Já sou cliente
              </span>
            </div>
            <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-[#37CDBC] shadow-2xl">
              <Image src={icon_1} alt={""} />
            </div>
          </div>

          <div
            onClick={() => {
              setContent(2),
                sendDataLayerType("Quero Assinar"),
                sendDataLayerView();
            }}
            className="flex rounded-l-lg justify-end hover:cursor-pointer"
          >
            <div className="flex items-center justify-center rounded-l-lg w-[150px] bg-white mr-[-20px] shadow-2xl">
              <span className="text-gray-500 text-sm flex justify-center items-center">
                Quero assinar
              </span>
            </div>
            <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center bg-main shadow-2xl">
              <Image src={icon_2} alt={""} />
            </div>
          </div>
        </div>
      </>
    );
  }

  function content2() {
    return (
      <div className="bg-white p-4 shadow-2xl rounded-md max-w-[400px]">
        <div>
          <div className="flex justify-between pl-2">
            <div className="flex items-center">
              <FaPaperPlane className=" mb-2 w-5 h-5 mr-2 text-gray-300" />
              <span className="text-xs font-light text-gray-300 pb-1">
                Quero assinar
              </span>
            </div>
            <button
              onClick={() => {
                setContent(1);
              }}
              className="m-2 rounded-full bg-gray-200 hover:bg-gray-400 p-1"
            >
              <FaArrowLeft className="text-white" />
            </button>
          </div>
          <div className="text-start text-main mb-2">
            <span className="text-xl">Fale pelo WhatsApp</span>
          </div>
          <div className="mb-4">
            <span className="text-gray-600 text-xs font-light">
              Olá! Preencha os campos abaixo para ser redirecionado a um
              atendente.
            </span>
          </div>
          <div className="flex p-2">
            <div className="flex flex-col items-center w-[40px] pt-4">
              <div className="w-3 h-3 border border-gray-600 rounded-full mb-3"></div>
              <div className="h-3 bg-main w-[3px] mb-2"></div>
              <div className="w-3 h-3 border border-gray-600 rounded-full mb-3"></div>
              <div className="h-3 bg-main w-[3px] mb-2"></div>
              <div className="w-3 h-3 border border-gray-600 rounded-full mb-3"></div>
            </div>
            <div className="w-full mb-4">
              <form onSubmit={handleSubmit(sendLead)}>
                <div className="mb-4">
                  <input
                    type="text"
                    {...register("name")}
                    disabled={isLoading}
                    className="mb-2 p-2 border border-gray-400 pl-2 rounded-sm w-full font-light text-sm"
                    placeholder="Seu nome*"
                    required
                  />
                  <InputMask
                    mask="(__) _____-____)"
                    replacement={{ _: /\d/ }}
                    type="tel"
                    {...register("phone")}
                    disabled={isLoading}
                    className="mb-2 p-2 border border-gray-400 pl-2 rounded-sm w-full font-light text-sm"
                    placeholder="Seu telefone*"
                    required
                  />
                  <input
                    type="email"
                    {...register("email")}
                    disabled={isLoading}
                    className="mb-2 p-2 border border-gray-400 pl-2 rounded-sm w-full font-light text-sm"
                    placeholder="Seu e-mail*"
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-full py-2 text-white bg-[#39C4C0] rounded-full flex items-center justify-center"
                  >
                    {isLoading ? (
                      <div className="pt-1">
                        <Loading></Loading>
                      </div>
                    ) : (
                      "Iniciar Conversa"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="p-4 flex items-start">
            <div>
              <input
                checked={isAccepted}
                type="checkbox"
                className="mr-2"
                onChange={(e) => {
                  setIsAccepted(e.target.checked);
                }}
              />
            </div>
            <label className="text-xs pt-1">
              Concordo em receber informações e ofertas da Alares via Whatsapp
              e/ou telefone. Para obter mais informações sobre como utilizamos
              seus dados e seus direitos de privacidade, consulte nossa Política
              de Privacidade.
            </label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="p-2">
        {isOpen ? (
          <div className="">
            {content === 1 ? content1() : null}
            {content === 2 ? content2() : null}
          </div>
        ) : null}
      </div>
      <div
        className="p-2 flex justify-end items-center hover:mb-1 hover:cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseOut={() => setHover(false)}
      >
        <div className="mr-2">
          {hover ? (
            <span className="fade50 drop-shadow-2xl bg-white bg-opacity-90 py-2 px-4 rounded-3xl">
              Fale no WhatsApp
            </span>
          ) : null}
        </div>
        {cityCodes.includes(cityCode) ? (
          <a
            href="https://wa.me/551920800600"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-[#27D045] rounded-full"
            onMouseEnter={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            onClick={() => {
              sendDataLayer();
            }}
          >
            <Image
              alt=""
              src={whatsapp}
              className="w-10 brightness-200 hover:cursor-pointer hover:drop-shadow-2xl"
              onMouseEnter={() => setHover(true)}
              onMouseOut={() => setHover(false)}
            />
          </a>
        ) : (
          <div
            typeof="button"
            onClick={() => {
              activeButton(), sendDataLayer();
            }}
            className="p-4 bg-[#27D045] rounded-full"
            onMouseEnter={() => setHover(true)}
            onMouseOut={() => setHover(false)}
          >
            <Image
              alt=""
              src={whatsapp}
              className="w-10 brightness-200 hover:cursor-pointer hover:drop-shadow-2xl"
              onMouseEnter={() => setHover(true)}
              onMouseOut={() => setHover(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
