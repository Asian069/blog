import { getBanners } from "@/api/banner";

export default {
    namespaced: true, // 开启命名空间
    state:{
        loading: false,
        data:[],
    },
    mutations:{
        setLoading(state, payload){
            state.loading = payload;
        },
        setData(state, payload){
            state.data = payload
        },
    },
    actions:{
        async fetchBanner(context){
            if(context.state.data.length){ // 当前的状态有值
                return;
            }
            context.commit("setLoading", true);
            const resp = await getBanners();
            context.commit("setData", resp);
            context.commit("setLoading", false);
        }
    }
}