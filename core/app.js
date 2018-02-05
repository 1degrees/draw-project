/**
 * @file entry
 * @author 梁灿伦(liangcl@nsw88.com)
 */

import Vue from 'vue';
import Meta from 'vue-meta';
import {createRouter} from '@/.lavas/router';
import {createStore} from '@/.lavas/store';
import Message from '@/components/message/main.js'
import loadingDirective from '@/components/loading/directive.js'
import AppComponent from './App.vue';
Vue.use(Meta,{
    title:'闪秀新年抽签'
});
Vue.use(loadingDirective);
Vue.prototype.$message = Message;
Vue.config.productionTip = false;

export function createApp() {
    let router = createRouter();
    let store = createStore();
    let App = Vue.extend({
        router,
        store,
        ...AppComponent
    });
    return {App, router, store};
}

if (module.hot) {
    module.hot.accept();
}
