import AuthLayout from "../../layouts/AuthLayout";
import BetaRecordingComponent from "./components/BetaRecordingComponent";

const BetaRecording = () => {
	return (
		<AuthLayout title="Record your session" subtitle="Just start recording your session">
			<BetaRecordingComponent />
		</AuthLayout>
	);
};
export default BetaRecording;
