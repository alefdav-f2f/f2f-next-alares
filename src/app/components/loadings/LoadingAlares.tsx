import React from 'react'
import Icon from '@/img/alares-icon2.png';
import Image from 'next/image';
import Logo from '../Logo/Logo';

export default function LoadingAlares({ color }: any) {
  return (
    <div className='flex justify-center'>
      <div>
        <div className='flex justify-center mb-4'>
          <div className='w-[200px] animation_banner flex justify-center'>
            <Logo color={color ? color : 'purple'} />
          </div>
        </div>
        <div className='flex justify-center w-[180px]'>
          <div className="demo-container">
            <div className="progress-bar">
              <div className="progress-bar-value"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
