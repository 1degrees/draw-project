import axios from 'axios';

export default function (ctx) {
    // Add a response interceptor
    if (ctx.isClient) {
        axios.interceptors.response.use(function (response) {
            // Do something with response data
            if (response.status === 401) {
                window.sessionStorage.setItem('token', {});
                window.location.replace('/draw/');
            } else {
                return response;
            }
        }, function (error) {
            // Do something with response error

            if (error.response.status === 401) {
                window.sessionStorage.removeItem('token');
                window.location.replace('/draw/');
                return Promise.reject('timeout');
            } else {
                return Promise.reject(error);
            }
        });
    }
}
