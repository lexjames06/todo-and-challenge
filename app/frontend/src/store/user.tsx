import { useState } from "react"
import type { SetStateSlice, StateSlice } from "./utils";
import { defaultDataState } from "./utils";

export type UserData = {
	id?: string;
	username?: string;
	email?: string;
	isAdmin?: boolean;
	isPrivate?: boolean;
	token?: string;
	idle: boolean;
};

export type UserState<D> = StateSlice<D> & {
	setUserState: SetStateSlice<D>;
};

export const defaultUserState: UserState<UserData> = {
	...defaultDataState,
	data: {
		token: localStorage.getItem("userInfo") ?? undefined,
		idle: true,
	},
	setUserState: () => {},
}; 

export const useUserStore = () => {
  const [userState, setUserState] = useState<StateSlice<UserData>>(defaultUserState);

	const store = {
		...userState,
		setUserState,
	};

  return store;
}