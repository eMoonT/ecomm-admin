"use client";

import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { useStoreModel } from "@/hooks/use-store-model";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;
interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const storeModel = useStoreModel();
  const params = useParams();
  const router = useRouter();

  const formattedItmes = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItmes.find(
    (item) => item.value === params.storeId
  );

  const [open, setOpen] = useState(false);
  const onStoreSelect = (stroe: { label: string; value: string }) => {
    setOpen(false);
    router.push("/" + stroe.value);
  };

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-aria-expanded={open}
            aria-label="select store"
            className={cn("w-[200px] justify-between", className)}
          >
            <StoreIcon className="w-4 h-4 mr-2" />
            {currentStore?.label}
            <ChevronsUpDown className="w-4 h-4 ml-auto shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Command>
            <CommandList>
              <CommandInput placeholder="search store..." />
              <CommandEmpty>No store found.</CommandEmpty>
              <CommandGroup heading="Stores">
                {formattedItmes.map((store) => {
                  return (
                    <CommandItem
                      key={store.value}
                      onSelect={() => onStoreSelect(store)}
                      className="text-sm"
                    >
                      {store.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          currentStore?.value === store.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setOpen(false);
                    storeModel.onOpen();
                  }}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create Store
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StoreSwitcher;
