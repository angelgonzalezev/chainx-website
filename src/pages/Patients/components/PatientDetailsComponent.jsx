import { Button, Center, Stack, Tabs, Text } from "@chakra-ui/react";
import {
	DialogBody,
	DialogCloseTrigger,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogRoot,
	DialogTitle,
} from "../../../components/ui/dialog";
import { Calendar, Mail, Mic, NotebookPen, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
	getPatientInfoService,
	getPatientNotesService,
	getPatientSessionsService,
} from "../../../services/patientService";
import { colors } from "../../../constants/colors";
import { getFormattedDate } from "../../../utilities/utils";
import { useNavigate } from "react-router";
import { PrivateRoutes } from "../../../routes/routes";
import { useCrypto } from "../../../hooks/useCrypto";
import { useSelector } from "react-redux";
import SessionSummary from "./SessionSummary";

const PatientDetailsComponent = ({ setOpen, patientId }) => {
	const { decrypt } = useCrypto();
	const { id: userId } = useSelector((store) => store.user);

	const [patient, setPatient] = useState();
	const [sessions, setSessions] = useState([]);
	const [notes, setNotes] = useState([]);
	const [value, setValue] = useState("sessions");
	const navigate = useNavigate();
	const [extendedSession, setExtendedSession] = useState();

	useEffect(() => {
		if (patientId) {
			const handleDecrypt = async ({ details, iv, salt, id, created_at }) => {
				const decryptResult = await decrypt(details, userId, iv, salt);
				return { id, created_at, ...JSON.parse(decryptResult) };
			};

			const getPatientInfo = async () => {
				const response = await getPatientInfoService(patientId);
				if (response.success) {
					const decryptedData = await Promise.all(response.data.map((item) => handleDecrypt(item)));

					setPatient(decryptedData[0]);
				}
			};
			getPatientInfo();
		}
	}, [patientId]);

	useEffect(() => {
		if (patientId) {
			const handleDecrypt = async ({ session_details, iv, salt, id, created_at }) => {
				const decryptResult = await decrypt(session_details, userId, iv, salt);
				return { id, created_at, ...JSON.parse(decryptResult) };
			};

			const getPatientSessions = async () => {
				const response = await getPatientSessionsService(patientId);
				if (response.success === true) {
					const decryptedData = await Promise.all(response.data.map((item) => handleDecrypt(item)));
					const orderedData = decryptedData.sort((a, b) => {
						const dateA = new Date(a.created_at);
						const dateB = new Date(b.created_at);
						return dateB - dateA;
					});
					setSessions(orderedData);
				} else {
					console.log("No entra");
				}
			};
			getPatientSessions();
		}
	}, [patientId]);

	useEffect(() => {
		if (patientId) {
			const getPatientNotes = async () => {
				const response = await getPatientNotesService(patientId);
				if (response?.success) {
					setNotes(response.data);
				}
			};
			getPatientNotes();
		}
	}, [patientId]);

	const handleRecordSession = (patientId) => {
		navigate(PrivateRoutes.RecordSession, { state: { patientId } });
	};

	const handleSessionOnClick = (idx) => {
		if (idx === extendedSession) {
			setExtendedSession(undefined);
		} else {
			setExtendedSession(idx);
		}
	};

	return (
		<DialogRoot
			placement="center"
			motionPreset="slide-in-bottom"
			lazyMount
			open={patientId}
			onOpenChange={(e) => setOpen(e.open)}
			size="xl"
		>
			<DialogContent bgColor="white">
				<DialogHeader pt="24px">
					<DialogTitle fontSize="xl">{patient?.fullname}</DialogTitle>
					<DialogDescription mt={2}>
						<Stack flexDirection="row" alignItems="center">
							<Stack flexDirection="row" alignItems="center">
								<Mail size="15px" />
								<Text>{patient?.email}</Text>
							</Stack>
							<Stack flexDirection="row" alignItems="center">
								<Phone size="15px" />
								<Text>{patient?.phone}</Text>
							</Stack>
						</Stack>
					</DialogDescription>
				</DialogHeader>
				<DialogBody>
					<Tabs.Root value={value} onValueChange={(e) => setValue(e.value)}>
						<Stack w="100%" borderBottomWidth={1} borderColor={colors.BORDERGRAY}>
							<Tabs.List p="1" border="none">
								<Tabs.Trigger
									value="sessions"
									bgColor="white"
									border="none"
									_focus={{ outline: "none" }}
									color={value === "sessions" ? colors.MAINGREEN : colors.MAINDARK}
								>
									<Mic size="16px" />
									Session History
								</Tabs.Trigger>
								<Tabs.Trigger
									value="notes"
									color={value === "notes" ? colors.MAINGREEN : colors.MAINDARK}
									bgColor="white"
									border="none"
									_focus={{ outline: "none" }}
								>
									<NotebookPen size="16px" />
									Patient Notes
								</Tabs.Trigger>
							</Tabs.List>
						</Stack>

						<Tabs.Content value="sessions">
							<Stack pt={2}>
								{sessions?.length === 0 ? (
									<Center w="100%" pb={2}>
										<Button
											bgColor={colors.MAINGREEN}
											color="white"
											fontWeight="medium"
											onClick={() => handleRecordSession(patientId)}
											fontSize={{ base: "xs", md: "lg" }}
											cursor="pointer"
										>
											<Mic color="white" /> Record First Session
										</Button>
									</Center>
								) : (
									sessions.map((session, idx) => (
										<Stack p={4} bgColor={colors.MAINBG} borderRadius="lg" key={idx}>
											<Stack flexDirection="row" alignItems="center">
												<Center color={colors.TEXTGRAY}>
													<Calendar size="15px" />
												</Center>
												<Text color={colors.MAINDARK} fontSize="md" fontWeight="semibold">
													Session #{sessions.length - idx}
												</Text>
												<Text color={colors.TEXTGRAY} fontSize="md">
													{getFormattedDate(new Date(session.created_at))}
												</Text>
											</Stack>
											{session.session_summary ? (
												<Text>{session.session_summary}</Text>
											) : (
												<Text color={colors.TEXTGRAY}>Pending analysis...</Text>
											)}
											{session ? (
												<>
													{extendedSession === idx ? <SessionSummary data={session} /> : null}
													<Stack
														w="100%"
														alignItems="end"
														color={colors.MAINGREEN}
														textDecoration="underline"
														cursor="pointer"
														_active={{ color: colors.MAINDARK }}
														onClick={() => handleSessionOnClick(idx)}
													>
														{extendedSession === idx ? "Collapse" : "See more"}
													</Stack>
												</>
											) : null}
										</Stack>
									))
								)}
							</Stack>
						</Tabs.Content>
						<Tabs.Content value="notes">
							<Stack pt={2}>
								{notes?.length === 0 ? (
									<Text fontSize="md" color={colors.TEXTGRAY}>
										There is no patient notes.
									</Text>
								) : (
									notes.map((note, idx) => (
										<Stack p={4} bgColor={colors.MAINBG} borderRadius="lg" key={idx}>
											<Stack flexDirection="row" alignItems="center">
												<Center color={colors.TEXTGRAY}>
													<Calendar size="15px" />
												</Center>
												<Text color={colors.MAINDARK} fontSize="md" fontWeight="semibold">
													Note #{notes.length - idx}
												</Text>
												<Text color={colors.TEXTGRAY} fontSize="md">
													{getFormattedDate(new Date(note.created_at))}
												</Text>
											</Stack>
											<Text>{note.note}</Text>
										</Stack>
									))
								)}
							</Stack>
						</Tabs.Content>
					</Tabs.Root>
				</DialogBody>
				<DialogCloseTrigger
					bgColor="white"
					p="0px"
					borderColor={colors.BORDERGRAY}
					_focus={{ outline: "none" }}
					_hover={{ borderColor: colors.MAINDARK, color: colors.MAINDARK }}
				>
					<X />
				</DialogCloseTrigger>
			</DialogContent>
		</DialogRoot>
	);
};

export default PatientDetailsComponent;
