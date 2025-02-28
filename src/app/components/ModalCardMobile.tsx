import React from "react";
import { FaChevronLeft, FaUpload, FaDownload, FaTools, FaWifi } from "react-icons/fa";
import { createPortal } from "react-dom";
import Loading from "./loadings/Loading";
import DataLayerService from '@/app/services/api/datalayer.service';
import { navigation } from '@/app/services/navigation-service';
import RegexService from '@/app/services/validations/regex.service';
import { getCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ModalCardMobile({ buttonText, offer }: any) {
  const [showModal, setShowModal] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = new URLSearchParams(Array.from(searchParams.entries()));

  function navigateContract(path: string, plan: any) {

        setIsLoading(true)

        postButtonClick(plan)


        setTimeout(() => {
            current.delete('plano');
            router.push(`${path}/?${current}&plano=${plan.id}`);
        }, 1000)

    }

    function postButtonClick(plan: any) {

        const pathname = window.location.pathname;

        const data = {
            event: 'click_cta_contrate_ja',
            city: String(getCookie('city_name')),
            state: String(getCookie('uf_name')),
            selected_plan: plan.name,
            value: plan.title,
            oferta_id: plan.id,
            local_page: pathname
        }

        console.log(data)

        DataLayerService.postButtonClick(data);

    }

  const modalContent = showModal ? (
    <>
      <div 
        className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed top-0 left-0 right-0 bottom-0 w-full h-full z-50 outline-none focus:outline-none transition-opacity duration-300 ease-in-out ${
          showModal ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="relative w-full h-full">
          <div 
            className={`border-0 shadow-lg relative flex flex-col justify-center w-full h-full bg-white outline-none focus:outline-none transition-transform duration-300 ease-in-out ${
              showModal ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            {/*header*/}
            <div className="flex items-center justify-center p-5">
                <div className="flex flex-col items-start justify-between">
                  <h3 className="text-[13px] font-[800] text-[#363643]">DETALHES DO PLANO</h3>
                  <div className={`flex items-center justify-start gap-2`}>
                      {offer.title?.length > 3 ? (<span className='text-[#363643] text-[45px] font-[700] leading-[45px]'>{offer.title}</span>) : null}
                      {offer.title?.length <= 3 ? (<span className='text-[#363643]  text-[45px] font-[700] leading-[45px]'>{offer.title}</span>) : null}
                      <span className='text-[#363643] text-[45px] font-[400] leading-[45px]'>{offer.subtitle}</span>
                  </div>
                </div>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent flex items-center justify-center text-[15px] text-[#3C34F2] w-[125px] h-[43px] gap-2 border-2 border-main  rounded-full outline-none">
                  <FaChevronLeft /> voltar
                </span>
              </button>
            </div>
            <div className="flex flex-col items-center justify-center px-5"> 
              <div className="flex flex-col w-full border-t border-[#cfcff0]">
                <div className="flex flex-col items-start mt-[-1px]">
                  <div className={`flex justify-start w-[210px] rounded-br-[50px] pl-[15px] pr-[25px] py-[6px] border-2 border-transparent bg-main`}>
                      <span className={`font-[700] text-white text-[13px]`}>SERVIÇOS ADICIONAIS</span>
                  </div>

                  <div className="flex flex-row items-center justify-center pt-[17px] pb-[28px] gap-x-2">
                    {offer?.services?.map((service: any, index_service: number) => {
                      return (
                        <div className="flex items-center justify-center">
                            <div className='' key={service.name}>
                                <div className='w-[64px] h-[64px] rounded-full flex justify-center border-[5px] border-[#f1f1fa]'>
                                    <img src={service.icon} alt="" className='object-contain rounded-full' />
                                </div>
                            </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Inclusos */}

              <div className="flex flex-col w-full border-t border-[#cfcff0]">
                <div className="flex flex-col items-start mt-[-1px]">
                  <div className={`flex justify-start w-[210px] rounded-br-[50px] pl-[15px] pr-[25px] py-[6px] border-2 border-transparent bg-main`}>
                      <span className={`font-[700] text-white text-[13px] py-0`}>INCLUSO NO PLANO</span>
                  </div>

                  <div className="flex flex-row items-center justify-center pt-[17px] pb-[20px] gap-x-2">
                    <div className='mb-1 flex flex-col items-start'>
                        <div className='flex mb-2 items-center'>
                            <FaWifi className={`w-4 h-3 mr-2 text-main`} />
                            <span className={`text-[14px] font-[600] text-[#646471] `}>{offer?.contents[0]?.name}</span>
                        </div>

                        <div className='flex mb-2 items-center'>
                            <FaTools className={`w-4 h-3 mr-2 text-main `} />
                            <span className={`text-[14px] font-[600] text-[#646471] `}>{offer?.contents[1]?.name}</span>
                        </div>

                        <div className='flex mb-2 items-center'>
                            <FaDownload className={`w-4 h-3 mr-2 text-main `} />
                            <span className={`text-[14px] font-[600] text-[#646471] `}>{offer?.contents[2]?.name}</span>
                        </div>

                        <div className='flex mb-2 items-center'>
                            <FaUpload className={`w-4 h-3 mr-2 text-main `} />
                            <span className={`text-[14px] font-[600] text-[#646471] `}>{offer?.contents[3]?.name}</span>
                        </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* texto complementar */}

              <div className="flex flex-col w-full border-t border-[#cfcff0]">
                <div className="flex flex-col items-start mt-[-1px]">
                  <div className={`flex justify-start w-[210px] rounded-br-[50px] pl-[15px] pr-[25px] py-[6px] border-2 border-transparent bg-main`}>
                      <span className={`font-[700] text-white text-[13px]`}>TEXTO COMPLEMENTAR</span>
                  </div>

                  <div className="flex flex-row items-center justify-center pt-[17px] pb-[28px] gap-x-2">
                      <p className="text-[14px] font-[400] text-[#646471]">
                        Lorem Ipsum é simplesmente uma simulação de texto da 
                        indústria tipográfica e de impressos, e vem sendo utilizado 
                        desde o século XVI, quando um impressor desconhecido 
                        pegou uma bandeja de tipos e os embaralhou para fazer 
                        um livro de modelos de tipos. Lorem Ipsum sobreviveu não 
                        só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado.
                      </p>
                  </div>
                </div>
              </div>

              {/* button */}

              <div className='flex w-full'>
                  <button onClick={() => navigateContract('/contrate-ja', offer)} className={`font-[700] text-[13px] px-4 py-2 rounded-full border-2bg-sub text-[#363643] w-full bg-sub`}>
                      CONTRATE JÁ
                  </button>
              </div>

            </div>

          </div>
          
        </div>
      </div>
    </>
  ) : null;

  return (
    <>
      {buttonText ? (
        <button
          className="bg-transparent text-main text-[11px] py-[2px] rounded-full w-full border border-[#3C34F2] font-bold"
          type="button"
          onClick={() => setShowModal(true)}
        >
          {buttonText}
        </button>
      ) : null}
      {typeof window === 'object' ? createPortal(modalContent, document.body) : null}
    </>
  );
}
