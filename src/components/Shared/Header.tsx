"use client";
import Image from "next/image";
import header1 from "/public/images/header1.png";
import header2 from "/public/images/header2.png";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full h-screen flex flex-col lg:flex-row mt-20">
      {/* First Section */}
      <div className="relative w-full lg:w-1/2 h-[60vh] lg:h-screen">
        <Image
          src={header1}
          alt="Prime Market - Productos Premium, Precios Inmejorables"
          fill
          style={{ objectFit: "cover" }}
          className="object-cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 to-transparent text-center p-6 lg:p-10">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            <span className="bg-sky-700 text-white px-6 py-2 rounded-md shadow-md">
              Prime
            </span>
            <span className="text-yellow-400 ml-2">Market</span>
          </h1>
          <p className="text-sm lg:text-lg text-white font-light mb-4 tracking-wide">
            Productos Premium | Precios Inmejorables
          </p>
          <p className="text-xs lg:text-md text-gray-200 mb-8 max-w-xs lg:max-w-md">
            ¡Descubre ofertas exclusivas en belleza, electrónica, moda y mucho más!
          </p>
        </div>
      </div>

      {/* Second Section */}
      <div className="relative w-full lg:w-1/2 h-[60vh] lg:h-screen flex items-center justify-center">
        <Image
          src={header2}
          alt="Compre productos de belleza y electrónica de calidad"
          fill
          style={{ objectFit: "cover" }}
          className="object-cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 to-transparent text-center p-6 lg:p-10">
          <h2 className="text-2xl lg:text-4xl font-semibold text-white mb-4 leading-tight">
            Calidad en la que puedes confiar, precios que te encantarán
          </h2>
          <p className="text-sm lg:text-md text-gray-200 mb-6 max-w-xs lg:max-w-md">
            Explore miles de artículos seleccionados cuidadosamente de marcas confiables.
          </p>
          <Link href="/services">
            <button className="px-10 py-3 bg-sky-700 text-white text-sm lg:text-lg font-semibold rounded-full shadow-lg hover:bg-purple-800 transition-transform duration-300 transform hover:scale-105">
              Empezar a Comprar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
