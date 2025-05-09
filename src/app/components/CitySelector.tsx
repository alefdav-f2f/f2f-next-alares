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
import NavigationSelector from "./NavigationSelector";
import icon from "@/img/icon_selector.png";
import bg from "@/img/bg-selector.png";
import undrawPersonalText from "@/img/modal/undraw_personal_text.svg";
import blogIndoAlem from "@/img/modal/blog_indo_alem.svg";
import alaresEmpresas from "@/img/modal/alares_empresas.svg";
import Image from "next/image";

interface props {
  reload: boolean;
  check_city: boolean;
  isDrawer?: boolean;
}

export default function CitySelector({ reload, check_city, isDrawer = false }: props) {
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
  const [showThankYouModal, setShowThankYouModal] = React.useState(false);
  const [isThankYouModalClosing, setIsThankYouModalClosing] = React.useState(false);
  const [formData, setFormData] = React.useState<any>(null);
  const [modalSource, setModalSource] = React.useState<'geolocation' | 'manual' | null>(null);

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
      
      // Verificar se o valor é uma sigla de estado (2 letras)
      const isStateCode = /^[A-Z]{2}$/i.test(value);
      
      if (isStateCode) {
        // Se for sigla de estado, filtra todas as cidades desse estado
        const upperValue = value.toUpperCase();
        
        const citiesByState = cityList.filter(city => 
          city.uf.toUpperCase() === upperValue
        );
        setFilteredCity(citiesByState);
      } else {
        // Comportamento normal de busca
        const filteredCities = await CityService.searchCities(value, cityList);
        setFilteredCity(filteredCities);
      }
      
      setLoadingCity(false);
    }
  }

  function handleCitySelect(city: CityProps) {
    setSelectedCity(city);
    setInputValue(`${city.name} - ${city.uf}`);
    setOpen(false);
  }

  function handleSubmit() {
    if (selectedCity) {
      setCookieFunction(selectedCity.slug);
    }
  }

  async function setCookieFunction(value: string) {
    // Salvar o pathname atual antes de limpar os cookies
    const currentPath = pathname.startsWith('/home') ? '/home' : pathname;
    
    clearCookie();

    let path = "";
    const plan_cookie = String(getCookie("plan"));
    const pathname_cookie = String(getCookie("pathname"));
    const return_path = getCookie("return_path");

    // Use o path atual como fallback em vez de forçar /home
    if (pathname_cookie === "undefined" || !pathname_cookie) {
      // Primeiro verifica se há um return_path definido
      if (return_path) {
        path = String(return_path);
        deleteCookie("return_path");
      } else {
        // Usa o caminho atual se não for a página raiz
        path = currentPath !== '/' ? currentPath : '/home';
      }
    } else {
      path = pathname_cookie;
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
    // Salvar o pathname atual no cookie antes de limpar os outros cookies
    if (pathname !== '/') {
      setCookie("pathname", pathname);
    }
    
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
            setModalSource('geolocation');
            setShowContactForm(true);
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
            setModalSource('geolocation');
            setShowContactForm(true);
          }
        } catch (error) {
          console.error("Erro ao buscar cidades:", error);
          setModalSource('geolocation');
          setShowContactForm(true);
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
    setModalSource('manual');
    setShowContactForm(true);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowContactForm(false);
      setIsClosing(false);
      setModalSource(null);
    }, 300);
  };

  const closeThankYouModal = () => {
    setIsThankYouModalClosing(true);
    setTimeout(() => {
      setShowThankYouModal(false);
      setIsThankYouModalClosing(false);
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

  // if (isDrawer) {
  //   return (
  //     <div className="w-full h-full flex flex-col">
  //       <div className="flex flex-col items-center bg-[#F1F1FA] rounded-lg p-4 w-full">
  //         <div className="mb-4 flex justify-center">
  //           <img src={icon.src} alt="icon" className="w-8 h-8" />
  //         </div>

  //         <div className="text-center mb-4">
  //           <span className="text-[#3C34F2] text-[20px] font-bold">
  //             Encontre sua cidade
  //           </span>
  //         </div>

  //         <form className="w-full relative" onSubmit={(e) => e.preventDefault()}>
  //           <div className="relative">
  //             <input
  //               type="text"
  //               id="inputCity"
  //               onFocus={() => setOpen(true)}
  //               onClick={() => setOpen(true)}
  //               onChange={filterCity}
  //               placeholder="Digite sua cidade"
  //               value={inputValue}
  //               className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-[#3C34F2] text-sm"
  //             />
  //             <div className="absolute inset-y-0 left-3 flex items-center pr-3">
  //               <svg className="w-4 h-4 text-gray-400" fill="none" stroke="#5A53F7" viewBox="0 0 24 24">
  //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  //               </svg>
  //             </div>
  //           </div>

  //           {open && (
  //             <div className="absolute left-0 right-0 mt-1 rounded-lg bg-white shadow-lg max-h-[200px] overflow-auto z-50">
  //               <div>
  //                 <div className="">
  //                   {filteredList?.map(
  //                     (city: any, index: number) => {
  //                       return (
  //                         <div key={index}>
  //                           {city.onTop === true ? (
  //                             <div
  //                               onClick={() => handleCitySelect(city)}
  //                               className={`pl-2 py-1 hover:bg-sub hover:cursor-pointer text-sm`}
  //                             >
  //                               <span>{city.name} - {city.uf}</span>
  //                             </div>
  //                           ) : null}
  //                         </div>
  //                       );
  //                     }
  //                   )}
  //                 </div>
  //                 {filteredList?.map(
  //                   (city: any, index: number) => {
  //                     return (
  //                       <div key={index}>
  //                         {city.onTop === false ? (
  //                           <div
  //                             onClick={() => handleCitySelect(city)}
  //                             className={`pl-2 py-1 hover:bg-sub hover:cursor-pointer text-sm`}
  //                           >
  //                             <span>{city.name} - {city.uf}</span>
  //                           </div>
  //                         ) : null}
  //                       </div>
  //                     );
  //                   }
  //                 )}
  //               </div>
  //             </div>
  //           )}

  //           <div className="mt-3 text-center">
  //             <p className="text-[#848490] text-[12px] font-regular">ou, se preferir</p>
  //             <button 
  //               onClick={handleGeolocation}
  //               disabled={loadingCity}
  //               className="underline mt-1 text-[#3C34F2] font-bold flex items-center justify-center gap-2 mx-auto hover:text-[#322BC3] transition-colors duration-200 text-sm"
  //             >
  //               {loadingCity ? (
  //                 <Loading />
  //               ) : (
  //                 <>
  //                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 6 25">
  //                     <path d="M7 18.6667C7 18.6667 14 12.0327 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 12.0327 7 18.6667 7 18.6667ZM7 10.5C5.067 10.5 3.5 8.933 3.5 7C3.5 5.067 5.067 3.5 7 3.5C8.933 3.5 10.5 5.067 10.5 7C10.5 8.933 8.933 10.5 7 10.5Z" fill="#3C34F2"/>
  //                   </svg>
  //                   Usar minha geolocalização
  //                 </>
  //               )}
  //             </button>
  //           </div>

  //           <button
  //             type="button"
  //             onClick={handleSubmit}
  //             disabled={!selectedCity}
  //             className={`w-full mt-3 py-2 rounded-lg font-medium text-white transition-all duration-200 text-sm ${
  //               selectedCity 
  //               ? 'bg-[#3C34F2] hover:bg-[#322BC3]' 
  //               : 'bg-gray-300 cursor-not-allowed'
  //             }`}
  //           >
  //             Continuar
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="w-screen h-screen flex justify-center fixed overflow-y-scroll">
        <div className="w-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <LoadingAlares color="white" />
            </div>
          ) : (
            <div>
              {!isDrawer ? <NavigationSelector /> : ''}
              <div
                style={{ backgroundImage: `url(${bg.src})` }}
                className="bg-cover bg-no-repeat bg-center w-full h-[480px] sm:h-[500px] flex items-center justify-center"
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

                  <form className="w-full max-w-[335px] sm:max-w-[543px] relative" onSubmit={(e) => e.preventDefault()}>
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
                                        <span>{city.name} - {city.uf}</span>
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
                                      <span>{city.name} - {city.uf}</span>
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
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 6 25">
                            <path d="M7 18.6667C7 18.6667 14 12.0327 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 12.0327 7 18.6667 7 18.6667ZM7 10.5C5.067 10.5 3.5 8.933 3.5 7C3.5 5.067 5.067 3.5 7 3.5C8.933 3.5 10.5 5.067 10.5 7C10.5 8.933 8.933 10.5 7 10.5Z" fill="#3C34F2"/>
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

              <div className={`flex flex-col items-center justify-center bg-white w-full pt-[71px] mt-[-40px] sm:pt-[80px] sm:mt-[-80px] ${isDrawer ? 'pb-10' : ''}`}>
                <h5 className="text-[22px] font-semibold text-[#363643]">Não encontrou sua cidade?</h5>
                <button 
                  onClick={openModal}
                  className="border-2 border-main text-main rounded-full text-[13px] font-bold px-8 py-1 hover:bg-main hover:text-white transition-colors duration-200 mt-4"
                >
                  ACESSE AQUI
                </button>
              </div> 
              {isDrawer ? <div className="mt-10" /> : ''}
              <div className={`flex flex-col items-center justify-center bg-main w-full border-t-4 border-sub mt-[30px] py-10 sm:py-12 ${isDrawer ? 'hidden' : ''}`}>
                <Logo className="w-28 sm:w-36" color="white" />
              </div>
            </div>
          )}
        </div>
      </div>

      {(showContactForm || isClosing) && (
        <ContactForm
          onClose={closeModal}
          isClosing={isClosing}
          modalSource={modalSource}
          onSubmit={async (data) => {
            try {
              console.log('Dados do formulário:', data);
              setFormData(data);
              closeModal();
              
              setTimeout(() => {
                setShowThankYouModal(true);
              }, 350);
              
            } catch (error) {
              console.error('Erro ao enviar formulário:', error);
              toast.error('Erro ao enviar dados. Tente novamente.');
            }
          }}
        />
      )}

      {(showThankYouModal || isThankYouModalClosing) && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
            !isThankYouModalClosing ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-[30px] transition-opacity duration-300"
            onClick={closeThankYouModal}
          />
          <div 
            className={`bg-[#F1F1FA] rounded-[10px] shadow-xl max-w-[739px] w-full mx-4 transform transition-all duration-300 ease-out ${
              !isThankYouModalClosing ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            }`}
          >
            <div className="flex justify-end p-2">
              <button
                onClick={closeThankYouModal}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="w-full max-w-[739px] mx-auto p-6">
              <div className="text-center">
                <div className="flex justify-center">
                  <Image src={undrawPersonalText} alt="Ilustração" width={180} height={126} />
                </div>
                <h2 className="text-[32px] font-bold text-[#3C34F2]">Recebemos seus dados!</h2>
                <p className="text-[#363643] text-[15px] leading-[1.53em] mb-4">
                  Não se preocupe, entraremos em contato quando a Alares chegar por aí!
                </p>
                
                

                <h3 className="text-[16px] font-semibold text-[#222222] mb-6">
                  Conteúdos que podem te interessar:
                </h3>

                <div className="flex flex-col sm:flex-row justify-center gap-10">
                  {/* Card Blog Indo Além */}
                  <div className="flex flex-row sm:flex-col items-center gap-4">
                    <div className="relative w-[187px] h-[140px] sm:w-[214px] sm:h-[150px] rounded-[6.7px] overflow-hidden mb-4">
                      <Image 
                        src={blogIndoAlem} 
                        alt="Blog Indo Além" 
                        layout="fill" 
                        objectFit="cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-[18px] sm:text-[20px] text-[#363643] mb-4 text-left">Blog <b>Indo Além</b></h4>
                      <button onClick={() => window.open('https://www.alaresinternet.com.br/indoalem/', '_blank')} className="bg-[#5A53F7] w-[144px] text-white text-[13px] font-bold rounded-full px-8 py-2 hover:bg-[#4A45E5] transition-colors duration-200">
                        SAIBA MAIS
                      </button>
                    </div>
                  </div>

                  {/* Card Alares Empresas */}
                  <div className="flex flex-row sm:flex-col items-center gap-4">
                    <div className="relative w-[187px] h-[140px] sm:w-[214px] sm:h-[150px] rounded-[6.7px] overflow-hidden mb-4">
                      <Image 
                        src={alaresEmpresas} 
                        alt="Alares Empresas" 
                        layout="fill" 
                        objectFit="cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-[18px] sm:text-[20px] text-[#363643] mb-4 text-left"><b>Alares</b> empresas</h4>
                      <button onClick={() => window.open('https://empresas.alaresinternet.com.br/', '_blank')} className="bg-[#5A53F7] w-[144px] text-white text-[13px] font-bold rounded-full px-8 py-2 hover:bg-[#4A45E5] transition-colors duration-200">
                        SAIBA MAIS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
