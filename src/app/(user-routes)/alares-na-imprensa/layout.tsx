
import MainTemplate from "@/app/templates/MainTemplate"
import { Metadata } from "next"

interface props {
    children: React.ReactNode
}

const description = "Contrate serviços adicionais e use seu plano de internet Alares com aplicativos de streaming, educação, segurança digital, saúde e bem-estar. Conheça!"
export const metadata: Metadata = {
    title: {
        absolute: `Serviços adicionais para sua internet | Alares Internet`
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

export default function ServicosAdicionaisLayout({ children }: props) {

    return (
        <MainTemplate>
            {children}
        </MainTemplate>
    )

}
