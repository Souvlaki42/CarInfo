"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Car } from "@prisma/client";
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
import { addCar, updateCar } from "@/app/actions";

const formSchema = z.object({
  engineNumber: z
    .string()
    .regex(/^\d{6}$/, "Ο αριθμός μηχανής πρέπει να αποτελείται από 6 νούμερα."),
  frame: z
    .string()
    .regex(
      /^[A-HJ-NPR-Z0-9]{17}$/,
      "Λάθος πινακίδα. Πρέπει να αποτελείται μόνο από γράμματα (εκτός των I, O, Q) και αριθμούς."
    ),
  year: z
    .string()
    .regex(
      /^(19|20)\d{2}$/,
      "Λάθος έτος. Πρέπει να είναι στο εύρος 1900-2099."
    ),
});

export type FormData = z.infer<typeof formSchema>;

export function CarForm({ userId, car }: { userId: string; car: Car | null }) {
  const [isPending, startTransition] = useTransition();

  const submitForm = async (formData: FormData) => {
    if (!car) {
      startTransition(async () => await addCar(formData, userId));
    } else {
      startTransition(async () => await updateCar(formData, car.id));
    }
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      engineNumber: !car ? "" : car.engineNumber,
      frame: !car ? "" : car.frame,
      year: !car ? "" : car.year,
    },
  });

  return (
    <>
      <h1 className="mb-3 text-center text-2xl font-bold">
        {!car ? "Προσθήκη Αυτοκινήτου" : "Επεξεργασία Αυτοκινήτου"}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitForm)} className="space-y-8">
          <FormField
            control={form.control}
            name="engineNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Αριθμός μηχανής</FormLabel>
                <FormControl>
                  <Input placeholder="Γράψτε τον αριθμό μηχανής" {...field} />
                </FormControl>
                <FormDescription>
                  Αυτός είναι ο αριθμός μηχανής του αυτοκινήτου.
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
                <FormLabel>Πινακίδα</FormLabel>
                <FormControl>
                  <Input placeholder="Γράψτε την πινακίδα" {...field} />
                </FormControl>
                <FormDescription>
                  Αυτή είναι η πινακίδα του αυτοκινήτου.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Έτος</FormLabel>
                <FormControl>
                  <Input placeholder="Γράψτε το έτος" {...field} />
                </FormControl>
                <FormDescription>
                  Αυτό είναι το έτος του αυτοκινήτου.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit">
            {!car ? "Προσθήκη Αυτοκινήτου" : "Επεξεργασία Αυτοκινήτου"}
          </Button>
        </form>
      </Form>
    </>
  );
}
