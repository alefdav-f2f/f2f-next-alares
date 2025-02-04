'use client'

import React from "react";
import LoadingAlares from "./LoadingAlares";


const LoadingGlobal: React.FC = () => {

    const [isLoading, setLoading] = React.useState(false)


    return (
        <>
            {isLoading ? (
                <div className="w-screen h-screen bg-blue-300 fixed z-50 bg-opacity-10 flex justify-center items-center">
                    <LoadingAlares />
                </div>
            ) : null}
        </>
    )


}

export default LoadingGlobal;