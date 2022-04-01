import { createRouter, createWebHashHistory } from 'vue-router';

const Home = () => import('../pages/Home/Home.vue');
const Login = () => import('../pages/Login/Login.vue');
const Account = () => import('../pages/Account/Account.vue');
const User = () => import('../pages/User/User.vue');
const Count = () => import('../pages/Count/Count.vue');
const Register = () => import('../pages/Register/Register.vue');
const Money = () => import('../pages/Money/Money.vue');

const routes = [
	{
		path: '/',
		redirect: '/home/account'
	},
	{
		path: '/login',
		name: 'login',
		component: Login
	},
	{
		path: '/register',
		name: 'register',
		component: Register
	},
	{
		path: '/home',
		name: 'home',
		component: Home,
		children: [
			{
				path: 'account',
				name: 'account',
				component: Account
			},
			{
				path: 'user',
				name: 'user',
				component: User
			},
			{
				path: 'count',
				name: 'count',
				component: Count
			},
			{
				path: 'money',
				name: 'money',
				component: Money
			}
		]
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

router.beforeEach((to, from, next) => {
	const uid = localStorage.getItem('uid');
	if (to.name !== 'login' && !uid) next({ name: 'login' });
	else next();
});

export default router;
