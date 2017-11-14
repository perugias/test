'use strict';
const Promise = require('es6-promise').polyfill();
if (!window.Promise) {
    window.Promise = Promise;
}

import axios from 'axios';
import objectAssign from 'object-assign';

export function saveCache(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getCache(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function clearCacheByKey(key) {
    localStorage.removeItem(key);
}

export function fetch(query) {
    let { url, options } = query;
    let headers = {}, body = options.data;

    if (options && options.method !== 'GET') {

        if (options.encode === false) {
            options.data = body
        } else {
            let params = typeof body == 'string' ? body : Object.keys(body).map(
                function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(body[k]) }
            ).join('&');
            options.data = params;
        }
    } else {
        options.params = body
    }

    let cancel;
    let optionConfig = {
        withCredentials: true,
        responseType: 'json',
        headers: {
            //'content-type': 'application/json' // 配置为该内容类型时，使之成为了复杂请求形式；即，跨域发起 POST 请求时，会导致二次请求？？所以，使用下面的
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    objectAssign(optionConfig, options);
    return axios(url, optionConfig)
        .then((response) => {
            if (response.data && response.data.errCode == 'LOGIN_IS_NOT') {
                localStorage.removeItem('userInfo')
                location.href = '/bz-admin/login'
                return
            } else {
                return response.data
            }
        })
        .catch(() => {
            return { errMsg: '请求异常，请重试', success: false }
        })
}
