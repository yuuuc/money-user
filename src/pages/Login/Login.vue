<script setup lang="ts">
import { reactive } from 'vue';
import { Login } from '../../entity/Common';
import { postLogin } from '../../api/CommonApi';
import { useUserStore } from '../../store/userStore';
import { useRouter } from 'vue-router';
const userStore = useUserStore();

const router = useRouter();

const loginData = reactive(new Login());
const register = () => {
	router.replace('/register');
};

async function loginHandler() {
	const { username, password } = loginData;
	if (username === '' || password === '') {
		return;
	}
	const res = await postLogin(loginData);
	if (res.messageCode == 'success') {
		userStore.setUid(res.data.uid);
		localStorage.setItem('uid', res.data.uid);
		router.replace('/home/account');
	}
}
</script>

<template>
	<div class="header"></div>
	<van-cell-group class="group" inset>
		<van-field
			v-model="loginData.username"
			class="input"
			label="账号"
			placeholder="请输入用户名"
		/>
		<van-field
			v-model="loginData.password"
			class="input"
			label="密码"
			type="password"
			placeholder="请输入密码"
		/>
		<div class="buttons">
			<van-button class="button" @click="loginHandler" type="primary"
				>登录</van-button
			>
			<van-button class="button" @click="register" type="success"
				>注册</van-button
			>
		</div>
	</van-cell-group>
</template>

<style scoped>
.header {
	background-image: url('../../assets/images/login.jpg');
	background-repeat: no-repeat;
	background-size: cover;
	background-origin: border-box;
	width: 100%;
	height: 300px;
}

.group {
	margin-top: 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
}

.input {
}

.button {
	border-radius: 5px;
	display: inline-block;
}
.buttons {
	display: grid;
	margin: 10px;
	grid-column-gap: 10px;
	grid-template-columns: 1fr 1fr;
}
</style>
