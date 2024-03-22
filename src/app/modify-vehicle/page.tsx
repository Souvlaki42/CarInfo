import { ModifyVehicleForm } from "./form";

export default function ModifyVehiclePage() {
	return (
		<div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
			<h1 className="text-4xl font-bold">Modify Vehicle</h1>
			<ModifyVehicleForm />
		</div>
	);
}
