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
            scope.renderMarkdownText = renderMarkdownText;
            scope.showPreview = showPreview;

            _attachHidePreviewEventAtDocumentClick();
            _setFormMethodToPostIfUndefined(attributes);
            _attachMentions(scope);

            ///////////////////////////////////////////
            // private functions are from here..
            //////////////////////////////////////////
            /**
             * attach hide event when user click document
             * @private
             */
            function _attachHidePreviewEventAtDocumentClick() {
                $(document).off("click.hide-preview");
                $(document).on("click.hide-preview", function() {
                    $(".rendered-preview").hide();
                });
            }

            function showPreview(){
                var otherPreviews = $(".rendered-preview");
                var preview = $(element).find(".rendered-preview");

                otherPreviews.hide();
                preview.addClass("preview-background");
                preview.fadeIn(100);
                preview.on("click", function(event) {
                    event.stopPropagation();
                });
            }

            function renderMarkdownText(){
                var text = $(element).find('.editor-contents').val();
                var renderedPreview = $(element).find('.rendered-preview');
                renderedPreview.html(marked(text));
                showPreview();
            }

            function _setFormMethodToPostIfUndefined(attributes) {
                if (!attributes.method) {
                    attributes.method = "POST";
                }
            }

            function _attachMentions(scope) {
                var mentionChar = {
                    user: "@",
                    issue: "#"
                };

                var editorContents = $(element).find('.editor-contents');

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
            }

            function _isMentionAllowed(char) {
                return scope.mentions && scope.mentions.indexOf(char) > -1;
            }
        }
    }
})();
