import { HStack, Stack, Text } from "@chakra-ui/react";
import { colors } from "../constants/colors";
import LogoComponent from "../components/LogoComponent";
import { useNavigate } from "react-router";
import { PublicRoutes } from "../routes/routes";

const AuthLayout = ({ children, title, subtitle, ...rest }) => {
	const navigate = useNavigate();
	return (
		<Stack w="100%" h="100%" alignItems="center" justifyContent="center">
			<Stack px={4} w="100%" maxW="420px" {...rest}>
				<HStack alignItems="center" justify="center" mb={8} onClick={() => navigate(PublicRoutes.Home)}>
					<LogoComponent />
				</HStack>
				<Text color={colors.MAINDARK} fontSize="3xl" fontWeight="bold">
					{title}
				</Text>
				<Text color="gray.500" fontSize="lg" fontWeight="medium">
					{subtitle}
				</Text>
				{children}
			</Stack>
		</Stack>
	);
};
export default AuthLayout;
