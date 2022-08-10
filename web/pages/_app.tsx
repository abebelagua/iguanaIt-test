import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextComponentType } from 'next'
import { SessionProvider } from 'next-auth/react'

import { CacheProvider, EmotionCache } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import darkTheme from '../styles/theme/darkTheme'
import createEmotionCache from '../utils/createEmotionCache'

import Auth from '../features/auth/components/auth'

import { wrapper } from '../state/store'

const clientSideEmotionCache = createEmotionCache()

type CustomAppProps = AppProps & {
	Component: NextComponentType & { auth?: boolean }
	emotionCache: EmotionCache
}

function MyApp({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps: { session, ...pageProps },
}: CustomAppProps) {
	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={darkTheme}>
				<SessionProvider session={session}>
					{Component.auth ? (
						<Auth>
							<Component {...pageProps} />
						</Auth>
					) : (
						<Component {...pageProps} />
					)}
				</SessionProvider>
			</ThemeProvider>
		</CacheProvider>
	)
}

export default wrapper.withRedux(MyApp)
