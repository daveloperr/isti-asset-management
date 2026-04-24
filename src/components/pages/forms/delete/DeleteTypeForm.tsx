import DeleteDialog from "@/components/layout/DeleteDialog";
import type { Asset_Type } from "@/data/types";
import { useDeleteType } from "@/hooks/useCategory";
import { toast } from "sonner";


interface DeleteTypeFormProps {
    type: Asset_Type;
}

function DeleteTypeForm({ type }: DeleteTypeFormProps) {
    const { mutate } = useDeleteType();

    const handleDeleteType = () => {
        mutate(Number(type.type_id), {
            onSuccess: () => {
                toast.success("Type delete successfully");
            },
            onError: () => {
                toast.error("Failed to delete type");
            },
        });
    };

    return <DeleteDialog handleConfirm={handleDeleteType} />
}

export default DeleteTypeForm