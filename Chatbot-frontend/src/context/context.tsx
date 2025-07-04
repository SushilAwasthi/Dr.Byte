import {
	userLogin,
	getAuthStatus,
	logoutUser,
	userSignup,
} from "../../helpers/api-functions";
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

type User = {
	name: string;
	email: string;
	role: number;
};

type UserAuth = {
	user: User | null;
	isLoggedIn: boolean;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<User | null>;
	signup: (name: string, email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const data = await getAuthStatus();
				if (data?.user) {
					setUser(data.user); 
					setIsLoggedIn(true);
				}
			} catch {
				// Not logged in
			} finally {
				setIsLoading(false);
			}
		};
		checkAuthStatus();
	}, []);

	const login = async (email: string, password: string) => {
		const data = await userLogin(email, password);
		if (data) {
			setUser({ email: data.email, name: data.name, role: data.role });
			setIsLoggedIn(true);
			return data;
		}
		return null;
	};

	const signup = async (name: string, email: string, password: string) => {
		await userSignup(name, email, password);
	};

	const logout = async () => {
		await logoutUser();
		setIsLoggedIn(false);
		setUser(null);
		window.location.href = "/login";
	};

	const value: UserAuth = {
		user,
		isLoggedIn,
		isLoading,
		login,
		signup,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);