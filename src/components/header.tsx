"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./mode-toggle";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";

const AccountDropdown = ({ session }: { session: Session | null }) => {
	const name = session?.user.name;
	const image = session?.user.image ?? "";

	const getAvatarFallback = (name?: string | null) => {
		const parts = name?.trim().split(" ");
		let shortName = "";
		if (!parts || parts.length < 1) shortName = "AV";
		else if (parts.length === 1) shortName = parts[0].slice(0, 2);
		else if (parts.length === 2)
			shortName = parts[0].charAt(0) + parts[1].charAt(0);
		else {
			for (const part of parts) {
				shortName += part.charAt(0);
			}
		}
		return shortName.toUpperCase();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"ghost"}>
					<Avatar className="mr-2">
						<AvatarImage src={image} />
						<AvatarFallback>{getAvatarFallback(name)}</AvatarFallback>
					</Avatar>
					{name}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					onClick={() =>
						signOut({
							callbackUrl: "/",
						})
					}
				>
					<LogOutIcon className="mr-2" /> Sign Out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const Header = () => {
	const session = useSession();
	return (
		<header className="container mx-auto dark:bg-gray-900 py-2 bg-gray-100 rounded-b-lg">
			<div className="flex justify-between items-center">
				<Link
					href={"/"}
					className="flex gap-2 items-center text-xl hover:underline"
				>
					<Image
						src={"/icon.png"}
						width={60}
						height={60}
						alt="the application icon of a magic flying car"
					/>
					CarInfo
				</Link>
				<div className="flex items-center gap-4">
					{session?.data && <AccountDropdown session={session.data} />}
					{!session?.data && (
						<Button variant={"link"} onClick={() => signIn("google")}>
							<LogInIcon className="mr-2" /> Sign In
						</Button>
					)}
					<ModeToggle />
				</div>
			</div>
		</header>
	);
};
