import Image from "next/image";
import about1 from "/public/icons/profile.webp";

const aboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12 mt-20">
      <h1 className="text-4xl font-bold text-center mb-8">Sobre Nosotros</h1>
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <Image
            src={about1}
            alt="Sobre nosotros"
            className="rounded-full h-60 w-80 shadow-lg object-cover w-full max-w-lg h-auto"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Quienes Somos</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
          Bienvenido a nuestra plataforma de comercio electrónico Prime Market, donde la calidad 
          y la satisfacción del cliente son nuestra prioridad. Nuestra trayectoria comenzó 
          con la visión de ofrecer productos excepcionales y una experiencia de compra 
          fluida para todos, en todas partes. Hoy, nos enorgullece ser una marca de confianza 
          en la industria del comercio electrónico, ofreciendo una amplia gama de 
          artículos diseñados para satisfacer sus necesidades.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Misión</h2>
          <p className="text-gray-600 leading-relaxed">
          Nuestra misión es ofrecerte los productos más recientes y confiables, 
          priorizando la asequibilidad, la comodidad y la atención al cliente.
          Desde productos electrónicos de alta calidad hasta ropa elegante, nos 
          comprometemos a garantizar que encuentres exactamente lo que buscas.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold text-center mb-8">Nuestros Valores Fundamentales</h2>
        <div className="grid lg:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Calidad</h3>
            <p className="text-gray-600">
            Nunca comprometemos la calidad. Cada producto se selecciona cuidadosamente
            y se prueba rigurosamente para satisfacer sus expectativas.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">El Cliente Primero</h3>
            <p className="text-gray-600">
            Su satisfacción es nuestra prioridad. Escuchamos, nos adaptamos 
            y nos esforzamos por hacer que cada interacción sea positiva y memorable.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Innovación</h3>
            <p className="text-gray-600">
            Nos mantenemos a la vanguardia, ofreciéndote las últimas tendencias y 
            productos de vanguardia para mejorar tu experiencia de compra.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Conoce a Nuestro Equipo</h2>
        <div className="grid lg:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Image
              src={about1}
              height="150"
              width="200"
              alt="Miembro del equipo 1"
              className="rounded-full w-32 h-32 object-cover shadow-lg mb-4"
            />
            <h3 className="text-xl font-semibold">Integrante 1</h3>
            <p className="text-gray-600">Fundador & CEO</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={about1}
              height="150"
              width="200"
              alt="Miembro del equipo 2"
              className="rounded-full w-32 h-32 object-cover shadow-lg mb-4"
            />
            <h3 className="text-xl font-semibold">Integrante 2</h3>
            <p className="text-gray-600">Jefe de Marketing</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src={about1}
              height="150"
              width="200"
              alt="Miembro del equipo 3"
              className="rounded-full w-32 h-32 object-cover shadow-lg mb-4"
            />
            <h3 className="text-xl font-semibold">Integrante 3</h3>
            <p className="text-gray-600">Desarrollador Principal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default aboutPage;
