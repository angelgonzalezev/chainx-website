import supabase from "../supabase/supabaseClient";

/***
 * Upload Audio to Supabase and create session on DDBB to trigger edge function (AI)
 */
export const uploadAudio = async (recordedURL, sessionName) => {
	if (!recordedURL) return;

	// Fetch recorded blob from the URL
	// const response = await fetch(
	// 	"https://zrbkkhfwjxllzbupywnh.supabase.co/storage/v1/object/sign/session-audios/video-largo-2.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJzZXNzaW9uLWF1ZGlvcy92aWRlby1sYXJnby0yLm1wMyIsImlhdCI6MTc0NDA2NDk1MywiZXhwIjoxNzQ0NjY5NzUzfQ.oRB7Co_X0_-0mB9nJ5FOHzK_Tfu0KrIbuSNeiahr6-A"
	// );
	const response = await fetch(recordedURL);
	const blob = await response.blob();

	// Convert Blob to File
	const file = new File([blob], sessionName, { type: "audio/webm" });

	// Upload to Supabase Storage
	const filePath = file.name;
	const { error } = await supabase.storage.from("session-audios").upload(filePath, file, {
		contentType: "audio/mp3",
	});

	if (error) {
		console.error("Error uploading audio:", error.message);
		return { success: false, error: error.message };
	}

	// Get the public URL
	const { data: publicUrlData } = supabase.storage.from("session-audios").getPublicUrl(filePath);
	return { success: true, data: publicUrlData };
};
