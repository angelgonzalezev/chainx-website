import { Box, Center } from "@chakra-ui/react";

const Loading = () => {
	return (
		<Center w="100vw" h="100vh" bgColor="hsl(222 85% 98% / 1)" position="fixed" top={0} left={0}>
			<Box mt={0} p={0} className="loader"></Box>
		</Center>
	);
};
export default Loading;
