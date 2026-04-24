import { DataTable } from "@/components/ui/data-table";
import { useLogsColumns } from "@/data/logs_columns";
import { useLogs } from "@/hooks/useLogs";
import { logs_filters } from "@/data/logs_columns";


function ActivityLogs() {

    const { data: logs } = useLogs();
    return (
        <>
            <h1 className="font-semibold tracking-tight text-zinc-950 pb-4">
                Activity Logs
            </h1>

            <DataTable
                columns={useLogsColumns()}
                data={logs ?? []}
                type="Logs"
                placeholder="Search logs..."
                filterableColumns={logs_filters}
                hideNewButton
            />

        </>
    )
}

export default ActivityLogs;