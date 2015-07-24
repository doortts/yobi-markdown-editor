(function() {
    'use strict';

    angular
        .module('yobi')
        .controller('yobiEditorCtrl', ['$scope', 'yobiEditorSvc', yobiEditorCtrl])

    function yobiEditorCtrl($scope, yobiEditorSvc) {
        $scope.mention = {
            users: yobiEditorSvc.users(),
            issues: yobiEditorSvc.issues()
        };
    }
})();
