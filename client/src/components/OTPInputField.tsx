import { ReactNode } from "react";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import TextInputField from "./TextInputField";

interface OTPInputFieldProps {
	name: string;
	label: string;
	register: UseFormRegister<any>;
	registerOptions?: RegisterOptions;
	error?: FieldError;
	button: ReactNode;
	[x: string]: any;
}

const OTPInputField = ({
	name,
	label,
	register,
	registerOptions,
	error,
	button,
	...props
}: OTPInputFieldProps) => {
	return (
		<TextInputField
			{...props}
			name={name}
			label={label}
			placeholder={"Enter OTP"}
			register={register}
			registerOptions={registerOptions}
			error={error}
			inputText={button}
		/>
	);
};

export default OTPInputField;
