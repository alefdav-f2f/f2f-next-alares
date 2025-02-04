"use client"
import React, { ReactNode } from 'react'
import MainTemplate from '../../templates/MainTemplate'
import Footer from '@/app/components/Footer'

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
