import PopoverForm from "@/components/layout/PopoverForm";
import { checkDuplicateField } from "@/lib/assetValidation";
import { AssetTypeSchema } from "@/data/schemas";
import type {
  Asset_Category,
  Asset_Sub_Category,
  Asset_Type,
} from "@/data/types";
import { useAddType, useTypes } from "@/hooks/useCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import FormFieldText from "../../forms/fields/FormFieldText";
import UpdateTypeForm from "../../forms/update/UpdateTypeForm";
import DeleteTypeForm from "../../forms/delete/DeleteTypeForm";
import FormPopoverTrigger from "@/components/ui/form-popover-trigger";
import { ButtonGroup } from "@/components/ui/button-group";

interface TypesCollapsibleProps {
  category: Asset_Category;
  subCat: Asset_Sub_Category;
}

function TypesCollapsible({ category, subCat }: TypesCollapsibleProps) {
  const { data: types } = useTypes();
  const form = useForm<Asset_Type>({
    resolver: zodResolver(AssetTypeSchema),
    defaultValues: {
      category_id: category.category_id,
      category_name: category.category_name,
      sub_category_id: subCat.sub_category_id,
      sub_category_name: subCat.sub_category_name,
      code: subCat.code,
      type_name: undefined,
      type_code: undefined,
      status_id: 1,
    },
  });

  const { mutate } = useAddType();

  function formatTypeName(name: string) {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }


  function onAddType(values: Asset_Type) {
    const isDuplicateName = checkDuplicateField(types, values.type_name, "type_name");
    const isDuplicateCode = checkDuplicateField(types, values.type_code, "type_code");

    if (isDuplicateName) {
      form.setError("type_name", { type: "manual", message: "Type name already exists." });
      return false;
    }

    if (isDuplicateCode) {
      form.setError("type_code", { type: "manual", message: "Type code already exists." });
      return false;
    }

    mutate(values, { onSuccess: () => form.reset() });
    return true;
  }


  return (
    <div className="pt-2 ml-6 mr-6">
      {types
        ?.filter(
          (type) =>
            category.category_id === type.category_id &&
            subCat.sub_category_id === type.sub_category_id &&
            type.type_id != null
        )
        .map((type) => (
          <div key={type.type_id} className="flex justify-start items-center group">
            <div className="p-3 m-">{formatTypeName(type.type_name)}</div>
            <ButtonGroup className="opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none group-hover:pointer-events-auto">
              <UpdateTypeForm type={type} />
              <DeleteTypeForm type={type} />
            </ButtonGroup>
          </div>
        ))}

      <PopoverForm
        triggerButton={
          <FormPopoverTrigger icon={Plus} name="Type" variant="ghost" />
        }
        title={`New ${subCat.sub_category_name} Type`}
        description="Add a new type to organize your assets."
        form={form}
        onSubmit={onAddType}
        submitButtonText="Add"
        submitButtonIcon={<Plus className="mr-2 h-4 w-4" />}
        formId="type-form"
      >
        <FormFieldText
          control={form.control}
          name="type_name"
          label="Name"
          placeholder="e.g. Desktop, Laptop"
        />
        <FormFieldText
          control={form.control}
          name="type_code"
          label="Code"
          placeholder="e.g. DPT, LPT"
        />
      </PopoverForm>
    </div>
  );
}

export default TypesCollapsible;
