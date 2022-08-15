import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { NextPage } from 'next'
import { ReactNode, useEffect } from 'react'
import { Box, CircularProgress } from '@mui/material'

interface AuthProps {
	children?: ReactNode
}

const Auth: NextPage<AuthProps> = ({ children }) => {
	const { data: session, status } = useSession()
	const loading = status === 'loading'
	const hasUser = !!session?.user
	const router = useRouter()

	useEffect(() => {
		if (!loading && !hasUser) {
			router.push('/login')
		}
	}, [loading, hasUser])

	if (loading || !hasUser) {
		return (
			<div>
				<Box
					display="flex"
					alignItems="center"
					justifyContent="center"
					height="100%"
				>
					<CircularProgress
						sx={{
							width: '100px !important',
							height: '100px !important',
						}}
					/>
				</Box>
			</div>
		)
	}
	return children as React.ReactElement
}

export default Auth
