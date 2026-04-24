// import { EllipsisVertical } from "lucide-react";
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
// import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
// import { Button } from "@/components/ui/button";



// type Action<T> = {
//     label: string;
//     onClick?: (item: T) => void;
//     renderItem?: (item: T) => React.ReactNode;

// };

// type ActionMenuProps<T> = {
//     item: T;
//     actions: Action<T>[];
// };

// export function ActionMenu<T>({ item, actions }: ActionMenuProps<T>) {
//     return (
//         <Popover>
//             <PopoverTrigger asChild>
//                 <Button variant="ghost" size="icon">
//                     <EllipsisVertical className="w-4 h-4 bg-transparent" />
//                 </Button>
//             </PopoverTrigger>

//             <PopoverContent className="w-46 p-0">
//                 <Command>
//                     <CommandGroup>
//                         {actions.map((action, index) => (
//                             <CommandItem
//                                 key={index}
//                                 onSelect={() => action.onClick?.(item)}
//                             >
//                                 {action.renderItem ? action.renderItem(item) : action.label}
//                             </CommandItem>
//                         ))}
//                     </CommandGroup>
//                 </Command>
//             </PopoverContent>
//         </Popover>
//     );
// }