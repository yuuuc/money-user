<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
const router = useRouter();
const active = ref(0);

// 添加监听
watch(active, () => {
	const { value } = active;
	switch (value) {
		case 0:
			router.replace('/home/account');
	}
});
</script>

<template>
	<router-view></router-view>
</template>

<style></style>
