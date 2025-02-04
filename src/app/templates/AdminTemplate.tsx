'use client'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { getToken } from '../services/auth-service';
import LoadingAlares from '../components/loadings/LoadingAlares';

interface templateProps {
    children: React.ReactNode
}


export default function AdminTemplate({ children }: templateProps) {

    const access_token: any = getToken();
    const router = useRouter();
    const [ready, setReady] = useState(false)
    
    function checkAuthentication() {
        if(access_token) {
            setReady(true)
        } else {
            router.replace('/auth')
        }
    }

    React.useEffect(() => {
        document.title = 'Painel Alares Site';
        checkAuthentication();
    }, [access_token])

    return (
        <div className='w-full h-full'>
            { ready ? (
                <>
                    {children}
                </>
            ) : (
                <div className='flex w-screen h-screen justify-center items-center'>
                    <LoadingAlares/>
                </div>
            )}
            
        </div>
    )
}
