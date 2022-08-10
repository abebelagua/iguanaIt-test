import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
	],
	callbacks: {
		jwt: (token, user, account, profile, isNewUser) => {
			if (isNewUser) {
				//Todo: add user to database
			}
		},
		session: async ({ session, token, user }) => {
			session = {
				...session,
				user: {
					id: token.sub,
					...session.user,
				},
			}
			return session
		},
	},
})
