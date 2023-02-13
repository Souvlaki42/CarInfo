import { Form, InputGroup } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface OTPInputFieldProps {
	name: string;
	label: string;
	register: UseFormRegister<any>;
	registerOptions?: RegisterOptions;
	error?: FieldError;
	[x: string]: any;
}

const OTPInputField = ({
	name,
	label,
	register,
	registerOptions,
	error,
	...props
}: OTPInputFieldProps) => {
	return (
		<Form.Group className="mb-3" controlId={`${name}-input`}>
			<Form.Label>{label}</Form.Label>
			<InputGroup>
				<Form.Control
					{...props}
					maxLength={1}
					{...register(`${name}_1`, registerOptions)}
					isInvalid={!!error}
					/>
				<Form.Control
					maxLength={1}
					{...props}
					{...register(`${name}_2`, registerOptions)}
					isInvalid={!!error}
					/>
				<Form.Control
					{...props}
					maxLength={1}
					{...register(`${name}_3`, registerOptions)}
					isInvalid={!!error}
					/>
				<Form.Control
					{...props}
					maxLength={1}
					{...register(`${name}_4`, registerOptions)}
					isInvalid={!!error}
					/>
				<Form.Control
					{...props}
					maxLength={1}
					{...register(`${name}_5`, registerOptions)}
					isInvalid={!!error}
					/>
				<Form.Control
					{...props}
					maxLength={1}
					{...register(`${name}_6`, registerOptions)}
					isInvalid={!!error}
				/>
			</InputGroup>
			<Form.Control.Feedback type="invalid">
				{error?.message}
			</Form.Control.Feedback>
		</Form.Group>
	);
};

export default OTPInputField;
