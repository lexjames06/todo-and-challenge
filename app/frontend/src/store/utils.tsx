import { HttpStatusCode } from "axios";

export type ApiError = {
	code: HttpStatusCode;
	status: string;
	message: string;
};

export type StateSlice<T> = {
  data: T | null;
	error: ApiError | null;
	isLoading: boolean;
};

export type SetStateSlice<T> = React.Dispatch<React.SetStateAction<StateSlice<T>>>;

export const defaultDataState: StateSlice<any> = {
	data: null,
	error: null,
	isLoading: false,
};
