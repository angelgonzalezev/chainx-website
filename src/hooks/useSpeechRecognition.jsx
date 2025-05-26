/* eslint-disable no-undef */

import { useEffect, useState } from "react";

let recognition = null;
if ("webkitSpeechRecognition" in window) {
	recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true; // Allow partial results
	recognition.lang = "es-ES";
}

const useSpeechRecognition = () => {
	const [text, setText] = useState("");
	console.log("🚀 ~ useSpeechRecognition ~ text:", text);
	const [speech, setSpeech] = useState([]);
	console.log("🚀 ~ useSpeechRecognition ~ speech:", speech);
	const [isListening, setIsListening] = useState(false);

	useEffect(() => {
		if (!recognition) return;

		recognition.onresult = (event) => {
			const transcript = Array.from(event.results)
				.map((result) => result[0].transcript)
				.join(" ");
			setText(transcript);
		};

		recognition.onend = () => {
			console.log("Entra en onend");
			const _currentText = text;
			console.log("🚀 ~ useEffect ~ onend:", _currentText);
			const currentSpeech = [...speech].concat(_currentText);
			console.log("🚀 ~ useEffect ~ onend:", currentSpeech);
			setSpeech(currentSpeech);

			console.log("Speech recognition ended.");
			if (isListening) {
				recognition.start(); // Restart if it should continue listening
			}
		};

		recognition.onerror = (event) => {
			console.error("Speech recognition error", event);

			const _currentTextOnError = text;
			console.log("🚀 ~ useEffect ~ onerror:", _currentTextOnError);
			const currentSpeechOnError = [...speech].concat(_currentTextOnError);
			console.log("🚀 ~ useEffect ~ onerror:", currentSpeechOnError);
			setSpeech(currentSpeechOnError);

			if (isListening) {
				setTimeout(() => recognition.start(), 1000); // Restart after a short delay
			}
		};
	}, [isListening]);

	const startListening = () => {
		console.log("Entra en función start");
		const _currentText = text;
		console.log("🚀 ~ startListening ~ _currentText:", _currentText);
		if (_currentText.length) {
			console.log("🚀 ~ startListening ~ _currentText:", _currentText);
			const currentSpeech = [...speech].concat(_currentText);
			console.log("🚀 ~ startListening ~ currentSpeech:", currentSpeech);
			setSpeech(currentSpeech);
		}

		setText("");
		setIsListening(true);
		recognition.start();
	};

	const stopListening = () => {
		console.log("Entra en función stop");
		setIsListening(false);
		recognition.stop();
	};

	return {
		text,
		isListening,
		startListening,
		stopListening,
		hasRecognitionSupport: !!recognition,
	};
};

export default useSpeechRecognition;
