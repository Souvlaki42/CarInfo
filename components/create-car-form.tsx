"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  engineNumber: z
    .string()
    .regex(/^\d{6}$/, "Engine number must be a 6-digit number"),
  frame: z
    .string()
    .regex(
      /^[A-HJ-NPR-Z0-9]{17}$/,
      "Invalid frame (VIN) format. It should be 17 characters long and contain only letters (except I, O, Q) and numbers."
    ),
  year: z
    .string()
    .regex(
      /^(19|20)\d{2}$/,
      "Invalid year format. It should be a valid year in the range 1900-2099."
    ),
});

export type FormData = z.infer<typeof formSchema>;

export function CreateCarForm({
  onSubmit,
}: {
  onSubmit: (data: FormData) => Promise<void>;
}) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      engineNumber: "",
      frame: "",
      year: "",
    },
  });

  const submitForm = async (formData: FormData) => {
    await onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className="space-y-8">
        <FormField
          control={form.control}
          name="engineNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Engine Number</FormLabel>
              <FormControl>
                <Input placeholder="Input the engine number" {...field} />
              </FormControl>
              <FormDescription>
                This is the engine number of the car.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="frame"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frame</FormLabel>
              <FormControl>
                <Input placeholder="Input the frame" {...field} />
              </FormControl>
              <FormDescription>This is the frame of the car.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input placeholder="Input the year" {...field} />
              </FormControl>
              <FormDescription>This is the year of the car.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
