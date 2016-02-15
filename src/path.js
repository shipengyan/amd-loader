/**
 * 解析path使用
 * Created by shi.pengyan on 2016-01-15.
 */

function resolveUrl(url) {

    // 内置模块
    if (url.charAt(0) !== '.') {
        return cacheModules[url]; // url 就是module id
    }

    // 相对模块，转换成相对于baseUrl的路径
    //var index1 = url.indexOf('./'), index2 = url.indexOf('../');
    if (url.lastIndexOf('.js') === (url.length - 3)) {
        return url;
    }

    return url + '.js';//暂时先这么处理
}
