import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { catchError, getAll, getOne } from "./controller";
import type { Borrow } from "@/data/types";
import api from "./api/config";
import { format, isDate } from "date-fns";
import { toast } from "sonner";

const BORROW = "borrow";
const ASSET = "asset";

export const useBorrows = () => {
  return useQuery({
    queryKey: [BORROW],
    queryFn: () => getAll<Borrow[]>(BORROW),
    select: (data) => {
      return data.map((item) => {
        return {
          ...item,
          date_borrowed: new Date(item.date_borrowed),
          due_date: new Date(item.due_date as Date),
          return_date: item.return_date
            ? new Date(item.return_date as Date)
            : undefined,
        };
      });
    },
     staleTime: 1000 * 30, 

  });
};

export const useBorrow = (id: number) => {
  return useQuery({
    queryKey: [BORROW, id],
    queryFn: () => getOne<Borrow>(BORROW, id),
    select: (item) => {
      return {
        ...item,
        date_borrowed: new Date(item.date_borrowed),
        due_date: new Date(item.due_date as Date),
        return_date: new Date(item.return_date as Date),
      };
    },
      staleTime: 1000 * 30, 

  });
};

export const useAddBorrow = <TData = unknown>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TData) => {
      const formdata = new FormData();
      formdata.append("data", JSON.stringify(data));
      const response = await api.post(`index.php?resource=borrow`, formdata);

      return response.data;
    },
    onSuccess: (data) => {
      if (typeof data === "object") {
        queryClient.invalidateQueries({ queryKey: [BORROW] });
        queryClient.invalidateQueries({ queryKey: [ASSET] });
        toast.success("Successfully added new Borrow");
      } else {
        throw new Error("Failed to add new Borrow");
      }
    },
    onError: catchError,
  });
};

export const useUpdateBorrow = <TData extends {}>() => {
  const queryClient = useQueryClient();

  return useMutation({
  mutationFn: async ({ id, data, type }: { id: number; data: TData; type?: string }) => {
      const response = await api.put(`index.php?resource=borrow`, {
        id: id,
        type: type,
        values: Object.values(data).map((value) => {
          if (isDate(value)) {
            return format(value, "yyyy-MM-dd");
          }

          return value;
        }),
        columns: Object.keys(data),
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BORROW] });
      queryClient.invalidateQueries({ queryKey: [ASSET] });

    },
    onError: catchError,
  });
};

export const useDeleteBorrow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.put(`index.php?resource=borrow`, {
        id,
        columns: ['status_id'],
        values: [14],
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BORROW] });
      queryClient.invalidateQueries({ queryKey: [ASSET] });

    },
    onError: catchError,
  });
};
