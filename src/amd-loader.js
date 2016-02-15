/**
 * Created by shi.pengyan on 2016-01-14.
 */

//只定义模块
var define = function (id, deps, factory) {
    switch (arguments.length) {
        case 1: //define({}); define(function(){});
            factory = id;
            id = deps = undefined;
            break;
        case 2: //define('', function(){});define(['./a','./b'], function(){});
            if (isString(id)) {
                factory = deps;
                deps = undefined;
            } else if (isArray(id)) {
                factory = deps;
                deps = id;
                id = undefined;
            }
            break;
    }

    newModules.push(new Module(id, deps, factory));
};

//require 是加载js的开始
//https://github.com/amdjs/amdjs-api/blob/master/require.md
var require = function (deps, factory) {
    if (isString(deps)) {
        //require(string)，类似CMD写法
        var module = getCacheModule(resolveUrl(deps));
        if (module) {
            return module.exportValue;
        } else {
            console.error(deps, '模块还没有加载~~~~');
        }
    } else if (isArray(deps)) {
        //require(Array,function);
        define(getModuleId('require-'), deps, factory);
        resolveDeps(deps);
    }
};


//plugin


//解析data-main

define.amd = true;


