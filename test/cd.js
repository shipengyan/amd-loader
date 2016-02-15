/**
 * Created by shi.pengyan on 2016-01-15.
 */
define('cd', function () {
    console.log('cd module execute');
    var a = require('./a');

    a.log();

});

console.log(newModules.length);

//这些模块factory不应该执行
define('cd2', function () {
    console.log('cd2 module execute');
});

console.log(newModules.length);
define(function () {
    console.log('cd3 module execute');
});


console.log(newModules.length);
define(function(){
    console.log('cd4 module execute');
});