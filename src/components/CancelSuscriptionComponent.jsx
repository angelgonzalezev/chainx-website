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
} from "./ui/dialog";
import { ShieldX, X } from "lucide-react";
import { colors } from "../constants/colors";

const CancelSuscriptionComponent = ({ open, setOpen, currentPeriodEnd }) => {
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
						Subscription Cancelled
					</DialogTitle>
				</DialogHeader>
				<DialogBody>
					<Stack alignItems="center" gap={6}>
						<Text fontSize="lg" textAlign="center">
							Your subscription has been cancelled. You will still have access to premium features until your current
							billing cycle ends on .
						</Text>
						<Text fontSize="lg" textAlign="center">
							{new Date(currentPeriodEnd * 1000).toLocaleString()}
						</Text>
						<ShieldX size="80px" color={colors.RED} />
					</Stack>
				</DialogBody>
				<DialogFooter w="100%" justifyContent="center">
					<DialogActionTrigger asChild justifyContent="center">
						<Button bgColor="white" borderWidth="1px" borderColor={colors.BORDERGRAY} justifyContent="center">
							Got it
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
export default CancelSuscriptionComponent;
