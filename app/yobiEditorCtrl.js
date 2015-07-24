'use strict';

angular
    .module('yobi', [])
    .controller('yobiEditorCtrl', ['$scope', 'editorService', yobiEditorCtrl])

function yobiEditorCtrl($scope, editorService){
    $scope.mention = {
        users: editorService.users(),
        issues: editorService.issues()
    };
}
