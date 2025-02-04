import React from 'react'
import CityForm from '../new/page'

export default function CityDetail({ params }: any) {
  return (
    <CityForm cityId={params.cityId} />
  )
}
