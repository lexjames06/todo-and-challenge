export type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type FormErrors = {
  [key in keyof FormData]?: {
    message: string;
  };
};

export type FormFields = {
	value: string;
	label: string;
	name: string;
  error?: {
    message: string;
  };
	passwordToggle: boolean;
	showPassword?: boolean;
	additionalAttributes?: {
		[attr: string]: string | number | boolean,
	};
	onBlur: () => void;
	onChange: React.Dispatch<React.SetStateAction<string>>;
	onToggle?: React.Dispatch<React.SetStateAction<boolean>>,
}

export type FormSchema = {
	fields: FormFields[];
	submit: {
		buttonLabel: string;
		isDisabled: boolean;
		onSubmit: (e: React.FormEvent) => void;
	};
	cta: {
		text: string;
		linkText: string;
		linkHref: string;
	};
}