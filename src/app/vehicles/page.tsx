import { CarCard } from "@/components/car-card";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { getVehicles } from "@/services/vehicles";
import { PenLineIcon } from "lucide-react";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";

export default async function VehiclesPage({
	searchParams: { search },
}: {
	searchParams: { search: string };
}) {
	noStore();
	const vehicles = await getVehicles(search);
	return (
		<main className="container h-full mx-auto flex flex-col gap-8 p-16">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-4xl">Vehicles</h1>
				<Button asChild>
					<Link href={"/vehicles/modify"}>
						<PenLineIcon className="mr-2" size={18} /> Modify Vehicle
					</Link>
				</Button>
			</div>
			<div className="mb-4">
				<SearchBar className="flex flex-row gap-4" />
			</div>
			{vehicles.length > 0 && (
				<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{vehicles.map((vehicle) => {
						return <CarCard key={vehicle.id} vehicle={vehicle} />;
					})}
				</div>
			)}
			{vehicles.length === 0 && (
				<div className="flex flex-col gap-4 justify-center items-center mt-24">
					<Image
						src={"/no_data.svg"}
						width={200}
						height={200}
						alt="No data image"
					/>
					<h2 className="uppercase text-2xl">you have no vehicles yet!</h2>
				</div>
			)}
		</main>
	);
}
