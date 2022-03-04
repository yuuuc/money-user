import http from '../http/axios';

const requestMapping = '/accountType';

const ACCOUNT_TYPES = requestMapping + '/getAccountTypeAll';
export function getAccountTypes(): any {
	return http.get(ACCOUNT_TYPES);
}
