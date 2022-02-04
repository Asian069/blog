// 公共的远程获取数据的代码
// 具体的组件中，需要提供一个远程获取数据的方法 fetchData
export default function(defaultDataValue = null){
   return {
        data(){
            return {
                isLoading:true, // 是否正在获取远程数据
                data:defaultDataValue,
            }
        },
        async created(){
            // console.log(this.data);
            this.data = await this.fetchData();
            this.isLoading = false;
        }
   }
}