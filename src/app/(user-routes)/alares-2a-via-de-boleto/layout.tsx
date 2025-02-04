import React, { ReactNode } from 'react'
import MainTemplate from '../../templates/MainTemplate'
import Footer from '@/app/components/Footer'
import { Metadata } from 'next'

interface layoutProps {
    children: ReactNode
}

const description = "Consulte suas faturas em aberto e emita rapidamente a segunda via do boleto do seu plano de internet Alares."
export const metadata: Metadata = {
    title: {
        absolute: `Segunda via da fatura | Alares Internet`
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

export default function ViaLayout({ children }: layoutProps) {
    return (
        <MainTemplate>
            { children }
            <Footer/>
        </MainTemplate>
    )
}
