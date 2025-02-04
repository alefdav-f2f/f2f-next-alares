import AdminLogin from '@/app/pages/AdminLogin'
import AuthTemplate from '@/app/templates/AuthTemplate'
import React from 'react'

export default function Auth() {
    return (
        <AuthTemplate>
            <AdminLogin />
        </AuthTemplate >
    )
}
