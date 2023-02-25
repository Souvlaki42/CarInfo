import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PlainText } from "./PlainText";
import "../../styles/componentStyles.css";

interface PasswordFieldProps {
	name: string;
	label: string;
	register: UseFormRegister<any>;
	placeholder?: string;
	registerOptions?: RegisterOptions;
	error?: FieldError;
	forgotPasswordText: boolean;
}

export const PasswordField = ({
	name,
	label,
	register,
	placeholder = "",
	registerOptions,
	error,
	forgotPasswordText,
}: PasswordFieldProps) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	return (
		<PlainText
			name={name}
			label={label}
			type={isPasswordVisible ? "text" : "password"}
			placeholder={placeholder}
			register={register}
			registerOptions={registerOptions}
			error={error}
			inputGroupText={
				<InputGroup.Text
					onClick={() => setIsPasswordVisible(!isPasswordVisible)}
				>
					{isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
				</InputGroup.Text>
			}
			afterInputComponent={
				forgotPasswordText ? (
					<div className="d-flex justify-content-end">
						<Form.Text className="text-end hover-underline text-reset">
							Forgot your password?
						</Form.Text>
					</div>
				) : (
					<></>
				)
			}
		/>
	);
};
