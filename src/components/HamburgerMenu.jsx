import { useState } from "react";
import { Box, Stack, Text, Button } from "@chakra-ui/react";
import { Menu, X } from "lucide-react";
import { colors } from "../constants/colors";
import { useNavigate } from "react-router";
import { PublicRoutes } from "../routes/routes";

const HamburgerMenu = ({ handleStartTrial }) => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => setIsOpen(!isOpen);

	return (
		<Box display={{ base: "block", sm: "none" }}>
			{/* Hamburger Button */}

			{isOpen ? (
				<X onClick={toggleMenu} color={colors.MAINDARK} />
			) : (
				<Menu onClick={toggleMenu} color={colors.MAINDARK} />
			)}
			<Box
				display={isOpen ? "block" : "none"}
				position="absolute"
				top="60px"
				right="10"
				color="black"
				zIndex="1000"
				p={4}
				rounded="xl"
				pt="20px"
				bg={colors.LIGHTBG}
				backdropFilter="blur(10px)"
				borderWidth="1px"
				borderColor="gray.100"
			>
				<Stack gap={4} align="end">
					<Text color={colors.MAINGREEN} cursor="pointer" onClick={() => navigate(PublicRoutes.Login)}>
						Login
					</Text>
					<Button
						p={4}
						bgColor={colors.MAINGREEN}
						rounded="lg"
						color="white"
						fontWeight="semibold"
						onClick={handleStartTrial}
					>
						Start Free Trial
					</Button>
				</Stack>
			</Box>
		</Box>
	);
};

export default HamburgerMenu;
