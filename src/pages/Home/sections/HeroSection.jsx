/* eslint-disable react/prop-types */
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { colors } from "../../../constants/colors";
import { ArrowRightIcon, BarChart3Icon, PlayCircleIcon } from "lucide-react";

const HeroSection = ({ handleStartTrial }) => {
	return (
		<Box pt="32" pb="20" px="4" bgColor={colors.LIGHTBG} w="100%">
			<Box maxW="7xl" mx="auto">
				<Flex direction={{ base: "column", lg: "row" }} gap="12" align="center" justify="space-between">
					<Box>
						<Heading as="h1" size="2xl" fontWeight="bold" color="gray.800" mb="6">
							Turn Every Session into an Opportunity for Growth
						</Heading>
						<Text fontSize="xl" color="gray.600" mb="8">
							Record, analyze, and enhance your consultations with AI. Automatic summaries, valuable insights, and more.
						</Text>
						<Flex gap="4">
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
							<Button
								colorScheme="gray"
								variant="outline"
								bgColor="white"
								borderWidth="1px"
								borderColor="gray.200"
								color={colors.MAINDARK}
								px="8"
								py="6"
								fontWeight="medium"
							>
								<PlayCircleIcon />
								Watch Demo
							</Button>
						</Flex>
					</Box>

					<Box position="relative" maxW={{ lg: "630px" }}>
						<Image
							src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
							alt="Psychologist in session"
							borderRadius="xl"
							boxShadow={colors.SHADOW}
						/>
						<Box position="absolute" bottom="-6" left="-6" bg="white" p="4" borderRadius="lg" boxShadow={colors.SHADOW}>
							<Flex align="center" gap="2">
								<Box as="span" color="teal.600" boxSize="5">
									{/* Replace with an actual icon or image */}
									<BarChart3Icon /> {/* Assuming this is an icon component */}
								</Box>
								<Text fontSize="sm" fontWeight="medium" color="gray.800">
									AI Analysis in Progress
								</Text>
							</Flex>
						</Box>
					</Box>
				</Flex>
			</Box>
		</Box>
	);
};
export default HeroSection;
