import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onSearch, cartCount, handleCartClick }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate()
    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="absolute z-[999] py-4 flex items-center justify-between shadow-md w-full px-4 bg-red-100/80">
            <h1 id="head" className="font-extrabold text-4xl text-red-500 cursor-pointer" onClick={handleCartClick}>YourMart</h1>
            <div className="flex items-center">
                <div className="mr-5 relative">
                    <p className="absolute rounded-full h-5 w-5 bg-red-600 flex items-center justify-center -top-2 -right-3 text-white text-[0.8rem]">
                        {cartCount}
                    </p>
                    <FaShoppingCart size={30} onClick={handleCartClick} />
                </div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mr-2 p-2 border border-gray-300 rounded-full"
                />
                <button
                    onClick={handleSearch}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl"
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default Navbar;
