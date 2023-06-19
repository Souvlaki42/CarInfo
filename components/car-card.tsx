import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC } from "react";

interface CarCardProps {
    engineNumber: number;
    frame: string;
    year: number;
}

export const CarCard: FC<CarCardProps> = ({ engineNumber, frame, year }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{engineNumber}</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
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
