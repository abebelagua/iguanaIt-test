import { Box, CircularProgress, Toolbar } from '@mui/material'
import axios from 'axios'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import OneSignalReact from 'react-onesignal'
import Header from '../../features/dashboard/components/header'
import DataTable from '../../features/dashboard/components/user-table'
import crypto from 'crypto'

//Todo move to backend
const generateAuthHash = (data: string) => {
	const hmac = crypto.createHmac(
		'sha256',
		'M2Q2YjhiZmItMTVmMy00NjVlLWE2OGMtMzk2M2M0NzVmMTA1'
	)
	hmac.update(data)
	return hmac.digest('hex')
}

const Dashboard: NextPage & { auth?: boolean } = () => {
	const { data: session, status } = useSession()
	const [initialized, setInitialized] = useState(false)

	useEffect(() => {
		OneSignalReact.init({
			appId: 'a4381c6a-4ecd-490c-8926-6ec7c9997651',
		}).then(() => {
			setInitialized(true)
			OneSignalReact.showSlidedownPrompt()
			OneSignalReact.isPushNotificationsEnabled(async (isEnabled) => {
				if (isEnabled) {
					console.log('Push notifications are enabled')
					await OneSignalReact.setExternalUserId(
						session?.user?.id,
						generateAuthHash(session?.user?.id as string)
					)
					await OneSignalReact.setEmail(session?.user?.email || '', {
						emailAuthHash: generateAuthHash(
							session?.user?.email || ''
						),
					})
					await axios.post('http://localhost:4000/user', {
						oneSignalId: await OneSignalReact.getUserId(),
						externalUserId: session?.user?.id,
						name: session?.user?.name,
						email: session?.user?.email,
						image: session?.user?.image,
					})
				} else {
					console.log('Push notifications are not enabled yet.')
				}
			})
		})
	}, [])

	if (!initialized) {
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

	return (
		<Box sx={{ display: 'flex' }}>
			<Header></Header>
			<Box
				component="main"
				sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
			>
				<Toolbar />
				<DataTable></DataTable>
			</Box>
		</Box>
	)
}

Dashboard.auth = true
export default Dashboard
