import React, { createContext, useState } from "react";
import { TodosData, useTodosStore } from "./todos";
import { UserData, useUserStore } from "./user";
import type { StateSlice, SetStateSlice } from "./utils";
import { defaultDataState } from "./utils";

type UiData = {
  darkMode: boolean;
};

type State = {
  todos: StateSlice<TodosData>;
  user: StateSlice<UserData>;
  ui: UiData;
  setters: {
    setTodosState: SetStateSlice<TodosData>;
    setUserState: SetStateSlice<UserData>;
    setUiState: React.Dispatch<React.SetStateAction<UiData>>;
  };
};

const defaultState: State = {
  todos: defaultDataState,
  user: defaultDataState,
  ui: {
    darkMode: !!(window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
  },
  setters: {
    setTodosState: () => {},
    setUserState: () => {},
    setUiState: () => {},
  },
};

export const StoreContext = createContext(defaultState);

export const Store = ({ children }: { children: React.ReactNode }) => {
  const { setTodosState, ...todosState } = useTodosStore();
  const { setUserState, ...userState } = useUserStore();
  const [uiState, setUiState] = useState<UiData>(defaultState.ui);

	const store: State = {
		todos: todosState,
    user: userState,
    ui: uiState,
    setters: {
      setTodosState,
      setUserState,
      setUiState,
    },
	};

  return (
		<StoreContext.Provider value={store}>
      {children}
		</StoreContext.Provider>
  )
};
