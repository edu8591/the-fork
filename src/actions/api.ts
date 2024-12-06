"use server";

import { Restaurant } from "@/types/Restaurant";
import { redirect } from "next/navigation";

export const getAllRestaurants = async (): Promise<Restaurant[]> => {
  const response = await fetch(process.env.NEXT_PUBLIC_URL);
  const restaurants = await response.json();
  return restaurants as Restaurant[];
};

export const deleteRestaurant = async (id: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-User-Email": process.env.USER_EMAIL,
      "X-User-Token": process.env.TOKEN,
    },
  });

  if (res.ok) {
    redirect("/");
  }
};
export const getRestaurantById = async (
  id: number
): Promise<Partial<Restaurant>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-User-Email": process.env.USER_EMAIL,
      "X-User-Token": process.env.TOKEN,
    },
  });

  const data = await response.json();
  return data as Partial<Restaurant>;
};

export const createRestaurant = async (formData: {
  name: string;
  address: string;
  category: string;
}) => {
  const body = JSON.stringify({ restaurant: formData });
  try {
    const res = await fetch("http://localhost:3000/api/restaurant", {
      method: "POST",
      body,
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create restaurant");
  }
};
