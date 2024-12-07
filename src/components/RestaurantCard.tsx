import { Restaurant } from "@/types/Restaurant";
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui";
import { MapPin } from "lucide-react";

type RestaurantCardProps = {
  restaurant: Restaurant;
};
export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          {restaurant.name}{" "}
          <Badge variant="destructive">{restaurant.category}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <p className="flex items-center">
            <MapPin size={16} className="mr-2" /> {restaurant.address}
          </p>
        </CardDescription>
      </CardContent>
    </Card>
  );
};
