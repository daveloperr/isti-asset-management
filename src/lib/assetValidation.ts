export function checkDuplicateField<T>(
  items: T[] | undefined,
  value: string | undefined,
  field: keyof T
) {
  const normalize = (str?: string) => str?.trim().toLowerCase();
  return items?.some((item) => normalize(item[field] as string) === normalize(value));
}