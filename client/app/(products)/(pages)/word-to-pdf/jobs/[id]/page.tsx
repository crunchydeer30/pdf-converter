"use client";
import { useParams } from "next/navigation";

export default function WordJob() {
  const { id } = useParams();
  return (
    <div className="container h-full min-h-[90vh] flex justify-center align-center text-3xl font-bold">
      {id}
    </div>
  );
}
