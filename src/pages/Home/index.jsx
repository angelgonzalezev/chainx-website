import { Stack } from "@chakra-ui/react";
import NavbarSection from "./sections/NavbarSection";
import HeroSection from "./sections/HeroSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import PricingSection from "./sections/PricingSection";
import CTASection from "./sections/CTASection";
import { useNavigate } from "react-router";
import { PublicRoutes } from "../../routes/routes";

const Home = () => {
	const navigate = useNavigate();
	const handleStartTrial = () => {
		navigate(PublicRoutes.CreateAccount);
	};
	return (
		<Stack flexDir="column" h="100vh" w="100%" alignItems="center" gap={0}>
			<NavbarSection handleStartTrial={handleStartTrial} />
			<HeroSection handleStartTrial={handleStartTrial} />
			<HowItWorksSection />
			<PricingSection handleStartTrial={handleStartTrial} />
			<CTASection handleStartTrial={handleStartTrial} />
		</Stack>
	);
};
export default Home;
