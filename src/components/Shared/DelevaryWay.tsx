import { FC } from "react";
import Image from "next/image";
import freeshiping1 from "/public/icons/freeshiping1.webp";
import freeshiping2 from "/public/icons/freeshiping2.webp";
import freeshiping3 from "/public/icons/freeshiping3.webp";
import freeshiping4 from "/public/icons/freeshiping4.webp";

const services = [
  {
    title: "Envío Gratis",
    description: "Disfrute de envío gratuito en pedidos superiores a $ 50.000 todos los días.",
    icon: freeshiping1,
  },
  {
    title: "Entrega Rápida",
    description: "Entrega garantizada al día siguiente en productos seleccionados.",
    icon: freeshiping2,
  },
  {
    title: "Soporte 24/7",
    description: "Estamos aquí para ayudarle en cualquier momento del día.",
    icon: freeshiping3,
  },
  {
    title: "Garantía de Devolución de Dinero",
    description: "Garantía de devolución del 100% del dinero dentro de los 30 días.",
    icon: freeshiping4,
  },
];

const DeveleryWay: FC = () => {
  return (
    <section className="py-10" aria-labelledby="delivery-section-title">
      <h1 id="delivery-section-title" className="text-4xl font-semibold text-center mb-10 text-gray-900">
        Envío y Entrega
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-5">
        {services.map((service, index) => (
          <article
            key={index}
            className="card shadow-lg p-6 text-white rounded-lg bg-gradient-to-r from-sky-500 to-sky-700"
          >
            <div className="flex justify-center mb-4">
              <Image
                src={service.icon}
                alt={`Icono de ${service.title}`}
                width={48}
                height={48}
                className="h-12 w-12"
                loading="lazy"
              />
            </div>
            <h2 className="text-center text-xl font-bold">
              {service.title}
            </h2>
            <p className="text-center mt-2">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default DeveleryWay;
