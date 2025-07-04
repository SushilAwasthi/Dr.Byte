import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/context";

interface Props {
	children: React.ReactNode;
	role?: number; // Optional role-based access
}

const PrivateRoute: React.FC<Props> = ({ children, role }) => {
	const auth = useAuth();

	if (auth?.isLoading) return <div>Loading auth...</div>;

	if (!auth?.isLoggedIn) return <Navigate to="/login" />;

	if (role !== undefined && auth.user?.role !== role) {
		return <Navigate to="/chat" />; // redirect if role mismatch
	}

	return <>{children}</>;
};

export default PrivateRoute;