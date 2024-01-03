import React from "react";

const Cart = ({
    cartItems,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
}) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md pt-[6rem]">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cartItems && cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    {cartItems &&
                        cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between mb-4"
                            >
                                <div className="flex items-center">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-12 h-12 object-cover rounded-full mr-4"
                                    />
                                    <div>
                                        <p className="text-lg font-bold">
                                            {item.title}
                                        </p>
                                        <p className="text-gray-500">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center mr-5">
                                    <div className="flex items-center mr-6">
                                        <button
                                            onClick={() =>
                                                decreaseQuantity(item.id)
                                            }
                                            className="text-gray-500 font-bold w-6 bg-red-200 rounded-full flex justify-center items-center mr-2"
                                        >
                                            -
                                        </button>
                                        <p className="text-xl font-bold">
                                            {item.quantity}
                                        </p>
                                        <button
                                            onClick={() =>
                                                increaseQuantity(item.id)
                                            }
                                            className="text-gray-500 font-bold w-6 bg-red-200 rounded-full flex justify-center items-center ml-2"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-500 font-bold"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    <hr className="my-4" />
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-bold">Total:</p>
                        <p className="text-lg font-bold">
                            ${calculateTotal(cartItems).toFixed(2)}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

const calculateTotal = (cartItems) => {
    if (cartItems) {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    }
    return 0;
};

export default Cart;
