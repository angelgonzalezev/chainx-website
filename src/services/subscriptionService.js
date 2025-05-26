import axios from "axios";
import { env } from "../constants/env";
import supabase from "../supabase/supabaseClient";

export const cancelSubscription = async (userId) => {
	const url = `${env.SUPABASE_PROJECT_URL}/functions/v1/cancel-subscription`;
	try {
		const { data } = await axios.post(url, {
			headers: {
				"Cancellation-Token": `${userId}`,
			},
		});

		if (data.success) {
			return { success: true, currentPeriodEnd: data.current_period_end };
		} else {
			return false;
		}
	} catch (error) {
		console.error("Error cancelling subscription:", error);
	}
};

export const checkPremiumSubscription = async (userId) => {
	const { data } = await supabase.from("customers").select("plan_description, expiration_date").eq("user_id", userId);
	if (data[0]?.plan_description === "PREMIUM") {
		return { isPremium: true, expirationDate: new Date(data[0].expiration_date) };
	} else {
		return { isPremium: false, expirationDate: null };
	}
};
