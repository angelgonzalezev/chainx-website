import { Button, Center, Stack, Text, Textarea } from "@chakra-ui/react";
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
import { NotebookPen, X } from "lucide-react";
import { colors } from "../../../constants/colors";
import { useEffect, useState } from "react";
import AuthFieldComponent from "../../../components/AuthFieldComponent";
import { getPatientInfoService, getPatientNotesService, updatePatientService } from "../../../services/patientService";
import { getFormattedDate, isValidEmail } from "../../../utilities/utils";
import { useCrypto } from "../../../hooks/useCrypto";
import { useSelector } from "react-redux";

const UpdatePatientComponent = ({ open: patientId, setOpen }) => {
	const { decrypt } = useCrypto();
	const { id: userId } = useSelector((store) => store.user);

	const { encrypt } = useCrypto();

	const [form, setForm] = useState();
	const [notes, setNotes] = useState([]);
	const [error, setError] = useState(null);
	const [newNote, setNewNote] = useState();

	useEffect(() => {
		if (patientId) {
			const getPatientInfo = async () => {
				const handleDecrypt = async ({ details, iv, salt, id, created_at }) => {
					const decryptResult = await decrypt(details, userId, iv, salt);
					return { id, created_at, ...JSON.parse(decryptResult) };
				};

				const response = await getPatientInfoService(patientId);
				if (response.success) {
					const decryptedData = await Promise.all(response.data.map((item) => handleDecrypt(item)));
					const patient = decryptedData[0];
					setForm({ fullname: patient.fullname, email: patient.email, phone: patient?.phone });
				}
			};
			getPatientInfo();
		}
	}, [patientId]);

	useEffect(() => {
		if (patientId) {
			const getPatientNotes = async () => {
				const response = await getPatientNotesService(patientId);
				if (response?.success) {
					const _notes = response.data;
					setNotes(_notes);
				}
			};
			getPatientNotes();
		}
	}, [patientId]);

	const handleOnChange = (e) => {
		const { value, name } = e.target;
		setForm({ ...form, [name]: value });
	};

	const checkIsValidForm = () => {
		if (form?.fullname && form?.fullname.length === 0) {
			setError("Please, fill the fullname");
			return false;
		} else if ((form?.email && form?.email?.length === 0) || (form?.email && !isValidEmail(form?.email))) {
			setError("The email is not formatted correctly");
			return false;
		} else {
			return true;
		}
	};

	const handleEncrypt = async () => {
		return await encrypt(JSON.stringify(form), userId, userId);
	};

	const handleOnUpdate = async () => {
		if (checkIsValidForm()) {
			const encryptedData = await handleEncrypt();

			const response = await updatePatientService(patientId, encryptedData, newNote);
			if (response.success) {
				setError(null);
				setForm();
				setNotes([]);
				setNewNote();
				setOpen(false);
			} else {
				setError(response.error);
			}
		}
	};

	return (
		<DialogRoot
			placement="center"
			motionPreset="slide-in-bottom"
			lazyMount
			open={patientId}
			onOpenChange={(e) => setOpen(e.open)}
			size="lg"
		>
			<DialogContent bgColor="white" mt={8}>
				<DialogHeader p="24px">
					<DialogTitle fontSize="xl">Update Patient</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<Stack>
						<Text fontSize="lg" fontWeight="semibold">
							Personal Information
						</Text>
						<AuthFieldComponent
							label="Full name"
							placeholder="Name Lastname"
							name="fullname"
							value={form?.fullname}
							onChange={handleOnChange}
						/>
						<AuthFieldComponent
							label="Email"
							placeholder="you@example.com"
							name="email"
							onChange={handleOnChange}
							value={form?.email}
						/>
						<AuthFieldComponent
							label="Phone"
							placeholder="+34 000000000"
							name="phone"
							onChange={handleOnChange}
							type="tel"
							value={form?.phone}
						/>
						<Text color={colors.MAINDARK} fontWeight="medium">
							Notes
						</Text>
						<Textarea placeholder="Write your notes..." name="notes" onChange={(e) => setNewNote(e.target.value)} />
						{notes?.map((item, idx) => (
							<Stack p={4} bgColor={colors.MAINBG} borderRadius="lg" key={idx}>
								<Stack flexDirection="row" alignItems="center">
									<Center color={colors.TEXTGRAY}>
										<NotebookPen size="15px" />
									</Center>
									<Text color={colors.MAINDARK} fontSize="md" fontWeight="semibold">
										Note #{notes.length - idx}
									</Text>
									<Text color={colors.TEXTGRAY} fontSize="md">
										{getFormattedDate(item.created_at)}
									</Text>
								</Stack>
								<Text>{item.note}</Text>
							</Stack>
						))}
					</Stack>
					{error && <Text color="red">{error}</Text>}
				</DialogBody>

				<DialogFooter>
					<DialogActionTrigger asChild>
						<Button bgColor="white" borderWidth="1px" borderColor={colors.BORDERGRAY}>
							Cancel
						</Button>
					</DialogActionTrigger>
					<Button bgColor={colors.MAINGREEN} color="white" onClick={handleOnUpdate}>
						Update Patient
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

export default UpdatePatientComponent;
