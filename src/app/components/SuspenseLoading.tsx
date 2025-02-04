import React from 'react'
import LoadingAlares from './loadings/LoadingAlares'

export default function SuspenseLoading() {
  return (
    <div className='bg-main h-screen flex justify-center items-center'>
        <LoadingAlares textClass="text-white"/>
    </div>
  )
}
