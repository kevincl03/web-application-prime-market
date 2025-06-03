// Performance monitoring utilities
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  cacheHit: boolean;
  errorCount: number;
}

interface WebVital {
  name: string;
  value: number;
  rating: string;
  delta: number;
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetrics> = new Map();
  private startTimes: Map<string, number> = new Map();

  startTiming(key: string): void {
    this.startTimes.set(key, performance.now());
  }

  endTiming(key: string, cacheHit: boolean = false): PerformanceMetrics {
    const startTime = this.startTimes.get(key);
    const endTime = performance.now();
    
    if (!startTime) {
      throw new Error(`No start time found for key: ${key}`);
    }

    const loadTime = endTime - startTime;
    const existing = this.metrics.get(key) || { loadTime: 0, renderTime: 0, cacheHit: false, errorCount: 0 };
    
    const metrics: PerformanceMetrics = {
      ...existing,
      loadTime,
      cacheHit,
    };

    this.metrics.set(key, metrics);
    this.startTimes.delete(key);

    // Log performance in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 Performance [${key}]:`, {
        loadTime: `${loadTime.toFixed(2)}ms`,
        cacheHit: cacheHit ? '✅ Cache Hit' : '❌ Cache Miss',
        status: loadTime < 100 ? '🟢 Fast' : loadTime < 500 ? '🟡 Moderate' : '🔴 Slow'
      });
    }

    return metrics;
  }

  recordError(key: string): void {
    const existing = this.metrics.get(key) || { loadTime: 0, renderTime: 0, cacheHit: false, errorCount: 0 };
    existing.errorCount++;
    this.metrics.set(key, existing);
  }

  getMetrics(key: string): PerformanceMetrics | undefined {
    return this.metrics.get(key);
  }

  getAllMetrics(): Map<string, PerformanceMetrics> {
    return new Map(this.metrics);
  }

  generateReport(): string {
    const report: string[] = ['📊 Performance Report:'];
    
    for (const [key, metrics] of this.metrics) {
      const status = metrics.loadTime < 100 ? '🟢' : metrics.loadTime < 500 ? '🟡' : '🔴';
      report.push(
        `${status} ${key}: ${metrics.loadTime.toFixed(2)}ms | Cache: ${metrics.cacheHit ? '✅' : '❌'} | Errors: ${metrics.errorCount}`
      );
    }
    
    return report.join('\n');
  }

  clear(): void {
    this.metrics.clear();
    this.startTimes.clear();
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Web Vitals tracking
export const trackWebVitals = (metric: WebVital) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Web Vital [${metric.name}]:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }
};

// Intersection Observer for lazy loading optimization
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null => {
  if (typeof window === 'undefined') return null;
  
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Debounced function for performance optimization
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttled function for performance optimization
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function executedFunction(this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
