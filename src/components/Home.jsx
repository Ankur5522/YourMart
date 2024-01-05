import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { fetchProducts } from "../api/api";
import Product from "./Product";
import { FaFilter } from "react-icons/fa";
import Cart from "./Cart";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterClick, setFilterClick] = useState(false);
    const [minFilter, setMinFilter] = useState("");
    const [maxFilter, setMaxFilter] = useState("");
    const [cart, setCart] = useState([]);
    const [cartClick, setCartClick] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const navigate = useNavigate()

    const fetchProfile = () => {
        const storedProfile = localStorage.getItem("profile");
        if (!storedProfile) {
            navigate("/login");
        } 
      };
      
      useEffect(() => {
        fetchProfile();
        const fetchProduct = async () => {
          const allProducts = await fetchProducts();
          setProducts(allProducts.products);
          setFilteredProducts(allProducts.products);
        };
        fetchProduct();
      }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
        filterProducts(term, minFilter, maxFilter);
    };

    const handleFilterChange = () => {
        filterProducts(searchTerm, minFilter, maxFilter);
    };

    const filterProducts = (term, min, max) => {
        let filtered = products.filter((product) =>
            product.title.toLowerCase().includes(term.toLowerCase())
        );

        if (min !== "" && !isNaN(min)) {
            filtered = filtered.filter(
                (product) => product.price >= parseFloat(min)
            );
        }

        if (max !== "" && !isNaN(max)) {
            filtered = filtered.filter(
                (product) => product.price <= parseFloat(max)
            );
        }

        setFilteredProducts(filtered);
    };

    const handleAddItem = (item) => {
        const existingItem = cart.find((cartItem) => cartItem.id === item.id);

        if (!existingItem) {
            setCart([...cart, { ...item, quantity: 1 }]);
            setCartCount(cartCount + 1);
        }
    };

    const handleCartClick = (event) => {
        if (event.target.id === "head") {
            setCartClick(false);
        } else {
            setCartClick(!cartClick);
        }
    };

    const handleRemoveItem = (itemId) => {
        const updatedCart = cart.filter((item) => item.id !== itemId);

        setCart(updatedCart);
        setCartCount(cartCount - 1);
    };

    const handleIncreaseQuantity = (itemId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === itemId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const handleDecreaseQuantity = (itemId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === itemId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    return (
        <div className=" bg-red-100/30 h-screen">
            <Navbar
                onSearch={handleSearch}
                cartCount={cartCount}
                handleCartClick={handleCartClick}
            />
            {cartClick ? (
                <Cart
                    cartItems={cart}
                    removeItem={handleRemoveItem}
                    increaseQuantity={handleIncreaseQuantity}
                    decreaseQuantity={handleDecreaseQuantity}
                />
            ) : (
                <div className="pt-[5.5rem] px-8">
                    <div
                        className="mb-3 font-semibold text-gray-100 bg-red-400 rounded-full px-4 py-1 w-min ml-2 cursor-pointer flex items-center"
                        onClick={() => setFilterClick(!filterClick)}
                    >
                        Filter
                        <FaFilter className="ml-1" size={14} />
                    </div>
                    {filterClick && (
                        <div className="flex items-center mb-5 ml-4">
                            <input
                                type="number"
                                placeholder="Min"
                                min={0}
                                max={1500}
                                value={minFilter}
                                onChange={(e) => setMinFilter(e.target.value)}
                                className="mr-2 p-2 w-[10rem] border border-gray-300 rounded-full"
                            />
                            <p className="mr-2 font-bold text-gray-400">to</p>
                            <input
                                type="number"
                                placeholder="Max"
                                min={0}
                                max={1500}
                                value={maxFilter}
                                onChange={(e) => setMaxFilter(e.target.value)}
                                className="mr-2 p-2 w-[10rem] border border-gray-300 rounded-full"
                            />
                            <button
                                onClick={handleFilterChange}
                                className="bg-red-500 text-white px-4 py-2 rounded-xl"
                            >
                                Filter
                            </button>
                        </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredProducts.length === 0 ? (
                            <div className="pt-8 text-center w-full">
                                No matching products found.
                            </div>
                        ) : (
                            filteredProducts.map((product) => (
                                <Product
                                    key={product.id}
                                    item={product}
                                    handleAddItem={() => handleAddItem(product)}
                                />
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
