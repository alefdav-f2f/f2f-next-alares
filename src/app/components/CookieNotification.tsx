'use client'
import { getCookie, setCookie } from 'cookies-next'
import React, { useState } from 'react'



export default function CookieNotification() {
    const [showCookieNot, setShowCookieNot] = useState(false)

    function setClientCookie(value: boolean) {
        
        setCookie('moove_gdpr_popup	', value)
        setShowCookieNot(false)
    }

    React.useEffect(() => {
        const cookie = getCookie('moove_gdpr_popup');
        
        if(cookie) {
            setShowCookieNot(false)
        } else {
            setShowCookieNot(true)
        }
    }, [])

    return (
        <div className='w-full h-full'>
            {showCookieNot ? (
                <div className='sm:h-[70px] bg-white sm:flex items-center justify-between w-screen p-4 border-[1px] border-t-black'>
                    <div className='sm:text-center sm:p-4 mb-3'>
                        <span className='text-sm sm:text-base'>Este site usa cookies para garantir que você obtenha a melhor experiência em nosso site.</span>
                    </div>
                    <div className='flex sm:justify-center'>
                        <button onClick={() => setClientCookie(true)} className='bg-main rounded-full px-4 py-2 text-white hover:bg-hover sm:mr-4 mr-2'>
                            Aceitar
                        </button>

                        <button onClick={() => setClientCookie(false)} className='bg-white rounded-full px-4 py-2 text-gray-500 hover:bg-gray-100 border border-gray-400'>
                            Recusar
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
