<script setup lang="ts">
import { computed, ref, watch } from 'vue';
const props = defineProps({
	currentDate: Date
});
const emits = defineEmits(['getDate']);
const year = props.currentDate?.getFullYear();
const month = props.currentDate?.getMonth();
const choiceYear = ref(year);
const choiceMonth = ref(<number>month + 1);

watch(choiceMonth, (newMonth, oldMonth) => {
	emits('getDate', choiceYear.value, newMonth);
});

const arrYear = computed(() => {
	let arr: number[] = [];
	arr.push(<number>year - 1);
	arr.push(<number>year);
	return arr;
});
const arrMonth = computed(() => {
	let arr: number[] = [];
	if (choiceYear.value == year) {
		choiceMonth.value = <number>month + 1;
		for (let i = 1; i <= <number>month + 1; i++) {
			arr.push(i);
		}
	} else {
		choiceMonth.value = 1;
		for (let i = 1; i <= 12; i++) {
			arr.push(i);
		}
	}
	return arr;
});
</script>

<template>
	<select class="custom-select" v-model="choiceYear">
		<option
			class="custom-opt"
			v-for="(item, index) in arrYear"
			:key="index"
			:value="item"
		>
			{{ item }}年
		</option>
	</select>

	<select class="custom-select" v-model="choiceMonth">
		<option
			class="custom-opt"
			v-for="(item, index) in arrMonth"
			:key="index"
			:value="item"
		>
			{{ item }}月
		</option>
	</select>
</template>

<style scoped>
.custom-select {
	display: inline-block;
	margin-left: 10px;
	height: 100%;
	width: 70px;
	border: 0;
	outline: none;
	background: #fff;
}

.custom-opt {
	border-radius: none;
	
}
</style>
