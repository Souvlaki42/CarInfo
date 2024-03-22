import { db } from "@/db";
import { getSession } from "@/lib/auth";

export default async function HomePage() {
	const vehicles = await db.query.vehicles.findMany();
	const session = await getSession();
	console.log(session);
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			{vehicles.map((vehicle) => {
				return <div key={vehicle.id}>{vehicle.engineNumber}</div>;
			})}
		</main>
	);
}
