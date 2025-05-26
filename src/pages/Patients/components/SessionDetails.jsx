import { getSessionDetails } from "../utils/getSessionDetails";

const SessionDetails = ({ data }) => {
	const html = getSessionDetails(data);
	return (
		<div dangerouslySetInnerHTML={{ __html: html }} />

		// <Stack>
		// 	<Text color={colors.MAINDARK} fontWeight="semibold">
		// 		🧠 Análisis emocional y de tono
		// 	</Text>
		// 	<ul>
		// 		{data.tone_analysis.emotions_detected
		// 			.map((e) => `${e.emotion} (${e.type}, ${e.intensity}) detectada en ${e.timestamp}`)
		// 			.join(" | ")}
		// 		{data.tone_analysis.tone_changes.map((t) => `${t.timestamp}: de ${t.from} a ${t.to}`).join(" | ")}
		// 	</ul>
		// 	<Text color={colors.MAINDARK} fontWeight="semibold">
		// 		🧱 Resistencias identificadas
		// 	</Text>
		// 	<ul>
		// 		{data.resistance.resistance_detections.map((r) => `${r.timestamp}: ${r.resistance_indication}`).join(" | ")}
		// 	</ul>

		// 	<Text color={colors.MAINDARK} fontWeight="semibold">
		// 		🔁 Temas recurrentes
		// 	</Text>
		// 	<ul>{data.language_patterns.recurrent_themes.map((t) => `${t.theme} (${t.timestamp})`).join(" | ")}</ul>

		// 	<Text color={colors.MAINDARK} fontWeight="semibold">
		// 		🧩 Pensamientos negativos expresados
		// 	</Text>
		// 	<ul>{data.language_patterns.negative_thoughts.map((t) => `"${t.thought}" (${t.timestamp})`).join(" | ")}</ul>

		// 	<Text color={colors.MAINDARK} fontWeight="semibold">
		// 		📈 Seguimiento del progreso
		// 	</Text>
		// 	<ul>{data.progress_tracking.concerns.map((c) => `Preocupación: ${c.concern} (${c.timestamp})`).join(" | ")}</ul>
		// 	<ul>
		// 		{data.progress_tracking.positive_changes
		// 			.map((c) => `Cambio positivo: ${c.change} (${c.timestamp})`)
		// 			.join(" | ")}
		// 	</ul>

		// 	<Text color={colors.MAINDARK} fontWeight="semibold">
		// 		💪 Fortalezas destacadas
		// 	</Text>
		// 	<ul>
		// 		<li>
		// 			<strong>Altas: </strong> {data.fortaleza_analysis.dominant_strengths.map((f) => f.strength).join(", ")}
		// 		</li>
		// 		<li>
		// 			<strong>En desarrollo: </strong>
		// 			{data.fortaleza_analysis.areas_of_improvement.map((f) => f.strength).join(", ")}
		// 		</li>
		// 	</ul>

		// 	<Text color={colors.MAINDARK} fontWeight="semibold">
		// 		🗣️ Participación
		// 	</Text>
		// 	<ul>
		// 		<li>Tiempo de habla de la paciente: {data.participation_level.patient_speaking_time}</li>
		// 		<li>Tiempo de intervención de la psicóloga: {data.participation_level.psychologist_speaking_time}</li>
		// 		<li>Número de interrupciones: {data.interruption_analysis.interruption_count}</li>
		// 	</ul>
		// </Stack>
	);
};
export default SessionDetails;
