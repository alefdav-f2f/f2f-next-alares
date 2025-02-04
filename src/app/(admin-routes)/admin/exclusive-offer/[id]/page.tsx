import React from 'react'
import ExclusiveOfferForm from '../new/page'

export default function ExclusiveOfferDetail({ params }: any) {
    return (
        <ExclusiveOfferForm id={params.id} />
    )
}
