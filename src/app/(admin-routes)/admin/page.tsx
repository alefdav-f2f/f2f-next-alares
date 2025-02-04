'use client'
import CityService from "@/app/services/api/city-service";
import React, { useState } from "react";
import { FaCity, FaCog } from "react-icons/fa";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { IoInformationCircle } from "react-icons/io5";
import { TbBuildingEstate } from "react-icons/tb";
import { count } from "console";
import LoadingAlares from "@/app/components/loadings/LoadingAlares";
import StateService from "@/app/services/api/state-service";
import Loading from "@/app/components/loadings/Loading";
import BannerService from "@/app/services/api/banner-service";
import { PiFlagBannerFill } from "react-icons/pi";
import { BsTv } from "react-icons/bs";
import ChannelService from "@/app/services/api/channel-tv-service";

interface MenuItem {
    title: string;
    route?: string;
    children?: MenuItem[];
}

const Admin: React.FC = () => {

    const [cityList, setCityList] = useState<any[]>([]);
    const [cityLoader, setCityLoader] = useState(true);

    const [stateList, setStateList] = useState<any[]>([]);
    const [stateLoader, setStateLoader] = useState(true);

    const [channelList, setChannelList] = useState<any[]>([]);
    const [channelLoader, setChannelLoader] = useState(true);

    const [bannerList, setBannerList] = useState<any[]>([]);
    const [bannerGlobalList, setBannerGlobalList] = useState<any[]>([]);
    const [bannerLoader, setBannerLoader] = useState(true);



    async function getCities() {

        const params = {
            page: 1,
            perPage: 99999,
            isActive: true,
        }

        const response = await CityService.paginate(params);

        if (response) {
            const data = response?.data?.data;
            setCityList(data);
            setCityLoader(false)
        }
    }

    async function getStates() {

        const params = {
            page: 1,
            perPage: 99999,
            isActive: true,
        }

        const response = await StateService.paginate(params);

        if (response) {
            const data = response.data?.data;
            setStateList(data);
            setStateLoader(false)
        }
    }

    async function getBanners() {

        const params = {
            isActive: true,
        }

        const response = await BannerService.paginate(params);

        if (response) {
            const data = response.data?.data;
            const global = data?.filter((d: any) => d.isAll === true)
            setBannerList(data);
            setBannerGlobalList(global)
            setBannerLoader(false)
        }
    }

    async function getTVChannel() {

        const params = {
            isActive: true,
        }

        const response = await ChannelService.get(params);

        if (response) {
            const data = response.data;
            setChannelList(data);
            setChannelLoader(false)
        }
    }

    React.useEffect(() => {
        getCities()
        getStates()
        getBanners()
        getTVChannel()
    }, [])

    return (
        <div className="p-4 ">
            <div className="flex flex-wrap">

                {/* CARD DE CIDADE */}
                <Dialog>
                    <DialogTrigger disabled={cityLoader}>
                        <div className="bg-main p-4 rounded-xl shadow-lg w-[200px] h-[100px] hover:bg-hover mr-4 mb-4 hover:scale-[102%] flex justify-center items-center">
                            {cityLoader ? (
                                <Loading />
                            ) : (
                                <div className="w-full">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center text-white">
                                            <FaCity className="mr-2" />
                                            <div>
                                                <span className="text-sm">Cidades ativas</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <span className="text-4xl font-bold text-white"><strong>{cityList?.length}</strong></span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                <div className="flex items-center">
                                    <FaCity className="mr-2" />
                                    <div>
                                        <span className="text-sm">Cidades ativas ({cityList.length})</span>
                                    </div>
                                </div>
                            </DialogTitle>
                            <DialogDescription>
                                <div className="max-h-[500px] overflow-auto">
                                    {cityList?.map((city: any) => {
                                        return (
                                            <div>
                                                <span>{city.name} - {city.uf}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                {/* CARD DE ESTADOS */}
                <Dialog>
                    <DialogTrigger disabled={stateLoader}>
                        <div className="bg-sub p-4 rounded-xl shadow-lg w-[200px] h-[100px] mr-4 mb-4 hover:scale-[102%] flex justify-center items-center">
                            {stateLoader ? (
                                <Loading />
                            ) : (
                                <div className="w-full">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center text-black">
                                            <TbBuildingEstate className="mr-2" />
                                            <div>
                                                <span className="text-sm">Estados ativos</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <span className="text-4xl font-bold text-black"><strong>{stateList?.length}</strong></span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                <div className="flex items-center">
                                    <TbBuildingEstate className="mr-2" />
                                    <div>
                                        <span className="text-sm">Estados ativos ({stateList.length})</span>
                                    </div>
                                </div>
                            </DialogTitle>
                            <DialogDescription>
                                <div className="max-h-[500px] overflow-auto">
                                    {stateList?.map((state: any) => {
                                        return (
                                            <div>
                                                <span>{state.name}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

            <div>
                {/* CARD DE BANNERS */}
                <Dialog>
                    <DialogTrigger disabled={true}>
                        <div className="bg-gray-200 p-4 rounded-xl shadow-lg w-[200px] h-[100px] mr-4 mb-4 hover:scale-[102%] flex justify-center items-center">
                            {bannerLoader ? (
                                <Loading />
                            ) : (
                                <div className="w-full">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center text-black">
                                            <PiFlagBannerFill className="mr-2" />
                                            <div>
                                                <span className="text-sm">Banners ativos</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <span className="text-4xl font-bold text-black"><strong>{bannerList?.length}</strong></span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                <div className="flex items-center">
                                    <FaCity className="mr-2" />
                                    <div>
                                        <span className="text-sm">Banners ativos ({bannerList.length})</span>
                                    </div>
                                </div>
                            </DialogTitle>
                            <DialogDescription>

                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                {/* CARD DE BANNERS */}
                <Dialog>
                    <DialogTrigger disabled={true}>
                        <div className="bg-gray-200 p-4 rounded-xl shadow-lg w-[200px] h-[100px] mr-4 hover:scale-[102%] flex justify-center items-center">
                            {bannerLoader ? (
                                <Loading />
                            ) : (
                                <div className="w-full">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center text-black">
                                            <PiFlagBannerFill className="mr-2" />
                                            <div>
                                                <span className="text-sm">Banners globais</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <span className="text-4xl font-bold text-black"><strong>{bannerGlobalList?.length}</strong></span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                <div className="flex items-center">
                                    <FaCity className="mr-2" />
                                    <div>
                                        <span className="text-sm">Banners ativos ({bannerList.length})</span>
                                    </div>
                                </div>
                            </DialogTitle>
                            <DialogDescription>

                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                {/* CARD DE CANAIS DE TV */}
                <Dialog>
                    <DialogTrigger disabled={true}>
                        <div className="bg-gray-200 p-4 rounded-xl shadow-lg w-[200px] h-[100px] mr-4 hover:scale-[102%] flex justify-center items-center">
                            {bannerLoader ? (
                                <Loading />
                            ) : (
                                <div className="w-full">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center text-black">
                                            <BsTv className="mr-2" />
                                            <div>
                                                <span className="text-sm">Canais de TV</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <span className="text-4xl font-bold text-black"><strong>{channelList?.length}</strong></span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                <div className="flex items-center">
                                    <FaCity className="mr-2" />
                                    <div>
                                        <span className="text-sm">Banners ativos ({bannerList.length})</span>
                                    </div>
                                </div>
                            </DialogTitle>
                            <DialogDescription>

                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default Admin;