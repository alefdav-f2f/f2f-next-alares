'use client'
import { externalURL } from '@/app/api/externalURL'
import React from 'react'

export default function Empresas() {
    return (
        <div className='w-full h-screen'>
            <embed src={externalURL.alares_business} type="" width={'100%'} height={'100%'} />
        </div>
    )
}
