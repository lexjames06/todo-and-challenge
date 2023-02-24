import { Link } from "react-router-dom";
import { HidePasswordIcon, ShowPasswordIcon } from "../../assets";
import { SpinnerContainer } from "../../molecules";
import type { FormSchema } from "../../types";
import styles from "./LoginRegisterForm.module.css";

type LoginRegisterFormProps = {
	schema: FormSchema;
	isSubmitting: boolean;
};

export const LoginRegisterForm = ({ schema: { fields, submit, cta }, isSubmitting }: LoginRegisterFormProps) => {
	return (
			<form className={styles.container} onSubmit={submit.onSubmit}>
				{fields.map((field) => (
					<div key={field.name} className={styles.inputContainer}>
						<input
							type={field.passwordToggle && !field.showPassword ? "password" : "text"}
							name={field.name}
							data-dirty={!!field.value}
							data-state={!!field.error ? "error" : "default"}
							value={field.value}
							onChange={(e) => field.onChange(e.currentTarget.value)}
							onBlur={field.onBlur}
							{...field.additionalAttributes}
						/>
						<label htmlFor={field.name} data-state={!!field.error ? "error" : "default"}>
							{field.label}
						</label>
						{field.passwordToggle && (
							<span onClick={() => field.onToggle?.((show) => !show)}>
								{field.showPassword ? <HidePasswordIcon /> : <ShowPasswordIcon />}
							</span>
						)}
						{!!field.error && <p className={styles.errorMessage}>{field.error.message}</p>}
					</div>
				))}

				<div className={styles.submitContainer}>
					<SpinnerContainer isLoading={isSubmitting}>
						<input
							type="submit"
							onSubmit={submit.onSubmit}
							value={submit.buttonLabel}
							disabled={submit.isDisabled}
						/>
					</SpinnerContainer>
				</div>

				<div className={styles.divider}>
					<span className={styles.dividerLine} />
					<p>or</p>
					<span className={styles.dividerLine} />
				</div>

				<div className={styles.registerLoginCta}>
					<p>{cta.text}</p>
					<Link to={cta.linkHref}>{cta.linkText}</Link>
				</div>
			</form>
	);
};
