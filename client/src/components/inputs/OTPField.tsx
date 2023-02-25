import { ReactNode } from "react";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { PlainText } from "./PlainText";

interface OTPFieldProps {
	name: string;
	label: string;
	register: UseFormRegister<any>;
	registerOptions?: RegisterOptions;
	error?: FieldError;
	button: ReactNode;
	[x: string]: any;
}

export const OTPField = ({
	name,
	label,
	register,
	registerOptions,
	error,
	button,
	...props
}: OTPFieldProps) => {
	return (
		<PlainText
			{...props}
			name={name}
			label={label}
			placeholder={"Enter OTP"}
			register={register}
			registerOptions={registerOptions}
			error={error}
			inputGroupText={button}
		/>
	);
};
