"use client";
import { useState, useEffect, useCallback } from 'react';
import { TProduct } from '@/types';
import { getProducts } from '@/services/getServices';
import { performanceMonitor } from '@/utils/performance';

interface UseProductsReturn {
  products: TProduct[];
  loading: boolean;
  error: string;
  refetch: () => Promise<void>;
}

let cachedProducts: TProduct[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const fetchProducts = useCallback(async () => {
    const performanceKey = 'products-fetch';
    performanceMonitor.startTiming(performanceKey);
    
    try {
      setError('');
      
      const now = Date.now();
      if (cachedProducts && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
        setProducts(cachedProducts);
        setLoading(false);
        performanceMonitor.endTiming(performanceKey, true);
        return;
      }

      setLoading(true);
      const fetchedProducts = await getProducts();
      
      cachedProducts = fetchedProducts;
      cacheTimestamp = now;
      
      setProducts(fetchedProducts);
      performanceMonitor.endTiming(performanceKey, false);
    } catch (err) {
      console.error('Error fetching products:', err);
      performanceMonitor.recordError(performanceKey);
      setError('Error al cargar productos. Por favor, intenta de nuevo.');
      
      if (cachedProducts) {
        setProducts(cachedProducts);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    cachedProducts = null;
    cacheTimestamp = null;
    await fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch };
};

// Export function to clear cache manually if needed
export const clearProductsCache = () => {
  cachedProducts = null;
  cacheTimestamp = null;
};
