import { getAllRestaurants } from "@/actions/api";
import { Button, RestaurantCard } from "@/components";
import Link from "next/link";

export default async function Home() {
  const restaurants = await getAllRestaurants();
  const renderedRestaurants = restaurants.map((restaurant) => (
    <Link href={`/restaurants/${restaurant.id}`} key={restaurant.id}>
      <RestaurantCard restaurant={restaurant} />
    </Link>
  ));
  return (
    <div className="h-screen  max-w-screen-xl mx-auto pt-10">
      <Link href="/restaurants/create">
        <Button>Crear nuevo Restaurante</Button>
      </Link>
      <div className="grid grid-cols-3 h-full border border-red-500 overflow-y-auto gap-5 py-5">
        {renderedRestaurants}
      </div>
    </div>
  );
}
