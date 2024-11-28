// src/pages/SignupPage.jsx

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_API_URL;

function SignupPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [isAgent, setIsAgent] = useState(true)

    const navigate = useNavigate();
    const { storeToken, authenticateUser, storeUser } = useContext(AuthContext);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);
    const handleAgentCheckbox = (e) => {
        setIsAgent(!isAgent)
        console.log(isAgent)
    }


    const handleSignupSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password, name, isAgent };

        axios.post(`${API_URL}/auth/signup`, requestBody)
            .then((response) => {
                console.log("SignUp", response)
                const requestBodyLogin = {email, password}
                axios.post(`${API_URL}/auth/login`, requestBodyLogin)
                .then((response) => {
                    console.log("JWT token", response.data.authToken);
                    console.log("Response", response.data.payload);
                    storeUser(response.data.payload);
                    storeToken(response.data.authToken);
                    authenticateUser();
                    navigate("/");
                })
            })         
            
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    };


    return (
        <div className="hero h-full overflow-y-scroll">
            <div className="hero-content w-full flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-2xl md:text-5xl font-bold">Sign Up</h1>
                    <p className="py-6">Sign up now to start booking visits to rent.<br></br> If you are an agent, create an account to upload your apartments to rent. </p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 rounded-xl">

                    <form className="card-body" onSubmit={handleSignupSubmit}>

                        <label className="label">
                            <span className="label-text">Name</span>

                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleName}
                                required
                                className="input input-bordered"
                            />
                        </label>

                        <label className="label">
                            <span className="label-text">Email</span>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleEmail}
                                className="input input-bordered"
                                placeholder="email"
                                required
                            />
                        </label>
                        <label className="label">
                            <span className="label-text">Password</span>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handlePassword}
                                required
                                className="input input-bordered"
                            />
                        </label>


                        <label className="flex gap-1 items-center">
                            <input type="checkbox" id="isAgent" className="checkbox checkbox-xs checkbox-accent" name="isAgent" checked={isAgent}
                                onChange={handleAgentCheckbox}
                            />
                            <span className="label-text">I'm an agent</span>

                        </label>

                        <button className="btn btn-primary rounded-xl mt-5" type="submit">Sign Up</button>
                    </form>

                    {errorMessage && <p className="error-message text-red-500 ml-4 mb-4">*{errorMessage}</p>}

                </div>
            </div>
        </div>
    )
}

export default SignupPage;
