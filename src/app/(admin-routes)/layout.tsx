import { getServerSession } from "next-auth";
import LoadingGlobal from "../components/loadings/LoadingGlobal";
import NavigationAdmin from "../components/NavigationAdmin";
import SidebarAdmin from "../components/SidebarAdmin";
import React, { ReactNode } from "react";
import AdminTemplate from "../templates/AdminTemplate";

interface PrivateLayoutProps {
    children: ReactNode
}


export default async function PrivateLayout({ children }: PrivateLayoutProps) {

    return (
        <AdminTemplate>
            <div>
                <div className="fixed top-0 w-full z-50">
                    <NavigationAdmin />
                    <div className="fixed top-15 h-full">
                        <SidebarAdmin />
                    </div>
                </div>

                <div className="h-screen mt-[70px] ml-[200px] flex">
                    <div className="p-1 w-full">
                        {children}
                    </div>
                </div>
            </div>
        </AdminTemplate>
    )

}