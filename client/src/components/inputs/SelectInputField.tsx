import { FormEvent, ReactNode, useState } from "react";
import { Form } from "react-bootstrap";
import { FormCheckType } from "react-bootstrap/esm/FormCheck";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface SelectInputFieldProps {
	name: string;
	label: string;
	defaultOption?: string;
	options: ReactNode;
	register: UseFormRegister<any>;
	registerOptions?: RegisterOptions;
	error?: FieldError;
	[x: string]: any;
}

export const SelectInputField = ({
	name,
	label,
	defaultOption = "",
	options,
	register,
	registerOptions,
	error,
	...props
}: SelectInputFieldProps) => {
	const [option, setOption] = useState<string>(defaultOption);
	return (
		<Form.Group className={"mb-3"} controlId={`${name}-select`}>
			<Form.Label>{label}</Form.Label>
			<Form.Select
				{...props}
				{...register(name, registerOptions)}
				isInvalid={!!error}
				value={option}
				onChange={(event: FormEvent) => setOption((event.target as HTMLSelectElement).value)}
			>
				{options}
			</Form.Select>
		</Form.Group>
	);
};