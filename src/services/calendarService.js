import axios from "axios";
import { env } from "../constants/env";

export const connectCalendarService = async (email) => {
	const API_URL = env.VITE_CAL_API_URL;
	const CLIENT_ID = env.VITE_CAL_CLIENT_ID;
	const CLIENT_SECRET = env.VITE_CAL_CLIENT_SECRET;

	const body = {
		email,
		timeFormat: 12,
		weekStart: "Monday",
		timeZone: "Europe/Madrid",
		name: "",
	};

	const headers = {
		"x-cal-secret-key": CLIENT_SECRET,
	};

	try {
		const response = await axios.post(`${API_URL}/${CLIENT_ID}/users`, body, {
			headers,
		});
		console.log("🚀 ~ connectCalendarService ~ response:", response);

		console.log("Server Response:", response.data);
	} catch (error) {
		console.error("Error uploading file:", error);
	}
};
