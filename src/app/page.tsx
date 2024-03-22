import { db } from "@/db";

export default async function HomePage() {
	const vehicles = await db.query.vehicles.findMany();
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			{vehicles.map((vehicle) => {
				return <div key={vehicle.id}>{vehicle.engineNumber}</div>;
			})}
		</main>
	);
}
