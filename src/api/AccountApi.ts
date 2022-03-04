import http from '../http/axios';
import { Account } from '../entity/Common';

const requestMapping = '/account';

const ACCOUNTS_BY_TIME = requestMapping + '/getAccountsByTime';
export function getAccounts(data: Object): any {
	return http.get(ACCOUNTS_BY_TIME, { params: data });
}

const ACCOUNT_DELETE_ONE = requestMapping + '/deleteAccount';
export function postDeleteAccount(data: Object): any {
	return http.post(ACCOUNT_DELETE_ONE, data);
}

const ACCOUNT_INSERT = requestMapping + '/insertAccount';
export function postInsertAccount(data: Account): any {
	return http.post(ACCOUNT_INSERT, data);
}
