import AuthLayout from "../../layouts/AuthLayout";
import ForgotPasswordFormComponent from "./components/ForgotPasswordFormComponent";

const ForgotPassword = () => {
	return (
		<AuthLayout title="Reset your password" subtitle="Enter your email to receive reset instructions">
			<ForgotPasswordFormComponent />
		</AuthLayout>
	);
};
export default ForgotPassword;
