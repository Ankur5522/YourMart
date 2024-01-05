import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onSearch, cartCount, handleCartClick }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [profile, setProfile] = useState(null)
    const [showDropdown, setShowDropdown] = useState(false)
    const navigate = useNavigate()
    const handleSearch = () => {
        onSearch(searchTerm);
    };

    useEffect(() => {
        const fetchProfile = () => {
            const profile = localStorage.getItem('profile')
            setProfile(JSON.parse(profile))
        }
        fetchProfile();
    },[])

    const handleLogout = () => {
        localStorage.removeItem('profile')
        navigate('/login')
    }

    return (
        <div className="absolute z-[999] py-4 flex items-center justify-between shadow-md w-full px-4 bg-red-100/80">
            <h1 id="head" className="font-extrabold text-4xl text-red-500 cursor-pointer" onClick={handleCartClick}>YourMart</h1>
            <div className="flex items-center">
                <div className="mr-5 relative">
                    <p className="absolute rounded-full h-5 w-5 bg-red-600 flex items-center justify-center -top-2 -right-3 text-white text-[0.8rem]">
                        {cartCount}
                    </p>
                    <FaShoppingCart size={30} onClick={handleCartClick} className="cursor-pointer"/>
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
                <div className="flex flex-col items-center justify-center ml-4 relative cursor-pointer" 
                    onClick={() => {setShowDropdown(!showDropdown)}}
                >
                    <div className="h-[2.8rem] w-[2.8rem] bg-white border-4 border-gray-400/80 rounded-full flex justify-center items-center">
                    <img src={profile?.image} alt="profile" width={25} />
                    </div>
                    {
                        showDropdown && 
                        <div className="absolute z-[700] flex flex-col w-[7rem] text-center bg-red-500 top-[3.8rem] text-[1rem] right-0 py-3 text-white items-center rounded-sm transition">
                        <p>{profile.firstName}</p>
                        <button className="bg-red-400 w-[80%] mt-2 pb-1 rounded-xl" onClick={handleLogout}>Log out</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
