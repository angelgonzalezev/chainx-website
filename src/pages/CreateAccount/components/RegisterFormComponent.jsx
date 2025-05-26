import { useState } from "react";
import { Button, Stack, Text } from "@chakra-ui/react";
import AuthFieldComponent from "../../../components/AuthFieldComponent";
import { colors } from "../../../constants/colors";
import { useNavigate } from "react-router";
import { PublicRoutes } from "../../../routes/routes";
import { createNewAccount } from "../../../services/authService";

const RegisterFormComponent = () => {
	const [form, setForm] = useState({ fullname: "", email: "", password: "" });
	const [error, setError] = useState();
	const navigate = useNavigate();

	const handleOnChange = (e) => {
		const { value, name } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleOnClick = async () => {
		const response = await createNewAccount(form);
		if (!response.success) {
			setError(response.error);
		} else {
			window.location.reload();
		}
	};

	return (
		<Stack gap={4} mt={4}>
			<AuthFieldComponent label="Name" placeholder="Ángel González" name="fullname" onChange={handleOnChange} />
			<AuthFieldComponent label="Email" placeholder="you@example.com" name="email" onChange={handleOnChange} />
			<AuthFieldComponent
				label="Password"
				placeholder="********"
				name="password"
				onChange={handleOnChange}
				type="password"
			/>
			{error && <Text color="red">{error}</Text>}
			<Button p={4} w="100%" bgColor={colors.MAINGREEN} rounded="lg" color="white" onClick={handleOnClick}>
				Create account
			</Button>
			<Stack flexDir="row" alignItems="center" justify="center">
				<Text color={colors.MAINDARK} fontSize="md">
					Already have an account?
				</Text>
				<Text
					color={colors.MAINGREEN}
					fontWeight="medium"
					cursor="pointer"
					fontSize="md"
					onClick={() => navigate(PublicRoutes.Login)}
				>
					Sign in
				</Text>
			</Stack>
		</Stack>
	);
};
export default RegisterFormComponent;
