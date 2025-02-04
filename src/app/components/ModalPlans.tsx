import React, { useState } from "react";
import { getCookie } from "cookies-next";
import PlanService from "@/app/services/api/plan.service";
import { FaPencilAlt } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel-contrate";
import CardContrate from "./cards/CardContrate";
import { useSearchParams } from "next/navigation";

export default function Modal({isOpen, buttonText, local, style }: any) {
  const searchParams = useSearchParams();
  const [showModal, setShowModal] = React.useState(isOpen);
  const [showModalDetail, setShowModalDetail] = React.useState(false);
  const [planList, setPlan] = useState<any[]>([]);

  const current = new URLSearchParams(Array.from(searchParams.entries()));

  async function getPlan() {
    console.log('Requesting plan')
    const city_id = String(getCookie("city_id"));
    const session_id = getCookie("session_id");
    const request = await PlanService.getPlan(city_id, session_id);

    if (request.status === 200) {
      const data = request.data?.plans;

      data?.map((d: any) => {
        d.showService = false;
      });

      var sortedArray: { data: object }[] = data.sort((n1: any, n2: any) => {
        if (n1.id == current.get("plano")) return -1;
        if (n2.id == current.get("plano")) return 1;

        if (n1.title < 10) return -1;
        if (n2.title < 10) return 1;

        if (n1.services[0]?.emphasis) return -1;
        if (n2.services[0]?.emphasis) return 1;

        if (n1.title > n2.title) {
          return -1;
        }

        if (n1.title < n2.title) {
          return 1;
        }

        return 0;
      });
      setPlan(data);
    }
  }

  React.useEffect(() => {
    if (showModal) {
      document.body.classList.value = "fixed w-full overflow-hidden";
    } else {
      document.body.classList.value = "";
    }
  }, [showModal]);

  React.useEffect(() => {
    getPlan();
  }, []);

  return (
    <>
      {buttonText ? (
        <button
          className={style}
          type="button"
          onClick={() =>
            local == "Alterar" ? setShowModal(true) : setShowModalDetail(true)
          }
        >
          {local == "Alterar" ? <FaPencilAlt /> : null}
          {buttonText}
        </button>
      ) : null}

      {showModal ? (
        <>
          <div className="fixed w-screen h-screen top-0 left-0 z-50 flex items-center">
            <div className="relative mx-auto w-10/12 max-h-screen ">
            { local != "contrate-card" ? (
              <button
                type="button"
                className="bg-sub absolute right-0 -top-12 text-black px-7 py-2 rounded-xl"
                onClick={() => setShowModal(false)}
              >
                Fechar
              </button>
            ) : null}
              
              <div className="h-[95vh] border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto overflow-hidden hidden lg:block">
                  <Carousel>
                    <CarouselContent>
                      {planList?.map(
                        (offer: any, index: React.Key | null | undefined) => {
                          return (
                            <>
                              <CarouselItem
                                key={index}
                                className="sm:pb-8 pb-8 sm:basis-1/3 h-full max-w-[300px]"
                              >
                                <CardContrate
                                  offer={offer}
                                  location="carrosel"
                                />
                              </CarouselItem>
                            </>
                          );
                        }
                      )}
                    </CarouselContent>
                    <CarouselPrevious className="text-main" />
                    <CarouselNext className="text-main" />
                  </Carousel>
                </div>
                <div className="flex flex-col p-4 overflow-auto lg:hidden">
                  <h3 className="text-3xl font-semibold mb-9 ml-2 text-center">
                    {local == "Alterar" ? "Alterar plano" : "Escolher plano"}
                  </h3>

                  <div className="flex flex-col">
                    {planList?.map(
                      (offer: any, index: React.Key | null | undefined) => {
                        return (
                          <CardContrate
                            offer={offer}
                            location="carrosel-mobile"
                          />
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {showModalDetail ? (
        <>
          <div className="fixed w-screen h-screen top-0 left-0 z-[9999] flex flex-col items-center justify-center">
            <button
              type="button"
              className="z-[100] bg-sub text-black px-7 py-2 rounded-xl ml-auto mr-5"
              onClick={() => setShowModalDetail(false)}
            >
              Fechar
            </button>
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-transparent outline-none focus:outline-none">
              <div className="relative py-6 flex-auto overflow-hidden flex justify-center items-center">
                <CardContrate offer={local} location={"detalhe-mobile"} />
              </div>
            </div>
          </div>
          <div className="opacity-95 fixed inset-0 z-40 bg-white"></div>
        </>
      ) : null}
    </>
  );
}
