(function() {
    'use strict';

    angular
        .module('yobi.editor')
        .controller('yobiEditorCtrl', ['yobiEditorSvc', yobiEditorCtrl])

    function yobiEditorCtrl(yobiEditorSvc) {
        /* jshint validthis: true */
        var vm = this;
        vm.mention = {
            users: yobiEditorSvc.users(),
            issues: yobiEditorSvc.issues()
        };
    }
})();
