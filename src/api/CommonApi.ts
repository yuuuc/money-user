import http from '../http/axios';
import { Login } from '../entity/Common';

const LOGIN = '/login';
export function postLogin(data: Login): any {
	return http.post(LOGIN, data);
}

const REGISTER = '/register';
export function postRegister(data: Object): any {
	return http.post(REGISTER, data);
}
