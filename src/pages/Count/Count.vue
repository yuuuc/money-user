<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import PickList from '../../components/PickList.vue';
import { getAccounts } from '../../api/AccountApi';
import { getMessageFormats } from '../../api/MessageFormatApi';
import echarts from '../../util/echart';
const isOut = ref(0);
const barMessage: any[] = reactive([]);
const pieMessage: any[] = reactive([]);
const maxIn = ref(0);
const maxOut = ref(0);
const avgIn = ref('');
const avgOut = ref('');
const typeIn = ref(0);
const typeOut = ref(0);
const barRef = ref<HTMLElement | null>(null);
const pieRef = ref<HTMLElement | null>(null);
const barData = reactive({
	title: {
		text: '本月收支'
	},
	tooltip: {
		trigger: 'item'
	},
	xAxis: {
		type: 'category',
		data: ['']
	},
	yAxis: {
		type: 'value',
		min: function () {
			return 0;
		},
		max: function () {
			return 80000;
		},
		axisLabel: {
			rotate: 45
		}
	},
	series: [
		{
			type: 'bar',
			data: [0]
		}
	]
});

const pieData = reactive({
	tooltip: {
		trigger: 'item'
	},
	series: [
		{
			name: 'type',
			type: 'pie',
			radius: '50%',
			data: [
				{ value: 1048, name: 'Search Engine' },
				{ value: 735, name: 'Direct' },
				{ value: 580, name: 'Email' },
				{ value: 484, name: 'Union Ads' },
				{ value: 300, name: 'Video Ads' }
			]
		}
	]
});

const barSetData = () => {
	let map = new Map<string, number>();
	let maxDay = new Date(year, month + 1, 0).getDate();
	const xData = Array.from(Array(maxDay), (v, k) => k.toString());
	const yData = Array(maxDay).fill(0);

	list.forEach((item) => {
		// ios 系统 和安卓系统存在兼容问题
		const time = item.time.replaceAll('-', '/');
		let day = new Date(time).getDate();
		if (item.isOut === isOut.value) {
			yData[day] = Math.round(yData[day] + Number(item.money));
		}
	});
	barData.xAxis.data = xData;
	barData.series[0].data = yData;

	initBar();
};

const pieSetData = () => {
	let map = new Map();
	list.forEach((item) => {
		if (item.isOut == isOut.value) {
			if (map.has(item.type)) {
				let count = map.get(item.type);
				map.set(item.type, count + 1);
			} else {
				map.set(item.type, 1);
			}
		}
	});

	let pieArr: {
		value: number;
		name: string;
	}[] = [];
	for (const [key, value] of map) {
		let obj: {
			value: number;
			name: string;
		} = { value: 0, name: '' };
		obj['value'] = value;
		obj['name'] = key;
		pieArr.push(obj);
	}
	pieData.series[0].data = pieArr;
	initPie();
};

const initBar = () => {
	const option = {
		title: {
			text: 'ECharts 入门示例'
		},
		tooltip: {},
		legend: {
			data: ['销量']
		},
		xAxis: {
			data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
		},
		yAxis: {},
		series: [
			{
				name: '销量',
				type: 'bar',
				data: [5, 20, 36, 10, 10, 20]
			}
		]
	};
	// console.log(barData);
	// console.log(option);

	const barChart = echarts.init(barRef.value as HTMLElement);
	barChart.setOption(barData);
};

const initPie = () => {
	const pieChart = echarts.init(pieRef.value as HTMLElement);
	pieChart.setOption(pieData);
};

// 获取messageFormat
async function messageFormatData() {
	barMessage.splice(0, barMessage.length);
	pieMessage.splice(0, pieMessage.length);
	const res = await getMessageFormats();

	if (res.messageCode == 'ok') {
		res.data.messageFormats.forEach((item: any) => {
			if (item.parentid == 1) {
				item.description = item.description.replace(
					'maxIn',
					maxIn.value == -Infinity ? 0 : maxIn.value
				);
				item.description = item.description.replace(
					'maxOut',
					maxOut.value == -Infinity ? 0 : maxOut.value
				);

				item.description = item.description.replace(
					'avgIn',
					isNaN(Number(avgIn.value)) ? '0' : avgIn.value
				);
				item.description = item.description.replace(
					'avgOut',
					isNaN(Number(avgIn.value)) ? '0' : avgOut.value
				);
				barMessage.push(item);
			} else {
				item.description = item.description.replace(
					'typeIn',
					typeIn.value ? typeIn.value : 0
				);
				item.description = item.description.replace(
					'typeOut',
					typeOut.value ? typeOut.value : 0
				);
				pieMessage.push(item);
			}
		});
	}
}

const formatComputed = () => {
	const inArr: number[] = list.map((item) => {
		if (item.isOut == 1) {
			return item.money;
		}
		return 0;
	});

	const inType = list
		.map((item) => {
			if (item.isOut == 1) {
				return item.type;
			}
		})
		.filter((item) => item != undefined);
	typeIn.value = new Set(inType).size;

	maxIn.value = Math.max(...inArr);
	avgIn.value = (
		inArr.reduce((total, val) => total + val, 0) / inArr.length
	).toFixed(2);

	const outArr: number[] = list.map((item) => {
		if (item.isOut == 0) {
			return item.money;
		}
		return 0;
	});
	const outType = list
		.map((item) => {
			if (item.isOut == 0) {
				return item.type;
			}
			return;
		})
		.filter((item) => item != undefined);
	typeOut.value = new Set(outType).size;

	maxOut.value = Math.max(...outArr);
	avgOut.value = (
		outArr.reduce((total, val) => total + val, 0) / outArr.length
	).toFixed(2);
	messageFormatData();
};

const list: any[] = reactive([]);
const currentDate = ref(new Date());
const year = currentDate.value.getFullYear();
const month = currentDate.value.getMonth() - 1;
const start = ref('');
const end = ref('');
// 获取数据 accounts
async function getAccountData() {
	let uid = localStorage.getItem('uid');
	const res = await getAccounts({
		startTime: start.value,
		endTime: end.value,
		uid
	});
	if (res.messageCode == 'ok') {
		// && res.data.accounts.length >= 0
		list.splice(0, list.length);
		const accounts = res.data.accounts;
		accounts.forEach((item: any) => {
			list.push(item);
		});

		pieSetData();
		barSetData();
		formatComputed();
	}
}

const getDate = (year: number, month: number) => {
	let maxDate = new Date(year, month, 0).getDate();
	start.value = `${year}-${month}-${1}`;
	end.value = `${year}-${month}-${maxDate}`;
	getAccountData();
};

onMounted(() => {
	let maxDate = new Date(year, month + 1, 0).getDate();
	start.value = `${year}-${month + 1}-${1}`;
	end.value = `${year}-${month + 1}-${maxDate}`;
	getAccountData();
});

const changeIsOut = () => {
	isOut.value = isOut.value == 0 ? 1 : 0;
	barSetData();
	pieSetData();
};
</script>

<template>
	<div class="action">
		<PickList @getDate="getDate" :currentDate="currentDate" />
		<span
			:class="['count-isOut', isOut == 0 ? 'out' : 'in']"
			@click="changeIsOut"
			>{{ isOut == 0 ? '支出' : '收入' }}</span
		>
	</div>
	<div id="bar" ref="barRef"></div>
	<div class="context">
		<div
			class="message-item"
			v-for="(item, index) in barMessage"
			v-show="item.isShow == 1"
			:key="index"
		>
			{{ item.title }} : {{ item.description }} 元
		</div>
	</div>
	<div id="pie" ref="pieRef"></div>
	<div class="context">
		<div
			class="message-item"
			v-for="(item, index) in pieMessage"
			v-show="item.isShow == 1"
			:key="index"
		>
			{{ item.title }} : {{ item.description }} 种
		</div>
	</div>
</template>

<style scoped>
#bar {
	width: 100%;
	height: 300px;
}

#pie {
	height: 300px;
	width: 100%;
}
.action {
	position: relative;
	margin-bottom: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	height: 30px;
}

.in {
	color: #229977;
}
.out {
	color: #ff6666;
}
.count-isOut {
	position: absolute;
	right: 10px;
	top: 2px;
	font-size: 20px;
}
</style>
