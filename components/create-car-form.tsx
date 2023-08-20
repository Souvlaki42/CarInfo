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
    .regex(/^\d+$/, { message: "Engine number should contain only numbers." })
    .min(5, {
      message: "Engine number must be at least 5 characters.",
    }),
  frame: z.string().min(5, {
    message: "Frame must be at least 5 characters.",
  }),
  year: z
    .string()
    .regex(/^\d+$/, { message: "Year should contain only numbers." })
    .length(4, {
      message: "Year must be 4 characters.",
    }),
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
