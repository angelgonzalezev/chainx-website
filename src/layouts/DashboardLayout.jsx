import { Stack } from "@chakra-ui/react";
import SidebarComponent from "../components/SidebarComponent";

import MenuMobileComponent from "../components/MenuMobileComponent";
import { colors } from "../constants/colors";
import supabase from "../supabase/supabaseClient";

const DashboardLayout = ({ children }) => {
	const handleSignOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (!error) {
			window.location.reload();
		}
	};

	return (
		<Stack w="100%" minW="100vw" minH="100vh" h="100%" flexDirection="row" gap={0}>
			<Stack display={{ base: "none", md: "flex" }} borderRightWidth="1px" borderColor={colors.BORDERGRAY}>
				<SidebarComponent handleSignOut={handleSignOut} />
			</Stack>

			<Stack flex={1} gap={0}>
				<MenuMobileComponent />
				<Stack w="100%" h="100%" bgColor={colors.LIGHTPINK} p="6">
					{children}
				</Stack>
			</Stack>
		</Stack>
	);
};
export default DashboardLayout;
