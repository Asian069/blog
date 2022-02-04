import { getProjects } from "../api/project";

export default {
    namespaced: true,
    state:{
        loading: false,
        data: [],
    },
    mutations:{
        getLoading(state,payload){
            state.loading = payload;
        },
        getData(state,payload){
            state.data = payload;
        }
    },
    actions:{
        async fetchProject(context){
            if(context.state.data.length){
                return;
            }
            context.commit("getLoading", true);
            const resp = await getProjects();
            context.commit("getData", resp);
            context.commit("getLoading", false);
        }
    }
}