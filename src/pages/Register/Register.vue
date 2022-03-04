<script setup lang="ts">
import { reactive } from '@vue/reactivity';
import { Register, Val } from '../../entity/Common';
import { postRegister } from '../../api/CommonApi';
import { Toast } from 'vant';
import { useRouter } from 'vue-router';

const router = useRouter();

const register = reactive(new Register());

const registerUser = async () => {
	if (register.checkValue()) {
		return;
	}
	const res = await postRegister(register.getKV());
	if (res.messageCode == 'ok') {
		Toast.success('注册成功');
		router.replace('/login');
	} else {
		Toast.fail('注册失败,账号已被注册!');
		register.init();
	}
};
const focusHandler = (value: Val) => {
	value.check = false;
};
const blurHandler = (value: Val) => {
	value.checkValue();
};
</script>

<template>
	<div class="container">
		<h3 class="register-title">注册</h3>
		<van-field
			v-model="register.name.value"
			:error="register.name.check"
			required
			label="用户名"
			placeholder="请输入用户名"
			@focus="focusHandler(register.name)"
			@blur="blurHandler(register.name)"
		/>
		<van-field
			v-model="register.username.value"
			:error="register.username.check"
			required
			label="账号"
			placeholder="请输入用户名"
			@focus="focusHandler(register.username)"
			@blur="blurHandler(register.username)"
		/>
		<van-field
			v-model="register.tel.value"
			:error="register.tel.check"
			required
			label="手机号"
			placeholder="请输入手机号"
			@focus="focusHandler(register.tel)"
			@blur="blurHandler(register.tel)"
		/>
		<van-field
			v-model="register.password.value"
			type="password"
			label="密码"
			required
			:error="register.password.check"
			placeholder="请输密码"
			@focus="focusHandler(register.password)"
			@blur="blurHandler(register.password)"
		/>
		<van-button type="primary" block @click="registerUser">修改</van-button>
	</div>
</template>

<style scoped>
.container {
	padding: 10px;
}
.register-title {
	padding: 10px;
	text-align: center;
}
</style>
