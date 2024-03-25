import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const roboto_latin_regular = Roboto({ subsets: ["latin"], weight: "400" });
// const roboto_greek_regular = Roboto({ subsets: ["greek"], weight: "400" });

export const metadata: Metadata = {
	title: "CarInfo",
	description:
		"A tool for car mechanics to manage their customer data with an easy-to-use interface",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={roboto_latin_regular.className}>
				<Providers>
					<NextTopLoader />
					<Header />
					<div className="container mx-auto">{children}</div>
					<SpeedInsights />
				</Providers>
			</body>
		</html>
	);
}
