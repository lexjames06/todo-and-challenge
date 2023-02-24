import axios, { AxiosHeaders } from "axios";
import { useContext } from "react";
import { StoreContext } from "../store";
import type { Todo } from "../types";
import { apiUrls } from "../utils";
import { getHeaders } from "./helper";

export const useHandleTodos = () => {
	const {
		user,
		todos,
		setters: { setTodosState },
	} = useContext(StoreContext);

	const setIsLoading = (flag: boolean) => {
		setTodosState((oldState) => ({ ...oldState, isLoading: flag }));
	};

	const getTodos = async (userId: string = ""): Promise<void> => {
		setIsLoading(true);

		try {
			const headers = getHeaders({ accessToken: user.data?.token, contentType: false });

			const { data } = await axios.get(apiUrls.todos.getAll, {
				params: {
					userId,
				},
				headers: headers as AxiosHeaders,
			});

			setTodosState((oldState) => ({
				...oldState,
				error: null,
				data: {
					list: data,
					count: data.length,
				},
				isLoading: false,
			}));
		} catch (err: any) {
			if (axios.isAxiosError(err)) {
				setTodosState((oldState) => ({
					...oldState,
					error: err.response.data,
					isLoading: false,
				}));
				return;
			}

			setTodosState((oldState) => ({ ...oldState, error: err, isLoading: false }));
		}
	};

	const updateTodo = async ({ todo, userId }: { todo: Todo; userId: string }): Promise<void> => {
		try {
			const headers = getHeaders({ accessToken: user.data?.token });

			await axios.post(apiUrls.todos.updateOne(todo.id), todo, {
				headers: headers as AxiosHeaders,
			});

			getTodos(userId);
		} catch (err: any) {
			if (axios.isAxiosError(err)) {
				setTodosState((oldState) => ({
					...oldState,
					error: err.response.data,
					isLoading: false,
				}));

				return;
			}

			setTodosState((oldState) => ({ ...oldState, error: err, isLoading: false }));
		}
	};

	const createTodo = async ({ text, userId }: { text: string; userId: string }): Promise<void> => {
		try {
			const headers = getHeaders({ accessToken: user.data?.token });

			await axios.post(
				apiUrls.todos.create,
				{ text, userId },
				{
					headers: headers as AxiosHeaders,
				}
			);

			getTodos(userId);
		} catch (err: any) {
			if (axios.isAxiosError(err)) {
				setTodosState((oldState) => ({
					...oldState,
					error: err.response.data,
					isLoading: false,
				}));
				return;
			}

			setTodosState((oldState) => ({ ...oldState, error: err, isLoading: false }));
		}
	};

	const deleteTodo = async ({ todoId, userId }: { todoId: string, userId: string }) => {
		try {
			const headers = getHeaders({ accessToken: user.data?.token });

			await axios.delete(apiUrls.todos.deleteOne(todoId), { headers: headers as AxiosHeaders });

			getTodos(userId);
		} catch (err: any) {
			if (axios.isAxiosError(err)) {
				setTodosState((oldState) => ({
					...oldState,
					error: err.response.data,
					isLoading: false,
				}));
				return;
			}

			setTodosState((oldState) => ({ ...oldState, error: err, isLoading: false }))
		}
	};

	return {
		todos,
		createTodo,
		getTodos,
		updateTodo,
		deleteTodo,
	};
};
