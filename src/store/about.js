import { getAbout } from "@/api/about";

export default{
    namespaced: true,
    state:{
        loading: false,
        data:"",
    },
    mutations:{
        getLoading(state, payload){
            state.loading = payload;
        },
        getData(state,payload){
            state.data = payload;
        },
    },
    actions:{
        async fetchAbout(context){
            if(context.state.data.length){ // 如果有数据返回，避免重复加载
                return;
            }
            context.commit("getLoading", true);
            const resp = await getAbout();
            context.commit("getData", resp);
            context.commit("getLoading", false);
        }       
    }

}