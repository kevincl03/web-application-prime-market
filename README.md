# 🛒 Prime Market – Aplicación Web E-Commerce

**Prime Market** es una aplicación web de comercio electrónico, desarrollada con tecnologías modernas y optimizada para máximo rendimiento. El proyecto incluye características avanzadas como PWA, monitoreo de rendimiento en tiempo real, optimización de base de datos y estrategias de caché inteligentes.

## 🚀 Características Principales

### 🛍️ Funcionalidades de E-Commerce
- **Autenticación de Usuarios**: Registro, inicio de sesión y autenticación social (Google, GitHub) mediante NextAuth
- **Navegación de Productos**: Exploración y filtrado avanzado de productos con paginación virtualizada
- **Gestión de Carrito**: Añadir, eliminar y modificar productos con persistencia de estado
- **Interfaz Responsiva**: Diseño completamente adaptable con tema claro/oscuro

### ⚡ Optimizaciones de Rendimiento
- **Service Worker PWA**: Estrategias de caché múltiples (cache-first, stale-while-revalidate, network-first)
- **Monitoreo de Web Vitals**: Tracking en tiempo real de LCP, FID, CLS y métricas de rendimiento
- **Optimización de Imágenes**: Formatos WebP/AVIF con lazy loading y responsive breakpoints
- **Virtualización de Listas**: Renderizado eficiente de grandes conjuntos de datos
- **Database Optimization**: Estrategias de indexing MongoDB y connection pooling

### 🔧 Herramientas de Desarrollo
- **Dashboard de Performance**: Monitoreo en tiempo real de métricas de rendimiento
- **Integración Sentry**: Tracking de errores y performance en producción
- **Testing de Rendimiento**: Utilidades para pruebas de carga y optimización
- **Memory Management**: Monitoreo de uso de memoria y gestión de caché

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: [Next.js 15.0.2](https://nextjs.org/) con App Router
- **Lenguaje**: [TypeScript 5.6.3](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS 3.4.1](https://tailwindcss.com/) + [DaisyUI 4.12.13](https://daisyui.com/)
- **UI Components**: [Ant Design 5.21.4](https://ant.design/), [Lucide React 0.460.0](https://lucide.dev/)

### Backend & Database
- **Base de Datos**: [MongoDB 6.10.0](https://mongodb.com/) con [Mongoose 8.7.3](https://mongoosejs.com/)
- **Autenticación**: [NextAuth.js 4.24.10](https://next-auth.js.org/)
- **Encriptación**: [bcrypt 5.1.1](https://www.npmjs.com/package/bcrypt)

### Performance & Monitoring
- **Monitoreo**: [Sentry 9.18.0](https://sentry.io/)

### Desarrollo
- **Validación**: [Zod 3.25.42](https://zod.dev/)
- **Formularios**: [React Hook Form 7.56.4](https://react-hook-form.com/)
- **HTTP Client**: [Axios 1.7.7](https://axios-http.com/)
- **Notificaciones**: [React Toastify 10.0.6](https://fkhadra.github.io/react-toastify/)
- **Temas**: [Next Themes 0.3.0](https://github.com/pacocoursey/next-themes)

## 📁 Estructura del Proyecto

```
web-application-prime-market/
├── public/                          # Archivos estáticos
│   ├── images/                      # Imágenes del sitio
│   ├── icons/                       # Iconos y logos
│   ├── sw.js                        # Service Worker PWA
│   └── manifest.json                # Manifiesto PWA
├── src/                             # Código fuente principal
│   ├── app/                         # App Router (Next.js 13+)
│   │   ├── layout.tsx               # Layout principal con providers
│   │   ├── page.tsx                 # Página de inicio
│   │   ├── products/                # Rutas de productos
│   │   │   ├── page.tsx             # Lista de productos
│   │   │   └── api/getdata/route.ts # API endpoint de productos
│   │   └── auth/                    # Rutas de autenticación
│   ├── components/                  # Componentes reutilizables
│   │   ├── UI/                      # Componentes de interfaz
│   │   │   ├── PerformanceDashboard.tsx    # Dashboard de métricas
│   │   │   ├── VirtualizedProductGrid.tsx  # Grid virtualizado
│   │   │   └── LoadingSkeleton.tsx         # Componentes de carga
│   │   ├── ClientComponents.tsx     # Wrapper para componentes cliente
│   │   └── ServiceWorkerRegistration.tsx  # Registro de SW
│   ├── hooks/                       # Custom hooks
│   │   └── useProducts.ts          # Hook para gestión de productos
│   ├── lib/                         # Librerías y utilidades
│   │   └── connectDB.ts            # Conexión a MongoDB
│   ├── utils/                       # Utilidades y helpers
│   │   ├── performance.ts          # Monitoreo de rendimiento
│   │   ├── database-optimization.ts # Optimización de BD
│   │   └── performance-test.ts     # Testing de performance
│   └── types/                       # Definiciones de tipos
├── .env.example                     # Variables de entorno ejemplo
├── next.config.js                   # Configuración Next.js
├── tailwind.config.ts               # Configuración Tailwind
├── tsconfig.json                    # Configuración TypeScript
└── package.json                     # Dependencias y scripts
```

## 📦 Instalación y Configuración

### Prerrequisitos
- **Node.js**: 18.0 o superior
- **npm**: 8.0 o superior  
- **MongoDB**: 6.0 o superior (local o Atlas)
- **Git**: Para clonar el repositorio

### 1. Clonar el Repositorio

```bash
git clone https://github.com/kevincl03/web-application-prime-market.git
cd web-application-prime-market
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Copia el archivo de ejemplo y configura las variables:

```bash
cp .env.example .env
```

Edita `.env` con tus configuraciones:

```env
# Base de datos MongoDB Atlas:
# MONGODB_URI=tu_uri_de_conexión_a_mongodb_atlas

# URLs de la aplicación
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
SENTRY_AUTH_TOKEN=token_auth_de_sentry

# Autenticación NextAuth
NEXTAUTH_SECRET=tu_clave_secreta_super_segura_aqui

# Proveedor Google OAuth
GOOGLE_ID=tu_google_client_id
GOOGLE_SECRET=tu_google_client_secret

# Proveedor GitHub OAuth
GITHUB_ID=tu_github_client_id
GITHUB_SECRET=tu_github_client_secret
```

### 4. Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### 5. Compilar para Producción

```bash
npm run build
npm start
```

## 🔧 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Compilación para producción
npm start           # Servidor de producción
npm run lint        # Verificación de código con ESLint
npm run type-check  # Verificación de tipos TypeScript
```

## ⚡ Características de Rendimiento

### Service Worker & PWA
- **Caché Inteligente**: Estrategias diferenciadas para recursos estáticos, APIs e imágenes
- **Offline Support**: Funcionalidad básica disponible sin conexión
- **Background Sync**: Sincronización de datos en segundo plano
- **Install Prompts**: Capacidad de instalación como PWA

### Monitoreo de Performance
- **Web Vitals**: Tracking automático de LCP, FID, CLS
- **Memory Monitoring**: Monitoreo de uso de memoria en tiempo real
- **Network Performance**: Análisis de tiempos de carga y respuesta
- **Error Tracking**: Integración completa con Sentry

### Optimizaciones de Base de Datos
- **Connection Pooling**: Gestión eficiente de conexiones MongoDB
- **Index Optimization**: Estrategias de indexing para consultas rápidas
- **Query Caching**: Caché de consultas frecuentes
- **Batch Operations**: Operaciones por lotes para mejor rendimiento

### Optimizaciones de Frontend
- **Code Splitting**: Carga bajo demanda de componentes
- **Image Optimization**: Formatos modernos con lazy loading
- **Bundle Analysis**: Herramientas para análisis de bundles
- **Tree Shaking**: Eliminación de código no utilizado

### Despliegue

#### Manual
```bash
npm run build
npm start
```

### Debugging de Performance
- Accede al dashboard en `/performance` (modo desarrollo)
- Usa las herramientas de desarrollador para Web Vitals
- Revisa los logs de Sentry para errores de producción

## 🔐 Configuración de Autenticación

### Google OAuth
1. Ir a [Google Cloud Console](https://console.cloud.google.com/)
2. Crear un nuevo proyecto o usar uno existente
3. Habilitar Google+ API
4. Crear credenciales OAuth 2.0
5. Configurar URLs de redirección: `http://localhost:3000/api/auth/callback/google`

### GitHub OAuth
1. Ir a GitHub Settings > Developer settings > OAuth Apps
2. Crear nueva OAuth App
3. Configurar Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

### Estándares de Código
- **ESLint**: Configuración strict con reglas de Next.js
- **TypeScript**: Tipado estricto

## 📚 Recursos y Documentación

### Documentación Oficial
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MongoDB Manual](https://docs.mongodb.com/manual/)

### Performance Resources
- [Web.dev Performance](https://web.dev/performance/)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)

### API Referencias
- [NextAuth.js](https://next-auth.js.org/getting-started/introduction)
- [Sentry Integration](https://docs.sentry.io/platforms/javascript/guides/nextjs/)

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

```
MIT License

Copyright (c) 2024 Prime Market

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

### Tecnologías y Herramientas
- **[Next.js](https://nextjs.org/)** - El framework React para producción
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript con tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[MongoDB](https://www.mongodb.com/)** - Base de datos NoSQL moderna
- **[Sentry](https://sentry.io/)** - Monitoreo de errores y performance
- **[Vercel](https://vercel.com/)** - Plataforma de despliegue para frontend
