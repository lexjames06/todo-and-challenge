import { useState } from "react"
import { Todo } from "../types";
import type { SetStateSlice, StateSlice } from "./utils";
import { defaultDataState } from "./utils";

export type TodosData = {
	list: Todo[];
	count: number;
};

export type TodosState<D> = StateSlice<D> & {
	setTodosState: SetStateSlice<D>;
};

export const defaultTodosState: TodosState<TodosData> = {
	...defaultDataState,
	setTodosState: () => {},
}; 

export const useTodosStore = () => {
  const [todosState, setTodosState] = useState<StateSlice<TodosData>>(defaultTodosState);

	const store = {
		...todosState,
		setTodosState,
	};

  return store;
}