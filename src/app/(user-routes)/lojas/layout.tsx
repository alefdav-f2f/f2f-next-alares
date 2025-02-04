import MainTemplate from '@/app/templates/MainTemplate'
import React, { ReactNode } from 'react'

interface layoutProps {
    children: ReactNode
}

export default function LojasLayout({ children }: layoutProps) {
    return (
        <MainTemplate>
            {children}
        </MainTemplate>
    )
}
