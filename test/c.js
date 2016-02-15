/**
 * Created by shi.pengyan on 2016-01-13.
 */
define('c', function () {
    console.log('c module execute');

    return {
        load: function () {
            require(['./cd']);
        }
    };
});