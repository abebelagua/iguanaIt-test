import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Dashboard: NextPage & { auth?: boolean } = () => {
	return <></>
}

Dashboard.auth = true
export default Dashboard
