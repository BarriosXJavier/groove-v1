"use client";

import { Input } from "@/components/ui/input";
import { ArrowRight, MailIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

const Subscribe = () => {
  const [input, setInput] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/mailingList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: input }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Successfully subscribed!");
        setInput("");
      } else {
        setMessage(result.error || "Subscription failed.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto space-y-6 w-full h-full p-6 bg-[#1c1917] rounded-lg shadow-lg">
      <div className="space-y-2 text-center">
        <h3 className="text-3xl font-bold text-transparent duration-1000 bg-white cursor-default text-stroke animate-title sm:text-5xl md:text-6xl whitespace-nowrap bg-clip-text">
          Subscribe to our
        </h3>
        <h1 className="z-10 text-4xl font-bold text-center cursor-default sm:text-6xl md:text-7xl whitespace-nowrap bg-clip-text duration-1000 text-transparent bg-white from-purple-100 bg-gradient-to-r to-purple-900 animate-fade-in-3">
          Newsletter
        </h1>
        <p className="text-gray-200">
          Get the latest updates and exclusive deals delivered to your inbox.
        </p>
      </div>
      <div className="flex max-w-md mx-auto justify-center items-center h-full">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="relative w-full">
            <MailIcon
              className="absolute left-3 top-3 text-muted-foreground"
              size={18}
            />
            <Input
              type="email"
              value={input}
              placeholder="Email Address"
              className="w-full bg-[#64748B] text-muted-foreground pl-10 pr-20 py-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#AC58F5] transition duration-150"
              required
              onChange={handleInputChange}
            />
          </div>
          <Button
            type="submit"
            className="bg-[#AC58F5] px-4 py-2 rounded-md transition duration-150 hover:bg-[#9348D5] text-white"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"} &nbsp;
            {!loading && <ArrowRight className="h-4 w-4" />}
          </Button>
        </form>
      </div>

      {message && (
        <p className="text-center mt-4 text-white" aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );
};

export default Subscribe;
