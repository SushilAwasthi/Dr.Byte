import express from "express";

import {
	getAllUsers,
	userSignUp,
	userLogin,
	verifyUserStatus,
    logoutUser
} from "../controllers/user-controllers.js";

import {
	loginValidator,
	signUpValidator,
	validate,
} from "../utils/validators.js";

import { verifyToken } from "../utils/token-manager.js";

 const userRoutes = express.Router(); 

userRoutes.get("/", (req, res, next) => void getAllUsers(req, res, next));
userRoutes.post("/signup", validate(signUpValidator), (req, res, next) => void userSignUp(req, res, next));
userRoutes.post("/login", validate(loginValidator), (req, res, next) => void userLogin(req, res, next));
//userRoutes.get("/auth-status", verifyToken, (req, res, next) => void verifyUserStatus(req, res, next));
//userRoutes.get("/logout", verifyToken, (req, res, next) => void logoutUser(req, res, next));
userRoutes.get("/auth-status", (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err);
    void verifyUserStatus(req, res, next);
  });
});


userRoutes.get("/logout", (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err);
    void logoutUser(req, res, next);
  });
});


export default userRoutes;
