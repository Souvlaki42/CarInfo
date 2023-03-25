import { useState } from "react";
import { InputGroup } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TextInputField } from "./TextInputField";
import "../styles/componentStyles.css";

interface PasswordInputFieldProps {
	name: string;
	label: string;
	register: UseFormRegister<any>;
	placeholder?: string;
	registerOptions?: RegisterOptions;
	error?: FieldError;
}

export const PasswordInputField = ({
	name,
	label,
	register,
	placeholder = "",
	registerOptions,
	error
}: PasswordInputFieldProps) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	return (
		<TextInputField
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
		/>
	);
};
