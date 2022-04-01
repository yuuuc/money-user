<script setup lang="ts">
import { reactive, ref } from '@vue/reactivity';
import { computed, watch } from '@vue/runtime-core';
const money = ref(0);
const interestRate = ref(0);
const lastMoney = ref('0.00');
// const test = reactive({ a: 1, b: 2 });
// watch(
// 	() => test.a,
// 	(newValue, oldValue) => {
// 		console.log(newValue, oldValue);
// 	}
// );
// test.a++;

const calculate = () => {
	lastMoney.value = (
		Number(money.value) +
		(money.value * interestRate.value) / 100
	).toFixed(2);
};
const list = [
	{
		id: 1,
		title: '华夏理财固定收益纯债型',
		link: 'http://m.cmbchina.com/mfinanceweb/Financing/Detail.aspx?code=HX020205'
	},
	{
		id: 2,
		title: '兴银理财悦动',
		link: 'http://m.cmbchina.com/mfinanceweb/Financing/Detail.aspx?code=XY040202'
	},
	{
		id: 3,
		title: '招银理财',
		link: 'http://m.cmbchina.com/mfinanceweb/Financing/Detail.aspx?code=103744C'
	},
	{
		id: 4,
		title: '交银理财',
		link: 'http://m.cmbchina.com/mfinanceweb/Financing/Detail.aspx?code=JY020252'
	}
];
</script>

<template>
	<div>
		<h4>利润计算器</h4>
		<van-field
			v-model="money"
			type="number"
			maxlength="11"
			class="input"
			label="金额(元)"
		/>
		<van-field
			v-model="interestRate"
			maxlength="5"
			type="number"
			class="input"
			label="利率(%)"
		/>
		<van-field
			v-model="lastMoney"
			maxlength="11"
			readonly
			class="input"
			label="总金额(元)"
		/>
		<van-button type="primary" block @click="calculate">计算</van-button>
	</div>

	<div class="moneyInfo">
		<h4>理财信息</h4>
		<van-list finished-text="没有更多了">
			<van-cell v-for="item in list" :key="item.id"
				><a :href="item.link">{{ item.title }}</a></van-cell
			>
		</van-list>
	</div>
</template>

<style scoped>
.moneyInfo {
	margin-top: 20px;
}
</style>
