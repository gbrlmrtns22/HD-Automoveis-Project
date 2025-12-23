import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { inMemoryInventoryStore } from "@/modules/inventory/sync/store";

export async function GET() {
  const supabase = createSupabaseServerClient();
  if (supabase) {
    const { data } = await supabase
      .from("vehicles")
      .select("*, vehicle_images(id, vehicle_id, url, alt)")
      .eq("published", true)
      .order("updated_at", { ascending: false });
    const mapped = (data ?? []).map((vehicle) => ({
      id: vehicle.id,
      title: vehicle.title,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      price: vehicle.price,
      mileage: vehicle.mileage,
      fuel: vehicle.fuel,
      transmission: vehicle.transmission,
      color: vehicle.color,
      published: vehicle.published,
      updatedAt: vehicle.updated_at,
      images: (vehicle.vehicle_images ?? []).map((image) => ({
        id: image.id,
        vehicleId: image.vehicle_id,
        url: image.url,
        alt: image.alt
      }))
    }));
    return NextResponse.json(mapped);
  }

  return NextResponse.json(inMemoryInventoryStore.getVehicles().filter((vehicle) => vehicle.published));
}
