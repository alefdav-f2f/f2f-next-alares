import React from 'react'
import UserForm from '../new/page'

export default function UserDetail({ params }: any) {
  return (
    <UserForm userId={params.userId} />
  )
}
