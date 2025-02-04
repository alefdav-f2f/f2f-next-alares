"use client";
import TitlePage from "@/app/components/TitlePage";
import { RiImageEditFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { MdDownload } from "react-icons/md";
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import axiosInterceptorInstance from "@/app/api/axiosInterceptor";
import toast from "react-hot-toast";
import { FaWhatsapp } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import React from "react";
import logoAlares from "@/img/logo-purple.png";
import LoadingAlares from "@/app/components/loadings/LoadingAlares";
export default function Flyer({ params }: { params: { flyerId: string } }) {
    const flyerId = params.flyerId;
    const [isTradeMarketing, setIsTradeMarketing] = useState(false);
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedAddress, setSelectedAddress] = useState<string>('');
    const [address, setAddress] = useState<any[]>([]);
    const [customAddress, setCustomAddress] = useState<string>('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [flyerData, setFlyerData] = useState<any>('');
    const [name, setName] = useState<string>('');
    const [whatsapp, setWhatsapp] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [mode, setMode] = useState("feed");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const formatPhoneNumber = (value: string) => {
        return value
            .replace(/\D/g, '')
            .replace(/^(\d{2})(\d{5})(\d{4})$/, '($1)$2-$3')
    };

    const getDataFlyer = async (id: string) => {
        try {
            const response = await axiosInterceptorInstance.get(`/flyer/detail/${id}`);
            setFlyerData(response.data);
            setIsTradeMarketing(response.data.isTradeMarketing);
            setIsLoading(false);
            if (!response.data.isActive) {
                toast.error("Flyer está inativo");
            }

        } catch (error: any) {
            toast.error("Erro ao buscar detalhes do flyer");
        }
    };


    useEffect(() => {
        getDataFlyer(flyerId);
        getCities();
    }, [flyerId]);


    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const city = e.target.value;
        setSelectedCity(city);


        const selectedCityData = address.find((item) => item.name === city);

        if (selectedCityData) {
            const formattedAddress = formatAddress(selectedCityData.address);
            const fullAddress = `${formattedAddress}, ${selectedCityData.city} - ${selectedCityData.uf}`;


            setSelectedAddress(fullAddress);
        } else {

            setSelectedAddress('');
        }


        setCustomAddress('');
    };



    const handleCustomAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomAddress(e.target.value);
        if (e.target.value) {
            setSelectedCity('');
            setSelectedAddress('');
        }
    };

    const saveImage = async () => {
        let imageType = mode === 'feed' ? 'feed.png' : 'story.png';



        const flyerElement = document.getElementById("divImage");
        if (flyerElement) {

            const images = flyerElement.getElementsByTagName("img");
            Array.from(images).forEach((img) => {

                img.src = `/api/proxy-image?url=${encodeURIComponent(img.src)}`;
            });

            const dataUrl = await toPng(flyerElement, {
                canvasWidth: mode === "story" ? 1080 : 1080,
                canvasHeight: mode === "feed" ? 1080 : 1920,
                quality: 1.0,
                cacheBust: true,
                backgroundColor: 'transparent',
            });

            download(dataUrl, imageType);
            window.location.reload();

        }
    };
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setWhatsapp(formatPhoneNumber(value));
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPhone(formatPhoneNumber(value));
    };

    const getCities = async () => {
        try {
            const response = await axiosInterceptorInstance.get('/store/get-all-without-auth');


            const sortedAddress = response.data.sort((a: any, b: any) => a.name.localeCompare(b.name));

            setAddress(sortedAddress);
        } catch (error) {
            toast.error("Erro ao buscar cidades");
        }
    };

    const formatAddress = (address: string) => {
        return address
            .replace(/\bRua\b/g, 'R.')
            .replace(/\bAvenida\b/g, 'Av.');
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
               <LoadingAlares/>
            </div>
        );
    }
    return (
        <div className="flex items-center justify-center   ">
            <div className="bg-gray p-4 rounded-lg shadow-lg w-full h-full max-w-[950px] md:max-h-[950px] mt-5 ">
                <div className="flex items-center justify-between">
                    <TitlePage icon={<RiImageEditFill />} title="Flyer" />
                    <img className="w-[15%] h-auto" src={logoAlares.src} alt="Logo Alares" />
                </div>
                <section className="mt-2">
                    <h1 className="border-b-2 mb-4">Informações</h1>
                    <div className="flex flex-wrap justify-center items-center">
                        <div className="flex flex-col pr-3 gap-2 w-[300px] mb-3">
                            {!isTradeMarketing && (
                                <>
                                    <label>Nome:</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={handleNameChange}
                                        placeholder="Digite o nome"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5 mb-4"
                                    />

                                    <label>WhatsApp:</label>
                                    <input
                                        type="text"
                                        value={whatsapp}
                                        onChange={handleWhatsappChange}
                                        placeholder="(11) 11111-1111"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5"
                                    />
                                    <label>Fone/Celular:</label>

                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        placeholder="(11) 11111-1111"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[300px] p-2.5"
                                    />


                                </>
                            )}
                            {isTradeMarketing && (
                                <>
                                    <label>Data:</label>
                                    <input
                                        type="text"
                                        placeholder="Ex.: dia/mês/ano (dia da semana)"
                                        onChange={(e) => setDate(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                                    />

                                    <label>Horário:</label>
                                    <input
                                        type="text"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        placeholder="Ex.: 16:30h"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                                    />

                                </>
                            )}


                            <h1 className="mb-1 text-xl">Endereço</h1>
                            <div className="flex flex-col gap-2 w-full">
                                {isTradeMarketing && (
                                    <>
                                        <label className="">Personalizado</label>
                                        <input
                                            type="text"
                                            value={customAddress}
                                            onChange={handleCustomAddressChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                            placeholder="Digite o endereço"
                                            disabled={selectedCity !== ''}
                                        />
                                    </>
                                )}

                                <label className="">Lojas</label>
                                <select
                                    value={selectedCity}
                                    onChange={handleCityChange}
                                    className="border-2 border-gray-200 rounded-lg p-2.5"
                                >
                                    <option value="">Selecione a cidade</option>
                                    {address.map((item) => (
                                        <option key={item.name} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        </div>

                        {mode === "feed" ? (
                            // FEED 
                            <div className="flex shadow-xl m-4 flex-col">
                                <div id="divImage" className="relative h-[30rem] w-[30rem] min-w-[30rem] min-h-[30rem] max-w-full max-h-full flex flex-col overflow-hidden ">

                                    <>
                                        <img
                                            src={flyerData.feed}
                                            alt="img-feed"
                                            className="object-contain w-full h-full  mx-auto"
                                        />
                                        {isTradeMarketing && (

                                            <div className="absolute bottom-0 w-full min-w-[300px]  flex flex-col items-center justify-center text-center">
                                                <div className="flex items-center gap-2">
                                                    {date && (
                                                        <p className="text-sm"><span className="font-bold">Data:</span> {date}</p>
                                                    )}
                                                    {time && (
                                                        <p className="text-sm"><span className="font-bold">Horário:</span> {time}</p>
                                                    )}
                                                </div>

                                                {(selectedCity || customAddress) && (
                                                    <div className="text-[14px] tracking-wide  flex w-full h-[60px] max-w-[420px] justify-center flex-wrap text-center px-2">
                                                        <p

                                                        >
                                                            <span className="font-extrabold">Endereço:</span> {selectedAddress || customAddress}
                                                        </p>
                                                    </div>


                                                )}




                                            </div>
                                        )}

                                        {!isTradeMarketing && (
                                            <div className="flex flex-col items-center justify-center px-2  w-full min-w-[300px] absolute bottom-[2%] flex-wrap content-center ">
                                                <div className="flex justify-center  w-full">
                                                    {name && (
                                                        <p className="text-[18px] font-extrabold " >
                                                            {name}
                                                        </p>
                                                    )}
                                                </div>


                                                <div className="flex items-center gap-1 justify-center  w-full">
                                                    {whatsapp && (
                                                        <>
                                                            <p className="text-sm  flex items-center "><FaWhatsapp className="mr-1" /> {whatsapp}</p> {whatsapp && phone && (<span>|</span>)}
                                                        </>

                                                    )}
                                                    {phone && (
                                                        <p className="text-sm  flex items-center"><FaPhoneAlt className="mr-1" />{phone}</p>
                                                    )}
                                                </div>

                                                {(selectedCity || customAddress) && (
                                                    <div className="text-[14px] tracking-wide flex w-full h-[50px]  max-w-[400px] justify-center flex-wrap text-center px-3">
                                                        <p

                                                        >
                                                            <span className="font-extrabold">Visite-nos:</span> {selectedAddress}
                                                        </p>
                                                    </div>


                                                )}


                                            </div>
                                        )}
                                    </>


                                </div>
                            </div>
                        ) : (
                            // STORY

                            <div className="flex ml-4 shadow-xl flex-col mt-3">
                                <div id="divImage" className="relative w-full min-w-[300px] h-[520px] overflow-hidden bg-transparent">

                                    <>
                                        <img src={flyerData.story} alt="img-story" className="object-cover w-full h-full" />
                                        <div className="absolute bottom-3 left-0 right-0 flex flex-col items-center justify-center text-center p-4">
                                            {isTradeMarketing && (
                                                <>
                                                    <div className="flex items-center flex-col gap-1">
                                                        {date && (
                                                            <p className="text-sm"><span className="font-bold">Data:</span> {date}</p>
                                                        )}
                                                        {time && (
                                                            <p className="text-sm"><span className="font-bold">Horário:</span> {time}</p>
                                                        )}
                                                    </div>
                                                    {(selectedCity || customAddress) && (
                                                        <p className="text-sm ">
                                                            <span className="font-bold text-center">Endereço: </span>
                                                            {selectedAddress || customAddress}
                                                        </p>
                                                    )}
                                                </>
                                            )}
                                            
                                            {!isTradeMarketing && (
                                                <>
                                                    {name && (
                                                        <p className="text-sm font-bold">
                                                            {name}
                                                        </p>
                                                    )}

                                                    <div className="flex items-center gap-1">
                                                        {whatsapp && (
                                                            <>
                                                                <p className="text-sm flex items-center"><FaWhatsapp className="mr-1" /> {whatsapp}</p> {whatsapp && phone && (<span>|</span>)}
                                                            </>

                                                        )}
                                                        {phone && (
                                                            <p className="text-sm flex items-center"><FaPhoneAlt className="mr-1" />{phone}</p>
                                                        )}
                                                    </div>

                                                    {(selectedCity || customAddress) && (
                                                        <p className="text-sm ">
                                                            <span className="font-bold text-center">Visite-nos: </span>
                                                            {selectedAddress || customAddress}
                                                        </p>
                                                    )}
                                                </>
                                            )}


                                        </div>
                                    </>

                                </div>
                            </div>
                        )}
                    </div>

                    <section className="p-4 flex flex-col">


                        <div className="flex md:justify-normal justify-center">
                            <select className="border-2 border-gray-200 p-2 rounded-lg p-2.5" value={mode}
                                onChange={(e) => setMode(e.target.value)}>
                                <option value="feed">Feed</option>
                                <option value="story">Story</option>
                            </select>


                        </div>
                        <div className="flex mt-5  md:justify-normal justify-center items-center">
                            <button onClick={saveImage} className="flex items-center justify-center bg-[#36EFA2] w-[200px] h-[40px] rounded text-center text-white">
                                Salvar imagem <MdDownload size={17} className="ml-2" />
                            </button>
                        </div>
                    </section>
                </section>
            </div>
        </div>
    );
}
