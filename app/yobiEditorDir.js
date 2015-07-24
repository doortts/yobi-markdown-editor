'use strict';

angular
    .module('yobi', [])
    .directive('yobiEditor', yobiEditor);

function yobiEditor() {
    return ({
        link: _link,
        templateUrl: "editor.html",
        restrict: 'E',
        scope: {
            mentions: "@",
            action: "@",
            method: "@",
            userMention: "&",
            issueMention: "&",
            contents: "="
        },
        controller: _controller
    });

    function _controller($scope, editorSvc) {
        $scope.editor = $scope.contents;
        if(!editorSvc){
            console.log('editorService is required!')
        }
        $scope.defaultMentionUsers = editorSvc.users();
        $scope.defaultMentionIssues = editorSvc.issues();
    }

    function _link(scope, element, attributes) {
        _setDefaultFormMethod();

        var editorContents = $(element).find('.editor-contents');

        if (_isUserMentionAllowed()) {
            editorContents.atwho({
                at: "@",
                data: scope.userMention() || scope.defaultMentionUsers
            })
        }

        if (_isIssueMentionAllowed()) {
            editorContents.atwho({
                at: "#",
                data: scope.issueMention() || scope.defaultMentionIssues
            })
        }

        // private functions from here..
        function _setDefaultFormMethod() {
            if (!attributes.method) {
                attributes.method = "POST";
            }
        }

        function _isUserMentionAllowed() {
            return scope.mentions && scope.mentions.indexOf('@') > -1;
        }

        function _isIssueMentionAllowed() {
            return scope.mentions && scope.mentions.indexOf('#') > -1;
        }
    }
}
