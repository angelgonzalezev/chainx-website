import { Box, Heading, Text } from "@chakra-ui/react";
import { colors } from "../../../constants/colors";

const Section = ({ title, children }) => (
	<Box mb={4} borderBottomWidth={1} borderColor={colors.TEXTGRAY} pb={4}>
		<Heading size="md" mb={2}>
			{title}
		</Heading>
		{children}
	</Box>
);

const renderList = (items) => {
	return (
		<>
			{items.map((item, idx) => (
				<Text key={idx}>· {item}</Text>
			))}
		</>
	);
};

// const SessionSummary = ({ data }) => {
// 	if (!data) return <Text>No data available.</Text>;

// 	return (
// 		<Box pt={2} maxW="4xl" mx="auto">
// 			<Section title="🧠 Análisis Emocional">
// 				<Heading size="sm">Emociones Detectadas:</Heading>
// 				{renderList(
// 					data.tone_analysis.emotions_detected.map(
// 						(e) =>
// 							`- ${e.emotion} (${e.type}, intensidad: ${e.intensity}) — "${e.timestamp_text}" (disparador: ${e.trigger})`
// 					)
// 				)}
// 				<Heading size="sm" mt={4}>
// 					Cambios de Tono:
// 				</Heading>
// 				{renderList(data.tone_analysis.tone_changes.map((c) => `De "${c.from}" a "${c.to}" — "${c.timestamp_text}"`))}
// 			</Section>

// 			<Section title="🗣️ Patrones de Lenguaje">
// 				<Heading size="sm">Temas Recurrentes:</Heading>
// 				{renderList(data.language_patterns.recurrent_themes)}
// 				<Heading size="sm" mt={4}>
// 					Pensamientos Negativos:
// 				</Heading>
// 				{renderList(data.language_patterns.negative_thoughts)}
// 				<Heading size="sm" mt={4}>
// 					Tendencias Lingüísticas:
// 				</Heading>
// 				{renderList(data.language_patterns.language_tendencies)}
// 				<Heading size="sm" mt={4}>
// 					Metáforas:
// 				</Heading>
// 				{renderList(data.language_patterns.metaphors.map((m) => `"${m.text}" → ${m.emotion}`))}
// 			</Section>

// 			<Section title="💪 Análisis de Fortalezas">
// 				<Heading size="sm">Fortalezas Predominantes:</Heading>
// 				{renderList(data.fortaleza_analysis.dominant_strengths)}
// 				<Heading size="sm" mt={4}>
// 					Fortalezas en Mejora:
// 				</Heading>
// 				{renderList(data.fortaleza_analysis.areas_of_improvement)}
// 				<Heading size="sm" mt={4}>
// 					Fortalezas Infravaloradas:
// 				</Heading>
// 				{renderList(data.fortaleza_analysis.underused_strengths)}
// 			</Section>

// 			<Section title="📈 Progreso en la Sesión">
// 				<Heading size="sm">Cambios Positivos:</Heading>
// 				{renderList(data.progress_tracking.positive_changes)}
// 				<Heading size="sm" mt={4}>
// 					Preocupaciones:
// 				</Heading>
// 				{renderList(data.progress_tracking.concerns)}
// 				<Heading size="sm" mt={4}>
// 					Momentos de Insight:
// 				</Heading>
// 				{renderList(data.progress_tracking.insight_moments)}
// 				<Heading size="sm" mt={4}>
// 					Compromisos del Paciente:
// 				</Heading>
// 				{renderList(data.progress_tracking.commitments)}
// 			</Section>

// 			<Section title="⛔ Resistencias">
// 				{data.resistance.resistance_detections.length > 0 ? (
// 					renderList(data.resistance.resistance_detections.map((r) => `"${r.text}" (tipo: ${r.resistance_type})`))
// 				) : (
// 					<Text>No se observaron resistencias significativas.</Text>
// 				)}
// 			</Section>

// 			<Section title="👤 Autopercepción">
// 				<Heading size="sm">Positiva:</Heading>
// 				{renderList(data.self_perception.positive_self_perception)}
// 				<Heading size="sm" mt={4}>
// 					Negativa:
// 				</Heading>
// 				{renderList(data.self_perception.negative_self_perception)}
// 			</Section>

// 			<Section title="⚖️ Conflictos Emocionales">
// 				{renderList(
// 					data.emotional_conflict.emotional_conflicts.map((c) => `${c.conflict} → consecuencia: ${c.consequence}`)
// 				)}
// 			</Section>

// 			<Section title="👥 Disparadores Afectivos">
// 				{renderList(
// 					data.attachment_triggers.attachment_triggers.map(
// 						(a) => `${a.figure} → emoción: ${a.emotion} — contexto: "${a.context}"`
// 					)
// 				)}
// 			</Section>
// 		</Box>
// 	);
// };

const SessionSummaryV3 = ({ data }) => {
	if (!data) return <Text>No data available.</Text>;

	return (
		<Box pt={2} maxW="4xl" mx="auto" w="100%">
			{data.session_bullets && <Section title="🎯 Puntos de la sesión">{renderList(data.session_bullets)}</Section>}
			{data.therapist_recommendations && (
				<Section title="💬 Recomendaciones del terapeuta">{renderList(data.therapist_recommendations)}</Section>
			)}

			{data.progress_tracking && (
				<Section title="📈 Progresos y bloqueos">
					<Heading size="sm">Cambios Positivos:</Heading>
					{renderList(data.progress_tracking.positive_changes)}
					<Heading size="sm" mt={4}>
						Preocupaciones:
					</Heading>
					{renderList(data.progress_tracking.concerns)}
					<Heading size="sm" mt={4}>
						Momentos de Insight:
					</Heading>
					{renderList(data.progress_tracking.insight_moments)}
					<Heading size="sm" mt={4}>
						Compromisos del Paciente:
					</Heading>
					{renderList(data.progress_tracking.commitments)}
				</Section>
			)}
		</Box>
	);
};

export default SessionSummaryV3;
