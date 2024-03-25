"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
	search: z.string().min(0),
});
type Search = z.infer<typeof formSchema>;

export const SearchBar = ({ className }: { className?: string }) => {
	const router = useRouter();
	const query = useSearchParams();

	const form = useForm<Search>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			search: query.get("search") ?? "",
		},
	});

	async function onSubmit(values: Search) {
		const { search } = values;

		if (!!search) {
			router.push(`/vehicles?search=${search}`);
		} else {
			router.push("/vehicles");
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={className}>
				<FormField
					control={form.control}
					name="search"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									placeholder="Filter stuff"
									className="w-[50vw]"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">
					<SearchIcon className="mr-2" size={18} /> Search
				</Button>

				{query.get("search") && (
					<Button
						variant={"link"}
						onClick={() => {
							form.setValue("search", "");
							router.push("/vehicles");
						}}
					>
						Clear
					</Button>
				)}
			</form>
		</Form>
	);
};
