"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { Trash2Icon } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "./ui/button";

interface CarCardProps {
  id: string;
  engineNumber: string;
  frame: string;
  year: string;
  deleteCar: (id: string) => Promise<void>;
}

export const CarCard: FC<CarCardProps> = ({
  id,
  engineNumber,
  frame,
  year,
  deleteCar,
}) => {
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="py-0 pl-6 pt-6">
        <CardTitle className="flex justify-between">
          Engine Number: {engineNumber}
          <Button
            variant="ghost"
            size="icon"
            onClick={async () => {
              await deleteCar(id);
              router.refresh();
            }}
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>Frame: {frame}</CardContent>
      <CardFooter>Year: {year}</CardFooter>
    </Card>
  );
};
