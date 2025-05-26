export const capitalizeFirstLetter = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isValidEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const isEmptyPassword = (password) => {
	const validation = typeof password === "string" && password.trim().length > 0;
	return !validation;
};

export const isEmptyString = (str) => {
	const validation = typeof str === "string" && str.trim().length > 0;
	return !validation;
};

export const checkPath = (path, currentPath) => {
	return currentPath === path;
};

export const getFormattedDate = (date) => {
	const _date = new Date(date);
	const formattedDate = _date.toLocaleDateString("es-ES", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	return formattedDate;
};
export const shortenName = (fullName) => {
	const names = fullName.split(" ");

	if (names.length < 3) return fullName; // If there's only one name, return it as is.

	return (
		names[0] +
		" " +
		names
			.slice(1)
			.map((n) => n.charAt(0) + ".")
			.join(" ")
	);
};
