import { Box, Card, Container } from '@mui/material'
import styled from '@mui/material/styles/styled'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import SocialLogin from '../../features/auth/components/auth-login'
import Logo from '../../features/auth/components/logo'

const Content = styled(Box)(
	() => `
    display: flex;
    flex: 1;
    width: 100%;
`
)

const MainContent = styled(Box)(
	({ theme }) => `
    padding-left: 500px;
    width: 100%;
    display: flex;
    align-items: center;
    ${theme.breakpoints.down('md')} {
        padding-left: 0;
    }
`
)

const Login: NextPage = () => {
	return (
		<>
			<Content>
				<MainContent>
					<Container maxWidth="sm">
						{/* <Logo centered /> */}
						<Card
							sx={{
								p: 4,
								my: 4,
							}}
						>
							{/* <SocialLogin /> */}
						</Card>
					</Container>
				</MainContent>
			</Content>
		</>
	)
}

export default Login
