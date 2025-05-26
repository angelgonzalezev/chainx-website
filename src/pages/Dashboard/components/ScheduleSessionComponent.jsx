import { Button, Stack, Text } from "@chakra-ui/react";
import {
	DialogActionTrigger,
	DialogBody,
	DialogCloseTrigger,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogRoot,
	DialogTitle,
} from "../../../components/ui/dialog";
import { X } from "lucide-react";
import { colors } from "../../../constants/colors";
import { useEffect, useState } from "react";
import SelectPatientComponent from "./SelectPatientComponent";
import { getAllPatients } from "../../../services/patientService";

const ScheduleSessionComponent = ({ open, setOpen }) => {
	const [error, setError] = useState(null);
	const [patients, setPatients] = useState([]);
	const [selectedPatient, setSelectedPatient] = useState([]);

	const patientList = patients.map((patient) => ({
		label: patient.fullname,
		value: patient.id,
	}));

	useEffect(() => {
		const getPatients = async () => {
			const response = await getAllPatients();
			if (response.success) {
				setPatients(response.data);
			}
		};
		getPatients();
	}, []);

	return (
		<DialogRoot
			placement="center"
			motionPreset="slide-in-bottom"
			lazyMount
			open={open}
			onOpenChange={(e) => setOpen(e.open)}
		>
			<DialogContent bgColor="white">
				<DialogHeader p="24px">
					<DialogTitle fontSize="xl">Schedule new session</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<Stack>
						<Text fontSize="lg" fontWeight="semibold">
							Select Patient
						</Text>
						<SelectPatientComponent
							patients={patientList}
							selectedPatient={selectedPatient}
							setSelectedPatient={setSelectedPatient}
						/>
					</Stack>
					{error && <Text color="red">{error}</Text>}
				</DialogBody>

				<DialogFooter>
					<DialogActionTrigger asChild>
						<Button bgColor="white" borderWidth="1px" borderColor={colors.BORDERGRAY}>
							Cancel
						</Button>
					</DialogActionTrigger>
					<Button bgColor={colors.MAINGREEN} color="white" onClick={() => null}>
						Add Patient
					</Button>
				</DialogFooter>
				<DialogCloseTrigger
					bgColor="white"
					p="0px"
					borderColor={colors.BORDERGRAY}
					_focus={{ outline: "none" }}
					_hover={{ borderColor: colors.MAINDARK, color: colors.MAINDARK }}
				>
					<X />
				</DialogCloseTrigger>
			</DialogContent>
		</DialogRoot>
	);
};

export default ScheduleSessionComponent;
