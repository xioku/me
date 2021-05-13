// ==UserScript==
// @name         测试
// @namespace    http://sdo.xyz/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @match        *://*/*?*
// @require      https://unpkg.com/ajax-hook@2.0.3/dist/ajaxhook.min.js
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
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
                p = replacePV(p,'longitude','113.68627421602186')
                p = replacePV(p,'latitude','34.78460976085749')
                console.log(p);
                config.body = p;
            }
            handler.next(config);
        },
        //请求成功后进入
        onResponse: (response, handler) => {
            handler.next(response);
        }
    });
})();
