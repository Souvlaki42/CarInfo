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
            <span className="sr-only">Εικόνα λογαριασμού</span>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user ? (
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: `/unauthorized?callbackUrl=${callbackUrl}`,
              })
            }
          >
            <span className="px-2 text-center">Αποσύνδεση</span>
          </DropdownMenuItem>
        ) : (
          <>
            <DropdownMenuItem onClick={() => signIn("google", { callbackUrl })}>
              <span className="text-center">Γρήγορη Σύνδεση</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              inset
              onClick={() =>
                signIn("google", { callbackUrl }, { prompt: "login" })
              }
            >
              <span className="px-1.5 text-center">Σύνδεση</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
