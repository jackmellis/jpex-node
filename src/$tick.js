module.exports = function () {
    return function (cb) {
        return process.nextTick(cb);
    };
};
