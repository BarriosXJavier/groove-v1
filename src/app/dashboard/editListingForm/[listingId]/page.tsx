"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ShimmerButton from "@/components/ui/shimmer-button";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  price: z.coerce
    .number()
    .min(0.01, { message: "Price must be greater than 0" }),
  description: z
    .string()
    .max(250, { message: "Description can't exceed 250 characters" }),
  location: z.string().min(2, { message: "Location is required" }),
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

// Type inferred from the schema
type FormValues = z.infer<typeof schema>;

export default function EditListingForm() {
  const { listingId } = useParams();
  const [urls, setUrls] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  // Fetch listing data
  useEffect(() => {
    const fetchListing = async () => {
      if (!listingId) return;

      try {
        const response = await fetch(`/api/singleListing/${listingId}`);
        const { success, data: listing } = await response.json();

        if (success && listing) {
          setValue("title", listing.title);
          setValue("price", listing.price);
          setValue("description", listing.description);
          setValue("location", listing.location);
          setValue("tags", listing.tags?.join(", ") ?? "");
          setValue("category", listing.category);
          setUrls(listing.images ?? []);
          setValue("images", listing.images ?? []); // Sync images with form state
        }
      } catch (error) {
        console.error("Error fetching listing", error);
      }
    };

    fetchListing();
  }, [listingId, setValue]);

  // Handle form submission
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!listingId) return;

    const formData = {
      ...data,
      images: urls, // Ensure URLs are sent to the API
    };

    console.log("Submitting form data:", formData);

    try {
      const response = await fetch(`/api/singleListing/${listingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("API response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error response:", errorData);
        throw new Error(errorData.message || "Failed to update listing");
      }

      const responseData = await response.json();
      console.log("API success response:", responseData);

      if (responseData.success) {
        reset();
        setUrls([]);
      } else {
        throw new Error(
          responseData.message || "Update failed with unknown error"
        );
      }
    } catch (error) {
      console.error("Error updating listing", error);
    }
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newUrl = event.target.value.trim();
    if (newUrl && urls.length < 5) {
      try {
        new URL(newUrl);
        const updatedUrls = [...urls, newUrl];
        setUrls(updatedUrls);
        setInputValue("");
        setValue("images", updatedUrls);
      } catch {
        console.error("Invalid URL");
      }
    }
  };

  const keepUrl = (url: string) => {
    setInputValue(url);
  };

  const removeUrl = (index: number) => {
    const updatedUrls = urls.filter((_, i) => i !== index);
    setUrls(updatedUrls);
    setValue("images", updatedUrls);
  };

  return (
    <Card className="max-w-full md:max-w-4xl mx-auto shadow-2xl border border-gray-200 rounded-xl bg-white transition-transform transform hover:scale-105 duration-300 ease-in-out">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader className="space-y-1 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 text-white rounded-t-xl p-6">
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide">
            Edit Listing
          </CardTitle>
          <CardDescription className="text-gray-300">
            Modify the details below to update your listing.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-gray-50">
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
          <div className="col-span-1 sm:col-span-2">
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
          <div className="relative z-10 col-span-1 sm:col-span-2">
            <Label>Category</Label>
            <Select
              onValueChange={(value) =>
                setValue("category", value as FormValues["category"])
              }
              value={watch("category")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-[#eeebe7]">
                {[
                  "Dining Room",
                  "Living Room",
                  "Bedroom",
                  "Rugs & Carpets",
                  "Lighting",
                  "Home Decor",
                  "Movers",
                ].map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="hover:bg-[#292524] hover:text-white"
                  >
                    {category}
                  </SelectItem>
                ))}
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
          <div className="col-span-1 sm:col-span-2">
            <Label htmlFor="imageUrl">Add Image URLs (max 5)</Label>
            <Input
              id="imageUrl"
              placeholder="Enter an image URL"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleUrlChange}
            />
            {errors.images && (
              <p className="text-red-500 text-sm">{errors.images.message}</p>
            )}
            <div className="flex flex-wrap mt-2 gap-2">
              {urls.map((url, index) => (
                <div
                  key={index}
                  className="bg-gray-200 p-2 rounded-lg flex flex-col items-center gap-2 max-w-xs"
                >
                  <Image
                    src={url}
                    alt={`Image ${index + 1}`}
                    width={100}
                    height={100}
                  />
                  <span className="text-sm truncate max-w-full">{url}</span>
                  <Button
                    type="button"
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => keepUrl(url)}
                  >
                    Keep
                  </Button>
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800 ml-2"
                    onClick={() => removeUrl(index)}
                  >
                    Remove
                  </button>
                </div>  
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end p-6 bg-gray-100 rounded-b-xl">
          <ShimmerButton className="px-6 py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg transition duration-300 ease-in-out">
            Update Listing
          </ShimmerButton>
        </CardFooter>
      </form>
    </Card>
  );
}
