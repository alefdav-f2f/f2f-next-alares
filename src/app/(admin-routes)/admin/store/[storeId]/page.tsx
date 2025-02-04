import React from 'react'
import StoreForm from '../new/page'

export default function CityDetail({ params }: any) {
  return (
    <StoreForm storeId={params.storeId} />
  )
}
