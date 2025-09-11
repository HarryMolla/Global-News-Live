import { Ripple } from "@/components/ui/shadcn-io/ripple";
import { GradientText } from "@/components/ui/shadcn-io/gradient-text";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Info } from "lucide-react";
import image from "../assets/Harry.png";

export default function CallToAction() {
  const handleEmailMe = () => {
    window.location.href = "mailto:hmiol5577@gmail.com";
  };

  const handleCallMe = () => {
    window.location.href = "tel:+251943416655";
  };

  return (
    <>
      <div className="relative justify-center items-center grid gap-0 overflow-visible">
        <div
          className="h-[300px] md:h-[500px] md:mt-15 mt-35
         flex justify-center items-center overflow-visible "
        >
          <img
            src={image}
            alt="Harry"
            className="md:w-70 md:h-70 w-40 h-40 rounded-full relative z-10  md:mt-0 -mt-30"
          />
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none overflow-hidden">
            <Ripple
              mainCircleSize={150}
              mainCircleOpacity={0.23}
              numCircles={6}
            />
          </div>
        </div>
        <p className="font-bold text-center text-gray-600 text-2xl md:mb-5 -mt-40">
          Hiryakos Molla
        </p>
        <GradientText
          className="text-2xl font-medium text-center mr-5 ml-5 md:mb-3 md:-mt-10 -mt-12"
          text="UI/UX Designer & Front-End Developer"
          neon
          gradient="linear-gradient(90deg, #00ff00 0%, #00ffff 25%, #ff00ff 50%, #00ffff 75%, #00ff00 100%)"
        />
      </div>
      <div className="flex items-center justify-center mt-5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="p-8 rounded-xl w-full max-w-md flex flex-col gap-6 items-center" // Removed bg-white shadow-lg if not needed, but add back if desired
        >
          <motion.h2
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold text-gray-500 text-center"
          >
            Let's Connect
          </motion.h2>

          <div className="grid gap-3 w-full">
            <button
              onClick={handleEmailMe}
              className="border-2 border-blue-500 bg-blue-100 text-blue-500 hover:text-white py-3 rounded-md font-semibold transition-colors duration-300 hover:bg-blue-500 hover:shadow-lg flex-1 flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              Email Me
            </button>

            <button
              onClick={handleCallMe}
              className="border-2 border-blue-500 bg-blue-100 text-blue-500 hover:text-white py-3 rounded-md font-semibold transition-colors duration-300 hover:bg-blue-500 hover:shadow-lg flex-1 flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Call Me
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
