import type { Logs } from "@/data/types";
import { useQuery } from "@tanstack/react-query";
import { getAll } from "./controller";
import { format } from "date-fns";



const LOGS = "logs";

export const useLogs = () => {
    return useQuery({
        queryKey: [LOGS],
        queryFn: () => getAll<Logs[]>(LOGS),
        staleTime: 0,
        select: (data) => {
            return data.map((item) => ({
                ...item,
                created_at: format(new Date(item.created_at), "PPpp")
            }));
        }
    });
};