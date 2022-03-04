import { User } from '../entity/Common';
import http from '../http/axios';

const requestMapping = '/user';

const USER_BY_ID = requestMapping + '/getUserById';

export function getUserById(): any {
	const uid = localStorage.getItem('uid');
	return http.get(USER_BY_ID, {
		params: { uid }
	});
}

const UPDATE_USER = requestMapping + '/updateUser';
export function postUpdateUser(data: User): any {
	return http.post(UPDATE_USER, data);
}
