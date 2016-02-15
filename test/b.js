/**
 * Created by shi.pengyan on 2016-01-13.
 */
define('b', ['./c'], function (c) {
    console.log('b module execute');
    c.load();

    return 'this is  b module';
});