import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../styles/componentStyles.css";

interface PasswordInputFieldProps {
	name: string;
	label: string;
	register: UseFormRegister<any>;
	registerOptions?: RegisterOptions;
	error?: FieldError;
	[x: string]: any;
}

export const PasswordInputField = ({
	name,
	label,
	register,
	registerOptions,
	error,
	...props
}: PasswordInputFieldProps) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	return (
		<Form.Group className={"mb-3"} controlId={`${name}-input`}>
			<Form.Label>{label}</Form.Label>
			<InputGroup>
				<Form.Control
					type={isPasswordVisible ? "text" : "password"}
					{...props}
					{...register(name, registerOptions)}
					isInvalid={!!error}
				/>
				<InputGroup.Text
					onClick={() => setIsPasswordVisible(!isPasswordVisible)}
				>
					{isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
				</InputGroup.Text>
			</InputGroup>
			<Form.Control.Feedback type="invalid">
				{error?.message}
			</Form.Control.Feedback>
		</Form.Group>
	);
};
