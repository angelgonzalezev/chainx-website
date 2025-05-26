import { Stack, Text } from "@chakra-ui/react";
import { Brain } from "lucide-react";
import { colors } from "../constants/colors";

const LogoComponent = () => {
	return (
		<Stack w="fit-content" flexDir="row" gap={2} alignItems="center" cursor="pointer">
			<Brain color={colors.MAINGREEN} size="32px" />
			<Text color={colors.MAINDARK} fontWeight="bold" fontSize="2xl">
				Cotherapy
			</Text>
		</Stack>
	);
};
export default LogoComponent;
