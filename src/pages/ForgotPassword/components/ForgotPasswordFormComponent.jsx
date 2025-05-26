import { useState } from "react";
import { Button, Stack, Text } from "@chakra-ui/react";
import AuthFieldComponent from "../../../components/AuthFieldComponent";
import { colors } from "../../../constants/colors";
import { useNavigate } from "react-router";
import { PublicRoutes } from "../../../routes/routes";
import { resetPasswordByEmail } from "../../../services/authService";

const ForgotPasswordFormComponent = () => {
	const [form, setForm] = useState({ email: "" });
	const [error, setError] = useState();
	const [success, setSuccess] = useState();
	const navigate = useNavigate();

	const handleOnChange = (e) => {
		const { value, name } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleOnClick = async () => {
		const response = await resetPasswordByEmail(form.email);
		if (!response.success) {
			setSuccess(null);
			setError(response.error);
		} else {
			setError(null);
			setSuccess("A password reset e-mail has been sent");
		}
	};

	return (
		<Stack gap={4} mt={4}>
			<AuthFieldComponent label="Email" placeholder="you@example.com" name="email" onChange={handleOnChange} />
			{error && <Text color="red">{error}</Text>}
			{success && <Text color="green">A password reset e-mail has been sent</Text>}
			<Button p={4} w="100%" bgColor={colors.MAINGREEN} rounded="lg" color="white" onClick={handleOnClick}>
				Send reset link
			</Button>
			<Stack flexDir="row" alignItems="center" justify="center">
				<Text color={colors.MAINDARK} fontSize="md">
					Remember your password?
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
export default ForgotPasswordFormComponent;
