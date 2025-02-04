'use client'

import React, { useState } from "react";
import { ImProfile, ImUsers } from "react-icons/im";
import { FaCity, FaCog } from "react-icons/fa";
import { LuLayoutPanelLeft } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'
import { PiFlagBannerFill } from "react-icons/pi";
import { RiGovernmentFill } from "react-icons/ri";
import { MdLocalOffer, MdOutlineLeaderboard, MdOutlineLocalOffer, MdUpdate } from "react-icons/md";
import featureList from '@/app/mock/featureList.json';
import { BiSolidStore } from "react-icons/bi";
import { BsCardChecklist, BsTv } from "react-icons/bs";
import { GrCircleInformation } from "react-icons/gr";
import { CgFileDocument } from "react-icons/cg";
import { RiImageEditFill } from "react-icons/ri";
import ProfileService from "../services/api/profile.service";
import toast from "react-hot-toast";
import { AiOutlineBarChart } from "react-icons/ai";

const SidebarAdmin: React.FC = () => {

    const router = useRouter()
    const pathname = usePathname()
    const totalFeatures = featureList?.length;
    const [isLoading, setLoading] = useState(true);
    const [permissionList, setPermissionList] = useState<any[]>([])

    const sideList = [
        {
            type: 'Painel',
            icon: LuLayoutPanelLeft,
            child: null,
            path: '/admin',
            permission: false
        },
        {
            type: 'Sistema',
            icon: FaCog,
            child: null,
            path: '/admin/system',
            permission: 'A1'
        },
        /* {
            type: 'Changelog',
            icon: MdUpdate,
            child: null,
            path: '/admin/feature-log'
        }, */
        {
            type: 'Ferramentas',
            icon: null,
            child: [
                { name: 'Oferta Exclusiva', icon: MdLocalOffer, path: '/admin/exclusive-offer', permission: 'F1' },
                {name:"Flyer", icon:RiImageEditFill, path: '/admin/flyer', permission: 'F2'},
                {name:"Lead", icon:MdOutlineLeaderboard, path: '/admin/lead', permission: 'F3'},
                {name:"Cupom",icon:AiOutlineBarChart, path: '/admin/cupom', permission: 'F4'},
            ]
        },
        {
            type: 'Cadastros',
            icon: null,
            child: [
                { name: 'Banners', icon: PiFlagBannerFill, path: '/admin/banner', permission: 'C1' },
                { name: 'Canais de TV', icon: BsTv, path: '/admin/channel', permission: 'C2' },
                { name: 'Cidades', icon: FaCity, path: '/admin/city', permission: 'C3' },
                { name: 'Estados', icon: RiGovernmentFill, path: '/admin/state', permission: 'C4' },
                { name: "FAQ", icon: GrCircleInformation, path: '/admin/faq', permission: 'C5' },
                { name: 'Lojas', icon: BiSolidStore, path: '/admin/store', permission: 'C6' },
                { name: 'Permissões', icon: ImProfile, path: '/admin/profile', permission: 'C7' },
                { name: 'Regulamentos', icon: BsCardChecklist, path: '/admin/regulation', permission: 'C8' },
                { name: 'SVA´s', icon: CgFileDocument, path: '/admin/sva', permission: 'C9' },
                { name: 'Usuários', icon: ImUsers, path: '/admin/user', permission: 'C10' },
            ]
        }
    ]

    async function getPermissions() {

        const request = await ProfileService.byUser();

        if (request.status > 400) {
            toast.error(request.message)
            return
        }

        if (request.status === 200) {
            const response = request.data;
            setPermissionList(response);
            setLoading(false);
        }
    }

    function checkPermission(permission: string) {
        let found: boolean = false;

        permissionList.map((p: any) => {
            if(String(p) === permission){
                found = true
            }
        });

        return found
    }

    React.useEffect(() => {
        getPermissions();
    }, []);

    return (
        <>
            <div className="w-[200px] bg-gray-800 h-full pt-2">
                {isLoading ? (
                    <></>
                ) : (
                    <>
                        {sideList?.map((item, index) => {
                            return <div key={index} className=" ">
                                <div>
                                    <div className=" text-white font-light">
                                        {item.icon ? <div>
                                            <button type="button" onClick={() => { router.push(item.path) }} className={pathname === item.path ? 'w-full h-[35px] text-black bg-sub flex justify-start items-center pl-4' : 'w-full h-[35px] text-white hover:bg-gray-500 hover:text-white flex justify-start items-center pl-4'}>
                                                <item.icon className="mr-2" />
                                                <span className="text-sm font-medium">{item.type}</span>
                                            </button>
                                        </div> : <p className="text-sm pt-3 pb-2 px-2">{item.type}</p>}
                                    </div>
                                </div>

                                <div>
                                    {item.child?.map((child, index2) => {
                                        return <div key={index2}>
                                            {checkPermission(child.permission) ? (
                                                <>
                                                    <button type="button" onClick={() => router.push(child.path)} className={pathname.includes(child.path) ? 'w-full h-[35px] text-black bg-sub flex justify-start items-center pl-4' : 'w-full h-[35px] text-white hover:bg-gray-500 hover:text-white flex justify-start items-center pl-4'}>
                                                        < child.icon className="mr-2" />
                                                        <span className="text-sm font-medium">{child.name}</span>
                                                    </button>
                                                </>
                                            ) : null}
                                        </div>
                                    })}
                                </div>
                            </div>
                        })}
                    </>
                )}

                <div className="text-white bg-gray-800 fixed bottom-0 w-[200px] text-center">
                    <span className="text-sm font-medium">Versão {totalFeatures}</span>
                </div>
            </div>
        </>
    )
}

export default SidebarAdmin;