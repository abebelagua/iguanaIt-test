import { NextPage } from 'next'
import { Link } from 'react-router-dom'
import Image from 'next/image'

import styled from '@mui/material/styles/styled'

const LogoWrapper = styled(Link)(
	({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
`
)

interface LogoProps {
	centered?: boolean
	width?: number
}

const Logo: NextPage<LogoProps> = ({ centered, width }) => {
	// const { themeName } = useContext(ThemeContext);
	const themeName = 'Dark'

	return (
		<LogoWrapper to="/">
			<Image
				src="logo-iguana-white.svg"
				alt="Logo"
				width={500}
				height={200}
			/>
		</LogoWrapper>
	)
}

export default Logo
