// ==UserScript==
// @name         位置测试
// @namespace    sdo.xyz
// @version      0.0.1
// @description  try to take over the world!
// @author       You
// @match        *://ctjsoft.mrcrm.com/*
// @match        *://ctjsoft.mrcrm.com/*?*
// @require      https://unpkg.com/ajax-hook@2.0.3/dist/ajaxhook.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("脚本生效中...");
    function replacePV(url,name,value) {
        var oUrl = url;
        var re=eval('/('+name+'=)([^&]*)/gi');
        var nUrl = oUrl.replace(re,name+'='+value);
        return nUrl;
    }
    ah.proxy({
        //请求发起前进入
        onRequest: (config, handler) => {
            var url = config.url;
            if (url.indexOf('location.action') >= 0) {
                var p = config.body;
                p = replacePV(p,'longitude','113.68627421602'+parseInt(Math.random()*1000));
                p = replacePV(p,'latitude','34.78460976085'+parseInt(Math.random()*1000));
                p = replacePV(p,'accuracy',((Math.random()*50+50)+'').substring(0,4));
                config.body = p;
            }
            handler.next(config);
        },
        //请求成功后进入
        onResponse: (response, handler) => {
            var url = response.config.url;
            if (url.indexOf('location.action') >= 0) {
                var loc = JSON.parse(response.response);
                loc.name = '郑州市金水区经三路 在财富广场附近';
                response.response = JSON.stringify(loc);
            }
            handler.next(response);
        }
    });
})();
