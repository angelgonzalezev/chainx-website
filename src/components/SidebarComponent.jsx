import { Center, Icon, Stack, Text } from "@chakra-ui/react";
import LogoComponent from "./LogoComponent";
import { colors } from "../constants/colors";
import MenuSectionsComponent from "./MenuSectionsComponent";
import { LogOut } from "lucide-react";

const SidebarComponent = ({ handleSignOut, ...props }) => {
	return (
		<Stack w="255px" flexDirection="column" alignItems="center" {...props}>
			<Center px="24px" py="3" w="100%" h="63px" borderBottomWidth="1px" borderColor={colors.BORDERGRAY}>
				<LogoComponent />
			</Center>
			<Stack w="100%" p="16px" justifyContent="space-between">
				<MenuSectionsComponent />
			</Stack>
			<Stack flexDirection="row" borderRadius="md" onClick={handleSignOut} cursor="pointer" p="16px" alignItems="start">
				<Center>
					<Icon as={LogOut} w="20px" h="20px" />
				</Center>
				<Text fontSize="sm" fontWeight="semibold" color={colors.MAINDARK} textDecoration="underline">
					Sign out
				</Text>
			</Stack>
		</Stack>
	);
};
export default SidebarComponent;
