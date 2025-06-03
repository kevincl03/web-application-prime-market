"use client";
import { useEffect } from 'react';
import { performanceMonitor } from '@/utils/performance';

const ServiceWorkerRegistration = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          
          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  if (confirm('New version available. Reload to update?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });

          // Send performance metrics to service worker
          const sendPerformanceMetrics = () => {
            const metrics = performanceMonitor.getAllMetrics();
            if (metrics.size > 0) {
              registration.active?.postMessage({
                type: 'PERFORMANCE_REPORT',
                metrics: Object.fromEntries(metrics)
              });
            }
          };

          // Send metrics every 30 seconds
          setInterval(sendPerformanceMetrics, 30000);
        })
        .catch((error) => {
          console.error('❌ Service Worker registration failed:', error);
        });
    }
  }, []);

  return null;
};

export default ServiceWorkerRegistration;
