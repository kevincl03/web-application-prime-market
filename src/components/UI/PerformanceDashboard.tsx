"use client";
import React, { useState, useEffect } from 'react';
import { performanceMonitor, PerformanceMetrics } from '@/utils/performance';

interface PerformanceDashboardProps {
  isVisible?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

interface WebVital {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  isVisible = false,
  position = 'bottom-right'
}) => {  const [metrics, setMetrics] = useState<Map<string, PerformanceMetrics>>(new Map());
  const [isExpanded, setIsExpanded] = useState(false);
  const [webVitals, setWebVitals] = useState<WebVital[]>([]);

  useEffect(() => {
    if (!isVisible) return;

    // Update metrics every 2 seconds
    const interval = setInterval(() => {
      setMetrics(new Map(performanceMonitor.getAllMetrics()));
    }, 2000);

    return () => clearInterval(interval);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || typeof window === 'undefined') return;    // Track Web Vitals
    const trackVital = (vital: WebVital) => {
      setWebVitals(prev => [...prev.slice(-4), vital]); // Keep last 5 metrics
    };

    // Track LCP, FID, CLS, FCP, TTFB
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          trackVital({ name: 'LCP', value: entry.startTime, rating: entry.startTime < 2500 ? 'good' : entry.startTime < 4000 ? 'needs-improvement' : 'poor' });
        }        if (entry.entryType === 'first-input') {
          const fidEntry = entry as PerformanceEntry & { processingStart: number };
          trackVital({ 
            name: 'FID', 
            value: fidEntry.processingStart - entry.startTime, 
            rating: fidEntry.processingStart - entry.startTime < 100 ? 'good' : 'poor' 
          });
        }
        if (entry.entryType === 'layout-shift') {
          const clsEntry = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
          if (!clsEntry.hadRecentInput) {
            trackVital({ 
              name: 'CLS', 
              value: clsEntry.value, 
              rating: clsEntry.value < 0.1 ? 'good' : clsEntry.value < 0.25 ? 'needs-improvement' : 'poor' 
            });
          }
        }
      }
    });

    try {      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      observer.observe({ type: 'first-input', buffered: true });
      observer.observe({ type: 'layout-shift', buffered: true });
    } catch {
      console.log('Performance Observer not supported');
    }

    return () => observer.disconnect();
  }, [isVisible]);

  if (!isVisible || process.env.NODE_ENV !== 'development') return null;

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-500';
      case 'needs-improvement': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getLoadTimeColor = (loadTime: number) => {
    if (loadTime < 100) return 'text-green-500';
    if (loadTime < 500) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 bg-black bg-opacity-90 text-white rounded-lg shadow-lg max-w-sm`}>
      <div 
        className="p-3 cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Performance</span>
        </div>
        <span className="text-xs">
          {isExpanded ? '▼' : '▶'}
        </span>
      </div>

      {isExpanded && (
        <div className="p-3 pt-0 max-h-96 overflow-y-auto">
          {/* Load Time Metrics */}
          <div className="mb-4">
            <h4 className="text-xs font-semibold mb-2 text-blue-300">Load Times</h4>
            {Array.from(metrics.entries()).map(([key, metric]) => (
              <div key={key} className="text-xs mb-1 flex justify-between">
                <span className="truncate mr-2">{key}:</span>
                <div className="flex items-center gap-2">
                  <span className={getLoadTimeColor(metric.loadTime)}>
                    {metric.loadTime.toFixed(0)}ms
                  </span>
                  <span className={metric.cacheHit ? 'text-green-400' : 'text-gray-400'}>
                    {metric.cacheHit ? '⚡' : '🌐'}
                  </span>
                  {metric.errorCount > 0 && (
                    <span className="text-red-400">❌{metric.errorCount}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Web Vitals */}
          {webVitals.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold mb-2 text-purple-300">Web Vitals</h4>
              {webVitals.slice(-3).map((vital, index) => (
                <div key={`${vital.name}-${index}`} className="text-xs mb-1 flex justify-between">
                  <span>{vital.name}:</span>
                  <div className="flex items-center gap-1">
                    <span className={getRatingColor(vital.rating)}>
                      {vital.name === 'CLS' ? vital.value.toFixed(3) : Math.round(vital.value)}
                      {vital.name !== 'CLS' ? 'ms' : ''}
                    </span>
                    <span className={getRatingColor(vital.rating)}>
                      {vital.rating === 'good' ? '✅' : vital.rating === 'needs-improvement' ? '⚠️' : '❌'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}          {/* Memory Usage */}
          {(window as unknown as Window & { performance: Performance & { memory?: MemoryInfo } }).performance?.memory && (
            <div className="mb-4">
              <h4 className="text-xs font-semibold mb-2 text-orange-300">Memory</h4>
              <div className="text-xs">
                <div className="flex justify-between">
                  <span>Used:</span>
                  <span>{Math.round(((window as unknown as Window & { performance: Performance & { memory: MemoryInfo } }).performance.memory.usedJSHeapSize) / 1024 / 1024)}MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>{Math.round(((window as unknown as Window & { performance: Performance & { memory: MemoryInfo } }).performance.memory.totalJSHeapSize) / 1024 / 1024)}MB</span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => {
                performanceMonitor.clear();
                setMetrics(new Map());
                setWebVitals([]);
              }}
              className="text-xs bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
            >
              Clear
            </button>
            <button
              onClick={() => {
                console.log(performanceMonitor.generateReport());
              }}
              className="text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
            >
              Log Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceDashboard;
