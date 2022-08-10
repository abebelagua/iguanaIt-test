import { Box, Card, Container } from '@mui/material'
import styled from '@emotion/styled'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import SocialLogin from '../../features/auth/components/auth-login'
import Logo from '../../features/auth/components/logo'
import { useSession } from 'next-auth/react'

const Content = styled(Box)(
	() => `
    display: flex;
    flex: 1;
    width: 100%;
`
)

const MainContent = styled(Box)(
	({ theme }) => `
    width: 100%;
    display: flex;
    align-items: center;
`
)

const Login: NextPage = () => {
	const { data: session, status } = useSession()
	const authenticated = status === 'authenticated'
	const router = useRouter()

	useEffect(() => {
		console.log(session)
		if (authenticated) {
			router.push('/dashboard')
		}
	}, [authenticated])

	return (
		<>
			<Content>
				<MainContent>
					<Container maxWidth="sm">
						<Logo centered />
						<Card
							sx={{
								p: 4,
								my: 4,
							}}
						>
							<SocialLogin />
						</Card>
					</Container>
				</MainContent>
			</Content>
		</>
	)
}

export default Login
