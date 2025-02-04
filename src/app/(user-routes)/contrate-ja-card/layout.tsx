import Footer from '@/app/components/Footer'
import ContractTeamplate from '@/app/templates/ContractTemplate'
import MainTemplate from '@/app/templates/MainTemplate'
import React, { ReactNode } from 'react'

interface layoutProps {
    children: ReactNode
}

export default function ContractLayout({ children }: layoutProps) {

    return (
        <MainTemplate>
            { children }
            <Footer/>
        </MainTemplate>
    )
}
