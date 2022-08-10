import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

import { authSlice } from '../features/auth/auth.slice'

export const store = configureStore({
	reducer: {
		[authSlice.name]: authSlice.reducer,
	},
	devTools: process.env.REACT_APP_ENABLE_REDUX_DEV_TOOLS === 'true',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore these action types
				ignoredActions: [],
				// Ignore these field paths in all actions
				ignoredActionPaths: ['workflows'],
				// Ignore these paths in the state
				ignoredPaths: ['workflows'],
			},
		}),
})

export type AppStore = typeof store

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => store.dispatch

export interface AppThunkConfig {
	state: AppState
	dispatch: AppDispatch
}

export const wrapper = createWrapper<AppStore>(() => store)
