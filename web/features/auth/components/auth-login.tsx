import { NextPage } from 'next'
import { useState } from 'react'

import Alert from '@mui/material/Alert'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import { useAppDispatch } from '../../../state/store'
import {
	FacebookLoginButton,
	GithubLoginButton,
	GoogleLoginButton,
	TwitterLoginButton,
} from 'react-social-login-buttons'
import { signIn } from 'next-auth/react'

// import useRefMounted from 'src/hooks/useRefMounted'

const SocialLogin: NextPage = () => {
	const dispatch = useAppDispatch()
	// const isMountedRef = useRefMounted()

	const [error, setError] = useState<string | null>(null)

	const handleLogin = async (connection: string): Promise<void> => {
		const authenticated = await signIn(connection, {
			callbackUrl: 'http://localhost:3000/dashboard',
		})
		if (!authenticated?.ok && authenticated?.error) {
			console.error(authenticated.error)
			setError(authenticated.error)
		}
	}

	return (
		<>
			{error && <Alert severity="error">{error}</Alert>}
			<List>
				<ListItem key="github">
					<GithubLoginButton onClick={() => handleLogin('github')} />
				</ListItem>
				<ListItem key="facebook">
					<FacebookLoginButton
						onClick={() => handleLogin('facebook')}
					/>
				</ListItem>
				<ListItem key="google">
					<GoogleLoginButton onClick={() => handleLogin('google')} />
				</ListItem>
				<ListItem key="twitter">
					<TwitterLoginButton
						onClick={() => handleLogin('twitter')}
					/>
				</ListItem>
			</List>
		</>
	)
}

export default SocialLogin
