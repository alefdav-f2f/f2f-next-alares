import React from 'react'
import SvaForm from '../new/page'

export default function BannerDetail({ params }: any) {
  return (
    <SvaForm bannerId={params.bannerId} />
  )
}
