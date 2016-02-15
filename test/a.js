/**
 * Created by shi.pengyan on 2016-01-13.
 */

console.log('a before define');

define('a', [], function () {
    var tag = 'a module';
    console.log(tag, 'execute');

    //require('b'); //这个地方就应该报错

    return {
        log: function () {
            console.log(tag, 'log method');
        }
    };
});