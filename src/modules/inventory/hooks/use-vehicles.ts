"use client";

import { useQuery } from "@tanstack/react-query";
import { vehicleSchema } from "@/modules/inventory/types/vehicle";

export const useVehicles = () => {
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const response = await fetch("/api/vehicles");
      const data = await response.json();
      return vehicleSchema.array().parse(data);
    }
  });
};
