
import MainTemplate from "@/app/templates/MainTemplate"
import { Metadata } from "next"

interface props {
    children: React.ReactNode
}

const description = "Alares na imprensa | Alares Internet"
export const metadata: Metadata = {
    title: {
        absolute: `Alares na imprensa | Alares Internet`

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
