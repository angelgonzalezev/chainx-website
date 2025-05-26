import { Center, Stack, Text } from "@chakra-ui/react";
import { colors } from "../../constants/colors";
import AvatarComponent from "../../components/AvatarComponent";
import { FileText, LockKeyhole } from "lucide-react";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { getPatientInfoService, getPatientLastNoteService } from "../../services/patientService";
import AudioRecorderComponent from "../../components/AudioRecorderComponent";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { env } from "../../constants/env";
import { checkPremiumSubscription } from "../../services/subscriptionService";
import { useCrypto } from "../../hooks/useCrypto";
import { promotion } from "../../constants/features";

const RecordSession = () => {
	const { decrypt } = useCrypto();
	const { email: userEmail, id: userId } = useSelector((store) => store.user);

	const location = useLocation();
	const { patientId } = location.state || {};
	const [patient, setPatient] = useState();
	const [note, setNote] = useState();

	const [isSubscribed, setIsSubscribed] = useState(false);

	useEffect(() => {
		if (patientId) {
			const getPatientInfo = async () => {
				const handleDecrypt = async ({ details, iv, salt, id, created_at }) => {
					const decryptResult = await decrypt(details, userId, iv, salt);
					return { id, created_at, ...JSON.parse(decryptResult) };
				};
				const response = await getPatientInfoService(patientId);
				if (response.success) {
					const decryptedData = await Promise.all(response.data.map((item) => handleDecrypt(item)));

					setPatient(decryptedData[0]);
				}
			};
			getPatientInfo();
		}
	}, []);

	useEffect(() => {
		if (patientId) {
			const getPatientNotes = async () => {
				const response = await getPatientLastNoteService(patientId);
				if (response.success) {
					const _notes = response.data;
					setNote(_notes[0]);
				}
			};
			getPatientNotes();
		}
	}, [patientId]);

	useEffect(() => {
		const verifySubscription = async () => {
			const _isSubscribed = await checkPremiumSubscription(userId);
			setIsSubscribed(_isSubscribed?.isPremium);
		};
		verifySubscription();
	}, []);

	const onPurchase = () => {
		window.location.href = `${env.VITE_STRIPE_MONTHLY_LINK}?prefilled_promo_code=${promotion}&prefilled_email=${userEmail}`;
	};

	return (
		<Stack w="100%">
			{!patient ? (
				<Loading />
			) : (
				<>
					<Stack flexDirection="row" alignItems="center" justifyContent="space-between">
						<Text fontSize="2xl" fontWeight="bold" color={colors.MAINDARK}>
							Record Session
						</Text>
					</Stack>
					<Stack flexDirection="column" alignItems="start" w="100%">
						<Stack
							borderWidth="1px"
							borderColor={colors.BORDERGRAY}
							borderRadius="xl"
							bgColor="white"
							w={{ base: "100%" }}
						>
							<Stack
								flexDirection="row"
								alignItems="center"
								gap={4}
								p={6}
								borderBottomWidth="1px"
								borderColor={colors.BORDERGRAY}
							>
								<AvatarComponent size="lg" name={patient?.fullname} />
								<Text fontSize="lg" fontWeight="semibold">
									{patient?.fullname}
								</Text>
							</Stack>
							<Stack flexDirection="row" alignItems="start" px={6} pb={6}>
								<Center pt={1}>
									<FileText color={colors.MAINGREEN} size="16px" />
								</Center>
								<Stack gap={0} w="100%">
									<Stack flexDirection="row" alignItems="center" justifyContent="space-between" w="100%" mb={1}>
										<Text fontSize="sm" fontWeight="medium" color={colors.TEXTGRAY}>
											Previous Patient Note
										</Text>

										<Text fontSize="sm" fontWeight="medium" color={colors.TEXTGRAY}>
											{note?.created_at ? new Date(note?.created_at).toLocaleDateString() : "No previous note"}
										</Text>
									</Stack>
									{note ? (
										<Text fontSize="md">{note?.note}</Text>
									) : (
										<Text fontSize="sm">There is no note about the patient</Text>
									)}
								</Stack>
							</Stack>
						</Stack>
						<Stack w="100%" position="relative" backdropFilter="blur(8px)" bgColor="rgba(255, 255, 255, 0.1)">
							<AudioRecorderComponent patientId={patientId} />
							{isSubscribed === false ? (
								<Center
									position="absolute"
									top="50%"
									left={{ base: "50%", md: "50%" }}
									transform="translate(-50%, -50%)"
									backdropFilter="blur(8px)"
									bgColor="rgba(255, 255, 255, 0.1)"
									w="100%"
									h="100%"
								>
									<Center
										bgColor="yellow.400"
										px={4}
										py={2}
										borderRadius="xl"
										fontWeight="semibold"
										color="white"
										gap={2}
										w="fit-content"
										cursor="pointer"
										onClick={onPurchase}
									>
										<LockKeyhole /> Unlock with Premium
									</Center>
								</Center>
							) : null}
						</Stack>
					</Stack>
				</>
			)}
		</Stack>
	);
};
export default RecordSession;
