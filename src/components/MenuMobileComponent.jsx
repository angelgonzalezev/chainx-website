import { Stack } from "@chakra-ui/react";
import TopbarComponent from "./TopbarComponent";
import { colors } from "../constants/colors";
import HamburgerMenuDashboard from "./HamburgerMenuDashboard";

const MenuMobileComponent = () => {
	return (
		<Stack
			flexDirection="row"
			alignItems="center"
			justifyContent="space-between"
			pl="24px"
			borderBottomWidth="1px"
			borderColor={colors.BORDERGRAY}
		>
			<HamburgerMenuDashboard />
			<TopbarComponent />
		</Stack>
	);
};
export default MenuMobileComponent;
