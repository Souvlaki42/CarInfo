import { ModifyVehicleForm } from "./form";

export default function ModifyVehiclePage() {
	return (
		<main className="container h-full mx-auto flex flex-col gap-8 p-16">
			<h1 className="text-4xl font-bold">Modify Vehicle</h1>
			<ModifyVehicleForm />
		</main>
	);
}
