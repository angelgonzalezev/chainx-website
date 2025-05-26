import { Box, Center, Input, Stack, Text } from "@chakra-ui/react";
import { colors } from "../../constants/colors";
import { Check, CreditCard, Crown, LoaderPinwheel, TicketX, Trash } from "lucide-react";
import PurchaseThankYouComponent from "../../components/PurchaseThankYouComponent";
import { useEffect, useState } from "react";
import { env } from "../../constants/env";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import CancelSuscriptionComponent from "../../components/CancelSuscriptionComponent";
import { cancelSubscription, checkPremiumSubscription } from "../../services/subscriptionService";
import { updateUserEmail, updateUserFullname } from "../../services/authService";
import { freeFeatures, premiumFeatures, promotion } from "../../constants/features";
import PromotionBannerComponent from "../../components/PromotionBannerComponent";

const Settings = () => {
	const onPurchase = () => {
		if (promotion) {
			window.location.href = `${env.VITE_STRIPE_MONTHLY_LINK}?prefilled_promo_code=${promotion}&prefilled_email=${userEmail}`;
		} else {
			window.location.href = `${env.VITE_STRIPE_MONTHLY_LINK}?prefilled_email=${userEmail}`;
		}
	};
	const { email: userEmail, id: userId, fullname: userFullname } = useSelector((store) => store.user);

	const [fullname, setFullname] = useState(userFullname);
	const [email, setEmail] = useState(userEmail);
	const [loadingEmail, setLoadingEmail] = useState(false);
	const [loadingFullname, setLoadingFullname] = useState(false);
	const [emailResponse, setEmailResponse] = useState();
	const [fullnameResponse, setFullnameResponse] = useState();
	const [currentPeriodEnd, setCurrentPeriodEnd] = useState();
	const [expirationDate, setExpirationDate] = useState();

	const [searchParams] = useSearchParams();
	const suscribedParam = searchParams.get("suscribed");

	const [openPurchaseThankModal, setOpenPurchaseThankModal] = useState(suscribedParam);
	const [openCancelSuscription, setOpenCancelSuscription] = useState(false);
	const [isSubscribed, setIsSubscribed] = useState(false);
	const isPremium = suscribedParam ?? isSubscribed;

	useEffect(() => {
		const verifySubscription = async () => {
			const { isPremium, expirationDate } = await checkPremiumSubscription(userId);

			setIsSubscribed(isPremium);
			setExpirationDate(expirationDate);
		};
		verifySubscription();
	}, []);

	const handleCancelSubscription = async () => {
		const cancelationResponse = await cancelSubscription(userId);
		if (cancelationResponse.success) {
			setCurrentPeriodEnd(cancelationResponse.currentPeriodEnd);
			setOpenCancelSuscription(true);
		}
	};

	const onUpdateFullName = async () => {
		const respose = await updateUserFullname(fullname);
		if (respose.success) {
			setFullnameResponse(true);
		} else {
			setFullnameResponse(false);
		}
		setLoadingFullname(false);
	};

	const onUpdateEmail = async () => {
		setLoadingEmail(true);
		const respose = await updateUserEmail(email);
		if (respose.success) {
			setEmailResponse(true);
		} else {
			setEmailResponse(false);
		}
		setLoadingEmail(false);
	};

	return (
		<Stack w="100%" gap={3}>
			<Stack flexDirection="row" alignItems="center" justifyContent="space-between">
				<Text fontSize="2xl" fontWeight="bold" color={colors.MAINDARK}>
					Settings
				</Text>
			</Stack>
			<Stack flexDir={{ base: "column", md: "row" }}>
				<Stack
					flexDir="column"
					w="100%"
					gap={0}
					shadow={colors.SMALLSHADOW}
					borderBottomRadius="xl"
					borderTopRadius="xl"
					bgColor="white"
					p={6}
				>
					<Text fontSize="lg" fontWeight="semibold">
						Full Name
					</Text>
					<Input
						p={2}
						color={colors.MAINDARK}
						name="name"
						placeholder="Full Name"
						borderColor={colors.BORDERGRAY}
						onChange={(e) => setFullname(e.target.value)}
						type="text"
						value={fullname}
						mt={2}
					/>
					<Center
						mt={2}
						py={1}
						borderRadius="lg"
						borderColor={colors.MAINGREEN}
						borderWidth="1px"
						bgColor={colors.MAINGREEN}
						color="white"
						onClick={onUpdateFullName}
						cursor="pointer"
					>
						{loadingFullname ? <LoaderPinwheel /> : "Update fullname"}
					</Center>
					{fullnameResponse === true ? (
						<Text color={colors.MAINGREEN} fontSize="sm" mt={2}>
							Full name has been successfully changed
						</Text>
					) : fullnameResponse === false ? (
						<Text color={colors.RED} mt={2}>
							There were an error, please try later
						</Text>
					) : null}
				</Stack>
				<Stack
					flexDir="column"
					w="100%"
					gap={0}
					shadow={colors.SMALLSHADOW}
					borderBottomRadius="xl"
					borderTopRadius="xl"
					bgColor="white"
					p={6}
				>
					<Text fontSize="lg" fontWeight="semibold">
						Modify Email
					</Text>
					<Input
						p={2}
						color={colors.MAINDARK}
						name="email"
						placeholder="Email"
						borderColor={colors.BORDERGRAY}
						onChange={(e) => setEmail(e.target.value)}
						type="text"
						value={email}
						mt={2}
					/>
					<Center
						mt={2}
						py={1}
						borderRadius="lg"
						borderColor={colors.MAINGREEN}
						borderWidth="1px"
						bgColor={colors.MAINGREEN}
						color="white"
						onClick={onUpdateEmail}
						cursor="pointer"
					>
						{loadingEmail ? <LoaderPinwheel /> : "Update email"}
					</Center>
					{emailResponse === true ? (
						<Text color={colors.MAINGREEN} fontSize="sm" mt={2}>
							A confirmation email has been sent
						</Text>
					) : emailResponse === false ? (
						<Text color={colors.RED} mt={2}>
							There were an error, please try later
						</Text>
					) : null}
				</Stack>
			</Stack>
			<Stack
				alignItems="start"
				w="100%"
				gap={0}
				shadow={colors.SMALLSHADOW}
				borderBottomRadius="xl"
				borderTopRadius="xl"
				bgColor="white"
			>
				<Stack w="100%">
					<Stack flexDirection="column" gap={4} p={6}>
						<Text fontSize="lg" fontWeight="semibold">
							Suscription Plan
						</Text>
						<Text fontSize="md" fontWeight="semibold" color={colors.TEXTGRAY}>
							Select the plan that best fits your needs
						</Text>
					</Stack>
				</Stack>
				<Center p={6} w="100%">
					{promotion && <PromotionBannerComponent promotion={promotion} />}
				</Center>
				<Stack
					w="100%"
					borderTopWidth="2px"
					borderColor={colors.MAINBG}
					direction={{ base: "column", md: "row" }}
					alignItems="start"
					justifyContent="space-between"
					p={6}
					gap={6}
				>
					<Stack
						direction="column"
						p={6}
						borderRadius="xl"
						borderColor={!isPremium ? colors.MAINGREEN : colors.MAINBG}
						borderWidth="3px"
						w="100%"
						gap={6}
						bgColor={!isPremium ? colors.LIGHTGREEN : null}
					>
						<Stack direction="row" justifyContent="space-between">
							<Stack flexDirection="column" gap={0}>
								<Text fontSize="2xl" fontWeight="bold">
									Free Plan
								</Text>
								<Text fontSize="sm">Perfect for getting started</Text>
							</Stack>
							<Stack flexDirection="row">
								<Stack flexDir="row" alignItems="start" gap={0} mt={4}>
									<Text color={colors.MAINDARK} fontSize="3xl" fontWeight="bold" lineHeight={0}>
										0€
									</Text>
									<Text color="gray.500" fontSize="md" fontWeight="light">
										/month
									</Text>
								</Stack>
							</Stack>
						</Stack>
						<Stack direction="column" gap={2}>
							{freeFeatures.map((item, idx) => (
								<Stack direction="row" alignItems="center" key={idx}>
									<Check color={colors.MAINGREEN} />
									<Text>{item}</Text>
								</Stack>
							))}
						</Stack>
						{!isPremium ? (
							<Center
								py={2}
								borderRadius="lg"
								borderColor={colors.MAINGREEN}
								borderWidth="1px"
								bgColor={colors.LIGHTGREEN}
								color={colors.MAINGREEN}
							>
								Current Plan
							</Center>
						) : (
							<Center
								py={2}
								borderRadius="lg"
								borderColor={colors.MAINGREEN}
								borderWidth="1px"
								color={colors.MAINGREEN}
								gap={2}
							>
								<Crown size="20px" />
								You are Premium
							</Center>
						)}
					</Stack>
					<Stack
						direction="column"
						p={6}
						borderRadius="xl"
						borderColor={isPremium ? colors.MAINGREEN : colors.MAINBG}
						borderWidth="3px"
						w="100%"
						gap={6}
						bgColor={isPremium ? colors.LIGHTGREEN : null}
						position="relative"
					>
						<Stack direction="row" justifyContent="space-between">
							<Stack flexDirection="column" gap={0}>
								<Text fontSize="2xl" fontWeight="bold">
									Business Plan
								</Text>
								<Text fontSize="sm">For professional psychologists</Text>
							</Stack>
							<Stack flexDirection="row">
								{promotion && (
									<Stack flexDir="row" alignItems="start" gap={0} mt={4}>
										<Text
											color={colors.TEXTGRAY}
											fontSize="lg"
											fontWeight="bold"
											lineHeight={0}
											textDecoration="line-through"
										>
											55€
										</Text>
									</Stack>
								)}
								<Stack flexDir="row" alignItems="start" gap={0} mt={4}>
									<Text color={colors.MAINDARK} fontSize="3xl" fontWeight="bold" lineHeight={0}>
										33€
									</Text>
									<Text color="gray.500" fontSize="md" fontWeight="light">
										/month
									</Text>
								</Stack>
							</Stack>
						</Stack>
						{expirationDate && (
							<Text fontSize="md" fontWeight="medium">{`Expiration date: ${new Date(
								expirationDate
							).toLocaleDateString()}`}</Text>
						)}
						<Stack direction="column" gap={2}>
							{freeFeatures.concat(premiumFeatures).map((item, idx) => (
								<Stack direction="row" alignItems="center" key={idx}>
									<Check color={colors.MAINGREEN} />
									<Text>{item}</Text>
								</Stack>
							))}
						</Stack>
						{isPremium ? (
							<Center
								py={2}
								borderRadius="lg"
								bgColor={colors.RED}
								color="white"
								gap={2}
								onClick={handleCancelSubscription}
								cursor="pointer"
							>
								<TicketX size="20px" />
								Cancel Subscription
							</Center>
						) : (
							<Center
								py={2}
								borderRadius="lg"
								borderColor={colors.MAINGREEN}
								borderWidth="1px"
								bgColor={colors.MAINGREEN}
								color="white"
								gap={2}
								onClick={onPurchase}
								cursor="pointer"
							>
								<CreditCard size="20px" />
								Update Now
							</Center>
						)}
						{promotion && (
							<Box position="absolute" top="0px" right="-28px">
								<Box
									bgGradient="to-r"
									gradientFrom="#a855f6"
									gradientTo="pink.500"
									color="white"
									px={3}
									py={1}
									borderRadius="full"
									fontSize="lg"
									fontWeight="semibold"
									transform="rotate(12deg)"
								>
									Save 40%
								</Box>
							</Box>
						)}
					</Stack>
				</Stack>
			</Stack>
			<Stack
				alignItems="start"
				w="100%"
				gap={0}
				shadow={colors.SMALLSHADOW}
				borderBottomRadius="xl"
				borderTopRadius="xl"
				bgColor="white"
				mt={4}
			>
				<Stack w="100%">
					<Stack flexDirection="column" gap={4} p={6}>
						{/* <Text fontSize="lg" fontWeight="semibold">
							Account Settings
						</Text> */}
						<Stack direction="row" alignItems="center">
							<Trash size="16px" color={colors.RED} fontWeight="semibold" />
							<Text fontSize="md" fontWeight="semibold" _hover={{ textDecor: "underline", cursor: "pointer" }}>
								Delete Account?
							</Text>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
			{openPurchaseThankModal && (
				<PurchaseThankYouComponent open={openPurchaseThankModal} setOpen={setOpenPurchaseThankModal} />
			)}
			{openCancelSuscription && (
				<CancelSuscriptionComponent
					open={openCancelSuscription}
					setOpen={setOpenCancelSuscription}
					currentPeriodEnd={currentPeriodEnd}
				/>
			)}
		</Stack>
	);
};
export default Settings;
