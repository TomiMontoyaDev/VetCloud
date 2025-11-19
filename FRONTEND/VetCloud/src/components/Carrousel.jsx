import { useState, useEffect } from "react";

export default function Carousel() {
  const images = [
    "/VetCloud.png",
    "/perrito.webp", // Cambia por tus imágenes
    "/Veterinaria.webp",
    "/perrogato.jpeg",
  ];

  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto slide (opcional)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  const next = () => setCurrent((current + 1) % images.length);
  const prev = () => setCurrent((current - 1 + images.length) % images.length);

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-10 rounded-2xl overflow-hidden shadow-lg">
      {/* Imagen */}
      <img
        key={current}
        src={images[current]}
        alt="carousel"
        className="w-full h-64 object-cover rounded-2xl shadow-lg transition-opacity duration-700 animate-fadeIn"
      />

      {/* Botón Izquierda */}
      <button
        onClick={prev}
        className="absolute top-1/2 left-2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
      >
        ❮
      </button>

      {/* Botón Derecha */}
      <button
        onClick={next}
        className="absolute top-1/2 right-2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60"
      >
        ❯
      </button>

      {/* Indicadores */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-teal-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
