import { defineStore } from 'pinia';
import { Account } from '../entity/Common';

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			uid: '',
			accountType: new Array<Account>()
		};
	},
	getters: {},
	actions: {
		setUid(uid: string) {
			this.uid = uid;
		}
	}
});
