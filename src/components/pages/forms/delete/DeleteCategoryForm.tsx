import DeleteDialog from "@/components/layout/DeleteDialog";
import type { Asset_Category } from "@/data/types";
import { useDeleteCategory } from "@/hooks/useCategory";
import { toast } from "sonner";


interface DeleteCategoryProps {
    category: Asset_Category;
}

function DeleteCategoryForm ({category} : DeleteCategoryProps) {
 const {mutate} = useDeleteCategory();

 const handleDeleteCategory = () => {
    mutate(Number(category.category_id), {
        onSuccess: () => {
            toast.success("Category delete successfully");
        },
        onError: () => {
            toast.error("Failed to delete category");
        },
    });
 };

 return <DeleteDialog handleConfirm={handleDeleteCategory} />
}

export default DeleteCategoryForm;