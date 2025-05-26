import AuthLayout from "../../layouts/AuthLayout";
import ResetPasswordFormComponent from "./components/ResetPasswordFormComponent";

const ResetPassword = () => {
	return (
		<AuthLayout title="Create new password" subtitle="Enter a new password to reset it">
			<ResetPasswordFormComponent />
		</AuthLayout>
	);
};
export default ResetPassword;
