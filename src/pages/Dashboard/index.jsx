import { Button, Stack, Text } from "@chakra-ui/react";
import { colors } from "../../constants/colors";
// import { connectCalendarService } from "../../services/calendarService";
// import { useSelector } from "react-redux";
import { Plus } from "lucide-react";

const Dashboard = () => {
	// const { email: userEmail } = useSelector((store) => store.user);

	return (
		<Stack w="100%" gap={3}>
			<Stack flexDirection="row" alignItems="center" justifyContent="space-between">
				<Text fontSize="2xl" fontWeight="bold" color={colors.MAINDARK}>
					Home
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
					<Stack flexDir="row" alignItems="center" justifyContent="space-between" mb={4}>
						<Text fontSize="lg" fontWeight="semibold" mb={4}>
							Next Sessions
						</Text>
						<Button bgColor={colors.MAINGREEN} color="white" onClick={() => null} w="fit-content" fontSize={"xs"}>
							<Plus size="16px" /> Schedule new session
						</Button>
					</Stack>
					<Text>There are no session scheduled.</Text>
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
						Recent AI Summaries
					</Text>
				</Stack>
			</Stack>
		</Stack>
	);
};
export default Dashboard;
