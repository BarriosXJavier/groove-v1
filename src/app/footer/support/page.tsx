"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const SupportPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="p-8 bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-100">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger
              onClick={() => handleAccordionClick(0)}
              className="bg-gray-800 text-gray-100 p-4 rounded hover:bg-gray-700 transition"
            >
              How do I create a new listing?
            </AccordionTrigger>
            <AccordionContent
              className={`p-4 transition-all duration-300 ${
                activeIndex === 0 ? "block bg-gray-700" : "hidden"
              }`}
            >
              You can create a new listing by navigating to the dashboard and
              selecting &apos;Create Listing&apos;. Fill out the form with your
              listing details and submit.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger
              onClick={() => handleAccordionClick(1)}
              className="bg-gray-800 text-gray-100 p-4 rounded hover:bg-gray-700 transition"
            >
              How can I edit an existing listing?
            </AccordionTrigger>
            <AccordionContent
              className={`p-4 transition-all duration-300 ${
                activeIndex === 1 ? "block bg-gray-700" : "hidden"
              }`}
            >
              To edit an existing listing, go to your dashboard, find the
              listing you want to edit, and click on the &apos;Edit&apos;
              button. Make the necessary changes and save the updates.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger
              onClick={() => handleAccordionClick(2)}
              className="bg-gray-800 text-gray-100 p-4 rounded hover:bg-gray-700 transition"
            >
              What should I do if I forget my password?
            </AccordionTrigger>
            <AccordionContent
              className={`p-4 transition-all duration-300 ${
                activeIndex === 2 ? "block bg-gray-700" : "hidden"
              }`}
            >
              If you forget your password, click on the &apos;Forgot
              Password&apos; link on the login page and follow the instructions
              to reset your password.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger
              onClick={() => handleAccordionClick(3)}
              className="bg-gray-800 text-gray-100 p-4 rounded hover:bg-gray-700 transition"
            >
              How do I subscribe to the newsletter?
            </AccordionTrigger>
            <AccordionContent
              className={`p-4 transition-all duration-300 ${
                activeIndex === 3 ? "block bg-gray-700" : "hidden"
              }`}
            >
              You can subscribe to our newsletter by visiting the footer section
              of our website and entering your email address in the subscription
              form.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default SupportPage;
