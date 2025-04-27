"use client";
import Lottie from "lottie-react";
import loadingAnimation from "../../public/loading.json";

export default function Loader({ message = "Loading…" }) {
  return (
    <div
      className="
        fixed inset-0 
        flex flex-col items-center justify-center 
        bg-white 
        z-50
      "
    >
      <div className="w-64 h-64">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
