import http from '../http/axios';

const requestMapping = '/messageFormat';

const MESSAGE_FORMATS = requestMapping + '/getMessageFormats';
export function getMessageFormats(): any {
	return http.get(MESSAGE_FORMATS);
}
