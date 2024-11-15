"use client";

// import { cn } from "../../utils/utils";
import { WavyBackground } from "../components/ui/wavy-background";


export default function LandingPage() {
  return (
    <WavyBackground
        colors={["#6366f1", "#8b5cf6", "#d946ef", "#f472b6", "#60a5fa"]}
        blur={12}
        waveWidth={30}
        speed="fast"
        backgroundFill="#eef2ff"
        waveOpacity={0.4}
        >

      <div className="text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight">
          <span>Experience</span>{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600">
            Crypto Evolution
          </span>
        </h1>
        <h2 className="mt-4 text-3xl md:text-4xl font-medium text-gray-800">
          <span>Revolutionize your</span>{" "}
          <span className="italic text-indigo-600">investments</span> and{" "}
          <span className="font-extrabold text-pink-600">stay ahead</span>
        </h2>
      </div>


    </WavyBackground>


  );
}
