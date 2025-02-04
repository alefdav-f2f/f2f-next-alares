import Footer from '@/app/components/Footer'
import MainTemplate from '@/app/templates/MainTemplate'
import { Metadata } from 'next'
import React, { ReactNode } from 'react'


interface layoutProps {
    children: ReactNode
}

const description = "Uma das pioneiras a oferecer Wi-Fi 6, a ultra banda larga da Alares Internet está presente em mais de 500.000 lares e empresas em todo o país."
export const metadata: Metadata = {
    title: {
        absolute: `Conheça a Alares | Alares Internet`
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

export default function SobreAAlaresLayout({ children }: layoutProps) {

    return (
        <>
            <MainTemplate>
                {children}
                <Footer />
            </MainTemplate>
        </>
    )
}
