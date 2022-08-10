import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home: NextPage & { auth?: boolean } = () => {
	const router = useRouter()

	useEffect(() => {
		router.push('/dashboard')
	}, [router])

	return <></>
}

export default Home
