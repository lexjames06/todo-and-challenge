import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHandleUser } from "../../hooks";
import { LoginRegisterForm } from "../../organisms";
import { validateConfirmPassword, validateEmail, validatePassword, validateUsername } from "../../organisms/login-register-form/validate";
import type { FormErrors, FormSchema } from "../../types";
import styles from "./Register.module.css";

export const RegisterPage = () => {
  const navigate = useNavigate();
	const { user, userLoading, userError, clearErrors, registerUser } = useHandleUser();

	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [errors, setErrors] = useState<FormErrors>({});

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const errorsExist =  Object.values(errors).some((value) => value);
	const isFormPopulated = !!username && !!email && !!password && !!confirmPassword;

  const onSubmit = (
    e: React.FormEvent,
  ) => {
		e.preventDefault();

		if (errorsExist) {
			return;
		}

		if (email && password && username) {
			registerUser({ username, email, password });
		}
	};

  const registerSchema: FormSchema = {
    submit: {
      onSubmit,
      buttonLabel: "Register",
      isDisabled: errorsExist || !isFormPopulated,
    },
    cta: {
      text: "Already have an account?",
      linkText: "Login",
      linkHref: "/login",
    },
    fields: [
      {
        name: "username",
        label: "Username",
        value: username,
        error: errors.username,
        passwordToggle: false,
        additionalAttributes: {
          maxLength: 20,
        },
        onBlur: () => validateUsername({ username, setErrors }),
        onChange: setUsername,
      },
      {
        name: "email",
        label: "Email",
        value: email,
        error: errors.email,
        passwordToggle: false,
        onBlur: () => validateEmail({ email, formType: "register", setErrors }),
        onChange: setEmail,
      },
      {
        name: "password",
        label: "Password",
        value: password,
        error: errors.password,
        passwordToggle: true,
        showPassword: showPassword,
        onBlur: () => validatePassword({ password, formType: "register", setErrors }),
        onChange: setPassword,
        onToggle: setShowPassword,
      },
      {
        name: "confirmPassword",
        label: "Confirm password",
        value: confirmPassword,
        error: errors.confirmPassword,
        passwordToggle: true,
        showPassword: showConfirmPassword,
        onBlur: () => validateConfirmPassword({ confirmPassword, password, setErrors }),
        onChange: setConfirmPassword,
        onToggle: setShowConfirmPassword,
      },
    ],
  };

  useEffect(() => {
		if (user?.id) {
			navigate(`/${user.id}/`);
		}
	}, [user, navigate]);

  useEffect(() => {
    return () => {
      clearErrors();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user?.idle || userLoading) {
		return null;
	}

  return (
    <div className={styles.container}>
      <h1>Register</h1>
      {!!userError && !!userError?.message && (
        <p className={styles.errorMessage}>{userError.message}</p>
      )}
      <LoginRegisterForm schema={registerSchema} isSubmitting={userLoading} />
    </div>
  )
}
