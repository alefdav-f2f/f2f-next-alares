import React from 'react'
import CategoryForm from '../new/page'
import RegulationForm from '../new/page'

export default function RegulationDetail({ params }: any) {
  return (
    <RegulationForm regulation_id={params.regulation_id} />
  )
}
