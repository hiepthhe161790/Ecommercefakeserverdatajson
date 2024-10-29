import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const EditProduct = () => {
  const { id } = useParams(); 

  const navigate = useNavigate();
  const [product, setProduct] = useState({
    img: "",
    productName: "",
    price: "",
    color: "",
    badge: false,
    des: "",
    brand: "",
    cat: "",
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  
  useEffect(() => {
 
    fetch(`http://localhost:9999/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.error("Error fetching product:", error));

    
    fetch("http://localhost:9999/products")
      .then((response) => response.json())
      .then((data) => {
        const uniqueCategories = [...new Set(data.map((item) => item.cat))];
        const uniqueBrands = [...new Set(data.map((item) => item.brand))];
        setCategories(uniqueCategories);
        setBrands(uniqueBrands);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.productName || !product.cat || !product.price || !product.img) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:9999/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error("Failed to update product");

      alert("Product updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Product</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Image URL:</label>
            <input
              type="text"
              name="img"
              value={product.img}
              onChange={handleChange}
              placeholder="http://example.com/image.jpg"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700">Product Name:</label>
            <input
              type="text"
              name="productName"
              value={product.productName}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700">Price:</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700">Color:</label>
            <input
              type="text"
              name="color"
              value={product.color}
              onChange={handleChange}
              placeholder="Enter color"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-gray-700">Description:</label>
            <textarea
              name="des"
              value={product.des}
              onChange={handleChange}
              placeholder="Enter product description"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-gray-700">Brand:</label>
            <select
              name="brand"
              value={product.brand}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select a brand</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Category:</label>
            <select
              name="cat"
              value={product.cat}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="badge"
              checked={product.badge}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-gray-700">Special Offer Badge</label>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
