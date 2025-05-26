import { env } from "../constants/env";
import supabase from "../supabase/supabaseClient";

export const createNewAccount = async ({ email, password, fullname }) => {
	try {
		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: { full_name: fullname }, // Store additional data
			},
		});
		if (error) {
			return { success: false, error: error.message };
		} else {
			const { error } = await supabase.from("customers").insert([{ email }]);
			if (error) {
				return { success: false, error: error.message };
			} else {
				return { success: true };
			}
		}
	} catch (e) {
		console.log("🚀 ~ createNewAccount ~ e:", e);
	}
};

export const loginWithPassword = async ({ email, password }) => {
	try {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			return { success: false, error: error.message };
		} else {
			return { success: true };
		}
	} catch (e) {
		console.log("🚀 ~ createNewAccount ~ e:", e);
	}
};

export const resetPasswordByEmail = async (email) => {
	try {
		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${env.VITE_WEB_DOMAIN}reset-password`,
		});
		if (error) {
			return { success: false, error: error.message };
		} else {
			return { success: true };
		}
	} catch (e) {
		console.log("🚀 ~ createNewAccount ~ e:", e);
	}
};

export const insertSessions = async ({ publicUrl, patientId }) => {
	const { error } = await supabase.from("sessions").insert([{ file_path: publicUrl, patient_id: patientId }]);
	if (error) {
		return { success: false, error: error.message };
	} else {
		return { success: true };
	}
};

export const updateUserFullname = async (fullname) => {
	try {
		const { error } = await supabase.auth.updateUser({
			data: { full_name: fullname },
		});
		if (error) {
			return { success: false, error: error.message };
		}
		return { success: true };
	} catch (e) {
		console.log("🚀 ~ createNewAccount ~ e:", e);
	}
};

export const updateUserEmail = async (email) => {
	try {
		const { error } = await supabase.auth.updateUser({
			email,
		});
		if (error) {
			return { success: false, error: error.message };
		}
		return { success: true };
	} catch (e) {
		console.log("🚀 ~ createNewAccount ~ e:", e);
	}
};
