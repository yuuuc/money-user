<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';
const router = useRouter();
const route = useRoute();
const active = ref(route.path);
const title = ref('我的数据');

// 添加监听
watch(active, () => {
	const { value } = active;
	switch (value) {
		case '/home/account':
			router.replace('/home/account');
			title.value = '我的数据';
			break;

		case '/home/count':
			router.replace('/home/count');
			title.value = '我的统计';
			break;

		case '/home/user':
			router.replace('/home/user');
			title.value = '我的信息';
			break;

		case '/home/money':
			router.replace('/home/money');
			title.value = '理财信息';
			break;
	}
});

const logout = () => {
	localStorage.removeItem('uid');
	router.replace('/');
};
</script>

<template>
	<div class="container">
		<van-nav-bar class="title" :title="title">
			<template #right>
				<van-button
					@click="logout"
					v-show="'/home/user' == active"
					type="danger"
					size="mini"
					>注销</van-button
				>
			</template>
		</van-nav-bar>
		<div class="content">
			<router-view></router-view>
		</div>
		<van-tabbar v-model="active">
			<van-tabbar-item name="/home/account" icon="home-o">记录</van-tabbar-item>
			<van-tabbar-item name="/home/count" icon="search">统计</van-tabbar-item>
			<van-tabbar-item name="/home/money" icon="refund-o">理财</van-tabbar-item>
			<van-tabbar-item name="/home/user" van-tabbar-item icon="friends-o"
				>用户</van-tabbar-item
			>
		</van-tabbar>
	</div>
</template>

<style scoped>
.container {
	width: 100%;
	height: calc(100% - 50px);
	display: flex;
	flex-direction: column;
}
.content {
	flex: 1;
	padding: 15px;
	overflow-y: scroll;
}

.title {
	border-bottom: 1px solid #ddd;
}
</style>
