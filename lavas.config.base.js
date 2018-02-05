/**
 * @file lavas config
 * @author 梁灿伦(liangcl@nsw88.com)
 */

'use strict';

const path = require('path');
const webpack = require('webpack');
const BUILD_PATH = path.resolve(__dirname, 'dist');
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

module.exports = function lavasConfigBase(buildPath, publicPath, defines) {
    publicPath = publicPath || '/draw/';
    buildPath = buildPath ? path.resolve(__dirname, buildPath) : BUILD_PATH;
    return {
        build: {
            ssr: true,
            path: buildPath,
            publicPath: publicPath,
            ssrCopy: isDev ? [] : [{
                    src: 'server.prod.js'
                },
                {
                    src: 'package.json'
                }
            ],
            extend(config, {
                type,
                env
            }) {
                //lavas 的defines有BUG，通过这里重写可以免去麻烦        
                config.plugins.unshift(
                    new webpack.DefinePlugin(defines)
                );
            }
        },
        router: {
            mode: 'history',
            base: publicPath,
            pageTransition: {
                type: 'fade',
                transitionClass: 'fade'
            }
        },
        serviceWorker: {
            swSrc: path.join(__dirname, 'core/service-worker.js'),
            swDest: path.join(BUILD_PATH, 'service-worker.js'),
            // swPath: '/custom_path/', // specify custom serveice worker file's path, default is publicPath
            globDirectory: BUILD_PATH,
            globPatterns: [
                '**/*.{html,js,css,eot,svg,ttf,woff}'
            ],
            globIgnores: [
                'sw-register.js',
                '**/*.map'
            ],
            appshellUrl: '/appshell',
            dontCacheBustUrlsMatching: /\.\w{8}\./
        },
        middleware: {
            all: [], // 同时运行在客户端和服务端
            client: ['nsw-auth', 'http-intercepter'], // 仅客户端
            server: [] // 仅服务端
        },
        proxyTable: {
            '/wxb/': {
                target: 'http://192.168.31.29:7777/',
                changeOrigin: true,
                pathRewrite: {
                    '^/wxb': '/'
                }
            },
            '/imagelib/': {
                target: 'http://wxbtest.51yxwz.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/imagelib': '/'
                }
            },
            '/wxresource/': {
                target: 'http://wx.qlogo.cn/',
                changeOrigin: true,
                pathRewrite: {
                    '^/wxresource': '/'
                }
            }
        },
        defines: {
            base: {

            },
            client: {
                // ROOT_URL: JSON.stringify('https://chouqian.nswwap.com/draw')
            },
            server: {}
        }
    };
}
//module.exports = ;
