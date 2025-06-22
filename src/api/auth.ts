// src/api/auth.ts
import axios from "./axios";
import type { SignInInput, SignUpInput, User } from "../types";

export async function signUp(data: SignUpInput): Promise<{ user: User }> {
  const response = await axios.post(`/auth/signUp`, data);
  return response.data;
}

export async function signIn(data: SignInInput): Promise<{ user: User }> {
  const response = await axios.post(`/auth/signIn`, data);
  return response.data;
}

export async function getMe(): Promise<User> {
  const response = await axios.get(`/users/me`);
  return response.data;
}
