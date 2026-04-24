import { z } from "zod";


export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});


export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  created_at: z.string().optional(),
});

export const LoginResponseSchema = z.object({
   message: z.string(),
   user: UserSchema,
});

export const MeResponseSchema = z.object({
  user: UserSchema,
});




// Pool FK IDs from existing tables
export const AssetSchema = z.object({
  asset_id: z.number().optional(),
  asset_name: z.string().optional(),
category_id: z.coerce.number({ message: "Category is required" }).min(1, "Category is required"),
sub_category_id: z.coerce.number({ message: "Sub-category is required" }).min(1, "Sub-category is required"), 
sub_category_name: z.string().optional(),
type_id: z.coerce.number({ message: "Type is required" }).min(1, "Type is required"),
type_name: z.string().optional(), 
  asset_condition_id: z.number(),
  location: z.string().nullable().optional(),
  status_id: z.number().optional(),
  serial_number: z.string({ message: "Serial number is required" }).min(1, "Serial number is required"),
brand: z.string({ message: "Brand is required" }).min(1, "Brand is required"),
specifications: z
  .string({ message: "Specifications is required" })
  .min(5, "Specifications must be at least 5 characters")
  .max(100, "Specifications must be at most 100 characters."),

  asset_amount: z.number({ message: "Amount is required " }),
  warranty_due_date: z.date({ message: "Warranty Due Date is required" }),
  warranty_duration: z.coerce.number(),
  purchase_date: z.date({ message: "Purchase Date is required" }),
notes: z
  .string({ message: "Notes is required" })
  .min(5, "Notes must be at least 5 characters")
  .max(100, "Notes must be at most 100 characters."),
  file: z.array(z.string()).optional(),
  insurance_id: z.number().nullable().optional(),
});

export const AssetFileSchema = z.object({
  asset_id: z.number().optional(),
  file: z.array(z.string()).optional(),
});

export const InsuranceSchema = z.object({
  insurance_id: z.number().optional(),
  insurance_name: z.string({ message: "Name is required" }),
  insurance_coverage: z.string({ message: "Coverage is required" }),
  insurance_date_from: z.date({ message: "Date From is required" }),
  insurance_date_to: z.date({ message: "Dato To is required" }),
});

export const LogSchema = z.object({
  log_id: z.number(),
  performed_by: z.number().nullable(),
  action: z.string(),
  subject_type: z.string(),
  subject_id: z.number().nullable(),
  asset_id: z.number().nullable(),
  description: z.string().nullable(),
  old_values: z.string().nullable(),
  new_values: z.string().nullable(),
  created_at: z.string(), 
});

export const RepairSchema = z.object({
  asset_id: z.number({ message: "Asset is required" }),
  category_id: z.number(),
  sub_category_id: z.number(),
  type_id: z.number(),

  user_id: z.number({ message: "User is required" }),
  company_id: z.number(),
  department_id: z.number().optional(),

  status_id: z.number().optional(),
  repair_request_id: z.number().optional(),

  date_reported: z.date({ message: "Date reported is required" }), // Default: Today
  urgency_id: z.number({ message: "Urgency is required" }),
  repair_start_date: z.date({ message: "Repair start date is required" }),
  repair_cost: z.number({ message: "Repair cost is required" }).min(0),
  issue: z
    .string()
    .min(5, "Notes must be at least 5 characters")
    .max(100, "Notes must be at most 100 characters.")
    .optional(),

  repair_completion_date: z.date().nullable().optional(),
  remarks: z.string().optional(),
});

export const BorrowSchema = z.object({
  asset_id: z.number(),
  category_id: z.number(),
  sub_category_id: z.number(),
  type_id: z.number(),

  user_id: z.number(),
  company_id: z.number(),
  department_id: z.number().optional(),

  duration: z.number(),
  date_borrowed: z.date(),

  borrow_transaction_id: z.number().optional(),
  asset_condition_id: z.number().optional(),
  due_date: z.date().optional(),

  return_date: z.date().optional(),
  remarks: z.string().optional(),
});

export const IssuanceSchema = z.object({
  asset_id: z.number(),
  // category_id: z.number(),
  // sub_category_id: z.number(),
  // type_id: z.number(),

  user_id: z.number(),
  // company_id: z.number(),
  department_id: z.number().optional(),

  issuance_date: z.date().optional(),
  pullout_date: z.date().optional(),

  status_id: z.number().optional(),
  remarks: z.string().optional(),
  issuance_id: z.number().optional(),
});

export const CompanySchema = z.object({
  company_id: z.number(),
  name: z.string(),
  alias: z.string(),
});

export const DepartmentSchema = z.object({
  department_id: z.number(),
  name: z.string(),
  alias: z.string(),
  company_id: z.number(),
});

export const UnitSchema = z.object({
  unit_id: z.number(),
  name: z.string(),
  alias: z.string().nullable(),
  company_id: z.number(),
  department_id: z.number().optional(),
});

export const EmployeeSchema = z.object({
  user_id: z.number(),
  name: z.string(),
  position: z.string(),
  company_id: z.number(),
  department_id: z.number().nullable(),
  unit_id: z.number().nullable(),
});

export const ConditionSchema = z.object({
  asset_condition_id: z.number(),
  asset_condition_name: z.string(),
});

export const StatusSchema = z.object({
  status_id: z.number(),
  function_id: z.number().optional(),
  status_name: z.string(),
});

export const AssetCategorySchema = z.object({
  category_id: z.number().optional(),
  category_name: z.string({ message: "Category name is required" }),
});

export const AssetSubCategorySchema = AssetCategorySchema.extend({
  sub_category_id: z.number().optional(),
  sub_category_name: z.string({ message: "Sub category name is required" }),
  code: z
    .string({ message: "Code is required" })
    .length(3, "Code must be exactly 3 characters")
    .optional(),
});

export const AssetTypeSchema = AssetSubCategorySchema.extend({
  type_id: z.number().optional(),
  type_name: z.string({ message: "Type name is required " }),
  type_code: z
    .string({ message: "Code is required" })
    .length(3, "Code must be exactly 3 characters")
    .optional(),
  status_id: z.number().optional(),
});
