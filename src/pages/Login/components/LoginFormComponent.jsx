import { useState } from "react";
import { Button, HStack, Stack, Text } from "@chakra-ui/react";
import AuthFieldComponent from "../../../components/AuthFieldComponent";
import { colors } from "../../../constants/colors";
import { useNavigate } from "react-router";
import { PublicRoutes } from "../../../routes/routes";
import { loginWithPassword } from "../../../services/authService";

const LoginFormComponent = () => {
	const [form, setForm] = useState({ email: "", password: "" });
	const [error, setError] = useState();
	const navigate = useNavigate();

	const handleOnChange = (e) => {
		const { value, name } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleLogin = async () => {
		const response = await loginWithPassword(form);

		if (!response.success) {
			setError(response.error);
		} else {
			window.location.reload();
		}
	};

	return (
		<Stack gap={4} mt={4}>
			<AuthFieldComponent label="Email" placeholder="you@example.com" name="email" onChange={handleOnChange} />
			<AuthFieldComponent
				label="Password"
				placeholder="********"
				name="password"
				onChange={handleOnChange}
				type="password"
			/>
			<HStack
				justify="end"
				cursor="pointer"
				color={colors.MAINGREEN}
				onClick={() => navigate(PublicRoutes.ForgotPassword)}
			>
				Forgot password?
			</HStack>
			{error && <Text color="red">{error}</Text>}
			<Button p={4} w="100%" bgColor={colors.MAINGREEN} rounded="lg" color="white" onClick={handleLogin}>
				Sign in
			</Button>
			<Stack flexDir="row" alignItems="center" justify="center">
				<Text color={colors.MAINDARK} fontSize="md">
					Dont&apos;t have an account?
				</Text>
				<Text
					color={colors.MAINGREEN}
					fontWeight="medium"
					cursor="pointer"
					fontSize="md"
					onClick={() => navigate(PublicRoutes.CreateAccount)}
				>
					Create one
				</Text>
			</Stack>
		</Stack>
	);
};
export default LoginFormComponent;
