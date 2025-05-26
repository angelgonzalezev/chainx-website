import { Box, Button, Center, Stack, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { colors } from "../constants/colors";
import { Clock, Mic, RefreshCcw, Save } from "lucide-react";
import { /*uploadAudio,*/ uploadAudio } from "../services/audioService";
import { insertSessions } from "../services/authService";

const AudioRecorderComponent = ({ patientId }) => {
	const [error, setError] = useState();
	const [success, setSuccess] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [recordedURL, setRecordedURL] = useState("");
	const [seconds, setSeconds] = useState(0);
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
			mediaRecorder.current.start(1000);
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

	const restartRecording = () => {
		stopRecording(); // Stop current recording
		chunks.current = []; // Clear recorded data
		setSeconds(0);
		setRecordedURL("");
	};

	const saveRecording = async () => {
		stopRecording();
		await handleGetSessionAnalysis();
	};

	const formatTime = (totalSeconds) => {
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const secs = totalSeconds % 60;

		return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
	};

	const handleUploadAudio = async (_sessionName) => {
		const uploadResponse = await uploadAudio(recordedURL, _sessionName);
		if (!uploadResponse.success) {
			setError(uploadResponse.error);
		} else {
			const updateSessionResult = await insertSessions({
				publicUrl: _sessionName,
				patientId,
			});
			if (!updateSessionResult.success) {
				setError(updateSessionResult.error);
			} else {
				setError(null);
				setSuccess(true);
				setRecordedURL("");
				setSeconds(0);
			}
		}
		setUploading(false);
	};

	const handleGetSessionAnalysis = async () => {
		setUploading(true);
		const sessionName = `${Date.now()}.mp3`;
		await handleUploadAudio(sessionName);
	};

	return (
		<Stack p={6} borderWidth={1} borderColor={colors.BORDERGRAY} bgColor="white" borderRadius="xl">
			<Text fontSize="5xl" fontWeight="semibold" mb={2} color="black" textAlign="center">
				{formatTime(seconds)}
			</Text>
			<Stack flexDirection="row" alignItems="center" justifyContent="center">
				<Button
					disabled={recordedURL}
					_disabled={{ cursor: "not-allowed", opacity: 0.5 }}
					rounded="full"
					h={16}
					w={16}
					bgColor={isRecording ? "red.500" : colors.MAINGREEN}
					color="white"
					onClick={isRecording ? stopRecording : startRecording}
					boxShadow={colors.SMALLSHADOW}
				>
					{isRecording ? <Box h="18px" w="18px" bgColor="white" borderRadius="sm" /> : <Mic />}
				</Button>
				<Button
					disabled={uploading}
					_disabled={{ cursor: "not-allowed", opacity: 0.5 }}
					rounded="full"
					h={16}
					w={16}
					bgColor="white"
					color="white"
					onClick={restartRecording}
					borderWidth={1}
					borderColor={colors.BORDERGRAY}
					boxShadow={colors.SMALLSHADOW}
				>
					<RefreshCcw color={colors.TEXTGRAY} />
				</Button>
				<Button
					disabled={!recordedURL}
					_disabled={{ cursor: "not-allowed", opacity: 0.5 }}
					loading={uploading}
					_loading={{ cursor: "not-allowed", opacity: 0.5 }}
					rounded="full"
					h={16}
					w={16}
					bgColor="blue.500"
					color="blue.300"
					onClick={saveRecording}
					borderWidth={1}
					borderColor={colors.BORDERGRAY}
					boxShadow={colors.SMALLSHADOW}
				>
					<Save />
				</Button>
			</Stack>
			{error && <Text color="red">{error}</Text>}
			<Stack flexDirection="row" alignItems="center" justifyContent="center" pt={4}>
				<Stack flexDirection="row" alignItems="center" justifyContent="center">
					{isRecording ? (
						<Center className="dot" />
					) : (
						<Center h="14px" w="14px" bgColor={colors.BORDERGRAY} rounded="full" />
					)}
					<Text fontSize="md">Recording session</Text>
				</Stack>
				<Stack flexDirection="row" alignItems="center" justifyContent="center">
					<Clock color={colors.TEXTGRAY} size="16px" />
					<Text fontSize="md">Session: 60 minutes</Text>
				</Stack>
			</Stack>
		</Stack>
	);
};
export default AudioRecorderComponent;
