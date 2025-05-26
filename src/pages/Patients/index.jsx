import { Button, Center, Stack, Text } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { colors } from "../../constants/colors";
import PatientTableComponent from "./components/PatientTableComponent";
import { useEffect, useState } from "react";
import CreateNewPatientComponent from "./components/CreateNewPatientComponent";
import { getAllPatients } from "../../services/patientService";
import PatientDetailsComponent from "./components/PatientDetailsComponent";
import UpdatePatientComponent from "./components/UpdatePatientComponent";
import { useCrypto } from "../../hooks/useCrypto";
import { useSelector } from "react-redux";

const Patients = () => {
	const { decrypt } = useCrypto();
	const { id: userId } = useSelector((store) => store.user);

	const [openNewPationModal, setOpenNewPatientModal] = useState(false);
	const [selectedPatient, setSelectedPatient] = useState(undefined);
	const [openUpdatePatient, setOpenUpdatePatient] = useState(false);
	const [patients, setPatients] = useState([]);

	useEffect(() => {
		const handleDecrypt = async ({ details, iv, salt, id, created_at, total_sessions }) => {
			const decryptResult = await decrypt(details, userId, iv, salt);
			return { id, created_at, total_sessions, ...JSON.parse(decryptResult) };
		};

		const getPatients = async () => {
			const response = await getAllPatients();

			if (response.success) {
				const decryptedData = await Promise.all(response.data.map((item) => handleDecrypt(item)));
				setPatients(decryptedData);
			}
		};
		getPatients();
	}, [openNewPationModal, openUpdatePatient]);

	return (
		<Stack w="100%">
			<Stack flexDirection="row" alignItems="center" justifyContent="space-between">
				<Text fontSize="2xl" fontWeight="bold" color={colors.MAINDARK}>
					Patients
				</Text>
				<Button
					bgColor={colors.MAINGREEN}
					color="white"
					fontWeight="medium"
					onClick={() => setOpenNewPatientModal(true)}
					fontSize={{ base: "xs", md: "lg" }}
					cursor="pointer"
				>
					<Plus color="white" /> Add New Patient
				</Button>
			</Stack>
			<PatientTableComponent
				patients={patients}
				setSelectedPatient={setSelectedPatient}
				setUpdateUser={setOpenUpdatePatient}
			/>
			{patients.length === 0 ? (
				<Center w="100%" pt={8}>
					<Button
						bgColor={colors.MAINGREEN}
						color="white"
						fontWeight="medium"
						onClick={() => setOpenNewPatientModal(true)}
						fontSize={{ base: "xs", md: "lg" }}
						cursor="pointer"
					>
						<Plus color="white" /> Add Your First Patient
					</Button>
				</Center>
			) : null}
			<CreateNewPatientComponent open={openNewPationModal} setOpen={setOpenNewPatientModal} />
			<PatientDetailsComponent patientId={selectedPatient} setOpen={setSelectedPatient} />
			<UpdatePatientComponent open={openUpdatePatient} setOpen={setOpenUpdatePatient} />
		</Stack>
	);
};
export default Patients;
