import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { catchError, getAll, getOne } from "./controller";
import type { Issuance } from "@/data/types";
import api from "./api/config";
import { useMemo } from "react";
import { format, isDate } from "date-fns";
import { toast } from "sonner";

const ISSUANCE = "issuance";
const ASSET = "asset";

export const useIssuances = () => {
  return useQuery({
    queryKey: [ISSUANCE],
    queryFn: () => getAll<Issuance[]>(ISSUANCE),
    select: (data) => {
      return data.map((item) => {
        return {
          ...item,
          issuance_date: item?.issuance_date
            ? new Date(item.issuance_date)
            : undefined,
          pullout_date: item?.pullout_date
            ? new Date(item.pullout_date)
            : undefined,
        };
      });
    },
     staleTime: 1000 * 30, 
  });
};

export const useIssuance = (id: number) => {
  return useQuery({
    queryKey: [ISSUANCE, id],
    queryFn: () => getOne<Issuance>(ISSUANCE, id),
    select: (item) => {
      return {
        ...item,
        issuance_date: item?.issuance_date
          ? new Date(item.issuance_date)
          : undefined,
        pullout_date: item?.pullout_date
          ? new Date(item.pullout_date)
          : undefined,
      };
    },
     staleTime: 1000 * 30, 
  });
};

export const useAddIssuance = <TData = unknown>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TData) => {
      const formdata = new FormData();
      formdata.append("data", JSON.stringify(data));
      const response = await api.post(`index.php?resource=issuance`, formdata);

      return response.data;
    },
    onSuccess: (data) => {
      if (typeof data === "object") {
        queryClient.invalidateQueries({ queryKey: [ISSUANCE] });
        queryClient.invalidateQueries({ queryKey: [ASSET] });

        toast.success("Successfully added new Issuance");
      } else {
        throw new Error("Failed to add new Issuance");
      }
    },
    onError: catchError,
  });
};

export const useIssuedAssetIds = (): number[] => {
  const { data } = useIssuances();

  return useMemo(() => {
    if (!data) return [];
    return data
      .map((i) => i.asset_id)
      .filter((id): id is number => typeof id === "number");
  }, [data]);
};

export const useUpdateIssuance = <TData extends {}>() => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: TData }) => {
      const response = await api.put(`index.php?resource=issuance`, {
        id: id,
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
      queryClient.invalidateQueries({ queryKey: [ISSUANCE] });
      queryClient.invalidateQueries({ queryKey: [ASSET] });

    },
    onError: catchError,
  });
};

export const useDeleteIssuance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.put(`index.php?resource=issuance`, {
        id,
        columns: ['status_id'],
        values: [14],
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ISSUANCE] });
      queryClient.invalidateQueries({ queryKey: [ASSET] });

    },
    onError: catchError,
  });
};
