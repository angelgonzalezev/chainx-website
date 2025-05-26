import { Stack } from "@chakra-ui/react";
import LogoComponent from "../../../components/LogoComponent";
import LadingDesktopHeader from "../../../components/LadingDesktopHeader";
import HamburgerMenu from "../../../components/HamburgerMenu";

const NavbarSection = ({ handleStartTrial }) => {
	return (
		<Stack
			position="fixed"
			top="0"
			width="100%"
			bg="whiteAlpha.800"
			backdropFilter="blur(10px)"
			zIndex="50"
			borderBottom="1px"
			borderColor="gray.100"
			w="100%"
			alignItems="center"
		>
			<Stack w="100%" maxW="1200px" alignItems="center" flexDir="row" justifyContent="space-between" px={10} py={3}>
				<LogoComponent />
				<LadingDesktopHeader handleStartTrial={handleStartTrial} />
				<HamburgerMenu handleStartTrial={handleStartTrial} />
			</Stack>
		</Stack>
	);
};
export default NavbarSection;
