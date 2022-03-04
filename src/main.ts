/*
 * @Version:
 * @Company:
 * @Author: yu.chen
 * @Date: 2022/03/02
 * @Description:
 * @LastEditTime: 2022/03/04
 */
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

import * as echarts from 'echarts/core';

import {
	BarChart,
	// 系列类型的定义后缀都为 SeriesOption
	BarSeriesOption,
	LineChart,
	PieChart,
	LineSeriesOption
} from 'echarts/charts';
import {
	TitleComponent,
	// 组件类型的定义后缀都为 ComponentOption
	TitleComponentOption,
	TooltipComponent,
	TooltipComponentOption,
	GridComponent,
	GridComponentOption,
	// 数据集组件
	DatasetComponent,
	DatasetComponentOption,
	// 内置数据转换器组件 (filter, sort)
	TransformComponent,
	LegendComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
	| BarSeriesOption
	| LineSeriesOption
	| TitleComponentOption
	| TooltipComponentOption
	| GridComponentOption
	| DatasetComponentOption
>;

// 注册必须的组件
echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	BarChart,
	LineChart,
	PieChart,
	LabelLayout,
	UniversalTransition,
	CanvasRenderer,
	SVGRenderer,
	LegendComponent
]);

const app = createApp(App);

app.config.globalProperties.echarts = echarts;

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
