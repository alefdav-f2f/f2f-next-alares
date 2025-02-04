'use client'

import React from 'react'
import { motion, AnimatePresence } from "framer-motion";

interface props {
    children: React.ReactNode
}

export default function AuthTemplate({ children }: props) {

    React.useEffect(() => {
        document.title = 'Painel Alares Site';
    }, [])
    
    return (
        <div>
            <div className="background_admin bg-opacity-10 w-full h-[100vh] flex items-center justify-center">
                <div key="1" className="px-2">
                    {children}
                </div>
            </div>
        </div>
    )
}
