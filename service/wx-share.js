//import '../lib/jweixin-1.2.0'
let inited = false;
import {
    sxGet,
    sxGetC,
    sxHttpC
} from '../service/http.js';


//默认的微信权限配置信息，这个信息一般情况下程序不会修改
const defaultConfigData = {
    debug: false,
    jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone'
    ]
};

//默认的分享数据
const defaultShareData = {
    title: '新年到，摇一摇，摇出新春好运道！',
    desc: '我是【%name%】，祝亲朋好友“旺”事如意！来领取你的新年祝福吧~'
};

/**
 * 取得localStorage 中的token
 */
function getToken() {
    const tokenInfo = JSON.parse(window.localStorage.getItem('token'));
    return tokenInfo && tokenInfo.token;
}

/**
 * 取得appId , openId等 信息
 */
function getAppInfo() {
    return new Promise(async (resolve, reject) => {
        const token = getToken();
        if (!token) {
            reject('token invalid!');
        }

        try {
            const res = await sxHttpC({
                url: '/wxb/user/getToken',
                params: {
                    token
                },
                headers: {
                    token
                }
            });
            if (res.data.isSuccess) {
                resolve(res.data.data);
            }
        } catch (error) {
            reject(error.message);
        }
    })
}

async function getUserInfo(appId, openid) {
    return new Promise(async (resolve, reject) => {
        try {
            const token = getToken();
            const res = await sxHttpC({
                method: 'post',
                url: '/wxb/user/init',
                data: {
                    appId,
                    openid
                },
                headers: {
                    token
                }
            });
            if (res.data.isSuccess) {
                resolve(res.data.data);
            }
        } catch (error) {
            reject(error.message);
        }
    });
}


function wxReady(data) {
    wx.config(data);    

    return new Promise((resolve, reject) => {
        wx.ready(() => resolve());
        wx.error((res) => {
            if (res.errMsg !== 'config:ok') {
                reject(res)
            }
        });
    });
}

async function getSignature(appId, url) {
    let href = url || window.location.href;
    try {
        const res = await sxGetC('/wxb/api/linkShare', {
            appId: appId,
            url: href
        });

        if (res.data.isSuccess) {
            return res.data.data;
        } else {
            throw new Error(res.data.data || res.data.message);
        }

    } catch (ex) {
        throw ex;
    }
}


/**
 * 生成微信签名，并行等待微信状态为ready
 */
async function signatureWeixin(url) {
    const appInfo = await getAppInfo();
    try {
        const signatureInfo = await getSignature(appInfo.appId, url);
        await wxReady({
            ...defaultConfigData,
            ...signatureInfo
        });

        console.log('signatureWeixin successed');
        return true;
    } catch (err) {
        throw err;
    }
}

/**
 * 配置微信分享信息
 * @param {*} shareData 分享设置数据
 */
async function configShare(shareData = {}) {
    const base = window.location.href.match(/^(https?:\/\/[^\/]+)/)[1];

    const appInfo = await getAppInfo();
    const userInfo = await getUserInfo(appInfo.appId, appInfo.openid);
    let desc = (shareData && shareData.desc) || defaultShareData.desc;
    const data = {
        ...defaultShareData,
        link: base + '/draw',
        imgUrl: base + '/draw/static/img/share.jpg',
        ...shareData,
        desc: desc.replace(/%name%/, userInfo.name),
        success() {
            sxGet('/wxb/api/active/plusOne', {
                shareNum: 1
            });
        }
    };
    wx.onMenuShareAppMessage(data);
    wx.onMenuShareTimeline({
        ...data,
        title:data.desc
    });
    wx.onMenuShareQQ(data);
    wx.onMenuShareWeibo(data);
    wx.onMenuShareQZone(data);

    console.log('configShare successed');
}

/**
 * 对外开放的分享更新接口
 * @param {*} shareData 分享数据
 */
export async function updateShare(shareData = {}) {
    try {
        return await configShare(shareData);
    } catch (ex) {
        alert(ex.message);
    }
}

/**
 * 微信分享中间件入口 
 */
export async function wxShare() {
    try {
        await signatureWeixin();
        return await configShare();
    } catch (ex) {
        if (ex !== 'timeout' && !/wechatdevtools/.test(navigator.appVersion)) {
            alert(`wx share :${ex.message || ex.errMsg || ex}`);
        }
        console.error(ex);
    }
}
