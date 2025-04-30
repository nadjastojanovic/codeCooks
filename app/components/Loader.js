"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import loadingAnimation from "../../public/loading.json";

export default function Loader({ message = "Loading…" }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

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
