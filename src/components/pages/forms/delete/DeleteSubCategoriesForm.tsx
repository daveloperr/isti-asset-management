import DeleteDialog from "@/components/layout/DeleteDialog";
import type { Asset_Sub_Category } from "@/data/types";
import { useDeleteSubCategory } from "@/hooks/useCategory";
import { toast } from "sonner";

interface DeleteSubCategoryFormProps {
    subCategory: Asset_Sub_Category;
}


function DeleteSubCategoriesForm ({subCategory} : DeleteSubCategoryFormProps) {
    const { mutate } = useDeleteSubCategory();

    const handleDeleteSubCategory = () => {
        mutate(Number(subCategory.sub_category_id), {
            onSuccess: () => {
                toast.success("Subcategory delete successfully");
            },
            onError: () => {
                toast.error("Failed to delete subcategory");
            },
        });
    };
    return <DeleteDialog handleConfirm={handleDeleteSubCategory} />
}

export default DeleteSubCategoriesForm