import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { NextAuthOptions } from "next-auth"
import axiosInterceptorInstance from '../../axiosInterceptor';

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },

            async authorize(credentials, req) {

                try {
                    const response: any = await axiosInterceptorInstance.post('/users/auth2', {
                        email: credentials?.email,
                        password: credentials?.password
                    })

                    const user = await response.data;

                    if (user && response) {
                        return user
                    }

                } catch (error: any) {
                    // Handle the error here
                }

                return null
            },
        })
    ],

    pages: {
        signIn: '/auth'
    },
    
    callbacks: {
        async jwt({ token, user }) {
			user && (token.user = user)
			return token
		},
		async session({ session, token }){
			session = token.user as any
			return session
		}
    }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }