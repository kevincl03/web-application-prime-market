"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "/public/icons/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* Company Info */}
        <div className="flex flex-col items-center md:items-start mt-3">
          <div className="flex items-center">
            <div className="rounded-lg w-[16rem] bg-gray-600">
              <Link href="/">
                <Image
                  src={Logo}
                  alt="Logo Prime Market"
                  className="overflow-hidden h-20"
                />
              </Link>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-400 text-center md:text-left">
            Tu tienda integral de productos premium. Ofreciendo confianza
            y calidad.
          </p>
        </div>        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Nuestros Servicios</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/services/branding">
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Soluciones de Marca
                </p>
              </Link>
            </li>
            <li>
              <Link href="/services/electronics">
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Electrónicos
                </p>
              </Link>
            </li>
            <li>
              <Link href="/services/fashion">
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Consejos de Moda
                </p>
              </Link>
            </li>
            <li>
              <Link href="/services/beauty">
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Productos de Belleza
                </p>
              </Link>
            </li>
          </ul>
        </div>        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Sobre Nosotros</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about">
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Quienes Somos
                </p>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Contacta con Nosotros
                </p>
              </Link>
            </li>
            <li>
              <Link href="/terms">
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Términos de Servicio
                </p>
              </Link>
            </li>
            <li>
              <Link href="/privacy">
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Política de Privacidad
                </p>
              </Link>
            </li>
          </ul>
        </div>        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/products">
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Comprar Productos
                </p>
              </Link>
            </li>
            <li>
              <Link href="/products/sale">
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Mejores Ofertas
                </p>
              </Link>
            </li>
            <li>
              <Link href="/help">
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Centro de Ayuda
                </p>
              </Link>
            </li>
            <li>
              <Link href="/faq">
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Preguntas Frecuentes
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
        <p>
          &copy; {new Date().getFullYear()}
          <span className="text-sky-500"> Prime</span>
          <span className="text-violet-600"> Market.</span> Todos los Derechos Reservados.
        </p>
        <div className="flex justify-center gap-2 mt-2">
          <Image src="https://flagcdn.com/co.svg" alt="Bandera de Colombia" width={24} height={15} style={{height: "auto"}}/>
          <p>Colombia.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
