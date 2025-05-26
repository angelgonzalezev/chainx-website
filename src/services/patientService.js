import supabase from "../supabase/supabaseClient";
import { isEmptyString } from "../utilities/utils";

export const createNewPatient = async ({ encrypted, salt, iv }, initialNote) => {
	try {
		const { error, data } = await supabase
			.from("patients")
			.insert([
				{
					details: encrypted,
					salt,
					iv,
				},
			])
			.select();

		if (error) {
			return { success: false, error: error.message };
		} else {
			const { id } = data[0];
			if (!isEmptyString(initialNote)) {
				const { error } = await supabase.from("patient_notes").insert([
					{
						note: initialNote,
						patient_id: id,
					},
				]);
				if (error) {
					return { success: false, error: error.message };
				} else {
					return { success: true };
				}
			} else {
				return { success: true };
			}
		}
	} catch (e) {
		console.log("Error", e.message);
	}
};
export const updatePatientService = async (patientId, { encrypted, salt, iv }, newNote) => {
	try {
		const { error } = await supabase
			.from("patients")
			.update({
				details: encrypted,
				salt: salt,
				iv: iv,
			})
			.eq("id", patientId);

		if (error) {
			return { success: false, error: error.message };
		} else {
			if (!isEmptyString(newNote)) {
				const { error } = await supabase.from("patient_notes").insert([
					{
						note: newNote,
						patient_id: patientId,
					},
				]);
				if (error) {
					return { success: false, error: error.message };
				} else {
					return { success: true };
				}
			} else {
				return { success: true };
			}
		}
	} catch (e) {
		console.log("Error", e.message);
	}
};

export const getAllPatients = async () => {
	try {
		const { data: patientsData, error: patientsError } = await supabase
			.from("patients")
			.select("*")
			.order("created_at", { ascending: false });
		if (patientsData.length > 0) {
			const { data: sessionsData, error } = await supabase.rpc("count_sessions_by_patient");
			if (error) {
				return { success: false, error: "There were an expected error" };
			} else {
				const formattedData = patientsData.map((patient) => {
					const session = sessionsData.find((s) => s.patient_id === patient.id);
					return {
						...patient,
						total_sessions: session ? session.session_count : 0,
					};
				});

				return { success: true, data: formattedData };
			}
		} else {
			return { success: false, error: patientsError.message };
		}
	} catch (e) {
		console.log("Error", e.message);
	}
};

export const getPatientInfoService = async (patientId) => {
	try {
		const { data, error } = await supabase.from("patients").select("*").eq("id", patientId);
		if (data.length > 0) {
			return { success: true, data };
		} else {
			return { success: false, error: error.message };
		}
	} catch (e) {
		console.log("Error", e.message);
	}
};

export const getPatientSessionsService = async (patientId) => {
	try {
		const { data, error } = await supabase.from("sessions").select("*").eq("patient_id", patientId);
		if (data.length > 0) {
			return { success: true, data };
		} else {
			return { success: false, error: error.message };
		}
	} catch (e) {
		console.log("Error", e.message);
	}
};

export const getPatientNotesService = async (patientId) => {
	try {
		const { data, error } = await supabase
			.from("patient_notes")
			.select("note, created_at")
			.eq("patient_id", patientId)
			.order("created_at", { ascending: false });
		if (data.length > 0) {
			return { success: true, data };
		} else {
			return { success: false, error: error.message };
		}
	} catch (e) {
		console.log("Error", e.message);
	}
};

export const getPatientLastNoteService = async (patientId) => {
	try {
		const { data, error } = await supabase
			.from("patient_notes")
			.select("note, created_at")
			.eq("patient_id", patientId)
			.order("created_at", { ascending: false })
			.limit(1);
		if (data.length > 0) {
			return { success: true, data };
		} else {
			return { success: false, error: error.message };
		}
	} catch (e) {
		console.log("Error", e.message);
	}
};
