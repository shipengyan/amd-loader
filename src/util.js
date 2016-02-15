/**
 * 工具类
 * Created by shi.pengyan on 2016-01-15.
 */
function isString(obj) {
    return (typeof obj) === 'string';
}

function isArray(obj) {
    return Object.prototype.toString.call(obj) == "[object Array]";
}

function isFunction(obj) {
    return Object.prototype.toString.call(obj) == '[object Function]';
}

var log = function () {
    console.log.apply(console, arguments);
};