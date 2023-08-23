"use client";

import Image from "next/image";
import profilePlaceholder from "@/public/profile-placeholder.png";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

import { Icons } from "./icons";
import { buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface UserMenuButtonProps {
  session: Session | null;
  callbackUrl: string;
}

export function UserMenuButton({
  session,
  callbackUrl = "/",
}: UserMenuButtonProps) {
  const user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={buttonVariants({ variant: "ghost", size: "icon" })}
      >
        {user ? (
          <Image
            src={user.image || profilePlaceholder}
            alt="Profile picture"
            width={32}
            height={32}
            className="w-8 select-none rounded-full"
          />
        ) : (
          <div>
            <Icons.userMenu />
            <span className="sr-only">Profile picture</span>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user ? (
          <DropdownMenuItem
            inset
            onClick={() =>
              signOut({
                callbackUrl: `/unauthorized?callbackUrl=${callbackUrl}`,
              })
            }
          >
            <span className="text-center">Sign Out</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            inset
            onClick={() => signIn("google", { callbackUrl })}
          >
            <span className="text-center">Sign In</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
