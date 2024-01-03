export const login = async (formData) => {
    try {
        const response = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            let errorMessage = "An error occurred during login.";
            try {
                const errorData = await response.json();
                if (errorData.message) {
                    errorMessage = errorData.message;
                }
            } catch (jsonError) {
                console.error("Error parsing JSON from response:", jsonError);
            }

            return {error: errorMessage}
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
};

export const fetchProducts = async () => {
    try {
        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) {
            let errorMessage = "An error occurred during fetching products.";
            try {
                const errorData = await response.json();
                if (errorData.message) {
                    errorMessage = errorData.message;
                }
            } catch (jsonError) {
                console.error("Error parsing JSON from response:", jsonError);
            }

            return {error: errorMessage}
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
};
