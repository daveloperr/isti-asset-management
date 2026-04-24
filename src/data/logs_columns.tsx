import type { ColumnDef } from "@tanstack/react-table";
import type { Logs } from "./types";
import { createHeaderWithIcon } from "@/lib/columnNameUtils";

export function useLogsColumns(): ColumnDef<Logs>[] {
  return [
    {
      accessorKey: "action",
      header: createHeaderWithIcon("action", "Action"),
      cell: ({ row }) => {
        const action = row.original.action;

        const colors: Record<string, string> = {
          CREATE: "bg-green-100 text-green-700",
          UPDATE: "bg-blue-100 text-blue-700",
          DELETE: "bg-red-100 text-red-700",
          LOGIN: "bg-purple-100 text-purple-700",
          LOGOUT: "bg-zinc-100 text-zinc-700",
          LOGIN_FAILED: "bg-orange-100 text-orange-700",
          REPAIR: "bg-yellow-100 text-yellow-700",
          COMPLETE: "bg-teal-100 text-teal-700",
          REJECT: "bg-rose-100 text-rose-700",
          ON_HOLD: "bg-amber-100 text-amber-700",
          ISSUE: "bg-indigo-100 text-indigo-700",
          BORROW: "bg-cyan-100 text-cyan-700",
          RETURN: "bg-sky-100 text-sky-700",
          PULL_OUT: "bg-fuchsia-100 text-fuchsia-700", 
        };

        const className = colors[action] ?? "bg-zinc-100 text-zinc-600";

        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
            {action}
          </span>
        );
      },
    },
    {
      accessorKey: "subject_type",
      header: createHeaderWithIcon("subject_type", "Type"),
    },
    {
      accessorKey: "performed_by",
      header: createHeaderWithIcon("performed_by", "Performed By"),
      cell: ({ row }) => {
        return row.original.performed_by ?? "—";
      },
    },
    {
      accessorKey: "description",
      header: createHeaderWithIcon("description", "Description"),
      cell: ({ row }) => {
        return row.original.description || "—";
      },
    },
    {
      accessorKey: "old_values",
      header: createHeaderWithIcon("old_values", "Old Values"),
      cell: ({ row }) => {
        const val = row.original.old_values;
        if (!val) return "—";
        const parsed = typeof val === "string" ? JSON.parse(val) : val;
        return (
          <pre className="text-xs whitespace-pre-wrap">
            {JSON.stringify(parsed, null, 2)}
          </pre>
        );
      },
    },
    {
      accessorKey: "new_values",
      header: createHeaderWithIcon("new_values", "New Values"),
      cell: ({ row }) => {
        const val = row.original.new_values;
        if (!val) return "—";
        const parsed = typeof val === "string" ? JSON.parse(val) : val;
        return (
          <pre className="text-xs whitespace-pre-wrap">
            {JSON.stringify(parsed, null, 2)}
          </pre>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: createHeaderWithIcon("created_at", "Date"),
      cell: ({ row }) => {
        return row.original.created_at;
        // const date = row.original.created_at;
        // return date ? format(new Date(date), "PPpp") : "—";
      },
    },

  ];
}

export const def_logs_columns = [
  "action",
  "subject_type",
  "performed_by",
  "description",
  "created_at",
];

export const logs_filters = [
  "action",
  "subject_type",
  "performed_by",
];