"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "./ui";
import { createRestaurant } from "@/actions/api";
import { useRouter } from "next/navigation";

const categories = [
  { value: "italian", label: "Italian" },
  { value: "french", label: "french" },
  { value: "mexican", label: "mexican" },
  { value: "indian", label: "indian" },
  { value: "chinese", label: "chinese" },
  { value: "vietnamese", label: "vietnamese" },
  { value: "japanese", label: "japanese" },
  { value: "korean", label: "korean" },
  { value: "spanish", label: "spanish" },
];

export const RestaurantCreateForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string>("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !address || !selectedCategories) return;
    try {
      await createRestaurant({ name, address, category: selectedCategories });
      router.push("/");
    } catch (err) {
      alert("Failed to create restaurant");
      console.error(err);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add New Restaurant</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Restaurant name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Restaurant address"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="categories">Categories</Label>
            <Select onValueChange={(value) => setSelectedCategories(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedCategories && (
                <Badge onClick={() => setSelectedCategories("")}>
                  {selectedCategories}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
