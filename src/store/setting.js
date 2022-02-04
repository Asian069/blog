import { getSetting } from '../api/setting';
import { titleController } from '../utils';

export default{
    namespaced: true,

    state:{
        loading: false,
        data:null,
    },
    mutations:{
        setLoading(state, payload){
            state.loading = payload;
        },
        setData(state, payload){
            state.data = payload;
        }
    },
    actions:{
        async fetchSetting(context){
            context.commit("setLoading", true);
            const resp = await getSetting();
            context.commit("setData", resp);
            context.commit("setLoading", false);
            if(resp.favicon){ // 判断有没有图标这个元素
                let link = document.querySelector("link[ref='shorcut icon']");
                if(link){
                    return;
                }
                link = document.createElement("link");
                link.rel = "shorcut icon";
                link.type = "images/x-icon"
                link.href = resp.favicon;
                document.querySelector("head").appendChild(link);
            }
            if(resp.siteTitle){
                titleController.setSiteTitle(resp.siteTitle);
            }
        }
    }
}