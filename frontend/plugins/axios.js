import axios from "axios";
import Vuesax from "vuesax";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default ({ app, store, redirect }) => {
    axios.defaults.baseURL = process.env.apiUrl;

    if (process.server) {
        return;
    }

    // Request interceptor
    axios.interceptors.request.use(request => {
        request.baseURL = process.env.apiUrl;

        const token = store.getters["auth/token"];

        if (token) {
            request.headers.common.Authorization = `Bearer ${token}`;
        }

        return request;
    });

    // Response interceptor
    axios.interceptors.response.use(
        response => response,
        error => {
            const { status } = error.response || {};

            if (status >= 500) {
                console.log("Error 500");
                alert("Error interno en servidor. Consulte con un administrador.");
                return redirect("/");
            }

            if (status === 401 && store.getters["auth/check"]) {
                store.commit("auth/LOGOUT");

                redirect({ name: "login" });
            }
            console.warn("Ha habido un error con la petición");
            return Promise.reject(error);
        }
    );
};