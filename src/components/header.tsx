"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export const Header = () => {
	const session = useSession();
	return (
		<header>
			<div>
				{session.data ? (
					<Button onClick={() => signOut()}>Sign Out</Button>
				) : (
					<Button onClick={() => signIn("google")}>Sign In</Button>
				)}
				{session.data?.user?.name}
				<ModeToggle />
			</div>
		</header>
	);
};
