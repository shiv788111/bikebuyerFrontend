"use client";

import { useSearchParams } from "next/navigation";
import BikeList from "@/components/bikes/BikeList";
import ScootyList from "@/components/bikes/ScootyList";

export default function BikesPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  if (category === "scooty") {
    return <ScootyList />;
  }


  return <BikeList />;
}
