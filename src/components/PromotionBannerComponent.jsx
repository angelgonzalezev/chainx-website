import { Box, Code, Flex, Heading, Text } from "@chakra-ui/react";
import { Zap } from "lucide-react";

const PromotionBannerComponent = ({ promotion }) => {
	return (
		<Box
			bgGradient="to-r"
			gradientFrom="#a855f6"
			gradientTo="pink.500"
			borderRadius="xl"
			boxShadow="sm"
			p={6}
			color="white"
			w="100%"
		>
			<Flex align="center" gap={3}>
				<Zap size={32} />
				<Box>
					<Heading as="h2" size="md" fontWeight="bold">
						Early Adopter Special Offer! 🚀
					</Heading>
					<Text mt={1} fontSize="md">
						Get 40% off the Business Plan with code{" "}
						<Code fontFamily="mono" bg="whiteAlpha.300" px={2} py={1} borderRadius="md" fontSize="lg">
							{promotion}
						</Code>
					</Text>
				</Box>
			</Flex>
		</Box>
	);
};
export default PromotionBannerComponent;
