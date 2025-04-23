"use client";

import { useState } from "react";

interface Product {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  images: FileList | null;
}

const AdminAddProduct = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    category: "",
    images: null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setProduct({
      ...product,
      images: files,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product submitted:", product);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Add New Product
          </h1>
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Product Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={product.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2"
                  required
                />
              </div>

              {/* Price */}
              <div className="flex flex-col">
                <label
                  htmlFor="price"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Price ($)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={product.price}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2"
                  required
                />
              </div>

              {/* Stock Quantity */}
              <div className="flex flex-col">
                <label
                  htmlFor="stockQuantity"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Stock Quantity
                </label>
                <input
                  id="stockQuantity"
                  name="stockQuantity"
                  type="number"
                  value={product.stockQuantity}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2"
                  required
                />
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label
                  htmlFor="category"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="furniture">Furniture</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 px-4 py-2"
                rows={4}
                required
              />
            </div>

            {/* Images */}
            <div className="flex flex-col">
              <label
                htmlFor="images"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Product Images
              </label>
              <input
                id="images"
                name="images"
                type="file"
                multiple
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-100 file:text-blue-600 hover:file:bg-blue-200"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-lg transition"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
