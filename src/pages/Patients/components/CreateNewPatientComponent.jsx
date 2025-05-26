import { Button, Stack, Text, Textarea } from "@chakra-ui/react";
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
import { useState } from "react";
import AuthFieldComponent from "../../../components/AuthFieldComponent";
import { createNewPatient } from "../../../services/patientService";
import { isValidEmail } from "../../../utilities/utils";
import { useCrypto } from "../../../hooks/useCrypto";
import { useSelector } from "react-redux";

const initialFormState = { fullname: "", email: "", phone: "" };

const CreateNewPatientComponent = ({ open, setOpen }) => {
	const { id: userId } = useSelector((store) => store.user);

	const { encrypt } = useCrypto();

	const [form, setForm] = useState(initialFormState);
	const [initialNote, setInitialNote] = useState("");
	const [error, setError] = useState(null);

	const handleOnChange = (e) => {
		const { value, name } = e.target;
		setForm({ ...form, [name]: value });
	};

	const checkIsValidForm = () => {
		if (!form.fullname) {
			setError("Please, fill the fullname");
			return false;
		} else if (!isValidEmail(form.email)) {
			setError("The email is not formatted correctly");
			return false;
		} else {
			return true;
		}
	};

	const handleEncrypt = async () => {
		return await encrypt(JSON.stringify(form), userId, userId);
	};

	const handleOnCreate = async () => {
		if (checkIsValidForm()) {
			const encryptedData = await handleEncrypt();
			const response = await createNewPatient(encryptedData, initialNote);
			if (response.success) {
				setError(false);
				setForm(initialFormState);
				setInitialNote("");
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
			open={open}
			onOpenChange={(e) => setOpen(e.open)}
		>
			<DialogContent bgColor="white">
				<DialogHeader p="24px">
					<DialogTitle fontSize="xl">Create New Patient</DialogTitle>
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
							onChange={handleOnChange}
						/>
						<AuthFieldComponent label="Email" placeholder="you@example.com" name="email" onChange={handleOnChange} />
						<AuthFieldComponent
							label="Phone"
							placeholder="+34 000000000"
							name="phone"
							onChange={handleOnChange}
							type="tel"
						/>
						<Text color={colors.MAINDARK} fontWeight="medium">
							Note
						</Text>
						<Textarea placeholder="Write your notes..." name="notes" onChange={(e) => setInitialNote(e.target.value)} />
					</Stack>
					{error && <Text color="red">{error}</Text>}
				</DialogBody>

				<DialogFooter>
					<DialogActionTrigger asChild>
						<Button bgColor="white" borderWidth="1px" borderColor={colors.BORDERGRAY}>
							Cancel
						</Button>
					</DialogActionTrigger>
					<Button bgColor={colors.MAINGREEN} color="white" onClick={handleOnCreate}>
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

export default CreateNewPatientComponent;
