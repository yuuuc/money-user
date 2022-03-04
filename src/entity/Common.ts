export class Login {
	username: string;
	password: string;

	constructor(username: string = '', password: string = '') {
		this.username = username;
		this.password = password;
	}
}

export class Val {
	value: string;
	check: boolean;
	constructor(value: string = '', check: boolean = false) {
		this.value = value;
		this.check = check;
	}

	init() {
		this.value = '';
		this.check = false;
	}

	checkValue(): void {
		if (this.value.trim() == '') {
			this.check = true;
		}
	}
}

export class Register {
	name: Val;
	username: Val;
	tel: Val;
	password: Val;

	constructor(
		name: Val = new Val(),
		username: Val = new Val(),
		tel: Val = new Val(),
		password: Val = new Val()
	) {
		this.name = name;
		this.username = username;
		this.tel = tel;
		this.password = password;
	}

	checkValue(): boolean {
		if (this.name.value.trim() == '') {
			this.name.check = true;
			return true;
		}
		if (this.username.value.trim() == '') {
			this.username.check = true;
			return true;
		}
		if (this.tel.value.trim() == '') {
			this.tel.check = true;
			return true;
		}
		if (this.password.value.trim() == '') {
			this.password.check = true;
			return true;
		}
		return false;
	}

	init() {
		this.name.init();
		this.username.init();
		this.tel.init();
		this.password.init();
	}

	getKV(): Object {
		return {
			name: this.name.value,
			username: this.username.value,
			tel: this.tel.value,
			password: this.password.value
		};
	}
}

export class Account {
	aid_t: string;
	uid: string;
	money: string;
	isOut: 0 | 1;
	description: string;
	title?: string;

	constructor(
		aid_t: string = '',
		uid: string = '',
		money: string = '',
		isOut: 0 | 1 = 0,
		description: string = ''
	) {
		this.aid_t = aid_t;
		this.uid = uid;
		this.money = money;
		this.isOut = isOut;
		this.description = description;
	}

	isEmpty() {
		if (this.aid_t == '' || this.uid == '' || this.money == '') {
			return false;
		}
		return true;
	}

	initAccount() {
		this.aid_t = '';
		this.uid = '';
		this.money = '';
		this.isOut = 0;
		this.description = '';
	}
}

export class User {
	uid: string;
	name: string;
	username: string;
	tel: string;
	password: string;

	constructor(
		uid: string = '',
		name: string = '',
		username: string = '',
		tel: string = '',
		password: string = ''
	) {
		this.uid = uid;
		this.name = name;
		this.username = username;
		this.tel = tel;
		this.password = password;
	}
}
