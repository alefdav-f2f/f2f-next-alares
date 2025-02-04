import React from 'react'
import SvaForm from '../new/page'

export default function SvaDetail({ params }: any) {
  return (
    <SvaForm svaId={params.svaId} />
  )
}
