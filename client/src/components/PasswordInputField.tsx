import { useState } from "react";
import { InputGroup } from "react-bootstrap";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import TextInputField from "./TextInputField";

interface PasswordInputFieldProps {
	name: string;
	label: string;
	register: UseFormRegister<any>;
	placeholder?: string;
	registerOptions?: RegisterOptions;
	error?: FieldError;
}

const PasswordInputField = ({
	name,
	label,
	register,
	placeholder = "",
	registerOptions,
	error,
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
			inputText={
				<InputGroup.Text
					onClick={() => setIsPasswordVisible(!isPasswordVisible)}
				>
					{isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
				</InputGroup.Text>
			}
		/>
	);
};

export default PasswordInputField;
