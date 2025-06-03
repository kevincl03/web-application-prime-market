"use client";

import dynamic from 'next/dynamic';

// Dynamically import client components with no SSR
const ServiceWorkerRegistration = dynamic(
  () => import('./ServiceWorkerRegistration'),
  { ssr: false }
);

const PerformanceDashboard = dynamic(
  () => import('./UI/PerformanceDashboard'),
  { ssr: false }
);

export { ServiceWorkerRegistration, PerformanceDashboard };
