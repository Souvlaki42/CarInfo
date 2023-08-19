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
      <CardHeader>
        <CardTitle className="flex justify-between">
          {engineNumber}
          <Button
            variant="outline"
            size="icon"
            onClick={async () => {
              await deleteCar(id);
              router.refresh();
            }}
          >
            <Trash2Icon className="h-4 w-4" />
          </Button>{" "}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{frame}</p>
      </CardContent>
      <CardFooter>
        <p>{year}</p>
      </CardFooter>
    </Card>
  );
};
