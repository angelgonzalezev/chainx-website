import { Center, Stack, Text } from "@chakra-ui/react";
import { colors } from "../constants/colors";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import supabase from "../supabase/supabaseClient";

const TopbarComponent = ({ ...props }) => {
	const [username, setUsername] = useState();

	useEffect(() => {
		const getSession = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();
			const { user } = session;
			const { user_metadata } = user;
			setUsername(user_metadata.full_name);
		};
		getSession();
	}, []);

	return (
		<Stack
			flexDirection="row"
			w="100%"
			h="63px"
			alignItems="center"
			color="black"
			px="24px"
			justifyContent="flex-end"
			gap={8}
			bgColor="white"
			{...props}
		>
			{/* <Center color={colors.TEXTGRAY} _hover={{ color: colors.MAINDARK }} cursor="pointer">
				<Bell size="20px" />
			</Center> */}
			<Stack flexDirection="row" alignItems="center">
				<Center color={colors.MAINDARK}>
					<User size="20px" />
				</Center>
				<Text fontSize="md" fontWeight="medium">
					{username}
				</Text>
			</Stack>
		</Stack>
	);
};
export default TopbarComponent;
