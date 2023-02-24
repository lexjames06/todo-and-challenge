import { Link, useLocation, useNavigate } from "react-router-dom";
import { useHandleUser } from "../../hooks";
import styles from "./HeaderBar.module.css";

type HeaderBarProps = {
	loggedIn: boolean;
};

export const HeaderBar = ({ loggedIn }: HeaderBarProps) => {
	const { user, userLoading, logoutUser } = useHandleUser();
	const navigate = useNavigate();
	const location = useLocation();

	const id = location.pathname.split("/").join("");
	const showMyTodos = !!id && user?.id !== id;
	const userInitial = user?.username?.split("")[0].toUpperCase() ?? "U";

	const handleLogout = () => {
		logoutUser();
		navigate("/login");
	};

	if (userLoading) {
		return <header className={styles.container} />;
	}

	return (
		<header className={styles.container}>
			{loggedIn && showMyTodos && (
				<Link to="/">
					<p>My Todos</p>
				</Link>
			)}

			{loggedIn ? (
				<button onClick={handleLogout}>
					<span>{userInitial}</span>
				</button>
			) : !location.pathname.includes("/login") ? (
				<Link className={styles.login} to="/login">
					<button >
						<p>Login</p>
					</button>
				</Link>
			) : null}
		</header>
	);
};
