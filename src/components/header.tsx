"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./mode-toggle";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DeleteIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";
import { useState } from "react";
import { deleteUser } from "@/services/users";

const AccountDropdown = ({ session }: { session: Session | null }) => {
	const [isDeleteAccountAlertDialogOpen, setIsDeleteAccountAlertDialogOpen] =
		useState(false);

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
		<>
			<AlertDialog
				open={isDeleteAccountAlertDialogOpen}
				onOpenChange={setIsDeleteAccountAlertDialogOpen}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete your
							account and remove your data from our servers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={async () => {
								await deleteUser();
								signOut({ callbackUrl: "/" });
							}}
						>
							Delete my account
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
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
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() => setIsDeleteAccountAlertDialogOpen(true)}
					>
						<DeleteIcon className="mr-2" /> Delete Account
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export const Header = () => {
	const session = useSession();
	const isLoggedIn = !!session?.data;

	return (
		<header className="dark:bg-gray-900 py-2 bg-gray-100 rounded-b-lg z-10 relative">
			<div className="container mx-auto flex justify-between items-center">
				<Link
					href={"/"}
					className="flex gap-x-2 items-center text-xl hover:underline"
				>
					<Image
						src={"/logo.webp"}
						width={60}
						height={60}
						alt="the application icon of a magic flying car"
						loading="lazy"
						placeholder="blur"
						blurDataURL="UklGRsoAAABXRUJQVlA4WAoAAAAQAAAACQAACQAAQUxQSD4AAAABYFTbtpK71k/40TllvAU17EsYZMSf4nY7RMQECMTKORVDoLp+K4QXDRVTjk2WzTVT4UJCJOtPCkA2w9B4AFZQOCBmAAAAUAIAnQEqCgAKAAIANCUAToDFeO3g/9ul4qNAAP753l0bq0toznfWeW1+3pkjMTW5a9I2WXWzqV4Adjz9d9txc9P5+i9zGmGbmfPKNfxrYVxz8sXjqNhnBfo2YbwnG3xoInXBgAAA"
					/>
					CarInfo
				</Link>
				<nav className="flex items-center gap-x-4 text-xl">
					<Link className="hover:underline" href={"/vehicles"}>
						Vehicles
					</Link>
				</nav>
				<div className="flex items-center gap-4">
					{isLoggedIn && <AccountDropdown session={session.data} />}
					{!isLoggedIn && (
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
