import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/signup/index";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";


function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
				{user && <Route path="/:id" exact element={<Main />} />}
				<Route path="/signup" exact element={<Signup />} />
				<Route path="/login" exact element={<Login />} />
				<Route path="/" element={<Navigate replace to="/login" />} />
				<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/password-reset/:id/:token" element={<PasswordReset />} />
		</Routes>
	);
}

export default App;