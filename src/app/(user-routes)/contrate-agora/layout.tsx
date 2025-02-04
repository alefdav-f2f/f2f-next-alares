"use client"
import React, { ReactNode } from 'react'
import MainTemplate from '../../templates/MainTemplate'
import Footer from '@/app/components/Footer'

interface layoutProps {
    children: ReactNode
}

export default function ContrateJaLayout({ children }: layoutProps) {
    return (
        <MainTemplate>
            { children }
            <Footer/>
        </MainTemplate>
    )
}
