// yobiEditor module
(function() {
    'use strict';
    angular.module('yobi.editor', []);

    angular.module('yobi.editor').MODULE_ROOT_PATH =
        (function(){
            var scripts = document.getElementsByTagName("script")
            var currentScriptPath = scripts[scripts.length-1].src;
            var fileName = currentScriptPath.substring(currentScriptPath.lastIndexOf('/'));
            return currentScriptPath.replace(fileName, '');
        })();
})();
