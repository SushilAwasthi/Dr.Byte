import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import Study from "/page-photos/login1.png";
import FormLabel from "../components/auth/FormLabel";
import { useAuth } from "../context/context";

axios.defaults.baseURL = "http://localhost:5001/api";
axios.defaults.withCredentials = true;

const Login = () => {
  const [buttonName, setButtonName] = useState("Login");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      setButtonName("Loading ...");
      toast.loading("Signing in ..", { id: "login" });

      const userData = await auth?.login(email, password);

      setButtonName("Login");
      toast.success("Signed in successfully", { id: "login" });

      if (userData) {
        if (userData.role === 0) {
          navigate("/chat");
        } else if (userData.role === 1) {
          navigate("/admin");
        } else {
          toast.error("Invalid user role", { id: "login" });
        }
      } else {
        toast.error("Invalid user data or role", { id: "login" });
      }
    } catch (error: any) {
      setButtonName("Login");
      toast.error(error.message, { id: "login" });
      console.log("Login Error:", error);
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

        {/* Login Form Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">Log in to your Dr.BYTE account</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
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
              maxLength={20}
              minLength={8}
              label="Password"
              onChange={() => {}}
              inputPH="Enter your password"
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
            Don't have an account?{" "}
            <Link 
              to="/signup" 
              className="text-[#00ffff] font-semibold hover:text-white transition-colors duration-300"
            >
              Create a new one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;


