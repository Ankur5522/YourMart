import { useState } from "react";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        setFormData({ ...formData, [name]: event.target.value });
    };

    const handleSubmit = async () => {
        setLoading(!loading);
        const response = await login(formData);
        if (response && response.error) {
            setErrorMsg(response.error);
        }
        if (response) {
            localStorage.setItem("profile", JSON.stringify(response));
            setLoading(!loading);
            navigate("/home");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen relative">
            <div className="flex flex-col bg-red-100 items-center h-[20rem] px-10 rounded-xl">
                <h1 className=" text-3xl py-5 font-bold">Login</h1>
                {errorMsg && (
                    <p className="text-[0.8rem] text-red-600 font-bold absolute mt-[17rem]">
                        *{errorMsg}*
                    </p>
                )}
                <label className="mb-5">
                    <p className="text-[1.1rem] font-medium mb-1/2">
                        Username:
                    </p>
                    <input
                        type="text"
                        name="username"
                        className="block w-[15rem] rounded-full h-7 px-3 border border-gray-400 outline-none"
                        onChange={handleChange}
                        value={formData.username}
                    />
                </label>
                <label>
                    <p className="text-[1.1rem] font-medium mb-1/2">
                        Password:
                    </p>
                    <input
                        type="password"
                        name="password"
                        className="block w-[15rem] rounded-full h-7 px-3 border border-gray-400 outline-none"
                        onChange={handleChange}
                        value={formData.password}
                    />
                </label>
                <button
                    type="submit"
                    className="w-full bg-red-300 mt-8 rounded-full h-8 text-white/85 font-bold text-[1.2rem]"
                    onClick={handleSubmit}
                >
                    {loading ?
                        <div
                        className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                          >Loading...</span
                        >
                      </div> :
                        <p>Submit</p>
                    }
                </button>
            </div>
        </div>
    );
};

export default Login;
