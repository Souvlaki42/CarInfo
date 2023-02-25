import { ReactNode } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface PlainTextProps {
	name: string;
	label: string;
	register: UseFormRegister<any>;
	registerOptions?: RegisterOptions;
	error?: FieldError;
	inputGroupText?: ReactNode;
	afterInputComponent?: ReactNode;
	[x: string]: any;
}

export const PlainText = ({
	name,
	label,
	register,
	registerOptions,
	error,
	inputGroupText,
	afterInputComponent,
	...props
}: PlainTextProps) => {
	return (
		<Form.Group className={"mb-3"} controlId={`${name}-input`}>
			<Form.Label>{label}</Form.Label>
			<InputGroup>
				<Form.Control
					{...props}
					{...register(name, registerOptions)}
					isInvalid={!!error}
				/>
				{inputGroupText}
			</InputGroup>
			<Form.Control.Feedback type="invalid">
				{error?.message}
			</Form.Control.Feedback>
			{afterInputComponent}
		</Form.Group>
	);
};