import express from "express";
import { Login, SignUpUser, Logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";

const AuthRouter = express.Router();

AuthRouter.post("/signup", SignUpUser);
AuthRouter.post("/login", Login);
AuthRouter.post("/logout", Logout);

AuthRouter.put("/update-profile", updateProfile);

AuthRouter.get("/check", checkAuth);

export default AuthRouter;