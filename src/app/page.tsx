import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Vehicle } from "@/db/schema";
import { getVehicles } from "@/services/vehicles";
import { PenLineIcon } from "lucide-react";
import Link from "next/link";

function CarCard({ vehicle }: { vehicle: Vehicle }) {
	const { engineNumber, frameNumber, modelYear, notes } = vehicle;

	const shortNotes = (str: string) => str.substring(0, 120);
	const notesExist = !!notes;

	return (
		<Card className="w-full">
			<CardContent className="p-4 flex flex-col gap-2">
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
		</Card>
	);
}

export default async function HomePage({
	searchParams: { search },
}: {
	searchParams: { search: string };
}) {
	const vehicles = await getVehicles(search);
	return (
		<main className="container h-full mx-auto flex flex-col gap-8 p-16">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-4xl">Vehicles</h1>
				<Button asChild>
					<Link href={"/modify-vehicle"}>
						<PenLineIcon className="mr-2" size={18} /> Modify Vehicle
					</Link>
				</Button>
			</div>
			<div className="mb-4">
				<SearchBar className="flex gap-2" />
			</div>
			<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{vehicles.map((vehicle) => {
					return <CarCard key={vehicle.id} vehicle={vehicle} />;
				})}
			</div>
		</main>
	);
}
