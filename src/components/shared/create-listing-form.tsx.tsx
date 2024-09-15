"use client";

import React, { useState, ChangeEvent, KeyboardEvent } from "react";
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
import { MapPinIcon, TagIcon, DollarSignIcon } from "lucide-react";

// Define the Zod schema
const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  price: z.number().min(0.01, { message: "Price must be greater than 0" }),
  description: z
    .string()
    .max(250, { message: "Description can't exceed 250 characters" }),
  location: z.string().min(1, { message: "Location is required" }),
  tags: z.string().optional(),
  images: z
    .array(z.string().url())
    .max(5, { message: "You can enter up to 5 image URLs" }),
});

type FormValues = z.infer<typeof schema>;

export function CreateListingForm() {
  const [urls, setUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch("/api/listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          images: urls, // Include URLs in the request
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create listing");
      }

      const responseData = await response.json();
      console.log("Listing created successfully", responseData);
    } catch (error) {
      console.error("Error creating listing", error);
    }
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.target.value.trim();
    if (newUrl && urls.length < 5) {
      try {
        new URL(newUrl); // Validate URL
        setUrls((prevUrls) => [...prevUrls, newUrl]);
        setValue("images", [...urls, newUrl]); // Update form value
        event.target.value = ""; // Clear input
      } catch {
        console.error("Invalid URL");
      }
    }
  };

  const removeUrl = (index: number) => {
    const newUrls = urls.filter((_, i) => i !== index);
    setUrls(newUrls);
    setValue("images", newUrls); // Update form value
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="space-y-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold">
            Create a New Listing
          </CardTitle>
          <CardDescription className="text-blue-100">
            Fill out the details below to list your item for sale.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 pt-6">
          {/* Image URLs */}
          <div className="space-y-2">
            <Label htmlFor="images" className="text-lg font-semibold">
              Image URLs
            </Label>
            <div className="flex flex-col gap-4">
              <Input
                id="images"
                placeholder="Enter image URLs and press Enter"
                className="text-lg"
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleUrlChange(e as unknown as ChangeEvent<HTMLInputElement>);
                  }
                }}
              />
              <div className="flex flex-wrap gap-4">
                {urls.map((url, index) => (
                  <div
                    key={index}
                    className="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden"
                  >
                    <img
                      src={url}
                      alt={`Image ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 w-6 h-6 rounded-full"
                      onClick={() => removeUrl(index)}
                    >
                      <span className="text-white">×</span>
                    </Button>
                  </div>
                ))}
              </div>
              {errors.images && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.images.message}
                </p>
              )}
            </div>
          </div>

          {/* Title and Price */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-lg font-semibold">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter a catchy title"
                className="text-lg"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-lg font-semibold">
                Price
              </Label>
              <div className="relative">
                <DollarSignIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="pl-10 text-lg"
                  {...register("price", { valueAsNumber: true })}
                />
              </div>
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-lg font-semibold">
              Description
            </Label>
            <Textarea
              id="description"
              rows={5}
              placeholder="Describe your item in detail"
              className="text-lg resize-none"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Location and Tags */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-lg font-semibold">
                Location
              </Label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="location"
                  placeholder="Enter a location"
                  className="pl-10 text-lg"
                  {...register("location")}
                />
              </div>
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-lg font-semibold">
                Tags
              </Label>
              <div className="relative">
                <TagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="tags"
                  placeholder="Add tags separated by commas"
                  className="pl-10 text-lg"
                  {...register("tags")}
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 rounded-b-lg">
          <Button
            type="submit"
            className="w-full text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300"
          >
            Create Listing
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}