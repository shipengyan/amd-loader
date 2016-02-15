/**
 * 加载器内部使用的模块对象
 * Created by shi.pengyan on 2016-01-15.
 */


var newModules = []; //define创建的
var cacheModules = {}; //已经加载缓存的模块key:moduleId,value:Moudle
var moduleCount = 0;

/**
 * 模块
 * @param id 模块ID，如果没有模块ID这使用全路径URL
 * @param deps 依赖数组
 * @param factory factory
 * @constructor
 */
var Module = function (id, deps, factory) {
    deps = deps || [];
    for (var i = 0; i < deps.length; i++) {
        var dep = deps[i];
        if (dep.indexOf('.') === 0) {
            deps[i] = resolveUrl(dep);
        }
    }

    this.id = id;
    this.url = null;
    this.deps = deps; //都是从baseUrl出发的地址
    this.factory = factory == null ? function () {
    } : factory;
    this.exportValue = null;
    this.state = 'INIT'; //INIT-->LOADED-->EXECUTED 这里的状态要比CMD中少了很多

    if (this.id) {
        if (getCacheModule(this.id)) {
            console.error('module name [', this.id, '] has already existed, please check.');
        } else {
            cacheModules[id] = this;
        }
    }
};

/**
 * 加载自身模块的依赖
 */
Module.prototype.resolveDeps = function () {
    var self = this;
    setTimeout(function () {
        resolveDeps(self.deps);
    }, 0);
};

/**
 * 判断这个模块的依赖是否已经都已经处理了
 * @returns {boolean}
 */
Module.prototype.isResolved = function () {
    for (var i = this.deps.length; i--;) {
        var module = getCacheModule(this.deps[i]);

        if (module == null) { //还未加载或者还在进行中
            return false;
        }
        if (module.isResolved()) {
            continue;
        } else {
            return false;
        }
    }
    return true;
};


/**
 * 解析依赖
 * @param deps ['./a','./b']
 * @param factory 回调函数
 */
function resolveDeps(deps) {
    for (var i = 0; i < deps.length; i++) {
        var dep = deps[i];
        var url = resolveUrl(dep);
        if (isString(url)) {
            requestScript(url);
        } else {
            var module = url;//内置模块，或是已经定义好的模块
            resolveDeps(module.deps);
        }
    }
}

//TODO 这里会导致所有的define模块被执行，
/**
 * 执行返回值
 */
function resolveExport() {
    var count = 1;//执行的次数,只要一个模块resovle了就需要重新震荡一次

    while (--count >= 0) {
        //一般最后加载的模块是没有依赖的 (从后面遍历更有效率)
        for (var i = newModules.length; i--;) {
            var module = newModules[i];
            if (module.isResolved()) {//如果这个模块被解决了，应该立马执行factory

                var args = [];
                for (var j = 0; j < module.deps.length; j++) {
                    args.push(getCacheModule(module.deps[j]).exportValue);
                }
                module.exportValue = module.factory.apply(undefined, args);
                module.state = 'EXECUTED';

                count++;
                newModules.splice(i, 1);//一个依赖已经解决了
                break;//TODO 效率有待提高
            }
        }
    }
}


/**
 * 设置模块ID
 * @param prefix
 * @returns {string}
 */
function getModuleId(prefix) {
    return prefix + '' + moduleCount++;//防止数值相加
}
/**
 *  获取当前缓存的模块
 * @param id 模块ID
 * @returns {*}
 */
function getCacheModule(id) {
    return cacheModules[id];
}