"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStoreModel } from "@/hooks/use-store-model";
import { Model } from "@/components/ui/model";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formScheme = z.object({
  name: z.string().min(1),
});

export const StoreModel = () => {
  const storeModel = useStoreModel();

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
  });

  const onSubmit = (value: z.infer<typeof formScheme>) => {
    console.log("🚀 ~ file: store-model.tsx:25 ~ onSubmit ~ value:", value);
    // TODO: create store
  };

  return (
    <Model
      title="Create Store"
      description="add a new store manage"
      isOpen={storeModel.isOpen}
      onClose={storeModel.onClose}
    >
      Future create store from
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button variant={"outline"} onClick={storeModel.onClose}>
                  Cancel
                </Button>
                <Button type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Model>
  );
};
