import { Avatar, Center, HStack, Table } from "@chakra-ui/react";
import { Edit, Eye, Mic } from "lucide-react";
import { colors } from "../../../constants/colors";
import { useNavigate } from "react-router";
import { PrivateRoutes } from "../../../routes/routes";
import { shortenName } from "../../../utilities/utils";

const PatientTableComponent = ({ patients, setSelectedPatient, setUpdateUser }) => {
	const navigate = useNavigate();

	const handleRecordSession = (patientId) => {
		navigate(PrivateRoutes.RecordSession, { state: { patientId } });
	};

	return (
		<Table.Root size="xl" colorPalette="gray">
			<Table.Header>
				<Table.Row bgColor={colors.LIGHTBG}>
					<Table.ColumnHeader
						color={colors.MAINDARK}
						py="16px"
						px={{ base: "6px", md: "24px" }}
						fontSize="xs"
						borderColor={colors.BORDERGRAY}
					>
						Patient
					</Table.ColumnHeader>
					<Table.ColumnHeader
						color={colors.MAINDARK}
						py="16px"
						px={{ base: "6px", md: "24px" }}
						fontSize="xs"
						borderColor={colors.BORDERGRAY}
					>
						Created at
					</Table.ColumnHeader>
					<Table.ColumnHeader
						color={colors.MAINDARK}
						py="16px"
						px={{ base: "6px", md: "24px" }}
						fontSize="xs"
						borderColor={colors.BORDERGRAY}
					>
						Nº Sessions
					</Table.ColumnHeader>
					<Table.ColumnHeader
						color={colors.MAINDARK}
						py="16px"
						px={{ base: "6px", md: "24px" }}
						fontSize="xs"
						borderColor={colors.BORDERGRAY}
					>
						Actions
					</Table.ColumnHeader>
				</Table.Row>
			</Table.Header>

			<Table.Body borderBottomRadius="xl">
				{patients.map((item, idx) => (
					<Table.Row key={idx} bgColor="white">
						<Table.Cell
							py="16px"
							px={{ base: "6px", md: "24px" }}
							fontSize="sm"
							borderTopWidth="1px"
							borderColor={colors.BORDERGRAY}
							borderBottomWidth="0px"
						>
							<HStack spacing={2}>
								<Avatar.Root size={"xs"}>
									<Avatar.Fallback name={item.fullname} />
								</Avatar.Root>
								{shortenName(item.fullname)}
							</HStack>
						</Table.Cell>
						<Table.Cell
							py="16px"
							px={{ base: "6px", md: "24px" }}
							fontSize="sm"
							borderTopWidth="1px"
							borderColor={colors.BORDERGRAY}
							borderBottomWidth="0px"
						>
							{new Date(item.created_at).toLocaleDateString()}
						</Table.Cell>
						<Table.Cell
							py="16px"
							px={{ base: "6px", md: "24px" }}
							fontSize="sm"
							borderTopWidth="1px"
							borderColor={colors.BORDERGRAY}
							borderBottomWidth="0px"
						>
							{item.total_sessions}
						</Table.Cell>
						<Table.Cell
							py="16px"
							px={{ base: "6px", md: "24px" }}
							fontSize="sm"
							borderTopWidth="1px"
							borderBottomWidth="0px"
							borderColor={colors.BORDERGRAY}
						>
							<HStack spacing={2}>
								<Center
									color={colors.TEXTGRAY}
									_hover={{ color: colors.MAINDARK }}
									cursor="pointer"
									onClick={() => setSelectedPatient(item.id)}
								>
									<Eye size="20px" />
								</Center>
								<Center
									color={colors.TEXTGRAY}
									_hover={{ color: colors.MAINDARK }}
									cursor="pointer"
									onClick={() => setUpdateUser(item.id)}
								>
									<Edit size="20px" />
								</Center>
								<Center
									color={colors.MAINGREEN}
									cursor="pointer"
									borderWidth={1}
									borderColor={colors.MAINGREEN}
									p={1}
									borderRadius="md"
									_hover={{ color: "white", bgColor: colors.MAINGREEN }}
									onClick={() => handleRecordSession(item.id)}
								>
									<Mic size="15px" />
								</Center>
							</HStack>
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
};

export default PatientTableComponent;
