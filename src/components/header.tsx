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

const AccountDropdown = () => {
	const session = useSession();
	const isLoggedIn = !!session.data;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={"ghost"}>
					<Avatar className="mr-2">
						<AvatarImage src={session.data?.user?.image ?? ""} />
						<AvatarFallback>AV</AvatarFallback>
					</Avatar>
					{session.data?.user?.name}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{isLoggedIn ? (
					<DropdownMenuItem onClick={() => signOut()}>
						<LogOutIcon className="mr-2" /> Sign Out
					</DropdownMenuItem>
				) : (
					<DropdownMenuItem onClick={() => signIn("google")}>
						<LogInIcon className="mr-2" /> Sign In
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export const Header = () => {
	return (
		<header className="container mx-auto dark:bg-gray-900 py-4 bg-gray-100">
			<div className="flex justify-between items-center">
				<div>LOGO</div>
				<div className="flex items-center gap-4">
					<AccountDropdown />
					<ModeToggle />
				</div>
			</div>
		</header>
	);
};
