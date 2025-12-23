"use client";

import { VehicleCard } from "@/modules/inventory/components/vehicle-card";
import { useVehicles } from "@/modules/inventory/hooks/use-vehicles";
import { Skeleton } from "@/components/ui/skeleton";

export const VehicleGrid = () => {
  const { data, isLoading } = useVehicles();

  if (isLoading) {
    return (
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-80" />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};
