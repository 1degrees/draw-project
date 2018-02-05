import axios from 'axios';
import {
    sxGetC
} from '../service/http.js';

/**
 * 当URL为非标准的URL时（# hash值在前 ?query 值在后）时
 * 把URL格式化为query在前 hash在后
 * 这个操作是为了方便微信授权后的处理
 * @param {*} url 
 */
function formatUrl(url) {
    return url.replace(/(#[^\?]+)(\?[^#|\b]+)/, '$2$1');
}

/**URL是否为绝对路径 */
function isAbsUrl(url) {
    return /^http[s]?:\/\//.test(url);
}

function addStorage(token) {
    let tokenStr = JSON.stringify({
        token: token,
        created: new Date(),
        expires: 3600 * 1000 * 1.9 //设置成1.9小时超时，后台是2小时超时
    });
    localStorage.setItem('token', tokenStr);
}


/**
 * 从localStorage中取出token
 * 如果TOKEN已经超时或者不存在 则返回false
 */
function clientCheckToken() {
    let token = window.localStorage.getItem('token');
    if (!token) {
        return false;
    }
    token = JSON.parse(token);
    let created = new Date(token.created);
    let expires = new Date(token.expires);
    let now = new Date();
    if (now - created < expires) {
        return token.token;
    } else {
        return false;
    }

}

function goHomePage() {
    setTimeout(() => {
        if (window.location.pathname === '/draw/') {
            window.location.replace('/draw/home/draw');
        }
    }, 5000);
}

/**
 * 客户端调用 服务端授权的URL
 * 由于服务端会对授权进行进一步的处理，这里调用的是当前插件的服务端授权
 */
async function clientWxAuth() {
    try {
        console.log('auth middleware :%s ', '/wxauth')
        // console.log('VUE_ENV %s ROOT_URL%s',VUE_ENV, ROOT_URL);
        let res = await axios.get(`/wxb/api/auth/auth2Ajax?module=sx&redirectUri=${encodeURIComponent(ROOT_URL)}#draw`);
        let auth = res.data;

        if (auth.isSuccess) { //生产环境的授权处理
            window.location.replace(auth.data);
        } else if (auth.message === 'DEV') { //开发环境的授权处理            
            addStorage(auth.data.token);
            axios.defaults.headers.common['token'] = auth.data.token;
            goHomePage();
        } else {
            let errorMsg = `微信授权失败！\n` + auth || '';
            console.error(errorMsg);
            throw new Error(errorMsg);
        }
    } catch (ex) {
        console.error(ex);
        alert(`wx auth 1: ${ex.message || ex.errMsg || ex}`);
    }

}

/**
 * 处理客户端的授权动作
 * 1. 确认token是否有交
 * 2. 如果有效则设置header中的token并返回
 * 3. 如果无效则调用授权API
 * @param {*} ctx 
 */
async function handleClientAuth(ctx) {
    let token = clientCheckToken(); // 从localStorge中取得token
    if (token) {
        axios.defaults.headers.common['token'] = token;
        goHomePage();
        return;
    }
    window.loading = true;
    try {
        await clientWxAuth();
    } catch (ex) {
        alert(`nsw auth 2: ${ex.message || ex}`);
        // console.error(ex);
    } finally {
        window.loading = false;
    }
}

/**如果我们的URL中带了TOKEN则要把这个TOKEN写入到我们的localStorage中 */
function handleClientUrlToken() {
    // debugger
    let TOKENREG = /[\?|&]{1}token=([^?|^#]+)/i;
    let url = window.location.href;
    if (TOKENREG.test(url)) {
        addStorage(url.match(TOKENREG)[1]);
    }
    return false;
}

async function updateVisit() {
    sxGetC('/wxb/api/active/plusOne', {
        visitNum: 1
    });
}

export default async function wxAuth(ctx) {
    if (ctx.isClient) {
        //如果URL中是带TOKEN的，先把TOKEN放到LOCALSTORAGE中
        handleClientUrlToken();
        //执行前端的授权检验与授权流程
        await handleClientAuth(ctx);
        await updateVisit();
    }
}
