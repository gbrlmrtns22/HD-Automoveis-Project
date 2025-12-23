import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Vehicle } from "@/modules/inventory/types/vehicle";

export const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  const image = vehicle.images[0];
  return (
    <Card className="overflow-hidden">
      {image ? (
        <div className="relative h-48 w-full">
          <Image src={image.url} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center bg-slate-100 text-slate-400">Sem imagem</div>
      )}
      <CardHeader>
        <CardTitle>{vehicle.title}</CardTitle>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {vehicle.year} • {vehicle.transmission === "automatic" ? "Automático" : "Manual"} • {vehicle.fuel}
        </p>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <span className="text-lg font-semibold text-brand-700">R$ {vehicle.price.toLocaleString("pt-BR")}</span>
        <span className="text-sm text-slate-500">{vehicle.mileage.toLocaleString("pt-BR")} km</span>
      </CardContent>
    </Card>
  );
};
