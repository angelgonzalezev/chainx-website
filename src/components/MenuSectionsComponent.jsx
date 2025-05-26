import { Center, Icon, Stack, Text } from "@chakra-ui/react";
import { SidebarMenu } from "../routes/routes";
import { checkPath } from "../utilities/utils";
import { useLocation, useNavigate } from "react-router";
import { colors } from "../constants/colors";

const MenuSectionsComponent = ({ toggleMenu }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const currentPath = location.pathname;

	const handleOnClick = (to) => {
		navigate(to);
		toggleMenu();
	};

	return (
		<>
			{SidebarMenu.map((menu, idx) => (
				<Stack
					key={idx}
					flexDirection="row"
					alignItems="center"
					px="16px"
					py="12px"
					bgColor={checkPath(menu.to, currentPath) ? colors.LIGHTGREEN : null}
					borderRadius="md"
					onClick={() => handleOnClick(menu.to)}
					cursor="pointer"
					_hover={!checkPath(menu.to, currentPath) ? { bgColor: colors.LIGHTBG } : null}
				>
					<Center color={checkPath(menu.to, currentPath) ? colors.MAINGREEN : colors.MAINDARK}>
						<Icon as={menu.icon} w="20px" h="20px" />
					</Center>
					<Text
						fontSize="sm"
						fontWeight="semibold"
						color={checkPath(menu.to, currentPath) ? colors.MAINGREEN : colors.MAINDARK}
					>
						{menu.title}
					</Text>
				</Stack>
			))}
		</>
	);
};
export default MenuSectionsComponent;
