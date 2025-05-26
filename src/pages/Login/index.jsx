import AuthLayout from "../../layouts/AuthLayout";
import LoginFormComponent from "./components/LoginFormComponent";

const Login = () => {
	return (
		<AuthLayout title="Welcome back" subtitle="Enter your credentials to access your account">
			<LoginFormComponent />
		</AuthLayout>
	);
};
export default Login;
