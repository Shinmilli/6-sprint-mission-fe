// src/context/authContext.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import type { ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { signIn, signUp, getMe } from "../api/auth";
import { clearTokens, setTokens } from "../utils/authToken";
import type { SignUpInput, SignInInput, User } from "../types";

type AuthContextType = {
  user: User | null | undefined;
  signup: (data: SignUpInput) => Promise<void>;
  signin: (data: SignInInput) => Promise<void>;
  signout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  signup: async () => {},
  signin: async () => {},
  signout: () => {},
});

function useTokensFromParams() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has("at") && searchParams.has("rt")) {
      setTokens({
        accessToken: searchParams.get("at")!,
        refreshToken: searchParams.get("rt")!,
      });
      navigate(location.pathname, { replace: true });
    }
  }, [location.pathname, location.search, navigate]);
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  useTokensFromParams();

  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      return await getMe();
    },
    retry: 2,
  });

  const signup = useCallback(
    async (data: SignUpInput) => {
      await signUp(data);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    [queryClient]
  );

  const signin = useCallback(
    async (data: SignInInput) => {
      await signIn(data);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    [queryClient]
  );

  const signout = useCallback(() => {
    clearTokens();
    queryClient.invalidateQueries({ queryKey: ["me"] });
  }, [queryClient]);

  return (
    <AuthContext.Provider value={{ user, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
