"use client";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { CityProps } from "../types/interface/state.interface";
import { useAllCities, useCityBySlug, queryKeys } from "../hooks/useQueries";
import { useQueryClient } from "@tanstack/react-query";
import Logo from "./Logo/Logo";
import LoadingAlares from "./loadings/LoadingAlares";
import Loading from "./loadings/Loading";
import DataLayerService from "../services/api/datalayer.service";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import ContactForm from "./ContactForm";
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

export default function CitySelectorCached({ reload, check_city, isDrawer = false }: props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Usar hooks de cache para buscar dados
  const { data: cityList = [], isLoading, isError } = useAllCities();
  
  const [filteredList, setFilteredCity] = React.useState<CityProps[]>([]);
  const [loadingCity, setLoadingCity] = React.useState(false);
  const [loadingAction, setLoadingAction] = React.useState(false);
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
        const filteredCities = cityList.filter(city => 
          city.name.toLowerCase().includes(value.toLowerCase())
        );
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

    setLoadingAction(true);

    try {
      // Primeiro verificar se já está no cache
      let cityData = queryClient.getQueryData(queryKeys.cityBySlug(value));
      
      if (!cityData) {
        // Se não estiver no cache, buscar da API
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/city/get-city-by-slug/${value}`);
        
        if (!response.ok) {
          throw new Error('Cidade não encontrada');
        }
        
        cityData = await response.json();
        
        // Adicionar ao cache para futuras consultas
        queryClient.setQueryData(queryKeys.cityBySlug(value), cityData);
      }

      // Salvar nos cookies
      setCookie("city_id", (cityData as any)?.id);
      setCookie("city_slug", (cityData as any)?.slug);
      
      setTimeout(() => {
        router.push(redirect);

        if (reload) {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }, 1000);
      
      sendDataLayer(cityData);
      
    } catch (error: any) {
      toast.error(error?.message || 'Erro ao buscar cidade');
    } finally {
      setLoadingAction(false);
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
    }
  }

  async function getCityFromCoordinates(latitude: number, longitude: number) {
    try {
      // Implementar geocoding reverso se necessário
      // Por enquanto, mostrar modal para seleção manual
      setModalSource('geolocation');
      openModal();
    } catch (error) {
      console.error("Erro ao obter cidade pelas coordenadas:", error);
      setModalSource('manual');
      openModal();
    }
  }

  function handleGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getCityFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          setModalSource('manual');
          openModal();
        }
      );
    } else {
      console.error("Geolocalização não é suportada pelo navegador");
      setModalSource('manual');
      openModal();
    }
  }

  const openModal = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setShowContactForm(false);
    }, 300);
  };

  const closeThankYouModal = () => {
    setIsThankYouModalClosing(true);
    setTimeout(() => {
      setIsThankYouModalClosing(false);
      setShowThankYouModal(false);
    }, 300);
  };

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('city');
    params.delete('plano');
    const sourceString = params.toString();
    setSource(sourceString);
    
    checkCookie();
  }, [searchParams]);

  // Mostrar loading apenas enquanto os dados estão sendo carregados
  if (isLoading || loadingAction) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingAlares />
      </div>
    );
  }

  // Mostrar erro se houver problema na busca
  if (isError) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="text-center">
          <p>Erro ao carregar dados. Tente novamente.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Recarregar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen bg-white">
      {/* Navegação */}
      <NavigationSelector />
      
      {/* Conteúdo principal */}
      <div 
        className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div className="w-full max-w-2xl mx-auto p-6">
          <div className="text-center mb-8">
            <Logo />
            <h1 className="text-2xl font-bold text-gray-800 mt-4">
              Selecione sua cidade
            </h1>
            <p className="text-gray-600 mt-2">
              Digite o nome da cidade ou a sigla do estado (ex: SP, RJ)
            </p>
          </div>

          {/* Campo de busca */}
          <div className="relative mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={filterCity}
              placeholder="Digite o nome da cidade..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            {/* Lista de resultados */}
            {open && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {loadingCity ? (
                  <div className="p-4 text-center">
                    <Loading />
                  </div>
                ) : filteredList.length > 0 ? (
                  filteredList.map((city) => (
                    <div
                      key={city.id}
                      onClick={() => handleCitySelect(city)}
                      className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                    >
                      {city.name} - {city.uf}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    Nenhuma cidade encontrada
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Botões de ação */}
          <div className="space-y-4">
            <button
              onClick={handleSubmit}
              disabled={!selectedCity}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            >
              Continuar
            </button>
            
            <button
              onClick={handleGeolocation}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <Image src={icon} alt="Localização" width={20} height={20} />
              Usar minha localização
            </button>
          </div>
        </div>
      </div>

      {/* Modais */}
      {showContactForm && (
        <div className={`fixed inset-0 z-50 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}>
          <ContactForm
            onClose={closeModal}
            modalSource={modalSource}
            onSubmit={(data) => {
              // Implementar lógica de envio
              console.log('Form data:', data);
              setShowContactForm(false);
              setShowThankYouModal(true);
            }}
          />
        </div>
      )}

      {showThankYouModal && (
        <div className={`fixed inset-0 z-50 ${isThankYouModalClosing ? 'animate-fade-out' : 'animate-fade-in'}`}>
          <div className="bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
              <h2 className="text-2xl font-bold mb-4">Obrigado!</h2>
              <p className="mb-6">Entraremos em contato em breve.</p>
              <button
                onClick={closeThankYouModal}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 