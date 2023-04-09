import { Form, InputGroup } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
	name: string;
	label: string;
	register: UseFormRegister<any>;
	registerOptions?: RegisterOptions;
	error?: FieldError;
	[x: string]: any;
}

export const TextInputField = ({
	name,
	label,
	register,
	registerOptions,
	error,
	...props
}: TextInputFieldProps) => {
	return (
		<Form.Group className={"mb-3"} controlId={`${name}-input`}>
			<Form.Label>{label}</Form.Label>
			<InputGroup>
				<Form.Control
					{...props}
					{...register(name, registerOptions)}
					isInvalid={!!error}
				/>
			</InputGroup>
			<Form.Control.Feedback type="invalid">
				{error?.message}
			</Form.Control.Feedback>
		</Form.Group>
	);
};