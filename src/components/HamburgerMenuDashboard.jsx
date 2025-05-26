import { useState } from "react";
import { Box, Center, Icon, Stack, Text } from "@chakra-ui/react";
import { LogOut, Menu, X } from "lucide-react";
import { colors } from "../constants/colors";
import MenuSectionsComponent from "./MenuSectionsComponent";
import supabase from "../supabase/supabaseClient";

const HamburgerMenuDashboard = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => setIsOpen(!isOpen);

	const handleSignOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (!error) {
			window.location.reload();
		}
	};

	return (
		<Box display={{ base: "block", md: "none" }}>
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
				left="0"
				color="black"
				zIndex="1000"
				p={4}
				rounded="xl"
				pt="20px"
				bg={colors.LIGHTBG}
				backdropFilter="blur(10px)"
				borderWidth="1px"
				borderColor="gray.100"
				w="100%"
			>
				<Stack gap={4} align="start" w="100%">
					<MenuSectionsComponent toggleMenu={toggleMenu} />
					<Stack
						flexDirection="row"
						alignItems="center"
						justifyContent="center"
						py="24px"
						borderRadius="md"
						onClick={handleSignOut}
						cursor="pointer"
					>
						<Center>
							<Icon as={LogOut} w="20px" h="20px" />
						</Center>
						<Text fontSize="sm" fontWeight="semibold" color={colors.MAINDARK} textDecoration="underline">
							Sign out
						</Text>
					</Stack>
				</Stack>
			</Box>
		</Box>
	);
};

export default HamburgerMenuDashboard;
