// src/services/file-upload.service.js

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL

const api = axios.create({
    // make sure you use PORT = 5005 (the port where our server is running)
    baseURL: BASE_URL || "http://localhost:5005"
    // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
    throw err;
};

const uploadImage = (file) => {
    return api.post("/api/upload", file)
        .then(res => res.data)
        .catch(errorHandler);
};

const createApartment = (newApartment, authObj) => {
    return api.post("/api/apartments", newApartment, authObj)
        .then(res => res.data)
        .catch(errorHandler);
};

export default {
    uploadImage,
    createApartment
};
