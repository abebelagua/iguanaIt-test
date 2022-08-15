import * as React from 'react'
import {
	DataGrid,
	GridActionsCellItem,
	GridColDef,
	GridRowParams,
	GridToolbar,
	GridValueGetterParams,
} from '@mui/x-data-grid'
import { Send, Tag } from '@mui/icons-material'
import { NextPage } from 'next'
import { IUser } from '../../auth/interfaces'
import axios from 'axios'
import {
	Alert,
	AlertColor,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Modal,
	Snackbar,
	SnackbarOrigin,
	TextField,
} from '@mui/material'
import OneSignalReact from 'react-onesignal'
import { json } from 'stream/consumers'

export interface DataTableProps {
	initialized: Boolean
}

const columns: GridColDef[] = [
	{
		field: '_id',
		headerName: 'ID',
		width: 150,
		sortable: false,
		disableColumnMenu: true,
	},
	{
		field: 'oneSignalId',
		headerName: 'One Signal Id',
		width: 150,
		sortable: false,
		disableColumnMenu: true,
	},
	{
		field: 'externalUserId',
		headerName: 'External User Id',
		width: 130,
		sortable: false,
		disableColumnMenu: true,
	},
	{
		field: 'name',
		headerName: 'Name',
		width: 150,
		sortable: false,
		disableColumnMenu: true,
	},
	{
		field: 'email',
		headerName: 'email',
		width: 150,
		sortable: false,
		disableColumnMenu: true,
	},
]

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
}

const DataTable: NextPage<DataTableProps> = (props) => {
	const [users, setUsers] = React.useState([])
	const [openSendDialog, setOpenSendDialog] = React.useState(false)
	const [openSendToAllDialog, setOpenSendToAllDialog] = React.useState(false)
	const [openSendWithTagDialog, setOpenSendWithTagDialog] =
		React.useState(false)
	const [openTagDialog, setOpenTagDialog] = React.useState(false)
	const [selectedRow, setSelectedRow] = React.useState<IUser>({
		_id: '',
		oneSignalId: '',
		externalUserId: '',
		name: '',
		email: '',
		image: '',
		createdAt: new Date(),
		updatedAt: new Date(),
	})
	const [message, setMessage] = React.useState('')
	const [tag, setTag] = React.useState({
		key: '',
		value: '',
	})
	const [snackbarConfig, setSnackbarConfig] = React.useState({
		open: false,
		message: '',
		severity: 'success',
	})
	const { initialized } = props

	const fetchUsers = async () => {
		const result = await axios.post('http://localhost:4000/user/all')
		setUsers(result.data.items)
	}

	React.useEffect(() => {
		if (initialized) {
			fetchUsers()
		}
	}, [initialized])

	const handleOpenSendDialog = () => setOpenSendDialog(true)

	const handleCloseSendDialog = () => setOpenSendDialog(false)

	const handleOpenSendToAllDialog = () => setOpenSendToAllDialog(true)

	const handleCloseSendToAllDialog = () => setOpenSendToAllDialog(false)

	const handleOpenSendWithTagDialog = () => setOpenSendWithTagDialog(true)

	const handleCloseSendWithTagDialog = () => setOpenSendWithTagDialog(false)

	const handleOpenTagDialog = () => setOpenTagDialog(true)

	const handleCloseTagDialog = () => setOpenTagDialog(false)

	const handleSendPushNotificationUsingExternalUserId = async (
		externalUserId: String,
		message: String
	) => {
		const result = await axios.post(
			`http://localhost:7000/notification/sendToOne/${externalUserId}/${message}`
		)
		if (result.data) {
			setSnackbarConfig({
				message: 'The message was send successfully',
				open: true,
				severity: 'success',
			})
		} else {
			setSnackbarConfig({
				message: 'Error',
				open: true,
				severity: 'error',
			})
		}
	}

	const handleSendPushNotificationUsingTag = async (
		key: String,
		value: String,
		message: String
	) => {
		const result = await axios.post(
			`http://localhost:7000/notification/sendWithTag/${key}/${value}/${message}`
		)
		if (result.data) {
			setSnackbarConfig({
				message: 'The message was send successfully',
				open: true,
				severity: 'success',
			})
		} else {
			setSnackbarConfig({
				message: 'Error',
				open: true,
				severity: 'error',
			})
		}
	}

	const handleSendPushNotificationToAll = async (message: String) => {
		const result = await axios.post(
			`http://localhost:7000/notification/sendToAll/${message}`
		)
		if (result.data) {
			setSnackbarConfig({
				message: 'The message was send successfully',
				open: true,
				severity: 'success',
			})
		} else {
			setSnackbarConfig({
				message: 'Error',
				open: true,
				severity: 'error',
			})
		}
	}

	const handleCloseSnackbar = () => {
		setSnackbarConfig({
			message: '',
			open: false,
			severity: 'success',
		})
	}

	return (
		<div style={{ height: 400, width: '100%' }}>
			<Box
				style={{
					marginBottom: '10px',
					display: 'flex',
					justifyContent: 'flex-end',
				}}
			>
				<Button onClick={() => handleOpenSendWithTagDialog()}>
					Send using Tag
				</Button>
				<Button onClick={() => handleOpenSendToAllDialog()}>
					Send to all
				</Button>
			</Box>
			<DataGrid
				getRowId={(data: IUser) => data._id}
				rows={users}
				columns={[
					...columns,
					{
						field: 'tags',
						headerName: 'Tags',
						width: 200,
						sortable: false,
						disableColumnMenu: true,
						renderCell: (params: GridValueGetterParams) => {
							return JSON.stringify(params.row.tags)
						},
					},
					{
						field: 'actions',
						headerName: 'Actions',
						type: 'actions',
						width: 180,
						getActions: (params: GridRowParams<IUser>) => [
							<GridActionsCellItem
								key={params.id}
								icon={<Send />}
								onClick={() => {
									setSelectedRow(params.row)
									handleOpenSendDialog()
								}}
								label="Send"
							/>,
							<GridActionsCellItem
								key={params.id}
								icon={<Tag />}
								onClick={() => {
									setSelectedRow(params.row)
									handleOpenTagDialog()
								}}
								label="Tag"
							/>,
						],
					},
				]}
				pageSize={5}
				rowsPerPageOptions={[5]}
				checkboxSelection
			/>
			<Dialog
				open={openSendToAllDialog}
				onClose={handleCloseSendToAllDialog}
			>
				<DialogTitle>Write the message</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="message"
						label="Message"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) => setMessage(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseSendToAllDialog}>Cancel</Button>
					<Button
						onClick={() => {
							if (message) {
								handleSendPushNotificationToAll(message)
							} else {
								setSnackbarConfig({
									message: 'The message is empty',
									open: true,
									severity: 'error',
								})
							}
							handleCloseSendToAllDialog()
						}}
					>
						Send
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={openSendWithTagDialog}
				onClose={handleCloseSendWithTagDialog}
			>
				<DialogTitle>
					Write the message and key-value of the tag
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="key"
						label="Key"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) =>
							setTag({
								...tag,
								key: e.target.value,
							})
						}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="value"
						label="Value"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) =>
							setTag({
								...tag,
								value: e.target.value,
							})
						}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="message"
						label="Message"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) => setMessage(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseSendWithTagDialog}>
						Cancel
					</Button>
					<Button
						onClick={() => {
							if (message && tag.key && tag.value) {
								handleSendPushNotificationUsingTag(
									tag.key,
									tag.value,
									message
								)
							} else {
								setSnackbarConfig({
									message: 'Data is incomplete',
									open: true,
									severity: 'error',
								})
							}
							handleCloseSendWithTagDialog()
						}}
					>
						Send
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={openSendDialog} onClose={handleCloseSendDialog}>
				<DialogTitle>Write the message</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="message"
						label="Message"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) => setMessage(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseSendDialog}>Cancel</Button>
					<Button
						onClick={() => {
							if (message) {
								handleSendPushNotificationUsingExternalUserId(
									selectedRow.externalUserId,
									message
								)
							} else {
								setSnackbarConfig({
									message: 'The message is empty',
									open: true,
									severity: 'error',
								})
							}
							handleCloseSendDialog()
						}}
					>
						Send
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={openTagDialog} onClose={handleCloseTagDialog}>
				<DialogTitle>Add tag to user</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="key"
						label="Key"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) =>
							setTag({
								...tag,
								key: e.target.value,
							})
						}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="value"
						label="Value"
						type="text"
						fullWidth
						variant="standard"
						onChange={(e) =>
							setTag({
								...tag,
								value: e.target.value,
							})
						}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseTagDialog}>Cancel</Button>
					<Button
						onClick={() => {
							OneSignalReact.sendTag(tag.key, tag.value)
								.then(async () => {
									await axios.post(
										`http://localhost:4000/user/${selectedRow._id}/${tag.key}/${tag.value}`
									)
									setSnackbarConfig({
										message: 'Tag was created',
										open: true,
										severity: 'success',
									})
								})
								.catch((error) => {
									console.log(error)
									setSnackbarConfig({
										message: 'Tag error',
										open: true,
										severity: 'error',
									})
								})
							handleCloseTagDialog()
						}}
					>
						Add
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={snackbarConfig.open}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				key={'top' + 'right'}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbarConfig.severity as AlertColor}
					sx={{ width: '100%' }}
				>
					{snackbarConfig.message}
				</Alert>
			</Snackbar>
		</div>
	)
}

DataTable.defaultProps = {
	initialized: false,
}
export default DataTable
