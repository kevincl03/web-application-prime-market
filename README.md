# 🛒 Prime Market – Aplicación Web E-Commerce

**Prime Market** es una aplicación web de comercio electrónico desarrollada con tecnologías modernas como Next.js, TypeScript y Tailwind CSS. Este proyecto tiene como objetivo ofrecer una experiencia de compra en línea fluida y eficiente.

## 🚀 Características Principales

- **Autenticación de Usuarios**: Registro, inicio de sesión y autenticación social mediante NextAuth.
- **Navegación de Productos**: Exploración y filtrado de productos disponibles.
- **Interfaz Responsiva**: Diseño adaptable a dispositivos móviles y de escritorio.
- **Gestión de Carrito**: Añadir, eliminar y modificar productos en el carrito de compras.
- **Integración de Pasarela de Pago**: Procesamiento de pagos seguros (pendiente de implementación).

## 🛠️ Tecnologías Utilizadas

- **Frontend**: [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Autenticación**: [NextAuth.js](https://next-auth.js.org/)
- **Control de Versiones**: Git y GitHub

## 📁 Estructura del Proyecto
├── public/ # Archivos públicos como imágenes o íconos
   ├── src/ # Código fuente principal
   ├── app/ # Páginas y rutas de la aplicación (Next.js 13+ con App Router)
   ├── components/ # Componentes reutilizables de interfaz
   ├── lib/ # Librerías auxiliares o funciones compartidas
   ├── services/ # Funciones de conexión a APIs o lógica de negocio ├── types/ # Definiciones de tipos y estructuras de datos
   ├── UI/ # Componentes visuales específicos o de diseño (UI Kit) ├── middleware.ts # Middleware personalizado para autenticación u otras funciones
├── .env.example # Variables de entorno de ejemplo
├── .eslintrc.json # Configuración de reglas de estilo con ESLint ├── .gitignore # Archivos y carpetas ignorados por Git
├── images.d.ts # Tipado para importar imágenes
├── next.config.js # Configuración de Next.js
├── package.json # Dependencias y scripts del proyecto
├── package-lock.json # Registro de versiones exactas de dependencias
├── postcss.config.mjs # Configuración de PostCSS
├── tailwind.config.ts # Configuración personalizada de Tailwind CSS
├── tsconfig.json # Configuración de TypeScript
├── README.md # Documentación del proyecto

## 📦 Instalación y Ejecución

1. Clona el repositorio:

git clone https://github.com/kevincl03 web-application-prime-market.git

cd web-application-prime-market

2. Instala las dependencias:

npm install

3. Configura las variables de entorno:
cp .env.example .env.local

# Configuración de NextAuth
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXTAUTH_SECRET=tu_clave_secreta_aqui

# Configuración de Base de Datos (si aplica)
DATABASE_URL=tu_url_de_base_de_datos

# Proveedores de Autenticación (ejemplo con Google)
GOOGLE_ID=tu_google_client_id
GOOGLE_SECRET=tu_google_client_secret

# Otras configuraciones
API_URL=http://localhost:3000/api

Después de configurar estas variables, reinicia el servidor de desarrollo para que los cambios surtan efecto.

4. Ejecuta la aplicación en modo desarrollo:
npm run dev

Abre tu navegador y visita
La aplicación estará disponible en http://localhost:3000

📄 Licencia
Este proyecto está bajo la licencia MIT.

🙌 Agradecimientos
Agradecemos a las siguientes herramientas y bibliotecas utilizadas en este proyecto:
- Next.js - Framework de React
- Tailwind CSS - Framework de CSS
- NextAuth.js - Autenticación
- TypeScript - Superset de JavaScript
- DaisyUI - Componentes de Tailwind CSS