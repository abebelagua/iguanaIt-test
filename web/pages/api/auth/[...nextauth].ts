import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		}),
	],
	callbacks: {
		jwt: ({ token, user, account, profile, isNewUser }) => {
			if (isNewUser) {
				//Todo: add user to database
			}
			return token
		},
		session: async ({ session, token, user }) => {
			session = {
				...session,
				user: {
					...session.user,
					id: token.sub,
				},
			}
			return session
		},
	},
})
