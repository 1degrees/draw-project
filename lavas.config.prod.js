/**
 * 用于构建线上版本
 */

'use strict';

const BaseConfig = require('./lavas.config.base');

let testConfg = BaseConfig('dist', '/draw/', {
    ROOT_URL: JSON.stringify('https://chouqian.nswwap.com/draw')
});

module.exports = testConfg;
