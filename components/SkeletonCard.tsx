import React from "react";
import { Skeleton } from "./ui/skeleton";
import { CircleX } from "lucide-react";

interface Props {
  className?: string;
  error?: string;
}
const SkeletonCard = ({ className, error }: Props) => {
  return (
    <>
      <div className={`relative ${className}`}>
        {error && (
          <div className="flex items-center justify-center absolute top-[50%] bottom-[50%] translate-y-1/2 ml-10">
            <div className="p-1 grid place-items-center text-lg">
              <CircleX />
            </div>
            <span className="font-medium text-sm text-red-500">
              No city found or error fetching data.
            </span>
          </div>
        )}
        <Skeleton className="w-full h-full rounded-xl" />
      </div>
    </>
  );
};

export default SkeletonCard;
