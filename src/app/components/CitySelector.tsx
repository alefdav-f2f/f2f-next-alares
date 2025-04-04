"use client";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { CityProps, StateProps } from "../types/interface/state.interface";
import axiosInterceptorInstance from "../api/axiosInterceptor";
import Logo from "./Logo/Logo";
import LoadingAlares from "./loadings/LoadingAlares";
import Loading from "./loadings/Loading";
import DataLayerService from "../services/api/datalayer.service";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import ContactForm from "./ContactForm";
import CityService from "../services/api/city.service";

import icon from "@/img/icon_selector.png";
import bg from "@/img/bg-selector.png";

interface props {
  reload: boolean;
  check_city: boolean;
}

export default function CitySelector({ reload, check_city }: props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [stateList, setState] = React.useState<StateProps[]>([]);
  const [cityList, setCity] = React.useState<CityProps[]>([]);
  const [filteredList, setFilteredCity] = React.useState<CityProps[]>([]);
  const [isLoading, setLoading] = React.useState(true);
  const [loadingState, setLoadingState] = React.useState(false);
  const [loadingCity, setLoadingCity] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [source, setSource] = React.useState<any>();
  const city_slug = getCookie("city_slug");
  const [selectedCity, setSelectedCity] = React.useState<CityProps | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [showContactForm, setShowContactForm] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  function sendDataLayer(dataCity: any) {
    const data = {
      city: dataCity.name,
      state: dataCity.uf,
      version_website: "versao-nova",
      gclid: searchParams.get("gclid") ?? "",
      utm_source: searchParams.get("utm_source") ?? "",
      utm_campaign: searchParams.get("utm_campaign") ?? "",
      user_id: searchParams.get("utm_campaign") ?? "",
    };

    DataLayerService.sender(data);
  }

  async function loadAllCities() {
    try {
      const cities = await CityService.getAllCities();
      setCity(cities);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar cidades:", error);
      setLoading(false);
    }
  }

  async function filterCity(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);

    if (value === "") {
      setOpen(false);
      setFilteredCity([]);
      setSelectedCity(null);
    } else {
      setOpen(true);
      setLoadingCity(true);
      const filteredCities = await CityService.searchCities(value, cityList);
      setFilteredCity(filteredCities);
      setLoadingCity(false);
    }
  }

  function handleCitySelect(city: CityProps) {
    setSelectedCity(city);
    setInputValue(city.name);
    setOpen(false);
  }

  function handleSubmit() {
    if (selectedCity) {
      setCookieFunction(selectedCity.slug);
    }
  }

  async function setCookieFunction(value: string) {
    clearCookie();

    let path = "";
    const plan_cookie = String(getCookie("plan"));
    const pathname_cookie = String(getCookie("pathname"));
    const return_path = getCookie("return_path");

    if (pathname_cookie === "undefined") {
      path = "/home";

      if (return_path) {
        path = String(return_path);
        deleteCookie("return_path");
      }
    } else {
      path = pathname_cookie ?? pathname;
    }

    const redirect = `${path}?city=${value}${
      plan_cookie && plan_cookie !== "undefined" ? `&plano=${plan_cookie}` : ""
    }${source ? `&${source}` : ""}`;

    setLoading(true);

    const request: any = await axiosInterceptorInstance.get(
      `/city/get-city-by-slug/${value}`
    );

    const data = request?.data;

    if (request.status >= 400) {
      toast.error(request.error.message);
      setLoading(false);
      return;
    }

    if (request.status === 200) {
      setCookie("city_id", data?.id);
      setCookie("city_slug", data?.slug);
      setTimeout(() => {
        router.push(redirect);

        if (reload) {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }, 1000);
      sendDataLayer(data);
    }
  }

  function clearCookie() {
    deleteCookie("city_name_uf");
    deleteCookie("city_id");
    deleteCookie("city_slug");
    deleteCookie("city_external");
    deleteCookie("citycode");
  }

  function checkCookie() {
    if (city_slug && check_city) {
      setCookieFunction(city_slug);
    } else {
      setLoading(false);
    }
  }

  async function getCityFromCoordinates(latitude: number, longitude: number) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      
      const city = data.address.city || 
                  data.address.town || 
                  data.address.village || 
                  data.address.municipality;
                  
      return city;
    } catch (error) {
      console.error("Erro ao obter cidade:", error);
      return null;
    }
  }

  function handleGeolocation() {
    if (!navigator.geolocation) {
      toast.error("Seu navegador não suporta geolocalização");
      return;
    }

    setLoadingCity(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const cityName = await getCityFromCoordinates(latitude, longitude);

          if (!cityName) {
            toast.error("Não foi possível identificar sua cidade");
            setLoadingCity(false);
            return;
          }

          const normalizedSearchName = cityName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          const matchingCity = cityList.find(city => {
            const normalizedCityName = city.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return normalizedCityName.includes(normalizedSearchName) || 
                   normalizedSearchName.includes(normalizedCityName);
          });

          if (matchingCity) {
            handleCitySelect(matchingCity);
            toast.success(`Encontramos ${matchingCity.name} próximo a você!`);
          } else {
            toast.error("Não encontramos sua cidade em nossa base");
            setInputValue("");
            setSelectedCity(null);
          }
        } catch (error) {
          console.error("Erro ao buscar cidades:", error);
          toast.error("Erro ao buscar cidades próximas");
          setInputValue("");
          setSelectedCity(null);
        } finally {
          setLoadingCity(false);
        }
      },
      (error) => {
        setLoadingCity(false);
        toast.error("Erro ao obter sua localização");
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }

  const openModal = () => {
    setShowContactForm(true);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowContactForm(false);
      setIsClosing(false);
    }, 300);
  };

  React.useEffect(() => {
    const queryString = window.location.search.substring(1);
    const params = new URLSearchParams(queryString);

    const paramToDelete = "city";

    if (params.has(paramToDelete)) {
      params.delete(paramToDelete);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
      setSource(params.toString());
    } else {
      if (queryString) {
        setSource(queryString);
      }
    }

    checkCookie();
    loadAllCities();
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex justify-center fixed">
        <div className="w-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <LoadingAlares color="white" />
            </div>
          ) : (
            <div>
              <div
                style={{ backgroundImage: `url(${bg.src})` }}
                className="bg-cover bg-no-repeat bg-center w-full h-[545px] flex items-end justify-center"
              >
                <div className="flex flex-col items-center bg-[#F1F1FA] rounded-lg p-4 w-[90%] sm:w-[739px] mx-auto">
                  <div className="mb-4 flex justify-center">
                    <img src={icon.src} alt="icon" />
                  </div>

                  <div className="text-center mb-6">
                    <span className="text-[#3C34F2] sm:text-[32px] text-[30px] font-bold">
                      Encontre sua cidade
                    </span>
                    <span className="block sm:hidden text-[15px] text-[#363643] font-regular">
                      Informe abaixo sua localização
                    </span>
                  </div>

                  <form className="w-full max-w-md relative" onSubmit={(e) => e.preventDefault()}>
                    <div className="relative">
                      <input
                        type="text"
                        id="inputCity"
                        onFocus={() => setOpen(true)}
                        onClick={() => setOpen(true)}
                        onChange={filterCity}
                        placeholder="Digite sua cidade"
                        value={inputValue}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#3C34F2]"
                      />
                      <div className="absolute inset-y-0 left-3 flex items-center pr-3">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="#5A53F7" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>

                    {open && (
                      <div className="absolute left-0 right-0 mt-1 rounded-lg bg-white shadow-lg max-h-[200px] overflow-auto z-50">
                        <div>
                          <div className="">
                            {filteredList?.map(
                              (city: any, index: number) => {
                                return (
                                  <div key={index}>
                                    {city.onTop === true ? (
                                      <div
                                        onClick={() => handleCitySelect(city)}
                                        className={`pl-2 py-1 hover:bg-sub hover:cursor-pointer`}
                                      >
                                        <span>{city.name}</span>
                                      </div>
                                    ) : null}
                                  </div>
                                );
                              }
                            )}
                          </div>
                          {filteredList?.map(
                            (city: any, index: number) => {
                              return (
                                <div key={index}>
                                  {city.onTop === false ? (
                                    <div
                                      onClick={() => handleCitySelect(city)}
                                      className={`pl-2 py-1 hover:bg-sub hover:cursor-pointer`}
                                    >
                                      <span>{city.name}</span>
                                    </div>
                                  ) : null}
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 mb-4 text-center">
                      <p className="text-[#848490] text-[13px] font-regular sm:font-semibold">ou, se preferir</p>
                      <button 
                        onClick={handleGeolocation}
                        disabled={loadingCity}
                        className="underline mt-2 text-[#3C34F2] font-bold flex items-center justify-center gap-2 mx-auto hover:text-[#322BC3] transition-colors duration-200"
                      >
                        {loadingCity ? (
                          <Loading />
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Usar minha geolocalização
                          </>
                        )}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!selectedCity}
                      className={`w-full mt-5 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
                        selectedCity 
                        ? 'bg-[#3C34F2] hover:bg-[#322BC3]' 
                        : 'bg-gray-300 cursor-not-allowed'
                      }`}
                    >
                      Continuar
                    </button>
                  </form>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-white w-full pt-[71px] mt-[-40px]">
                <h5 className="text-[22px] font-semibold text-[#363643]">Não encontrou sua cidade?</h5>
                <button 
                  onClick={openModal}
                  className="border-2 border-main text-main rounded-full text-[13px] font-bold px-8 py-1 hover:bg-main hover:text-white transition-colors duration-200 mt-4"
                >
                  ACESSE AQUI
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {(showContactForm || isClosing) && (
        <ContactForm
          onClose={closeModal}
          isClosing={isClosing}
          onSubmit={async (data) => {
            try {
              console.log('Dados do formulário:', data);
              closeModal();
              toast.success('Dados enviados com sucesso! Entraremos em contato em breve.');
            } catch (error) {
              console.error('Erro ao enviar formulário:', error);
              toast.error('Erro ao enviar dados. Tente novamente.');
            }
          }}
        />
      )}
    </>
  );
}
