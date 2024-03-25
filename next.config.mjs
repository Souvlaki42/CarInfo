import createJITI from "jiti";
import { fileURLToPath } from "url";

const jiti = createJITI(fileURLToPath(import.meta.url));

jiti("./src/lib/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				port: "",
			},
		],
		minimumCacheTTL: 3600,
	},
};

export default nextConfig;
