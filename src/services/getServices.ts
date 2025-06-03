import axios from "axios";
import { TProduct, TProductDetails, TService, TServiceDetails } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Request failed:', error.message);
    return Promise.reject(error);
  }
);

export const getServices = async (): Promise<TService[]> => {
  try {
    const res = await apiClient.get<{ services: TService[] }>("/services/api/get-all");

    if (res.status !== 200 || !res.data.services) {
      throw new Error(`Failed to fetch services: ${res.statusText}`);
    }

    return res.data.services;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

export const getServicesDetails = async (
  id: string
): Promise<TServiceDetails> => {
  try {
    const res = await apiClient.get(`/services/api/${id}`);

    if (res.status !== 200) {
      throw new Error(`Failed to fetch service details: ${res.statusText}`);
    }

    return res.data as TServiceDetails;
  } catch (error) {
    console.error(`Error fetching service details for ID ${id}:`, error);
    return {} as TServiceDetails;
  }
};

export const getProducts = async (): Promise<TProduct[]> => {
  try {
    const res = await apiClient.get<{ products: TProduct[] }>(
      "/products/api/getdata"
    );

    if (res.status !== 200 || !res.data.products) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    return res.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductsDetails = async (
  id: string
): Promise<TProductDetails> => {
  try {
    const res = await apiClient.get(`/products/api/${id}`);

    if (res.status !== 200) {
      throw new Error(`Failed to fetch product details: ${res.statusText}`);
    }

    return res.data as TProductDetails;
  } catch (error) {
    console.error(`Error fetching product details for ID ${id}:`, error);
    return {} as TProductDetails;
  }
};
