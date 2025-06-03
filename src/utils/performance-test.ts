
interface PerformanceEntryWithValue extends PerformanceEntry {
  value: number;
  hadRecentInput?: boolean;
  processingStart?: number;
}

interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface WindowWithMemory extends Window {
  performance: Performance & {
    memory?: MemoryInfo;
  };
  testPerformance?: {
    testDevelopmentPerformance: () => Promise<void>;
    testBrowserPerformance: () => void;
  };
}

// Development server testing
async function testDevelopmentPerformance() {
  const baseURL = 'http://localhost:3000';
  
  console.log('🚀 Starting Performance Tests...\n');
  
  // Test 1: Homepage loading
  console.log('📊 Test 1: Homepage Performance');
  const homepageStart = performance.now();
  
  try {
    const response = await fetch(`${baseURL}/`);
    const homepageEnd = performance.now();
    
    console.log(`✅ Homepage loaded in: ${(homepageEnd - homepageStart).toFixed(2)}ms`);
    console.log(`📦 Response size: ${response.headers.get('content-length')} bytes`);
    console.log(`🏷️  Cache status: ${response.headers.get('cache-control') || 'No cache header'}\n`);  } catch (error) {
    console.log(`❌ Homepage test failed: ${error instanceof Error ? error.message : 'Unknown error'}\n`);
  }
  
  // Test 2: Products API
  console.log('📊 Test 2: Products API Performance');
  const apiStart = performance.now();
  
  try {
    const response = await fetch(`${baseURL}/products/api/getdata`);
    const apiEnd = performance.now();
    const data = await response.json();
    
    console.log(`✅ Products API responded in: ${(apiEnd - apiStart).toFixed(2)}ms`);
    console.log(`📦 Products count: ${data.products?.length || 0}`);
    console.log(`🏷️  Cache status: ${response.headers.get('cache-control') || 'No cache header'}\n`);  } catch (error) {
    console.log(`❌ Products API test failed: ${error instanceof Error ? error.message : 'Unknown error'}\n`);
  }
  
  // Test 3: Products page
  console.log('📊 Test 3: Products Page Performance');
  const productsPageStart = performance.now();
  
  try {
    const response = await fetch(`${baseURL}/products`);
    const productsPageEnd = performance.now();
    
    console.log(`✅ Products page loaded in: ${(productsPageEnd - productsPageStart).toFixed(2)}ms`);
    console.log(`📦 Response size: ${response.headers.get('content-length')} bytes\n`);  } catch (error) {
    console.log(`❌ Products page test failed: ${error instanceof Error ? error.message : 'Unknown error'}\n`);
  }
  
  // Test 4: Database optimization check
  console.log('📊 Test 4: Database Optimization Status');
  
  try {
    const response = await fetch(`${baseURL}/api/database/optimize`);
    const dbStats = await response.json();
    
    if (dbStats.success && dbStats.stats) {
      console.log(`✅ Database optimization status:`);
      console.log(`📊 Total documents: ${dbStats.stats.totalDocuments}`);
      console.log(`📈 Index count: ${dbStats.stats.indexCount}`);
      console.log(`💾 Data size: ${(dbStats.stats.dataSize / 1024 / 1024).toFixed(2)} MB`);      console.log(`📋 Available indexes:`);
      dbStats.stats.indexes?.forEach((idx: { name?: string; key?: Record<string, unknown> }, i: number) => {
        console.log(`   ${i + 1}. ${idx.name || 'unknown'}: ${JSON.stringify(idx.key || {})}`);
      });
    }
  } catch (error) {
    console.log(`❌ Database optimization test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
  
  console.log('\n🎉 Performance tests completed!');
  console.log('\n💡 Performance Tips:');
  console.log('   • Check browser DevTools Network tab for cache hits');
  console.log('   • Monitor the Performance Dashboard in development');
  console.log('   • Use Lighthouse to measure Core Web Vitals');
  console.log('   • Check service worker registration in Application tab');
}

// Browser-based performance testing
function testBrowserPerformance() {
  if (typeof window === 'undefined') {
    console.log('❌ Browser performance tests can only run in browser environment');
    return;
  }
  
  console.log('🌐 Running Browser Performance Tests...\n');
  
  // Test Web Vitals
  if ('PerformanceObserver' in window) {
    console.log('📊 Monitoring Web Vitals...');
    
    // LCP (Largest Contentful Paint)
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log(`🎯 LCP: ${entry.startTime.toFixed(2)}ms - ${entry.startTime < 2500 ? '🟢 Good' : entry.startTime < 4000 ? '🟡 Needs Improvement' : '🔴 Poor'}`);
      }
    }).observe({type: 'largest-contentful-paint', buffered: true});
      // FID (First Input Delay)
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const perfEntry = entry as PerformanceEntryWithValue;
        if (perfEntry.processingStart) {
          const fid = perfEntry.processingStart - perfEntry.startTime;
          console.log(`🖱️  FID: ${fid.toFixed(2)}ms - ${fid < 100 ? '🟢 Good' : fid < 300 ? '🟡 Needs Improvement' : '🔴 Poor'}`);
        }
      }
    }).observe({type: 'first-input', buffered: true});
    
    // CLS (Cumulative Layout Shift)
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const perfEntry = entry as PerformanceEntryWithValue;
        if (!perfEntry.hadRecentInput && perfEntry.value !== undefined) {
          console.log(`📐 CLS: ${perfEntry.value.toFixed(3)} - ${perfEntry.value < 0.1 ? '🟢 Good' : perfEntry.value < 0.25 ? '🟡 Needs Improvement' : '🔴 Poor'}`);
        }
      }
    }).observe({type: 'layout-shift', buffered: true});
  }
  // Memory usage
  if ((window as WindowWithMemory).performance?.memory) {
    const memory = (window as WindowWithMemory).performance.memory;
    if (memory) {
      console.log(`💾 Memory Usage:`);
      console.log(`   Used: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Total: ${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Limit: ${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`);
    }
  }
  
  // Service Worker status
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then(registration => {
      if (registration) {
        console.log(`🔧 Service Worker: ✅ Active`);
        console.log(`   Scope: ${registration.scope}`);
        console.log(`   State: ${registration.active?.state || 'Unknown'}`);
      } else {
        console.log(`Service Worker: Not registered`);
      }
    });
  }
  
  // Cache API status
  if ('caches' in window) {
    caches.keys().then(cacheNames => {
      if (cacheNames.length > 0) {
        cacheNames.forEach(name => console.log(`   ✅ ${name}`));
      } else {
        console.log(`No caches found`);
      }
    });
  }
}

// Export for use in browser console or Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testDevelopmentPerformance, testBrowserPerformance };
} else if (typeof window !== 'undefined') {
  (window as WindowWithMemory).testPerformance = { testDevelopmentPerformance, testBrowserPerformance };
}

// Auto-run browser tests if in browser environment
if (typeof window !== 'undefined' && window.location) {
  // Run tests after page load
  window.addEventListener('load', () => {
    setTimeout(testBrowserPerformance, 1000);
  });
}
