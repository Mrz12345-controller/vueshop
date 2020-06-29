import axios from 'axios';
const MyHttpServer = {};

MyHttpServer.install = (Vue) => {
    //设置api前缀
    axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"
    Vue.prototype.$http = axios
}

export default MyHttpServer