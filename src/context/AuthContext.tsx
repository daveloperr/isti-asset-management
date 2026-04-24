import { createContext, useContext, type ReactNode } from "react";
import { useMe, useLogin, useLogout } from "@/hooks/useAuth";
import type { User } from "@/data/types";

type AuthContextValue = {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: ReturnType<typeof useLogin>;
    logout: ReturnType<typeof useLogout>;
}


const AuthContext = createContext<AuthContextValue | null>(null);


export function AuthProvider({children}: {children: ReactNode}) {

    const {data, isLoading} = useMe();
    const user = data?.user ?? null;


    const login = useLogin();
    const logout = useLogout();


    return (
        <AuthContext.Provider
        value={{
            user,
            isLoading,
            isAuthenticated: !!user,
            login,
            logout,
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}



export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
}