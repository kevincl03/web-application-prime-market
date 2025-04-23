export type TProductCardProps = {
  _id: string;
  id: string;
  productName: string;
  productId: string;
  name: string;
  rating: number;
  brand: string;
  availableQuantity: number;
  price: number;
  image: string;
  quantity: number;
  description: string;
};

export interface TService {
  _id: string;
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  ratings: number;
}

export interface TServiceDetails {
  _id: string;
  title: string;
  description: string;
  img: string;
  price: number;
  ratings: number;
  reviews: string[];
}

export interface TProduct {
  _id: string;
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  ratings: number;
}

export interface TProductDetails {
  _id: string;
  title: string;
  description: string;
  img: string;
  price: number;
  ratings: number;
  reviews: string[];
}

// Define the service details response type
export interface TProductDetailsResponse {
  service: TProduct;
}

// Define the service list response type
export interface TProductListResponse {
  services: TProduct[];
}

export interface TUserData {
  _id: string;
  email: string;
  name: string;
  imge: string;
  price: number;
}

// Define the service details response type
export interface TServiceDetailsResponse {
  service: TService;
}

// Define the service list response type
export interface TServiceListResponse {
  services: TService[];
}

export interface TUserData {
  _id: string;
  email: string;
  name: string;
  imge: string;
  price: number;
}
