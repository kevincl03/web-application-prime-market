import Image from "next/image";
import React from "react";
import viewcart from "/public/images/sidephoto.webp";
import Link from "next/link";

const FeatureSection: React.FC = () => {
  return (
    <section className="container mx-auto my-10 px-4">
      <h1 className="text-4xl font-semibold text-center mb-10 text-gray-900">
        Nuestro producto destacado
      </h1>

      <div className="relative flex flex-col lg:flex-row items-center justify-between bg-gray-900 text-white h-auto lg:h-[500px] p-8 rounded-lg shadow-md">
        <div className="w-full lg:w-1/2 h-64 lg:h-full relative overflow-hidden rounded-md shadow-lg">
          <Image
            src={viewcart}
            alt="Muestra de productos destacados"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md"
          />
        </div>

        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-8">
          <h2 className="text-3xl font-semibold mb-4">
            Descubre lo último en estilo y tecnología
          </h2>
          <p className="text-gray-300 mb-6">
            Mejora tu colección con nuestro último producto destacado.
            Combinando diseño y rendimiento de vanguardia, esta pieza
            está diseñada para brindar la mejor experiencia de usuario.
            Perfecta para quienes valoran la calidad, la durabilidad
            y el estilo en su carrito de compras.
          </p>
          <Link
            href="/products"
            className="px-6 py-2 bg-transparent border border-white text-white hover:bg-white hover:text-gray-900 transition duration-300"
          >
            Compra Ahora
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
