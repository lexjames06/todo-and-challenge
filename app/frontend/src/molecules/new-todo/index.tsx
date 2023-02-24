import React, { useState } from "react";
import { useHandleTodos, useHandleUser } from "../../hooks";
import styles from "./NewTodo.module.css";

export const NewTodoForm = () => {
	const { createTodo } = useHandleTodos();
	const { user } = useHandleUser();

	const [text, setText] = useState<string>("");

	const updateText = (string: string) => {
		if (!string.includes("\n")) {
			setText(string);
		} else {
			onSubmit();
		}
	};

	const onSubmit = (e?: React.FormEvent) => {
		e?.preventDefault();

		createTodo({ text, userId: user?.id ?? "" });
		setText("");
	};

	return (
		<form className={styles.formContainer} onSubmit={(e) => onSubmit(e)}>
			<input type="submit" value="+" disabled={!text} />
			<textarea
        placeholder="Add a task"
        value={text}
        rows={1}
        onChange={(e) => updateText(e.currentTarget.value)}
      />
		</form>
	);
};
