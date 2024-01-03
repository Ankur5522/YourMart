import React from 'react';

const Product = ({ item, handleAddItem }) => {
    return (
        <div className="bg-red-100 rounded-lg overflow-hidden shadow-md max-w-xs mx-auto">
            <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover" />

            <div className="p-4">
                <h2 className="text-xl font-semibold text-red-700 mb-2">{item.title}</h2>
                <p className="text-red-600 mb-2 overflow-hidden line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                    <p className="text-lg text-red-500 font-bold">${item.price}</p>
                    <p className="text-red-600">{item.stock} in stock</p>
                </div>
                <div className="flex items-center mt-4">
                    <span className="text-yellow-500">{item.rating}</span>
                    <span className="ml-2 text-red-600">Rating</span>
                </div>
            </div>

            <div className="p-4 border-t border-red-300">
                {/* <a href="#" className="text-blue-500 hover:underline">View Details</a> */}
                <button className='bg-red-500 rounded-xl px-2 py-1 text-white' onClick={handleAddItem}>Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;
