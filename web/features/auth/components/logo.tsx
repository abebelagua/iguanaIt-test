import { NextPage } from 'next'
import { Link } from 'react-router-dom'
import Image from 'next/image'

interface LogoProps {
	centered?: boolean
	width?: number
}

const Logo: NextPage<LogoProps> = ({ centered, width }) => {
	// const { themeName } = useContext(ThemeContext);
	const themeName = 'Dark'

	return (
		<Image
			src="/logo-iguana-white.svg"
			alt="Logo"
			width={500}
			height={200}
		/>
	)
}

export default Logo
