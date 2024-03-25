"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Vehicle } from "@/db/schema";
import { Button } from "./ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteVehicle } from "@/services/vehicles";

export function CarCard({ vehicle }: { vehicle: Vehicle }) {
	const { engineNumber, frameNumber, modelYear, notes } = vehicle;

	const shortNotes = (str: string) => str.substring(0, 120);
	const notesExist = !!notes;

	return (
		<Card className="w-full">
			<CardContent className="p-4 flex flex-col gap-2 mb-8">
				<div className="flex flex-row justify-between">
					<span className="font-bold">Engine</span>
					<span>{engineNumber}</span>
				</div>
				<div className="flex flex-row justify-between">
					<span className="font-bold">Frame</span>
					<span>{frameNumber}</span>
				</div>
				<div className="flex flex-row justify-between">
					<span className="font-bold">Year</span>
					<span>{modelYear}</span>
				</div>
				{notesExist && (
					<span className="whitespace-normal overflow-hidden break-words">
						{shortNotes(notes)}
					</span>
				)}
			</CardContent>
			<CardFooter className="relative">
				<Button
					className="absolute bottom-3 left-3"
					variant={"secondary"}
					size={"icon"}
				>
					<PencilIcon />
				</Button>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button
							className="absolute bottom-3 right-3"
							variant={"destructive"}
							size={"icon"}
						>
							<Trash2Icon />
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete the
								vehicle and any data associated with it.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction
								onClick={async () => await deleteVehicle(vehicle.id)}
							>
								Delete
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</CardFooter>
		</Card>
	);
}
