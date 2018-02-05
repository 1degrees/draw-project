import axios from 'axios';
/**
 * 获取缓存 
 * @param {*} key 
 */
export function getStorage(key) {
    let storage = sessionStorage.getItem(key);
    let expireAt = sessionStorage.getItem(key + '-expire');
    let now = (new Date()).valueOf();
    if (expireAt && Number(expireAt) <= now) {
        sessionStorage.removeItem(key);
        sessionStorage.removeItem(key + '-expire');
        return;
    }
    return storage && JSON.parse(storage);
}

/**
 * 设置缓存
 * @param {*} key 
 * @param {*} val 
 * @param {*} expire 按秒算
 */
export function setStorage(key, val, expire) {
    const now = (new Date()).valueOf();
    let expireAt = now + 1800 * 1000; //半小时
    if (expire) {
        expireAt = now + 1000 * expire;
    }
    sessionStorage.setItem(key + '-expire', expireAt);
    sessionStorage.setItem(key, JSON.stringify(val));
}

/**
 * HTTP GET with catch
 * @param {*} url 请求参数
 * @param {*} params 请求参数
 * @param {*} expires 缓存时间(单位秒) ，默认1800s
 */
export async function sxGetC(url, params, expires = 1800) {
    try {
        let key = url + JSON.stringify(params || {});
        let storageData = getStorage(key);
        if (storageData) {
            return storageData;
        }
        let result = await sxGet(url, params);
        if (result.data.isSuccess) {
            setStorage(key, result, expires);
        }
        return result;
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}

/**
 * HTTP GET without cache
 * @param {*} url 
 * @param {*} params 
 */
export async function sxGet(url, params) {
    try {
        return await axios.get(url, {
            params
        });
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}

/**
 * HTTP POST
 * @param {*} url 
 * @param {*} data 
 */
export async function sxPost(url, data) {
    try {
        return await axios.post(url, data);
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}

/**
 * HTTP PUT
 * @param {*} url 
 * @param {*} data 
 */
export async function sxPut(url, data) {
    try {
        return await axios.put(url, data);
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}

/**
 * HTTP DELETE
 * @param {*} url 
 * @param {*} params 
 */
export async function sxDelete(url, params) {
    try {
        return await axios.delete(url, {
            params
        });
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}

/**
 * HTTP PATCH
 * @param {*} url 
 * @param {*} data 
 */
export async function sxPatch(url, data) {
    try {
        return await axios.patch(url, data);
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}


export async function sxHttp(options) {
    try {
        return await axios(options);
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}

export async function sxHttpC(options, expire = 1800) {
    try {
        let key = options.url + JSON.stringify(options.params || {});
        if (getStorage(key)) {
            return getStorage(key);
        }
        if (lower(options.method) === 'get') {
            let result = await axios(options);
            if (result.data.isSuccess) {
                setStorage(key, result, expire);
            }
            return result;
        } else {
            return await axios(options);
        }
    } catch (ex) {
        console.error(ex);
        throw ex;
    }
}

function lower(str = '') {
    return str.toLocaleLowerCase();
}
