import SideBar from "./SideBar";
import { error } from "jquery";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from 'react';

const Dashboard = () => {
    const [Product, setProduct] = useState([]);
    const [searchedProduct, setSearchedProduct] = useState([]);
    const [Category, setCategory] = useState([]);
    const [paggingProducts, setPaggingProducts] = useState([]);
    const [pagging, setPagging] = useState([]);
    const [isChange, setIsChange] = useState(true);
    const [sortOrder, setSortOrder] = useState("asc");
    const searchRef = useRef("");

    useEffect(() => {
        fetch("http://localhost:9999/products")
            .then((res) => res.json())
            .then((result) => {
                const uniqueCategories = result
                    .map(product => product.cat)
                    .filter((category, index, self) => self.indexOf(category) === index);
                setCategory(uniqueCategories);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:9999/products")
            .then((res) => res.json())
            .then((result) => {
                // Chuyển đổi giá trị price thành số
                const productsWithNumericPrice = result.map(product => ({
                    ...product,
                    price: parseFloat(product.price)
                }));
                setProduct(productsWithNumericPrice);
                setSearchedProduct(productsWithNumericPrice);
                updatePagination(productsWithNumericPrice);
            });
    }, [isChange]);

    const updatePagination = (items) => {
        const pages = Math.ceil(items.length / 5);
        const pagging = Array.from({ length: pages }, (_, i) => i + 1);
        setPagging(pagging);
        setPaggingProducts(items.slice(0, 5));
    };

    const handleSearch = () => {
        const searchQuery = searchRef.current.value.toLowerCase();
        const filteredProducts = Product.filter(product =>
            product.productName.toLowerCase().includes(searchQuery) ||
            product.cat.toLowerCase().includes(searchQuery)
        );
        setSearchedProduct(filteredProducts);
        updatePagination(filteredProducts);
    };

    const handleSort = (field) => {
        let sortedProducts;
        if (field === "newest") {
            sortedProducts = [...searchedProduct].reverse();
        } else {
            sortedProducts = [...searchedProduct].sort((a, b) => {
                let aValue = a[field];
                let bValue = b[field];

                if (sortOrder === "asc") {
                    return aValue > bValue ? 1 : -1;
                }
                return aValue < bValue ? 1 : -1;
            });
        }

        setSearchedProduct(sortedProducts);
        updatePagination(sortedProducts);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            fetch(`http://localhost:9999/products/${id}`, { method: "DELETE" })
                .then(() => {
                    setIsChange(!isChange);
                });
        }
    };

    const Pagging = (index) => {
        const start = (index - 1) * 5;
        const end = start + 5;
        setPaggingProducts(searchedProduct.slice(start, end));
    };

    if (
        JSON.parse(sessionStorage.getItem("user")) != null &&
        JSON.parse(sessionStorage.getItem("user")).roll === 1
    ) {
        return (
            <div className="flex flex-col lg:flex-row bg-gray-100 min-h-screen">
                <SideBar />

                <div className="flex-1 p-8">
                    <h1 className="text-2xl font-bold mb-6">Manager Product</h1>

                    {/* Filter, Search and Sort */}
                    <div className="flex items-center gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="Search by name or category"
                            ref={searchRef}
                            onChange={handleSearch}
                            className="p-2 border rounded w-1/3"
                        />
                        <select
                            onChange={(e) => handleSort(e.target.value)}
                            className="p-2 border rounded"
                        >
                            <option value="newest">Sort by Newest</option>
                            <option value="productName">Sort by Name</option>
                            <option value="price">Sort by Price</option>

                        </select>
                        <Link to="/create-product" className="bg-blue-500 text-white p-2 rounded">Create Product</Link>
                    </div>

                    {/* Product Table */}
                    <table className="min-w-full bg-white border rounded-md shadow-sm">
                        <thead>
                            <tr className="bg-gray-200 text-left">

                                <th className="p-3">Image</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Color</th>
                                <th className="p-3">Brand</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Description</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paggingProducts.map(product => (
                                <tr key={product.id} className="border-t hover:bg-gray-50">

                                    <td className="p-3">
                                        <img src={product.img} alt={product.productName} className="w-16 h-16 object-cover" />
                                    </td>
                                    <td className="p-3">{product.productName}</td>
                                    <td className="p-3">${product.price}</td>
                                    <td className="p-3">{product.color}</td>
                                    <td className="p-3">{product.brand}</td>
                                    <td className="p-3">{product.cat}</td>
                                    <td className="p-3">{product.des.length > 100 ? `${product.des.substring(0, 50)}...` : product.des}</td>
                                    <td className="p-3">
                                        <div className="flex space-x-2">
                                            <Link to={`/edit-product/${product.id}`} className="bg-blue-500 text-white p-2 rounded">Edit</Link>
                                            <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-center mt-6 space-x-2">
                        {pagging.map(p => (
                            <button
                                key={p}
                                className="px-4 py-2 border rounded hover:bg-gray-200"
                                onClick={() => Pagging(p)}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    } else {
        error("You are not allowed to access this page");
    }
};

export default Dashboard;