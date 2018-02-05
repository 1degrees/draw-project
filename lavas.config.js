/**
 * @file lavas config
 * @author 梁灿伦(liangcl@nsw88.com)
 */


'use strict';

const BaseConfig = require('./lavas.config.base');

let testConfg = BaseConfig('dist_d', '/draw/', {
    ROOT_URL: JSON.stringify('http://localhost:3000/draw')
});

module.exports = testConfg;