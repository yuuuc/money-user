import axios, { AxiosRequestHeaders } from 'axios';
const http = axios.create({
	timeout: 5000,
	baseURL: 'http://127.0.0.1:8080'
});

http.interceptors.request.use(
	(config) => {
		(<AxiosRequestHeaders>config.headers).Auth = <string>(
			localStorage.getItem('uid')
		);
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

http.interceptors.response.use(
	(res) => {
		return res.data;
	},
	(err) => {
		return Promise.reject(err);
	}
);

export default http;
