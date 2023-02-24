import { emailRegExp, passwordRegExp } from "../../utils";
import { FormErrors } from "../../types";

export const validateUsername = ({
	username,
	setErrors,
}: {
	username: string;
	setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}) => {
	if (!username.length) {
		setErrors((oldErrors) => ({ ...oldErrors, username: { message: "your username is required" } }));
	} else if (username.length < 4) {
		setErrors((oldErrors) => ({ ...oldErrors, username: { message: "your username must be at least 4 characters" } }));
	} else if (username.length > 20) {
		setErrors((oldErrors) => ({
			...oldErrors,
			username: { message: "your username must not be longer than 20 characters" },
		}));
	} else {
		setErrors((oldErrors) => ({ ...oldErrors, username: undefined }));
	}
};

export const validateEmail = ({
	email,
	formType,
	setErrors,
}: {
	email: string;
	formType: "login" | "register";
	setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}) => {
	if (!email.length) {
		setErrors((oldErrors) => ({ ...oldErrors, email: { message: "your email is required" } }));
	} else if (emailRegExp.test(email) || formType === "login") {
		setErrors((oldErrors) => ({ ...oldErrors, email: undefined }));
	} else {
		setErrors((oldErrors) => ({ ...oldErrors, email: { message: "invalid email address" } }));
	}
};

export const validatePassword = ({
	password,
	formType,
	setErrors,
}: {
	password: string;
	formType: "login" | "register";
	setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}) => {
	if (!password.length) {
		setErrors((oldErrors) => ({ ...oldErrors, password: { message: "your password is required" } }));
	} else if (formType === "login" || passwordRegExp.test(password)) {
		setErrors((oldErrors) => ({ ...oldErrors, password: undefined }));
	} else {
		setErrors((oldErrors) => ({
			...oldErrors,
			password: {
				message:
					"your password must have at least: 1 lower-case character, 1 upper-case character, 1 number and 1 special character (@$!%*?&)",
			},
		}));
	}
};

export const validateConfirmPassword = ({
	confirmPassword,
	password,
	setErrors,
}: {
	confirmPassword: string;
	password: string;
	setErrors: React.Dispatch<React.SetStateAction<FormErrors>>;
}) => {
	if (confirmPassword !== password) {
		setErrors((oldErrors) => ({ ...oldErrors, confirmPassword: { message: "must match your password" } }));
	} else {
		setErrors((oldErrors) => ({ ...oldErrors, confirmPassword: undefined }));
	}
};
