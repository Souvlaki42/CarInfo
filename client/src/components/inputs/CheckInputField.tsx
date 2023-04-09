import { useState } from "react";
import { Form } from "react-bootstrap";
import { FormCheckType } from "react-bootstrap/esm/FormCheck";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface CheckInputFieldProps {
	name: string;
	label: string;
	type: FormCheckType;
	defaultChecked?: boolean;
	register: UseFormRegister<any>;
	registerOptions?: RegisterOptions;
	error?: FieldError;
	[x: string]: any;
}

export const CheckInputField = ({
	name,
	label,
	type,
	defaultChecked = false,
	register,
	registerOptions,
	error,
	...props
}: CheckInputFieldProps) => {
	const [checked, setChecked] = useState<boolean>(defaultChecked);
	return (
		<Form.Group className={"mb-3"} controlId={`${name}-check`}>
			<Form.Label>{label}</Form.Label>
			<Form.Check
				{...props}
				{...register(name, registerOptions)}
				isInvalid={!!error}
				type={type}
				checked={checked}
				onChange={() => {setChecked(!checked)}}
			/>
		</Form.Group>
	);
};