import createJITI from "jiti";
import { fileURLToPath } from "url";

const jiti = createJITI(fileURLToPath(import.meta.url));

jiti("./src/lib/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["lh3.googleusercontent.com"],
	},
};

export default nextConfig;
