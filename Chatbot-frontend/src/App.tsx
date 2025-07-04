// import Header from "./components/shared/Header";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Chat from "./pages/Chat";
// import Admin from "./pages/Admin";
// import PrivateRoute from "./pages/PrivateRoute";
// import styles from "./App.module.css";

// function App() {
// 	return (
// 		<div>
// 			<Header />
// 			<main className={styles.routes}>
// 				<Routes>
// 					{/* Public Routes */}
// 					<Route path="/" element={<Home />} />
// 					<Route path="/login" element={<Login />} />
// 					<Route path="/signup" element={<Signup />} />

// 					{/* Protected Routes */}
// 					<Route
// 						path="/chat"
// 						element={
// 							<PrivateRoute>
// 								<Chat />
// 							</PrivateRoute>
// 						}
// 					/>
// 					<Route
// 						path="/admin"
// 						element={
// 							<PrivateRoute role={1}>
// 								<Admin />
// 							</PrivateRoute>
// 						}
// 					/>
// 				</Routes>
// 			</main>
// 		</div>
// 	);
// }

// export default App;

// App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Admin from "./pages/Admin";
import Header from "./components/shared/Header";
import PrivateRoute from "./pages/PrivateRoute";
import { useAuth } from "./context/context";
import styles from "./App.module.css";

function App() {
	const auth = useAuth();

	if (auth?.isLoading) {
		return <div>Checking authentication...</div>;
	}

	return (
		<div>
			<Header />
			<main className={styles.routes}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />

					<Route
						path="/chat"
						element={
							<PrivateRoute>
								<Chat/>
							</PrivateRoute>
						}
					/>

					<Route
						path="/admin"
						element={
							<PrivateRoute role={1}>
								<Admin />
							</PrivateRoute>
						}
					/>
				</Routes>
			</main>
		</div>
	);
}

export default App;
