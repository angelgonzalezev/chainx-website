import { Input, Stack, Text } from "@chakra-ui/react";
import { colors } from "../constants/colors";

const AuthFieldComponent = ({ label, placeholder, name, onChange, type = "text", value }) => {
	return (
		<Stack flexDir="column">
			<Text color={colors.MAINDARK} fontWeight="medium">
				{label}
			</Text>
			<Input
				p={2}
				color={colors.MAINDARK}
				name={name}
				placeholder={placeholder}
				borderColor="gray.300"
				onChange={onChange}
				type={type}
				value={value}
			/>
		</Stack>
	);
};
export default AuthFieldComponent;
