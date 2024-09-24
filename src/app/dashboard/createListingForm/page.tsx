"use client";

import React, { useState, ChangeEvent } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import ShimmerButton from "@/components/ui/shimmer-button";


const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  price: z.coerce
    .number()
    .min(0.01, { message: "Price must be greater than 0" }),
  description: z
    .string()
    .max(250, { message: "Description can't exceed 250 characters" }),
  location: z.string().min(1, { message: "Location is required" }),
  tags: z.string().optional(), 
  images: z
    .array(z.string().url())
    .max(5, { message: "You can enter up to 5 image URLs" }),
  category: z.enum(
    [
      "Living Room",
      "Dining Room",
      "Bedroom",
      "Rugs & Carpets",
      "Lighting",
      "Home Decor",
      "Movers",
    ],
    { message: "Please select a category" }
  ),
});

type FormValues = z.infer<typeof schema>;

export default function CreateListingForm() {
  const [urls, setUrls] = useState<string[]>([]);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Submitted Data:", data);

    try {
      const response = await fetch("/api/listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          images: urls,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create listing");
      }

      const responseData = await response.json();
      console.log("Listing created successfully", responseData);

      toast({
        title: "Success",
        description: "Listing created successfully!",
        variant: "success" as "default" | "destructive",
      });

      reset();
      setUrls([]);
    } catch (error) {
      console.error("Error creating listing", error);

      toast({
        title: "Error",
        description: "Failed to create listing.",
        variant: "destructive",
      });
    }
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.target.value.trim();
    if (newUrl && urls.length < 5) {
      try {
        new URL(newUrl);
        setUrls((prevUrls) => [...prevUrls, newUrl]);
        setValue("images", [...urls, newUrl]);
        event.target.value = "";
      } catch {
        console.error("Invalid URL");
      }
    }
  };

  const removeUrl = (index: number) => {
    const newUrls = urls.filter((_, i) => i !== index);
    setUrls(newUrls);
    setValue("images", newUrls);
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="space-y-1 bg-stone-800 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">
            Create a New Listing
          </CardTitle>
          <CardDescription className="text-blue-100">
            Fill out the details below to list your item for sale.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6 pt-6">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter the listing title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter the price"
              {...register("price")}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter a description"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Enter the location"
              {...register("location")}
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          <div className="relative z-10 ">
            <Label>Category</Label>
            <Select
              onValueChange={(value) => {
                setValue("category", value as FormValues["category"]);
                console.log(getValues("category"));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-[#eeebe7]">
                <SelectItem
                  value="Dining Room"
                  className="hover:bg-[#292524] hover:text-white"
                >
                  Dining Room
                </SelectItem>
                <SelectItem
                  value="Living Room"
                  className="hover:bg-[#292524] hover:text-white"
                >
                  Living Room
                </SelectItem>
                <SelectItem
                  value="Bedroom"
                  className="hover:bg-[#292524] hover:text-white"
                >
                  Bedroom
                </SelectItem>
                <SelectItem
                  value="Rugs & Carpets"
                  className="hover:bg-[#292524] hover:text-white"
                >
                  Rugs & Carpets
                </SelectItem>
                <SelectItem
                  value="Lighting"
                  className="hover:bg-[#292524] hover:text-white"
                >
                  Lighting
                </SelectItem>
                <SelectItem
                  value="Home Décor"
                  className="hover:bg-[#292524] hover:text-white"
                >
                  Home Décor
                </SelectItem>
                <SelectItem
                  value="Movers"
                  className="hover:bg-[#292524] hover:text-white"
                >
                  Movers
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="tags">Tags (Optional)</Label>
            <Input
              id="tags"
              placeholder="Enter comma-separated tags (optional)"
              {...register("tags")}
            />
            {errors.tags && (
              <p className="text-red-500 text-sm">{errors.tags.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="imageUrl">Add Image URLs (max 5)</Label>
            <Input
              id="imageUrl"
              placeholder="Enter an image URL"
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              onBlur={handleUrlChange}
            />
            {errors.images && (
              <p className="text-red-500 text-sm">{errors.images.message}</p>
            )}
            <div className="flex flex-wrap mt-2">
              {urls.map((url, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span>{url}</span>
                  <Button
                    variant="destructive"
                    onClick={() => removeUrl(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="bg-gray-50 rounded-b-lg flex">
          <ShimmerButton className="mx-auto" type="submit">
            Create Listing
          </ShimmerButton>
        </CardFooter>
      </form>
    </Card>
  );
}
