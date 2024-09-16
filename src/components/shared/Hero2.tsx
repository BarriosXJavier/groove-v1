import React from "react";
import { motion } from "framer-motion";
import { Boxes } from "../ui/background-boxes";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const title = "Groove Into Comfort";
const text =
  "Uncover exquisite furniture deals and showcase your own";

const Hero2 = () => {
  return (
    <div className="min-h-screen relative w-full overflow-hidden bg-gradient-to-br from-stone-900 to-stone-800 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-30 text-center max-w-4xl mx-auto"
      >
        <TextGenerateEffect
          words={title}
          className={cn(
            "text-4xl sm:text-5xl md:text-6xl font-semibold mb-5",
            "text-purple-300"
          )}
        />
        <TextGenerateEffect
          words={text}
          className={cn(
            "text-lg sm:text-xl md:text-2xl mb-12",
            "text-purple-200"
          )}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
        className="absolute bottom-6 z-30 flex flex-col items-center"
      >
        <p className="text-neutral-200 text-base mb-2">
          Start exploring below
        </p>
        <ChevronDown size={48} className="text-purple-500" />
      </motion.div>
    </div>
  );
};

export default Hero2;
