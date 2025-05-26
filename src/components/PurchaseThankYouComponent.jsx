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
} from "../components/ui/dialog";
import { ShieldCheck, X } from "lucide-react";
import { colors } from "../constants/colors";

const PurchaseThankYouComponent = ({ open, setOpen }) => {
	return (
		<DialogRoot
			placement="center"
			motionPreset="slide-in-bottom"
			lazyMount
			open={open}
			onOpenChange={(e) => setOpen(e.open)}
		>
			<DialogContent bgColor="white" borderRadius="2xl">
				<DialogHeader p="24px">
					<DialogTitle fontSize="xl" textAlign="center" fontWeight="bold">
						Welcome to Premium!
					</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<Stack alignItems="center" gap={6}>
						<Text fontSize="lg" textAlign="center">
							Thank you for going Premium! You’ve unlocked next-level features—let’s make the most of them!
						</Text>
						<ShieldCheck size="80px" color={colors.MAINGREEN} />
					</Stack>
				</DialogBody>
				<DialogFooter w="100%" justifyContent="center">
					<DialogActionTrigger asChild justifyContent="center">
						<Button
							bgColor="white"
							borderWidth="1px"
							borderColor={colors.BORDERGRAY}
							justifyContent="center"
							_hover={{ borderColor: colors.MAINGREEN }}
						>
							Thanks!
						</Button>
					</DialogActionTrigger>
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
export default PurchaseThankYouComponent;
