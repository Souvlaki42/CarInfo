import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "CarInfo",
	description:
		" A tool for car mechanics to manage their customer data with an easy-to-use interface",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
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
