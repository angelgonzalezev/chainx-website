import { Button, Text, Box } from "@chakra-ui/react";
import { colors } from "../constants/colors";
import { useNavigate } from "react-router";
import { PublicRoutes } from "../routes/routes";

const LadingDesktopHeader = ({ handleStartTrial }) => {
	const navigate = useNavigate();
	return (
		<Box display={{ base: "none", sm: "flex" }} w="fit-content" flexDir="row" alignItems="center" gap={10}>
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
		</Box>
	);
};
export default LadingDesktopHeader;
