import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { colors } from "../../../constants/colors";

const SelectPatientComponent = ({ patients, selectedPatient, setSelectedPatient }) => {
	const patientCollection = createListCollection({
		items: patients,
	});

	return (
		<Select.Root
			collection={patientCollection}
			size="sm"
			width="100%"
			value={selectedPatient}
			onValueChange={(e) => setSelectedPatient(e.value)}
		>
			<Select.HiddenSelect />
			<Select.Control>
				<Select.Trigger bgColor="white" borderColor={colors.BORDERGRAY} w="100%">
					<Select.ValueText placeholder="Select patient" />
				</Select.Trigger>
				<Select.IndicatorGroup>
					<Select.Indicator />
				</Select.IndicatorGroup>
			</Select.Control>
			<Portal>
				<Select.Positioner>
					<Select.Content zIndex={20000} bgColor="white">
						{patientCollection.items.map((patient) => (
							<Select.Item item={patient} key={patient.value} bgColor="white">
								{patient.label}
								<Select.ItemIndicator />
							</Select.Item>
						))}
					</Select.Content>
				</Select.Positioner>
			</Portal>
		</Select.Root>
	);
};
export default SelectPatientComponent;
