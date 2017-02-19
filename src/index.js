var $fs = require('./$fs');
var $tick = require('./$tick');
var nodemodule = require('./nodemodule');

module.exports = {
    install : function ({Jpex, on}) {
        if (!Jpex.$$factories.$promise){
            var defaults = require('jpex-defaults');
            Jpex.use(defaults);
        }

        Jpex.register.factory('$fs', ['fs', '$promise'], $fs).lifecycle.class();

        Jpex.register.factory('$tick', [], $tick).lifecycle.application();

        Jpex.register.node_module = nodemodule.bind(Jpex);

        on('factories', function ({register}) {
            register('node_module', nodemodule);
        });
    }
};

if (typeof window !== 'undefined' && window.Jpex && typeof window.Jpex.use === 'function'){
    window.Jpex.use(exports);
}
