/**
 * 用于构建线上版本
 */
'use strict';

const BaseConfig = require('./lavas.config.base');

let testConfg = BaseConfig('dist_t', '/draw/', {
    ROOT_URL: JSON.stringify('http://wxbtest.nsw99.com/draw/')
});

module.exports = testConfg;
