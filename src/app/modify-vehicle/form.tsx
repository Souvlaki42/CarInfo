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
import { useRouter } from "next/navigation";
import { createVehicle } from "./actions";

const formSchema = z.object({
	engineNumber: z
		.string()
		.regex(/^[a-zA-Z0-9]+$/)
		.min(2)
		.max(6),
	frameNumber: z
		.string()
		.regex(/^[a-zA-Z0-9]+$/)
		.min(17)
		.max(17),
	modelYear: z
		.string()
		.regex(/^\d{4}$/)
		.min(4)
		.max(4),
	notes: z.string().default(""),
});
export type Vehicle = z.infer<typeof formSchema>;

export const ModifyVehicleForm = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			engineNumber: "",
			frameNumber: "",
			modelYear: "2024",
			notes: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		await createVehicle(values);
		router.push("/");
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="engineNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Engine Number</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>
								This is vehicle&apos;s engine number.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="frameNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Frame</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>This is vehicle&apos;s frame.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="modelYear"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Model Year</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>
								This is vehicle&apos;s model year.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="notes"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Notes</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormDescription>
								These are your notes regarding this vehicle.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
};
