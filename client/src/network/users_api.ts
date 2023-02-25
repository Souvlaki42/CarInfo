import { User } from "../models/user";
import { fetchData } from "../utils/fetchData";

export async function getLoggedInUser(): Promise<User> {
	const response = await fetchData("/api/users", { method: "GET" });
	return response.json();
}

export interface SignUpCredentials {
	username: string;
	email: string;
	password: string;
	otp: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
	const response = await fetchData("/api/users/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});
	return response.json();
}

export interface LoginCredentials {
	username: string;
	password: string;
}

export interface SendOTPCredentials {
	username: string;
	email: string;
}

export interface VerifyOTPCredentials {
	email: string;
	otp: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
	const response = await fetchData("/api/users/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});
	return response.json();
}

export async function logout() {
	await fetchData("/api/users/logout", { method: "POST" });
}

export async function sendOTP(credentials: SendOTPCredentials): Promise<User> {
	const response = await fetchData("/api/users/sendOTP", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(credentials),
	});
	return response.json();
}

export async function verifyOTP(credentials: VerifyOTPCredentials): Promise<User> {
	const response = await fetchData("/api/users/verifyOTP", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(credentials),
	});
	return response.json();
}
