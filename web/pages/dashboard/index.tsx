import { Box, Toolbar } from '@mui/material'
import type { NextPage } from 'next'
import Header from '../../features/dashboard/header'
import DataTable from '../../features/dashboard/user-table'

const Dashboard: NextPage & { auth?: boolean } = () => {
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
