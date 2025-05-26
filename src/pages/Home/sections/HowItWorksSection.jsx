import { Grid, Stack, Text } from "@chakra-ui/react";
import { colors } from "../../../constants/colors";
import { Brain, ChartNoAxesCombined, Clock } from "lucide-react";

const HowItWorksSection = () => {
	const items = [
		{
			title: "Record Your Session",
			subTitle: "Start recording with a single click. Our platform handles the rest.",
			icon: <Clock color={colors.MAINGREEN} />,
		},
		{
			title: "AI-Generated Summary",
			subTitle: "Receive detailed insights and key takeaways automatically.",
			icon: <Brain color={colors.MAINGREEN} />,
		},
		{
			title: "Track Progress",
			subTitle: "Monitor patient progress with smart analytics and visualizations.",
			icon: <ChartNoAxesCombined color={colors.MAINGREEN} />,
		},
	];

	return (
		<Stack w="100%" alignItems="center" bgColor="white">
			<Stack w="100%" maxW="1200px" flexDir="column" alignItems="center" justifyContent="center" p={10} py={12}>
				<Text color={colors.MAINDARK} fontSize="4xl" textAlign="center" fontWeight="bold">
					How It Works
				</Text>
				<Text color={colors.MAINDARK} fontSize="xl" textAlign="center" fontWeight="light">
					Simple steps to enhance your therapy practice
				</Text>
				<Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap="6" w="100%" mt={8}>
					{items.map((item, idx) => (
						<Stack w="100%" flexDir="column" p={8} bgColor={colors.LIGHTBG} rounded="xl" key={idx} gap={4}>
							<Stack flexDir={{ base: "row", md: "column" }} alignItems={{ base: "center", md: "start" }} gap={4}>
								<Stack p={4} rounded="lg" bgColor="white" w="fit-content" boxShadow={colors.SMALLSHADOW}>
									{item.icon}
								</Stack>
								<Text color={colors.MAINDARK} fontSize="xl" fontWeight="bold">
									{item.title}
								</Text>
							</Stack>
							<Text color={colors.MAINDARK} fontSize="lg" fontWeight="light">
								{item.subTitle}
							</Text>
						</Stack>
					))}
				</Grid>
			</Stack>
		</Stack>
	);
};
export default HowItWorksSection;
