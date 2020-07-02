import axios from 'axios';
const MyHttpServer = {};

MyHttpServer.install = (Vue) => {
    //设置api前缀
    axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"
    // http request 拦截器
    //非登陆功能，同意拦截加入token
    axios.interceptors.request.use(
        config => {
            console.log("触发拦截器");
            if (config.url != "login") {
                const token = localStorage.getItem("token");
                config.headers["Authorization"] = token;
            }
            return config
        },
        err => {
            return Promise.reject(err)
        })
    // http response 拦截器
    axios.interceptors.response.use(
        response => {
            //拦截响应，做统一处理 
            return response
        },
        //接口错误状态处理，也就是说无响应时的处理
        error => {
            return Promise.reject(error.response.status) // 返回接口返回的错误信息
        })
    Vue.prototype.$http = axios
}

export default MyHttpServer