(function() {
    'use strict';

    angular
        .module('yobi.editor')
        .directive('yobiEditor', yobiEditor);

    function yobiEditor() {
        var MODULE_ROOT_PATH = angular.module('yobi.editor').MODULE_ROOT_PATH;
        return ({
            link: _link,
            templateUrl: MODULE_ROOT_PATH + "/editor.html",
            restrict: 'E',
            scope: {
                mentions: "@",
                action: "@",
                method: "@",
                mentionUsers: "&",
                mentionIssues: "&",
                contents: "="
            },
            controller: ['$scope', 'yobiEditorSvc', _controller]
        });

        function _controller($scope, yobiEditorSvc) {
            $scope.defaultMentionUsers = yobiEditorSvc.fallbackUsers;
            $scope.defaultMentionIssues = yobiEditorSvc.issues();
            $scope.MODULE_ROOT_PATH = MODULE_ROOT_PATH;
        }

        function _link(scope, element, attributes) {
            _setFormMethodToPostIfUndefined();

            var mentionChar = {
                user: "@",
                issue: "#"
            }

            var editorContents = $(element).find('.editor-contents');

            if (_isUserMentionAllowed()) {
                editorContents.atwho({
                    at: mentionChar.user,
                    data: scope.mentionUsers() || scope.defaultMentionUsers
                });
            }

            if (_isIssueMentionAllowed()) {
                editorContents.atwho({
                    at: mentionChar.issue,
                    data: scope.mentionIssues() || scope.defaultMentionIssues
                });
            }

            // private functions from here..
            function _setFormMethodToPostIfUndefined() {
                if (!attributes.method) {
                    attributes.method = "POST";
                }
            }

            function _isUserMentionAllowed() {
                return scope.mentions && scope.mentions.indexOf(mentionChar.user) > -1;
            }

            function _isIssueMentionAllowed() {
                return scope.mentions && scope.mentions.indexOf(mentionChar.issue) > -1;
            }
        }
    }
})();
