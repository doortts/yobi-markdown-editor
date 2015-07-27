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
            };

            var editorContents = $(element).find('.editor-contents');

            scope.renderMarkdownText = function(){
                var text = $(element).find('.editor-contents').val();
                var renderedPreview = $(element).find('.rendered-preview');
                renderedPreview.html(marked(text));
            };

            // attach user mention data if allowed
            if (_isMentionAllowed(mentionChar.user)) {
                editorContents.atwho({
                    at: mentionChar.user,
                    data: scope.mentionUsers() || scope.defaultMentionUsers
                });
            }

            // attach issue mention data if allowed
            if (_isMentionAllowed(mentionChar.issue)) {
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

            function _isMentionAllowed(char) {
                return scope.mentions && scope.mentions.indexOf(char) > -1;
            }
        }
    }
})();
