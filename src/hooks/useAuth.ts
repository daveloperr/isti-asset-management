import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { catchError, getAll, getOne } from "./controller";
import type { Login } from "@/data/types";
import { LoginSchema, MeResponseSchema, LoginResponseSchema } from "@/data/schemas";
import api from "./api/config";
import { toast } from "sonner";


const AUTH = "auth";


export const useMe = () => {
    return useQuery({
        queryKey: [AUTH],
        queryFn: async () => {
            const res = await api.get(`auth/me.php`);

            const result = MeResponseSchema.safeParse(res.data);
            if (!result.success) {
                throw new Error("Invalid auth response shape");
            }

            return result.data;
        },
        retry: false,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};


export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: Login) => {
            const parsed = LoginSchema.parse(data);
            const res = await api.post(`auth/login.php`, parsed);

            const result = LoginResponseSchema.safeParse(res.data);
            if (!result.success) {
                throw new Error("Invalid response format from server");
            }

            return result.data;
        },

        onSuccess: (data) => {
            queryClient.setQueryData([AUTH], { user: data.user });
            toast.success("Login successful");
        },

        onError: (err: any) => {
            const message =
                err?.response?.data?.error ||   
                err?.errors?.[0]?.message ||
                err?.message ||
                "Invalid credentials";

            toast.error(message);
        }
    });
};


export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await api.post(`auth/logout.php`);
        },

        onSuccess: () => {
            queryClient.removeQueries({ queryKey: [AUTH] });
            toast.success("Logged out");
        },
        onError: (err: any) => {
            toast.error("Logout failed");
        },
    });
};





