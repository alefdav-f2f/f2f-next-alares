"use client"
import React, { useState } from 'react'
import SVASlug from './SVASlug'

export default function SVADetail({ params }: any) {

    return (
        <SVASlug sva_slug={params.slug}/>
    )
}
