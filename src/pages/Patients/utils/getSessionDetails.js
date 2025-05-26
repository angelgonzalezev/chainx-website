export const getSessionDetails = (data) => {
	const msgText = `
  <div>
    <div class="section">
      <h2>📝 Resumen general de la sesión</h2>
      <p><em>${data.session_summary}</em></p>
    </div>
  
    <div class="section">
      <h2>🧠 Análisis emocional</h2>
      <ul>
        ${data.tone_analysis.emotions_detected
					.map(
						(e) =>
							`<li><span class="label">${e.emotion}</span> (${e.type}, intensidad: ${e.intensity}) — "${e.timestamp_text}" (disparador: ${e.trigger})</li>`
					)
					.join("")}
      </ul>
      <p><strong>Transiciones emocionales:</strong></p>
      <ul>
        ${data.tone_analysis.tone_changes
					.map((c) => `<li>De <em>${c.from}</em> a <em>${c.to}</em> — "${c.timestamp_text}"</li>`)
					.join("")}
      </ul>
    </div>
  
    <div class="section">
      <h2>🗣️ Patrones de lenguaje</h2>
      <p><strong>Temas recurrentes:</strong></p>
      <ul>${data.language_patterns.recurrent_themes.map((t) => `<li>${t}</li>`).join("")}</ul>
  
      <p><strong>Pensamientos negativos:</strong></p>
      <ul>${data.language_patterns.negative_thoughts.map((t) => `<li>"${t}"</li>`).join("")}</ul>
  
      <p><strong>Tendencias lingüísticas rígidas:</strong></p>
      <ul>${data.language_patterns.language_tendencies.map((t) => `<li>${t}</li>`).join("")}</ul>
  
      <p><strong>Metáforas emocionales:</strong></p>
      <ul>${data.language_patterns.metaphors.map((m) => `<li>"${m.text}" → simboliza: ${m.emotion}</li>`).join("")}</ul>
    </div>
  
    <div class="section">
      <h2>💪 Fortalezas y áreas de trabajo</h2>
      <p><strong>Fortalezas predominantes:</strong></p>
      <ul>${data.fortaleza_analysis.dominant_strengths.map((f) => `<li>${f}</li>`).join("")}</ul>
  
      <p><strong>Fortalezas en conflicto:</strong></p>
      <ul>${data.fortaleza_analysis.areas_of_improvement.map((f) => `<li>${f}</li>`).join("")}</ul>
  
      <p><strong>Fortalezas poco activadas:</strong></p>
      <ul>${data.fortaleza_analysis.underused_strengths.map((f) => `<li>${f}</li>`).join("")}</ul>
    </div>
  
    <div class="section">
      <h2>📈 Progresos y bloqueos</h2>
      <p><strong>Progresos:</strong></p>
      <ul>${data.progress_tracking.positive_changes.map((c) => `<li>${c}</li>`).join("")}</ul>
  
      <p><strong>Preocupaciones persistentes:</strong></p>
      <ul>${data.progress_tracking.concerns.map((c) => `<li>${c}</li>`).join("")}</ul>
  
      <p><strong>Insights:</strong></p>
      <ul>${data.progress_tracking.insight_moments.map((i) => `<li>${i}</li>`).join("")}</ul>
  
      <p><strong>Compromisos del paciente:</strong></p>
      <ul>${data.progress_tracking.commitments.map((c) => `<li>${c}</li>`).join("")}</ul>
    </div>
  
    <div class="section">
      <h2>⛔ Resistencias</h2>
      ${
				data.resistance.resistance_detections.length > 0
					? `<ul>${data.resistance.resistance_detections
							.map((r) => `<li>"${r.text}" (tipo: ${r.resistance_type})</li>`)
							.join("")}</ul>`
					: `<p>No se observaron resistencias significativas.</p>`
			}
    </div>
  
    <div class="section">
      <h2>👤 Autopercepción del paciente</h2>
      <p><strong>Afirmaciones positivas:</strong></p>
      <ul>${data.self_perception.positive_self_perception.map((p) => `<li>"${p}"</li>`).join("")}</ul>
  
      <p><strong>Afirmaciones negativas:</strong></p>
      <ul>${data.self_perception.negative_self_perception.map((n) => `<li>"${n}"</li>`).join("")}</ul>
    </div>
  
    <div class="section">
      <h2>⚖️ Conflictos emocionales</h2>
      <ul>${data.emotional_conflict.emotional_conflicts
				.map((c) => `<li>${c.conflict} → consecuencia: ${c.consequence}</li>`)
				.join("")}</ul>
    </div>
  
    <div class="section">
      <h2>👥 Vínculos emocionales sensibles</h2>
      <ul>${data.attachment_triggers.attachment_triggers
				.map((a) => `<li><strong>${a.figure}</strong> → emoción: ${a.emotion} — contexto: "${a.context}"</li>`)
				.join("")}</ul>
    </div>  
  </div>
  `;
	return msgText;
};
