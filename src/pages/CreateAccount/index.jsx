import AuthLayout from "../../layouts/AuthLayout";
import RegisterFormComponent from "./components/RegisterFormComponent";

const CreateAccount = () => {
	return (
		<AuthLayout title="Create your account" subtitle="Enter your details to get started">
			<RegisterFormComponent />
		</AuthLayout>
	);
};
export default CreateAccount;
