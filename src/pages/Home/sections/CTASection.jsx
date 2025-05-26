/* eslint-disable react/prop-types */
import { Button, Center, Heading, Stack, Text } from "@chakra-ui/react";
import { colors } from "../../../constants/colors";
import { ArrowRightIcon } from "lucide-react";

const CTASection = ({ handleStartTrial }) => {
	return (
		<Center w="100%" bgColor={colors.LIGHTBG} py="20">
			<Stack flexDir="column" alignItems="center" justifyContent="center" px={4}>
				<Heading as="h3" size="4xl" fontWeight="bold" color="gray.800" mb="6" textAlign="center">
					Enhance your therapy sessions with AI-powered insights
				</Heading>
				<Text fontSize="xl" color="gray.600" mb="8" textAlign="center">
					Discover how to improve your practice today
				</Text>
				<Button
					onClick={handleStartTrial}
					bgColor={colors.MAINGREEN}
					color="white"
					variant="solid"
					px="8"
					py="6"
					fontWeight="medium"
					_hover={{ bgColor: "teal.600" }}
				>
					Start Free Trial
					<ArrowRightIcon />
				</Button>
			</Stack>
		</Center>
	);
};
export default CTASection;
