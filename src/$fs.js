var asyncFns = [
    'access', 'appendFile', 'chmod', 'chown', 'close', 'exists',
    'fchmod', 'fchown', 'fdatasync', 'fstat', 'fsync', 'ftruncate', 'futimes',
    'lchmod', 'lchown', 'link', 'lstat',
    'mkdir', 'mkdtmp',
    'open', 'read', 'readdir', 'readFile', 'readlink', 'realpath', 'rename', 'rmdir',
    'stat', 'symlink', 'truncate', 'unlink', 'utimes', 'write', 'writeFile'
];

module.exports = function(fs, $promise){
    var $fs = Object.create(fs);

    asyncFns.forEach(n => {
        $fs[n] = function (...args) {
            return $promise((resolve, reject) => {
                args.push(function (err, data) {
                    if (err){
                        reject(err);
                    }else{
                        resolve(data);
                    }
                });
                fs[n].apply(null, args);
            });
        };
    });

    return $fs;
};
