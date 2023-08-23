"use client";

import { PencilIcon, Trash2Icon } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { deleteCar } from "@/app/actions";
import { Car } from "@prisma/client";
import Link from "next/link";
import { useTransition } from "react";
import { Button, buttonVariants } from "./ui/button";

export function CarCard({ car }: {car: Car}) {
  const [isPending, startTransition] = useTransition();
  return (
    <>
    <Card>
    <CardHeader className="py-3 pl-6 sm:pt-6">
        <CardTitle className="flex justify-between">
          Car ID: {car.id}
          <div className="flex gap-x-1 sm:gap-x-2">
            <Link href={`/add-car?updateId=${car.id}`}>
              <div className={buttonVariants({ variant: "secondary", size: "icon" })}>
                <PencilIcon className="h-4 w-4" />
              </div>
            </Link>          
            <Button disabled={isPending} variant={"destructive"} size={"icon"} onClick={async () => {
              startTransition(async () => await deleteCar(car.id));
            }}>
              <Trash2Icon className="h-4 w-4" />
            </Button>            

          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>Engine Number: {car.engineNumber}<br />Frame: {car.frame}<br />Year: {car.year}</CardContent>
      <CardFooter>Last Updated: {new Date(car.updatedAt).toLocaleString("el-GR")}</CardFooter>
    </Card>
    </>
  )
}