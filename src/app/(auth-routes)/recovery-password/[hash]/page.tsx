'use client'
import NewAccountPage from '@/app/pages/NewAccountPage';
import RecoveryPasswordPage from '@/app/pages/RecoveryPasswordPage';
import AuthTemplate from '@/app/templates/AuthTemplate';
import React from 'react'

export default function NewAccount({ params }: any) {

    const hash = params.hash;

    return (
        <AuthTemplate>
            <RecoveryPasswordPage hash={hash} />
        </AuthTemplate>
    )
}
