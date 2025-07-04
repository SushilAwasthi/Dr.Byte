import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import Study from "/page-photos/signup.png";
import FormLabel from "../components/auth/FormLabel";
import { useAuth } from "../context/context";

axios.defaults.baseURL = "http://localhost:5001/api";
axios.defaults.withCredentials = true;

const Signup = () => {
	const [buttonName, setButtonName] = useState("Signup");
	const navigate = useNavigate();
	const auth = useAuth();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const username = formData.get("username") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		try {
			setButtonName("Loading ...");
			toast.loading("Signing up ..", { id: "signup" });
			await auth?.signup(username, email, password);
			setButtonName("signup");
			toast.dismiss("signup");
			toast.success("Account created", { id: "signup" });
			navigate('/login');
		} catch (error: any) {
			setButtonName("signup");
			toast.dismiss("signup");
			toast.error(error.response?.data?.message || error.message, { id: "signup" });
			console.log(error, "error");
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#05101c] to-[#006d77] pt-[100px] px-4">
			<div className="flex flex-col md:flex-row justify-around items-center max-w-7xl mx-auto">
				{/* Image Section */}
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className="hidden md:block"
				>
					<img 
						className="h-[450px] w-[450px] object-contain" 
						src={Study} 
						alt="study" 
					/>
				</motion.div>

				{/* Signup Form Section */}
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
				>
					<div className="text-center mb-8">
						<h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
						<p className="text-gray-300">Join Dr.BYTE for better healthcare</p>
					</div>

					<form className="space-y-6" onSubmit={handleSubmit}>
						<FormLabel
							className="form-group"
							htmlFor="username"
							id="username"
							name="username"
							type="text"
							required={true}
							maxLength={25}
							minLength={2}
							label="Full Name"
							onChange={() => {}}
							inputPH="Enter your name..."
						/>

						<FormLabel
							className="form-group"
							htmlFor="email"
							id="email"
							name="email"
							type="email"
							required={true}
							maxLength={50}
							minLength={5}
							label="Email Address"
							onChange={() => {}}
							inputPH="name@example.com"
						/>

						<FormLabel
							className="form-group"
							htmlFor="password"
							name="password"
							id="password"
							type="password"
							required={true}
							maxLength={16}
							minLength={8}
							label="Password"
							onChange={() => {}}
							inputPH="Enter your password"
						/>

						<FormLabel
							className="form-group"
							htmlFor="confirm-password"
							id="confirm-password"
							name="confirm-password"
							type="password"
							required={true}
							maxLength={16}
							minLength={8}
							label="Confirm Password"
							onChange={() => {}}
							inputPH="Confirm your password"
						/>

						<button 
							className="w-full bg-[#006d77] text-white text-xl py-3 rounded-xl 
								hover:bg-[#00ffff] hover:text-[#05101c] transition-all duration-300 
								transform hover:-translate-y-1 shadow-lg"
						>
							{buttonName}
						</button>
					</form>

					<p className="text-center mt-6 text-gray-300">
						Already have an account?{" "}
						<Link 
							to="/login" 
							className="text-[#00ffff] font-semibold hover:text-white transition-colors duration-300"
						>
							Login
						</Link>
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default Signup;