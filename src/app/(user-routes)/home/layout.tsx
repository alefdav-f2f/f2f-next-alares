
import MainTemplate from "@/app/templates/MainTemplate"
import { getCookie } from "cookies-next";
import { Metadata } from "next";

interface props {
    children: React.ReactNode
}

const description = "Planos de internet com Wi-Fi e instalação gratuita, residencial e comercial. Conheça a internet da Alares e descubra as ofertas para sua região."
export const metadata: Metadata = {
    title: {
        absolute: `Alares | Internet que te leva mais longe`
    },
    description: description,
    openGraph: {
        description: description,
        type: "website",
        locale: "pt_BR",
        url: process.env.NEXT_WEB_URL,
        siteName: "Alares Internet"
    }
}

export default function HomeLayout({ children }: props) {

    return (
        <>
            <MainTemplate>
                {children}
            </MainTemplate>
        </>
    )

}
