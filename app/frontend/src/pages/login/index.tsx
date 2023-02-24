import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHandleUser } from "../../hooks";
import { LoginRegisterForm } from "../../organisms";
import { validateEmail, validatePassword } from "../../organisms/login-register-form/validate";
import type { FormErrors, FormSchema } from "../../types";
import styles from "./Login.module.css";

export const LoginPage = () => {
  const navigate = useNavigate();
	const { user, userLoading, userError, clearErrors, loginUser } = useHandleUser();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errors, setErrors] = useState<FormErrors>({});
	const [showPassword, setShowPassword] = useState<boolean>(false);

  const errorsExist =  Object.values(errors).some((value) => value);
	const isFormPopulated = !!email && !!password;

  const onSubmit = (
    e: React.FormEvent,
  ) => {
		e.preventDefault();

		if (errorsExist) {
			return;
		}

		if (email && password) {
			loginUser({ email, password });
		}
	};

  const loginSchema: FormSchema = {
    submit: {
      onSubmit,
      buttonLabel: "Login",
      isDisabled: errorsExist || !isFormPopulated,
    },
    cta: {
      text: "Don't have an account yet?",
      linkText: "Register",
      linkHref: "/register",
    },
    fields: [
      {
        name: "email",
        label: "Email",
        value: email,
        error: errors.email,
        passwordToggle: false,
        onBlur: () => validateEmail({ email, formType: "login", setErrors }),
        onChange: setEmail,
      },
      {
        name: "password",
        label: "Password",
        value: password,
        error: errors.password,
        passwordToggle: true,
        showPassword: showPassword,
        onBlur: () => validatePassword({ password, formType: "login", setErrors }),
        onChange: setPassword,
        onToggle: setShowPassword,
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

  if (user?.idle) {
		return null;
	}

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      {!!userError && !!userError?.message && (
        <p className={styles.errorMessage}>{userError.message}</p>
      )}
      <LoginRegisterForm schema={loginSchema} isSubmitting={userLoading} />
    </div>
  )
}
