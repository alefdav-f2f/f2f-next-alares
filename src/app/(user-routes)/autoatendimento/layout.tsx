import React, { ReactNode } from 'react'
import MainTemplate from '../../templates/MainTemplate'
import Footer from '@/app/components/Footer'
import { Metadata } from 'next'

interface layoutProps {
    children: ReactNode
}

const description = "Acesso fácil para emissão de 2º via, Central do Assinante, aplicativo da Alares Internet e canais de contato. Resolva o que precisa em poucos cliques."
export const metadata: Metadata = {
    title: {
        absolute: `Canais de autoatedimento | Alares Internet`
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

export default function AutoLayout({ children }: layoutProps) {
    return (
        <MainTemplate>
            { children }
            <Footer/>
        </MainTemplate>
    )
}
