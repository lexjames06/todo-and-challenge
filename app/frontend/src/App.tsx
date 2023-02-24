import { useContext, useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import { useHandleUser } from "./hooks";
import { HeaderBar } from "./organisms";
import { LoginPage, RegisterPage, UserTodosPage } from "./pages";
import { StoreContext } from "./store";
import styles from "./App.module.css";
import { ThemeContainer } from "./theme";

function App() {
	const { user, checkIdleUser } = useHandleUser();
	const { ui: { darkMode } } = useContext(StoreContext);

	const userId = user?.id;
	const loggedIn = !!userId;

	useEffect(() => {
		checkIdleUser();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ThemeContainer isDark={darkMode}>
			<div className={styles.appContainer}>
				<HeaderBar loggedIn={loggedIn} />
				<main className={styles.mainContainer}>
					<Routes>
						<Route path="/" element={loggedIn ? <Navigate replace to={`/${userId}`} /> : <Navigate replace to="/login" />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/:id" element={<UserTodosPage />} />
					</Routes>
				</main>
			</div>
		</ThemeContainer>
	);
}

export default App;
