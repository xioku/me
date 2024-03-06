// ==UserScript==
// @name         位置测试
// @namespace    sdo.xyz
// @version      0.0.2
// @description  try to take over the world!
// @author       You
// @match        *://ctjsoft.mrcrm.com/*
// @match        *://ctjsoft.mrcrm.com/*?*
// @match        *://kqdk.ctjsoft.com/*
// @match        *://*.ctjsoft.com/*
// @grant        none
// ==/UserScript==

// 代理获取位置
(function () {
    // 判断是否已经hook了地理定位方法
    if (!window.is_geo_hooked) {
        // 保存原始方法
        navigator.geolocation.oriGetCurrentPosition = navigator.geolocation.getCurrentPosition;
        navigator.geolocation.oriWatchPosition = navigator.geolocation.watchPosition;
        window.is_geo_hooked = true;
    }
    // 修改getCurrentPosition方法
    navigator.geolocation.getCurrentPosition = function (successCallback, errorCallback, options) {
        // 调用原始方法并修改返回位置
        navigator.geolocation.oriGetCurrentPosition(function (position) {
            modifyPosition(position, successCallback);
        }, errorCallback, options);
    };
    // 修改watchPosition方法
    navigator.geolocation.watchPosition = function (successCallback, errorCallback, options) {
        // 调用原始方法并修改返回位置
        navigator.geolocation.oriWatchPosition(function (position) {
            modifyPosition(position, successCallback);
        }, errorCallback, options);
    };
    // 修改位置信息
    function modifyPosition(position, callback) {
        const baseLatitude = 34.784473;
        const baseLongitude = 113.686359;
        // 计算偏移量
        const offset = 1e-9; // 偏移量调整
        const randomOffset1 = (Math.random() * 2 - 1) * offset;
        const randomOffset2 = (Math.random() * 2 - 1) * offset;
        // 构造新的位置对象
        const pos = {
            timestamp: position.timestamp,
            coords: {
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude,
                altitudeAccuracy: position.coords.altitudeAccuracy,
                heading: position.coords.heading,
                latitude: baseLatitude + randomOffset1,
                longitude: baseLongitude + randomOffset2,
                speed: position.coords.speed
            }
        };
        // 调用回调函数
        callback(pos);
    }
})();
