import { deleteRestaurant, getRestaurantById } from "@/actions/api";
import { Button, RestaurantCard } from "@/components";
import { Restaurant } from "@/types/Restaurant";

export default async function ShowRestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const restaurant = await getRestaurantById(parseInt(id));

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <RestaurantCard restaurant={restaurant as Restaurant} />
      <form
        action={async () => {
          "use server";
          await deleteRestaurant(parseInt(id));
        }}
      >
        <Button type="submit" variant="destructive">
          Eliminar
        </Button>
      </form>
    </div>
  );
}
