import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { colors } from "../../../constants/colors";
import { Check } from "lucide-react";

const PricingHomeComponent = ({ features, handler, title, price, cta, premium, promotion }) => {
	return (
		<>
			<Stack
				py={6}
				px={10}
				bgColor="white"
				borderWidth="1px"
				borderColor="gray.200"
				rounded="2xl"
				alignItems="center"
				justifyContent="center"
				gap={6}
				boxShadow={colors.SHADOW}
				flexDirection="column"
				w="100%"
				position="relative"
			>
				<Text color={colors.MAINDARK} fontSize="xl" fontWeight="bold">
					{title}
				</Text>
				<Stack flexDirection="row" alignItems="center">
					{promotion && (
						<Stack flexDir="row" alignItems="start" gap={0} mt={4}>
							<Text
								color={colors.TEXTGRAY}
								fontSize="3xl"
								fontWeight="bold"
								lineHeight={0}
								textDecoration="line-through"
							>
								55€
							</Text>
						</Stack>
					)}
					<Stack flexDir="row" alignItems="start" gap={0} mt={4}>
						<Text color={colors.MAINDARK} fontSize="5xl" fontWeight="bold" lineHeight={0}>
							{price}€
						</Text>
						<Text color="gray.500" fontSize="md" fontWeight="light">
							/month
						</Text>
					</Stack>
				</Stack>
				<Stack>
					{features.map((item, index) => (
						<Stack flexDir="row" alignItems="center" key={index}>
							<Check color={colors.MAINGREEN} />
							<Text color={colors.MAINDARK} fontWeight="light">
								{item}
							</Text>
						</Stack>
					))}
				</Stack>
				{premium ? (
					<Button
						py={6}
						bgColor={colors.MAINGREEN}
						color="white"
						fontWeight="medium"
						w="100%"
						mt={4}
						onClick={handler}
						_hover={{ borderColor: colors.MAINGREEN }}
					>
						{cta}
					</Button>
				) : (
					<Button
						py={6}
						bgColor={"white"}
						color={colors.MAINGREEN}
						fontWeight="light"
						w="100%"
						mt={4}
						onClick={handler}
						borderColor={colors.MAINGREEN}
						borderWidth={2}
						_hover={{ borderColor: colors.MAINGREEN }}
					>
						{cta}
					</Button>
				)}
				{!premium && (
					<Stack flexDir="row" alignItems="center">
						<Text color={colors.MAINDARK} fontSize="sm" textAlign="center" fontWeight="light">
							No credit card required.
						</Text>
					</Stack>
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
		</>
	);
};
export default PricingHomeComponent;
