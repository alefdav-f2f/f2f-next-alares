'user client'
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { ReactNode, Suspense } from "react";
import { redirect } from "next/navigation";

interface PrivateLayoutProps {
    children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {

    const session = await getServerSession(nextAuthOptions)

    if (session) {
        redirect('/admin')
    }

    return (
        <Suspense>
            {children}
        </Suspense>
    )

}