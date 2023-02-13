import otpGenerator from "otp-generator";

export async function generateOTP() {
	return await otpGenerator.generate(6, {
		lowerCaseAlphabets: false,
		upperCaseAlphabets: false,
		specialChars: false,
	});
}
