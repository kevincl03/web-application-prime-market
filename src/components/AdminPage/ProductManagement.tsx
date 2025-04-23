"use client";

import { useState } from "react";

interface Category {
  id: number;
  name: string;
}

const ProductManagement = () => {
  const initialCategories: Category[] = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Apparel" },
    { id: 3, name: "Furniture" },
  ];

  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [editCategoryName, setEditCategoryName] = useState<string>("");
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  // Add new category
  const addCategory = () => {
    if (newCategoryName.trim() !== "") {
      const newCategory: Category = {
        id: categories.length + 1,
        name: newCategoryName,
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
    }
  };

  // Edit category
  const startEditCategory = (id: number, name: string) => {
    setEditCategoryId(id);
    setEditCategoryName(name);
  };

  const confirmEditCategory = () => {
    setCategories(
      categories.map((category) =>
        category.id === editCategoryId
          ? { ...category, name: editCategoryName }
          : category
      )
    );
    setEditCategoryId(null);
    setEditCategoryName("");
  };

  const deleteCategory = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Product Categories Management</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Category name"
          className="border p-2 rounded w-1/2 mr-2"
        />
        <button
          onClick={addCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </div>

      {/* Categories List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Categories List</h2>
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Category Name</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="border p-2">{category.id}</td>
                <td className="border p-2">
                  {editCategoryId === category.id ? (
                    <input
                      type="text"
                      value={editCategoryName}
                      onChange={(e) => setEditCategoryName(e.target.value)}
                      className="border p-2 rounded"
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td className="border p-2">
                  {editCategoryId === category.id ? (
                    <button
                      onClick={confirmEditCategory}
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        startEditCategory(category.id, category.name)
                      }
                      className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteCategory(category.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
