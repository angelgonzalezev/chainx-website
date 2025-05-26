import { Stack, Text } from "@chakra-ui/react";
import { colors } from "../../../constants/colors";
import PricingHomeComponent from "../components/PricingHomeComponent";
import { env } from "../../../constants/env";
import PromotionBannerComponent from "../../../components/PromotionBannerComponent";
import { freeFeatures, premiumFeatures, promotion } from "../../../constants/features";

const PricingSection = ({ handleStartTrial }) => {
	const onPurchase = () => {
		if (promotion) {
			window.location.href = `${env.VITE_STRIPE_MONTHLY_LINK}?prefilled_promo_code=${promotion}`;
		} else {
			window.location.href = `${env.VITE_STRIPE_MONTHLY_LINK}`;
		}
	};

	return (
		<Stack w="100%" alignItems="center" bgColor="white">
			<Stack w="100%" maxW="1200px" flexDir="column" alignItems="center" justifyContent="center" py={12} px={4}>
				<Text color={colors.MAINDARK} fontSize="4xl" textAlign="center" fontWeight="bold">
					Simple, Transparent Pricing
				</Text>

				{promotion && <PromotionBannerComponent promotion={promotion} />}
				<Stack flexDirection={{ base: "column", md: "row" }} alignItems="start" gap={8} w="100%" mt={4}>
					<PricingHomeComponent
						features={freeFeatures}
						title="Free Plan"
						handler={handleStartTrial}
						price={0}
						cta="Start free"
					/>
					<PricingHomeComponent
						features={freeFeatures.concat(premiumFeatures)}
						title="Business Plan"
						handler={onPurchase}
						price={33}
						cta="Become Premium"
						premium={true}
						promotion={promotion}
					/>
				</Stack>
				<Text color={colors.MAINDARK} fontSize="sm" textAlign="center" fontWeight="light" mt={8}>
					100% privacy-focused. Your data is always secure.
				</Text>
			</Stack>
		</Stack>
	);
};
export default PricingSection;
