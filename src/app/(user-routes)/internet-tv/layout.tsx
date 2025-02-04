import MainTemplate from '@/app/templates/MainTemplate'
import React, { ReactNode } from 'react'

interface layoutProps {
  children: ReactNode
}

export default function InternetTVLayout({ children }: layoutProps) {
  return (
    <MainTemplate>
      {children}
    </MainTemplate>
  )
}
