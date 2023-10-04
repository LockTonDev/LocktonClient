import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';

import { getValueBySplit, getValue } from './util/prototype';
// import VueApexCharts from "vue3-apexcharts";
// @ts-ignore:next-line
// import InstantSearch from 'vue-instantsearch/vue3/es';
// import VCalendar from "v-calendar";
import VueFeather from 'vue-feather';
import LoadScript from 'vue-plugin-load-script';
import VueDaumPostcode from 'vue-daum-postcode';

const app = createApp(App);
// app.config.globalProperties.G_ITEMS = G_ITEMS;

app.component(VueFeather.name, VueFeather);
app.use(PerfectScrollbar);
// app.use(InstantSearch);
app.use(createPinia());
// app.use(VCalendar, {});
// app.use(VueApexCharts);
app.use(router);

app.use(LoadScript);
app.use(VueDaumPostcode);

String.prototype.getValueBySplit = getValueBySplit;
// String.prototype.getValue = getValue;

app.use(vuetify).mount('#app');
