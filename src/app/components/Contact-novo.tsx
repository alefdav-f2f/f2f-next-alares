"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { internalPATH } from "@/app/api/internalPATH";
import { externalURL } from "@/app/api/externalURL";
import { useIsOpen } from "../zustand/button-whatsapp.zustand";
import Image from "next/image";

import imgClick from "@/img/internet-nova/icon-click.png";
import imgPhone from "@/img/internet-nova/phone.png";

export default function Contact_novo() {
  const searchParams = useSearchParams();
  const isOpen = useIsOpen((state: any) => state.is_open);
  const activeButton = useIsOpen((state: any) => state.active);

  function getParams() {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    return `?${params}`;
  }

  function openChannel(text: string) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    console.log("is mobile =" + isMobile);
    const whatsappLink = isMobile
      ? externalURL.whatsappMobile // Para dispositivos móveis
      : externalURL.whatsappDesktop; // Para navegadores de desktop

    window.open(whatsappLink + "&text=" + encodeURIComponent(text), "_blank");
  }

  return (
    <>
      <div className="relative pt-12">
        <div className="mb-6">
          <div className="col-span-1 flex justify-center items-center">
            <h2 className="text-gray-800 text-2xl">
              Contrate <strong>já</strong>
            </h2>
          </div>
        </div>

        <div className="flex sm:flex-row flex-col justify-center ">
          <div className="px-4 pt-8 pb-10 bg-[#F1F1FA] justify-center md:pb-[180px] flex sm:hidden mb-[10px]">
            <div>
              <div className="flex justify-center mb-1">
                <Image src={imgClick} alt="" className="w-11 h-11" />
              </div>
              <div className="mb-4 text-center">
                <span className="text-xl text-gray-800">
                  Contrate<strong> 100% online</strong>
                </span>
              </div>
              <div className="flex justify-center">
                <a rel="canonical" href="#cardsOnline">
                  <button
                    type="button"
                    className="z-20 hover:bg-hover hover:cursor-pointer text-white text-sm bg-main rounded-full px-6 py-2 font-bold"
                  >
                    CONTRATAR
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="max-w-[1000px] w-full flex justify-center gap-2.5">
            <div className="sm:w-[30%] w-1/2 sm:px-4 sm:pt-8 pt-7 sm:rounded-tl-[50px] bg-[#F1F1FA] flex justify-center md:pb-[180px]  sm:pb-12 pb-40">
              <div>
                <div className="flex justify-center mb-2">
                  <FaWhatsapp className="text-main text-4xl" />
                </div>
                <div className="mb-4 text-center">
                  <span className="text-xl text-gray-800">
                    Fale conosco via <strong>WhatsApp</strong>
                  </span>
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      activeButton();
                    }}
                    className="z-20 hover:bg-hover hover:cursor-pointer text-white text-sm bg-main rounded-full px-6 py-2 font-bold"
                  >
                    ENVIAR
                  </button>
                </div>
              </div>
            </div>

            <div className="sm:w-[30%] px-4 pt-8 bg-[#F1F1FA] justify-center md:pb-[180px] mx-3 hidden sm:flex">
              <div>
                <div className="flex justify-center mb-1">
                  <Image src={imgClick} alt="" className="w-11 h-11" />
                </div>
                <div className="mb-4 text-center">
                  <span className="text-xl text-gray-800">
                    Contrate<strong> 100% online</strong>
                  </span>
                </div>
                <div className="flex justify-center">
                  <a rel="canonical" href="#cardsOnline">
                    <button
                      type="button"
                      className="z-20 hover:bg-hover hover:cursor-pointer text-white text-sm bg-main rounded-full px-6 py-2 font-bold"
                    >
                      CONTRATAR
                    </button>
                  </a>
                </div>
              </div>
            </div>

            <div className="sm:w-[30%] w-1/2 sm:px-4 sm:pt-8 pt-7 sm:rounded-tr-[50px] bg-[#F1F1FA] flex justify-center md:pb-[180px]  sm:pb-12 pb-40">
              <div>
                <div className="flex justify-center mb-1">
                  <Image src={imgPhone} alt="" className="w-11 h-11" />
                </div>
                <div className="mb-4 text-center">
                  <span className="text-xl text-gray-800 block sm:w-full w-1/2 mx-auto sm:mx-0 ">
                    <strong>Nós</strong> te ligamos
                  </span>
                </div>
                <div className="flex justify-center">
                  <a rel="canonical" href={`${internalPATH.contrate_agora}${getParams()}`}>
                    <button
                      type="button"
                      className="z-20 hover:bg-hover hover:cursor-pointer text-white text-sm bg-main rounded-full px-6 py-2 font-bold"
                    >
                      ENVIAR
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="block justify-center absolute rounded-t-lg w-[90%] left-[5%] bottom-0">
          <div className="flex justify-center w-full mb-[-40px]"></div>
          <div className="flex justify-center">
            <div className="flex justify-center w-[485px] bg-white rounded-t-[20px] pt-9 pb-9">
              <div className="text-center">
                <span className="text-2xl">
                  Ligue <strong>agora! (10600)</strong>
                </span>
                <br />
                <span className="font-extralight text-xs">
                  Nossa equipe entrará em contato.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
