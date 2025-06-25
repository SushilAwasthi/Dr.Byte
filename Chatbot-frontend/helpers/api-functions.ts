import axios from "axios";

export const userLogin = async (email: string, password: string) => {
	try {
		const response = await axios.post("/user/login", { email, password });
		if (response.status !== 200) {
			throw new Error();
		}
		const data = await response.data;
		return data;
	} catch (err: any) {
		throw new Error(`Error! Cannot Login. ${err.message}`);
	}
};

export const userSignup = async (
	name: string,
	email: string,
	password: string
) => {
	try {
		const response = await axios.post("/user/signup", {
			name,
			email,
			password,
		});
		const data = await response.data;
		return data;
	} catch (err: any) {
        console.log(err)
		throw new Error(`Error! Cannot Signup. ${err.message}`);
	}
};

export const getAuthStatus = async () => {
	try {
		const response = await axios.get("/user/auth-status");
		if (response.status !== 200) {
			throw new Error("Could not verify authentication status");
		}
		const data = await response.data;
		return data;
	} catch (err: any) {
		throw new Error(err.message);
	}
};

export const postChatRequest = async (message: string) => {
	console.log(message);
	// const predict = "Based on your symptoms, I believe you are having Malaria and I would advice you Take prescribed antimalarial medications, rest, and manage fever. Seek medical attention for severe cases."
	// try {
	// 	const response = await axios.post("/chat/new", { message, predict });
	// 	console.log(response);
	// 	if (response.status !== 200) {
	// 		throw new Error();
	// 	}
	// 	const data = await response.data;
	// 	console.log(data)
	// 	return data;
	// } catch (err: any) {
	// 	console.log(err);
	// 	throw new Error(err.message);
	// }

	try {
		const result = await axios.post("http://127.0.0.1:5000/predict", { message });
		console.log(result.data.response);
		if (result.status !== 200) {
			throw new Error();
		}
		const predict = await result.data.response;
		const response = await axios.post("/chat/new", { message, predict });
		console.log(response);
		if (response.status !== 200) {
			throw new Error();
		}
		const data = await response.data;
		console.log(data)
		return data;
	} catch (err: any) {
		console.log(err);
		throw new Error(err.message);
	}
};

export const getAllChats = async () => {
	try {
		const response = await axios.get("/chat/all-chats");
		if (response.status !== 200) {
			throw new Error();
		}
		const data = await response.data;
		return data;
	} catch (err: any) {
		console.log(err);
		throw new Error(err.message);
	}
};

export const deleteAllChats = async () => {
	try {
		const response = await axios.delete("/chat/delete-all-chats");
		if (response.status !== 200) {
			throw new Error();
		}
		const data = await response.data;
		return data;
	} catch (err: any) {
		console.log(err);
		throw new Error(err.message);
	}
};

export const logoutUser = async () => {
	try {
		const response = await axios.get("/user/logout");
		if (response.status !== 200) {
			throw new Error();
		}
		const data = await response.data;
		return data;
	} catch (err: any) {
		console.log(err);
		throw new Error(err.message);
	}
};
