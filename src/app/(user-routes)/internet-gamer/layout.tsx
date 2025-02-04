import { Metadata } from 'next'
import React from 'react'

interface props {
    children: React.ReactNode
}

export const metadata: Metadata = {
    title: {
        absolute: `Internet Gamer - Alares Internet`
    },
    description: '',
    openGraph: {
        description: '',
        type: "website",
        locale: "pt_BR",
        url: process.env.NEXT_WEB_URL,
        siteName: "Alares Internet"
    }
}

export default function layout({ children }: props) {
    return (
        <>{ children }</>
    )
}
