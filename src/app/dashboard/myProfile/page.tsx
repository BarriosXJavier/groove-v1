import React from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MyProfile = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={user.imageUrl} alt={user.fullName || "User"} />
            <AvatarFallback>
              {user.firstName?.charAt(0)}
              {user.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{user.fullName}</h2>
            <p className="text-sm text-gray-500">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
          <p>
            <strong>Created:</strong>{" "}
            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Not available"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyProfile;
