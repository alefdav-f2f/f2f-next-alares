import MainTemplate from '@/app/templates/MainTemplate'
import React from 'react'

interface props {
    children: React.ReactNode
}

export default function SearchLayout({ children }: props) {

    return (
        <>
            <MainTemplate>
                {children}
            </MainTemplate>
        </>
    )
}
