import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router';
import { createPinia } from 'pinia';
import {
	Button,
	List,
	Tabbar,
	TabbarItem,
	NavBar,
	Cell,
	Field,
	CellGroup,
	Icon,
	ActionSheet,
	NumberKeyboard,
	Grid,
	GridItem,
	Empty,
	Loading,
	Toast
} from 'vant';
import './assets/css/global.css';

const app = createApp(App);

app.use(createPinia());

app.use(router);

app.use(Button);
app.use(List);
app.use(Tabbar);
app.use(TabbarItem);
app.use(NavBar);
app.use(Cell);
app.use(Field);
app.use(CellGroup);
app.use(Icon);
app.use(ActionSheet);
app.use(NumberKeyboard);
app.use(Grid);
app.use(GridItem);
app.use(Loading);
app.use(Empty);
app.use(Toast);

app.mount('#app');
