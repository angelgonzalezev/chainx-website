// useCrypto.ts
import { useCallback } from "react";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

// Function to create a cryptographic key from a password and salt
async function createKeyFromPassword(password, salt) {
	// Import the password as a raw cryptographic key
	const baseKey = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveKey"]);

	// Derive a key using PBKDF2 with the provided salt, iterations, and hash algorithm
	return crypto.subtle.deriveKey(
		{
			name: "PBKDF2", // Key derivation algorithm
			salt: encoder.encode(salt), // Salt to make the key derivation more secure
			iterations: 100_000, // Number of iterations for the key derivation
			hash: "SHA-256", // Hash algorithm to use
		},
		baseKey, // Base key derived from the password
		{ name: "AES-GCM", length: 256 }, // Key type and length for AES-GCM encryption
		false, // Key is not extractable
		["encrypt", "decrypt"] // Key usage for encryption and decryption
	);
}

export function useCrypto() {
	// Encrypt text
	const encrypt = useCallback(async (text, password, salt) => {
		const key = await createKeyFromPassword(password, salt);
		const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV

		const encryptedBuffer = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoder.encode(text));

		return {
			encrypted: btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer))),
			iv: Array.from(iv),
			salt,
		};
	}, []);

	// Decrypt text
	const decrypt = useCallback(async (encryptedB64, password, ivArray, salt) => {
		const key = await createKeyFromPassword(password, salt);
		const iv = new Uint8Array(ivArray);

		const encryptedBytes = Uint8Array.from(atob(encryptedB64), (c) => c.charCodeAt(0));

		const decryptedBuffer = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encryptedBytes);

		const decryptedText = decoder.decode(decryptedBuffer);

		return decryptedText;
	}, []);

	return { encrypt, decrypt };
}
