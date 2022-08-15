import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { HYDRATE } from 'next-redux-wrapper'

import type { AppState } from '../../state/store'

import { IUser } from './interfaces'

interface AuthState {
	isInitialized: boolean
	isAuthenticated: boolean
	user?: IUser
}

const initialState: AuthState = {
	isAuthenticated: false,
	isInitialized: false,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<IUser | undefined>) {
			state.isInitialized = true
			state.isAuthenticated = !!action.payload
			state.user = action.payload
		},
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload.auth,
			}
		},
	},
})

export const { setUser } = authSlice.actions

export const useAuth = () => useSelector((state: AppState) => state.auth)
