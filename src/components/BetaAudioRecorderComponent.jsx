import { Button, Link, Text } from "@chakra-ui/react";
import { Fragment, useRef, useState } from "react";
import { colors } from "../constants/colors";
import { Mic, MicOff } from "lucide-react";
import AuthFieldComponent from "./AuthFieldComponent";
import { /*uploadAudio,*/ transcribeAudio } from "../services/audioService";
import AuthLayout from "../layouts/AuthLayout";
import { createNewAccount, insertSessions, loginWithPassword } from "../services/authService";

const BetaAudioRecorderComponent = () => {
	const [error, setError] = useState();
	const [success, setSuccess] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [recordedURL, setRecordedURL] = useState("");
	const [seconds, setSeconds] = useState(0);
	const [form, setForm] = useState({ email: "", password: "" });
	const [uploading, setUploading] = useState(false);

	const mediaStream = useRef(null);
	const mediaRecorder = useRef(null);
	const chunks = useRef([]);

	const startRecording = async () => {
		setIsRecording(true);
		try {
			setSeconds(0);
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaStream.current = stream;
			mediaRecorder.current = new MediaRecorder(stream);
			mediaRecorder.current.ondataavailable = (e) => {
				if (e.data.size > 0) {
					chunks.current.push(e.data);
				}
			};
			const timer = setInterval(() => {
				setSeconds((prev) => prev + 1);
			}, 1000);

			mediaRecorder.current.onstop = () => {
				const recordedBlob = new Blob(chunks.current, { type: "audio/mp3" });
				const url = URL.createObjectURL(recordedBlob);
				setRecordedURL(url);

				chunks.current = [];
				clearTimeout(timer);
			};

			mediaRecorder.current.start();
		} catch (error) {
			console.log(error);
		}
	};

	const stopRecording = () => {
		setIsRecording(false);
		if (mediaRecorder.current) {
			mediaRecorder.current.stop();
			mediaStream.current.getTracks().forEach((track) => track.stop());
		}
	};

	const formatTime = (totalSeconds) => {
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const secs = totalSeconds % 60;

		return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
	};

	const handleOnChange = (e) => {
		const { value, name } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleUploadAudio = async (_sessionName) => {
		const uploadResponse = await transcribeAudio(recordedURL, _sessionName);
		// const uploadResponse = await transcribeAudio(recordedURL, _sessionName);
		if (!uploadResponse.success) {
			setError(uploadResponse.error);
		} else {
			const updateSessionResult = await insertSessions({
				publicUrl: _sessionName,
			});
			if (!updateSessionResult.success) {
				setError(updateSessionResult.error);
			} else {
				setError(null);
				setSuccess(true);
			}
		}
	};

	const loginOrCreateAccount = async () => {
		const authResponse = await createNewAccount(form);
		if (authResponse?.error === "User already registered") {
			const loginResponse = await loginWithPassword(form);
			return loginResponse;
		} else {
			return authResponse;
		}
	};

	const handleGetSessionAnalysis = async () => {
		const authOrLoginResponse = await loginOrCreateAccount();

		if (!authOrLoginResponse.success) {
			setError(authOrLoginResponse.error);
		} else {
			setUploading(true);
			const sessionName = `${Date.now()}.mp3`;
			const uploadResult = await handleUploadAudio(sessionName);
			console.log("🚀 ~ handleGetSessionAnalysis ~ uploadResult:", uploadResult);
			setSuccess(true);
		}
	};

	return (
		<Fragment>
			{!isRecording && recordedURL ? (
				<AuthLayout
					w="100%"
					title="Provide your email and password"
					subtitle="You will receive an email with session details"
				>
					{success ? (
						<Text color={colors.MAINGREEN}>Audio sent for proper analysis</Text>
					) : (
						<>
							{!uploading ? (
								<>
									<AuthFieldComponent
										label="Enter your email to receive session analysis"
										placeholder="you@example.com"
										name="email"
										onChange={handleOnChange}
									/>
									<AuthFieldComponent
										label="Password"
										placeholder="******"
										name="password"
										onChange={handleOnChange}
										type="password"
									/>
								</>
							) : (
								<Text color="black">Loading...</Text>
							)}
						</>
					)}
					{error && <Text color="red">{error}</Text>}
					{!uploading && (
						<Button
							p={4}
							w="100%"
							bgColor={colors.MAINGREEN}
							rounded="lg"
							color="white"
							onClick={handleGetSessionAnalysis}
							mt={4}
						>
							Get session analysis
						</Button>
					)}

					<Link href={recordedURL} download="session.mp3" color="blue.500" mt={2} display="block">
						Download Recording
					</Link>
				</AuthLayout>
			) : (
				<AuthLayout title="Record your session" subtitle="Just start recording your session" alignItems="center">
					<Text fontSize="5xl" fontWeight="semibold" mb={2} color="black" textAlign="center">
						{formatTime(seconds)}
					</Text>
					<Button
						rounded="full"
						p={4}
						h={20}
						w={20}
						bgColor={colors.MAINGREEN}
						color="white"
						onClick={isRecording ? stopRecording : startRecording}
					>
						{isRecording ? <MicOff /> : <Mic />}
					</Button>
					<Text
						fontSize="lg"
						fontWeight="light"
						color={colors.MAINDARK}
						textAlign="center"
						cursor="pointer"
						_hover={{ textDecor: "underline" }}
						onClick={isRecording ? stopRecording : startRecording}
					>
						{isRecording ? "Stop session" : "Start new Session"}
					</Text>
				</AuthLayout>
			)}
		</Fragment>
	);
};
export default BetaAudioRecorderComponent;
