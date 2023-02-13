import { ReactNode } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
	name: string;
	label: string;
	register: UseFormRegister<any>;
	registerOptions?: RegisterOptions;
	error?: FieldError;
	inputText?: ReactNode;
	[x: string]: any;
}

const TextInputField = ({
	name,
	label,
	register,
	registerOptions,
	error,
	inputText,
	...props
}: TextInputFieldProps) => {
	return (
		<Form.Group className="mb-3" controlId={`${name}-input`}>
			<Form.Label>{label}</Form.Label>
			<InputGroup>
				<Form.Control
					{...props}
					{...register(name, registerOptions)}
					isInvalid={!!error}
				/>
				{inputText}
			</InputGroup>
			<Form.Control.Feedback type="invalid">
				{error?.message}
			</Form.Control.Feedback>
		</Form.Group>
	);
};

export default TextInputField;
