import axios from 'axios'; // 导入插件axios(基于Promise的网络请求器)
import showMessage from '../utils/showMessage';

const ins = axios.create(); // 创建一个axios的实例(ins和axios的功能一样)
ins.interceptors.response.use(function(resp){ // 拦截器，拦截过后会运行下面的函数
    if(resp.data.code !== 0){ 
        showMessage({
            content: resp.data.msg,
            type: 'error',
            duration: 1500,
        })
        return null; //如果错误码为错误，就是请求失败就返回null
    }
    return resp.data.data; // 如果错误码为0，则正常返回的数据
});

export default ins;