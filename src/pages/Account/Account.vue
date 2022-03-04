<script setup lang="ts">
import { ref, onBeforeMount, reactive } from 'vue';
import PickList from '../../components/PickList.vue';
import {
	getAccounts,
	postDeleteAccount,
	postInsertAccount
} from '../../api/AccountApi';
import { getAccountTypes } from '../../api/AccountType';
import { useUserStore } from '../../store/userStore';
import { Dialog } from 'vant';
import { Account } from '../../entity/Common';

const userStore = useUserStore();

const list: any[] = reactive([]);
const loading = ref(false);
const finished = ref(false);
const currentDate = ref(new Date());
const year = currentDate.value.getFullYear();
const month = currentDate.value.getMonth();
const start = ref('');
const end = ref('');
const show = ref(false);
const newAccountData = reactive(new Account());

onBeforeMount(() => {
	let maxDate = new Date(year, month + 1, 0).getDate();
	start.value = `${year}-${month + 1}-${1}`;
	end.value = `${year}-${month + 1}-${maxDate}`;
	getAccountData();
	getAccountTypeData();
});

// 获取数据 accounts
async function getAccountData() {
	loading.value = true;
	let uid = localStorage.getItem('uid');
	const res = await getAccounts({
		startTime: start.value,
		endTime: end.value,
		uid
	});
	if (res.messageCode == 'ok' && res.data.accounts.length >= 0) {
		list.splice(0, list.length);
		const accounts = res.data.accounts;
		accounts.forEach((item: any) => {
			list.push(item);
		});
		loading.value = false;
		finished.value = true;
	}
}

function deleteOne(record: any) {
	Dialog.confirm({
		title: '警告',
		message: '确认删除,删除后将无法恢复!'
	})
		.then(async () => {
			console.log(record.aid);

			const res = await postDeleteAccount({ aid: record.aid });
			console.log(res);

			getAccountData();
		})
		.catch(() => {
			// on cancel
		});
}

async function getAccountTypeData() {
	const res = await getAccountTypes();
	if (res.messageCode == 'ok') {
		userStore.accountType = res.data.accountsTypes;
	}
}

const getDate = (year: number, month: number) => {
	let maxDate = new Date(year, month, 0).getDate();
	start.value = `${year}-${month}-${1}`;
	end.value = `${year}-${month}-${maxDate}`;
	getAccountData();
};

const newAccount = () => {
	show.value = true;
};

const onInput = (value: string) => {
	const reg: RegExp = /(\.\d{2})/;
	if (newAccountData.money.search(reg) >= 0) {
		return;
	}
	if (newAccountData.money.search(/\./) >= 0 && value == '.') {
		return;
	}
	if (newAccountData.money.length >= 8) {
		return;
	}
	newAccountData.money += value;
};

const onDelete = () => {
	const len = newAccountData.money.length - 1;
	newAccountData.money = newAccountData.money.substring(0, len);
};

const onClose = async () => {
	const uid = localStorage.getItem('uid');
	newAccountData.uid = <string>uid;
	if (newAccountData.isEmpty()) {
		const res = await postInsertAccount(newAccountData);
		if (res.messageCode == 'ok') {
			newAccountData.initAccount();
			getAccountData();
			show.value = false;
		}
	}
};

const choiceType = (value: any) => {
	newAccountData.aid_t = value.aid_t;
};

const changeIsOut = () => {
	newAccountData.isOut = newAccountData.isOut == 0 ? 1 : 0;
};
</script>

<template>
	<van-icon class="newAccount" name="plus" @click="newAccount" size="50" />
	<div class="action">
		<PickList @getDate="getDate" :currentDate="currentDate" />
	</div>
	<van-list
		class="list"
		:loading="loading"
		:finished="finished"
		finished-text="没有更多了"
	>
		<van-cell
			v-for="(item, index) in list"
			:key="index"
			:title="`${item.type} - ${item.isOut == 0 ? '支出' : '收入'} : ${
				item.money
			}元`"
		>
			时间:{{ item.time }}
			<span class="delete" @click="deleteOne(item)">删除</span>
		</van-cell>
	</van-list>
	<van-action-sheet v-model:show="show" title="标题">
		<div class="account-content">
			<h4 class="account-money">
				金额
				<span
					@click="changeIsOut"
					:class="['account-isOut', newAccountData.isOut == 0 ? 'out' : 'in']"
					>{{ newAccountData.isOut == 0 ? '支出' : '收入' }}</span
				>
			</h4>
			<van-field
				class="account-input"
				v-model="newAccountData.money"
				readonly
				clickable
				input-align="right"
				size="large"
			/>
			<div class="account-types">
				<van-grid column-num="3" clickable>
					<van-grid-item
						:class="[
							item.aid_t == newAccountData.aid_t ? 'account-active' : ''
						]"
						v-for="(item, index) in userStore.accountType"
						:key="index"
						:text="item.title"
						@click="choiceType(item)"
					/>
				</van-grid>
			</div>

			<van-number-keyboard
				:show="true"
				theme="custom"
				extra-key="."
				close-button-text="完成"
				@close="onClose"
				@input="onInput"
				@delete="onDelete"
			/>
		</div>
	</van-action-sheet>
</template>

<style scoped>
.list {
	border: 1px solid #ddd;
	border-radius: 5px;
}

.action {
	margin-bottom: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	height: 30px;
}

.delete {
	color: red;
	margin-left: 10px;
}

.newAccount {
	position: fixed;
	left: 5px;
	bottom: 150px;
	border-radius: 50%;
	background-color: #ccc;
	z-index: 1000;
	size: 40px;
}

.account-content {
	height: 600px;
	background-color: #eee;
}

.account-input {
	border-radius: 5px;
	font-size: 32px;
}

.account-money {
	font-size: 24px;
	text-align: left;
	padding-left: 10px;
	color: #45aa56;
	position: relative;
}

.account-types {
	margin-top: 10px;
	height: 240px;
	overflow-y: scroll;
}

.account-isOut {
	display: inline-block;
	position: absolute;
	right: 10px;
}
.in {
	color: #229977;
}
.out {
	color: #ff6666;
}
</style>
