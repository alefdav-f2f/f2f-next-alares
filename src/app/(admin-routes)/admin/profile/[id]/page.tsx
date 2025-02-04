import React from 'react'
import ProfileForm from '../new/page'

export default function UserDetail({ params }: any) {
  return (
    <ProfileForm id={params.id} />
  )
}
