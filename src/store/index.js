import {Store, install} from 'vuex';
import Vue from "vue";
import banner from "./banner";
import setting from "./setting";
import about from './about'
import project from "./project";

if(!window.Vuex){
    install(Vue);
}
export default new Store({
    modules:{
        about,
        banner,
        setting,
        project,
    },
    strict: true, //进入严格模式,只允许用mutations更改状态
})