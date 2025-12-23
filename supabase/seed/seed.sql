insert into vehicles (id, title, brand, model, year, price, mileage, fuel, transmission, color, published)
values
  ('veh_001', 'Volkswagen T-Cross Highline', 'Volkswagen', 'T-Cross', 2023, 148900, 12000, 'flex', 'automatic', 'Azul', true),
  ('veh_002', 'Toyota Corolla Hybrid', 'Toyota', 'Corolla', 2024, 179900, 5000, 'hybrid', 'automatic', 'Prata', true);

insert into vehicle_images (id, vehicle_id, url, alt)
values
  ('img_001', 'veh_001', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80', 'Volkswagen T-Cross azul'),
  ('img_002', 'veh_002', 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80', 'Toyota Corolla prata');
