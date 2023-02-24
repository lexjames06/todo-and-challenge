import axios, { AxiosHeaders } from "axios";
import { useContext } from "react";
import { StoreContext } from "../store";
import { apiUrls } from "../utils";
import { getHeaders, storage } from "./helper";

export const useHandleUser = () => {
	const {
		user,
		setters: { setUserState },
	} = useContext(StoreContext);

	const setIsLoading = (flag: boolean): void => {
		setUserState((oldState) => ({ ...oldState, isLoading: flag }));
	};

	const clearErrors = (): void => {
		setUserState((oldState) => ({ ...oldState, error: null }));
	};

  const getUserProfile = async () => {
    try {
			const headers = getHeaders({ accessToken: user.data?.token, contentType: false });

			const { data } = await axios.get(apiUrls.users.getUserProfile, {
				headers: headers as AxiosHeaders,
			});

			if (data.token) {
				storage.set("userInfo", data.token);
			}


			setUserState({
				data: {
					token: data.token,
					id: data.id,
					isPrivate: data.is_private,
					username: data.username,
					email: data.email,
					isAdmin: data.is_admin,
					idle: false,
				},
				error: null,
				isLoading: false,
			});
		} catch (err: any) {
			if (axios.isAxiosError(err)) {
        setUserState((oldState) => ({
          data: { ...oldState.data, idle: false },
          error: err.response.data,
          isLoading: false,
        }));

        return;
      }

			setUserState((oldState) => ({
				data: { ...oldState.data, idle: false },
				error: err,
				isLoading: false,
			}));
		}
  }

	const checkIdleUser = async () => {
		setIsLoading(true);

		if (!user.data?.token) {
			setUserState((oldState) => ({
				...oldState,
				data: {
					...oldState.data,
					idle: false,
				},
				isLoading: false,
			}));
			return;
		}

    getUserProfile();
	};

	const loginUser = async ({ email, password }: { email: string; password: string }) => {
		setIsLoading(true);
		const accessToken = storage.get("userInfo");

		try {
			const headers = getHeaders({ accessToken: accessToken });

			const { data } = await axios.post(
				apiUrls.users.login,
				{ email, password },
				{ headers: headers as AxiosHeaders }
			);

			if (data.token) {
				storage.set("userInfo", data.token);
			}

			setUserState({
				data: {
					token: data.token,
					id: data.id,
					isPrivate: data.is_private,
					username: data.username,
					email: data.email,
					isAdmin: data.is_admin,
					idle: false,
				},
				error: null,
				isLoading: false,
			});
		} catch (err: any) {
			if (axios.isAxiosError(err)) {
				switch (err.response?.status) {
					case 401:
						setUserState((oldState) => ({
							...oldState,
							error: {
								code: 401,
								message: "Email or password are not recognised",
								status: "HTTP_401_UNAUTHORIZED",
							},
							isLoading: false,
						}));
						return;
					default:
						setUserState((oldState) => ({
							...oldState,
							error: err.response.data,
							isLoading: false,
						}));
						return;
				}
      }

			setUserState((oldState) => ({
				...oldState,
				error: err,
				isLoading: false,
			}));
		}
	};

	const registerUser = async ({ username, email, password }: { username: string; email: string; password: string }) => {
		setIsLoading(true);

		try {
			const headers = getHeaders();

			const { data } = await axios.post(
				apiUrls.users.register,
				{ email, username, password },
				{ headers: headers as AxiosHeaders }
			);

			if (data.token) {
				storage.set("userInfo", data.token);
			}

			setUserState({
				data: {
					token: data.token,
					id: data.id,
					isPrivate: data.is_private,
					username: data.username,
					email: data.email,
					isAdmin: data.is_admin,
					idle: false,
				},
				error: null,
				isLoading: false,
			});
		} catch (err: any) {
			if (axios.isAxiosError(err)) {
        setUserState((oldState) => ({
          ...oldState,
          error: err.response.data,
          isLoading: false,
        }));

        return;
      }

			setUserState((oldState) => ({
				...oldState,
				error: err,
				isLoading: false,
			}));
		}
	};

  const updateUser = async ({ isPrivate, userId = "" }: { isPrivate: boolean, userId: string }) => {
    try {
			const headers = getHeaders({ accessToken: user.data?.token });

      await axios.post(apiUrls.users.updateOne(userId), {
				is_private: isPrivate,
				username: user.data?.username,
      }, { headers: headers as AxiosHeaders });

      getUserProfile();
    } catch (err: any) {
			if (axios.isAxiosError(err)) {
        setUserState((oldState) => ({
          ...oldState,
          error: err.response.data,
          isLoading: false,
        }));

        return;
      }

			setUserState((oldState) => ({
				...oldState,
				error: err,
				isLoading: false,
			}));
    }
  };

	const logoutUser = () => {
		storage.remove("userInfo");
		setUserState({
			data: null,
			error: null,
			isLoading: false,
		});
	};

	return {
		user: user.data,
		userError: user.error,
		userLoading: user.isLoading,
		checkIdleUser,
		clearErrors,
		loginUser,
		logoutUser,
		registerUser,
    updateUser,
	};
};
