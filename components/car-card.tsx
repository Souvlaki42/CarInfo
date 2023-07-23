import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC } from "react";

interface CarCardProps {
    engineNumber: string;
    frame: string;
    year: string;
}

export const CarCard: FC<CarCardProps> = ({ engineNumber, frame, year }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{engineNumber}</CardTitle>
        {/* <CardDescription></CardDescription> */}
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
