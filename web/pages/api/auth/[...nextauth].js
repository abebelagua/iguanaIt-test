import axios from 'axios'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
	],
	// pages: {
	// 	signIn: '/login',
	// 	error: '/login',
	// },
	callbacks: {
		// async signIn(user, account, profile) { return true },
		// async redirect(url, baseUrl) { return baseUrl },
		session: (session, user) => {
			console.log(session)
			// session.user = user.user
			return session
		},
		jwt: (token, user) => {
			user && (token.user = user)
			return token
		},
	},
	debug: true,
})
