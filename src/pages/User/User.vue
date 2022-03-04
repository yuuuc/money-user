<script setup lang="ts">
import { reactive } from '@vue/reactivity';
import { onBeforeMount } from '@vue/runtime-core';
import { User } from '../../entity/Common';
import { getUserById, postUpdateUser } from '../../api/UserApi';
import { Toast } from 'vant';

const pageUser = reactive(new User());

const userData = async () => {
	const res = await getUserById();
	if (res.messageCode == 'ok') {
		const { user } = res.data;
		pageUser.username = user.username;
		pageUser.name = user.name;
		pageUser.tel = user.tel;
		pageUser.uid = user.uid;
	}
};

const updateUser = async () => {
	const res = await postUpdateUser(pageUser);
	if (res.messageCode == 'ok') {
		Toast.success('成功');
	} else {
		Toast.fail('失败');
	}
};

onBeforeMount(() => {
	userData();
});
</script>

<template>
	<h3 class="user-title">个人信息</h3>
	<van-field v-model="pageUser.username" label="账号" />
	<van-field v-model="pageUser.name" label="用户名" />
	<van-field v-model="pageUser.tel" type="tel" label="手机号" />
	<van-button type="primary" block @click="updateUser">修改</van-button>
</template>

<style scoped>
.user-title {
	text-align: center;
}
</style>
