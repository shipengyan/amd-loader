/**
 * 请求JS文件
 * Created by shi.pengyan on 2016-01-15.
 */

var header = document.getElementsByTagName('head')[0];
/**
 * 加载JS
 * @param url JS文件
 */
function requestScript(url) {
    var script = document.createElement('script');
    script.async = true;
    script.charset = 'utf-8';

    var beforeLength = newModules.length;

    script.onerror = function (e) {
        console.error('load', url, 'fail!');
    };
    //w3c and ie
    script.onload = script.onreadystatechange = function (e) {
        //log('script', url, ' state is ', script.readyState);

        // WIN7 IE 64bit IE11 in blow
        //IE7,8  loading-->loaded
        //IE9    loading-->loaded-->loaded // 客户端浏览器问题？
        //IE10   loading-->complete-->loaded
        //W3C(Edge) undefined
        if (typeof script.readyState !== undefined && /^(complete|loading)$/.test(script.readyState)) {
            log('script is not ready, please wait');
            return;
        }
        //if (script.ok) { //fix ie9
        //    return;
        //}
        //script.ok = true;

        script.onload = script.onreadystatechange = null;

        //log('script begin.');

        //上面script 内容已经执行了define函数

        //找到最新加载的那个module
        // 一个js文件一个define
        // 一个js文件多个define //TODO //requireJS中不执行第一个之后的define(只有真正需要模块时才会解决自身的依赖)
        //如果是在首页index.html上，define，require都是在一起的话，是不是存在bug？啊，就是BUG //TODO

        for (; beforeLength < newModules.length; beforeLength++) {
            var module = newModules[beforeLength];
            if (!module.id) {
                module.id = url;
            }
            if (cacheModules[url]) {
                var cache = cacheModules[url];
                if (!isArray(cache)) {
                    var prevModule = cache;
                    cache = [prevModule];
                }
                cache.push(module);
                cacheModules[url] = cache;
            } else {
                cacheModules[url] = module; //如果有id,则id和url同时指向一个模块（这里不推荐使用模块id了）
            }

            module.state = 'LOADED';
            module.resolveDeps();

            //遍历newModules，这就是我们要解决的模块依赖
            resolveExport();
            //log('script end.');
        }
    };
    script.src = url;
    header.appendChild(script);
}