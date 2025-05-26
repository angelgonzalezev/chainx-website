import { useState } from "react";
import { Button, Stack, Text } from "@chakra-ui/react";
import AuthFieldComponent from "../../../components/AuthFieldComponent";
import { colors } from "../../../constants/colors";
import { useNavigate } from "react-router";
import { PrivateRoutes, PublicRoutes } from "../../../routes/routes";
import { isEmptyPassword } from "../../../utilities/utils";
import supabase from "../../../supabase/supabaseClient";

const ResetPasswordFormComponent = () => {
	const [form, setForm] = useState({ password: "", confirmPassword: "" });
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleOnChange = (e) => {
		const { value, name } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleOnClick = async () => {
		const { password, confirmPassword } = form;
		if (password !== confirmPassword) {
			setError("Both passwords must be the same");
		} else if (isEmptyPassword(form.password)) {
			setError("Password can't be empty");
		} else {
			try {
				const { data, error } = await supabase.auth.updateUser({ password: form.password });
				if (error) {
					setError(error.message);
				} else if (data.user) {
					navigate(PrivateRoutes.Dashboard);
				}
			} catch (e) {
				console.log("Error", e);
			}
		}
	};

	return (
		<Stack gap={4} mt={4}>
			<AuthFieldComponent
				label="Password"
				placeholder="********"
				name="password"
				onChange={handleOnChange}
				type="password"
			/>
			<AuthFieldComponent
				label="Confirm password"
				placeholder="********"
				name="confirmPassword"
				onChange={handleOnChange}
				type="password"
			/>
			{error && <Text color="red">{error}</Text>}
			<Button p={4} w="100%" bgColor={colors.MAINGREEN} rounded="lg" color="white" onClick={handleOnClick}>
				Reset password
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
export default ResetPasswordFormComponent;
