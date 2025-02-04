'use client';
import Dropdown from "./Dropdown";
import React, { useState } from "react";
import ButtonRedirect from "./ButtonRedirect";
import Logo from "./Logo/Logo";
import { getUserName } from "../services/auth-service";

const NavigationAdmin: React.FC = () => {

    const [userName, setUserName] = useState('');

    async function checkUserName() {
        const user_name: any = getUserName();
        setUserName(user_name)
    }

    React.useEffect(() => {
        checkUserName();
    }, [])

    return (
        <>
            <nav>
                <div className="flex p-1 justify-between items-center h-[70px] bg-gray-800 w-[100%] border-gray-300 border-b-[5px]">

                    {/* Camada superior de navegação */}
                    <div className="flex items-center w-full">
                        <div className="w-[200px] flex items-center justify-center pb-2">
                            <div>
                                <div className="mb-[-17px]">
                                    <span className="text-white font-semibold text-lg ">Painel</span>
                                </div>
                                <Logo className="w-32" color="white" />
                            </div>
                        </div>
                    </div>

                    <div className="mr-2">
                        <ButtonRedirect />
                    </div>

                    <div className="mr-2">
                        <Dropdown userName={userName}/>
                    </div>
                </div>

            </nav>
        </>
    )
}

export default NavigationAdmin;