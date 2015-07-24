'use strict';

angular.module('yobi', [])
    .service("yobiEditorSvc", function(){
        var mention = {
            users: ['James Gordon', 'Selina Kyle', 'Bruce Wayne', 'Alfred Pennyworth', 'Barbara Gordon'],
            issues: ["#1. 첫번째 이슈", "#2. 두번째 이슈", "#3. 세번째 이슈"]
        }
        return {
            users: function(){
                return mention.users;
            },
            issues: function(){
                return mention.issues;
            }
        }
    })
    .controller('yobiEditorCtrl', ['$scope', 'yobiEditorSvc', function($scope, yobiEditorSvc){
        $scope.mention = {
            users: yobiEditorSvc.users(),
            issues: yobiEditorSvc.issues()
        };
    }])
    .directive('yobiEditor', function(){
        return ({
            link: link,
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
            controller: function($scope, yobiEditorSvc){
                $scope.editor = $scope.contents;
                $scope.defaultMentionUsers = yobiEditorSvc.users();
                $scope.defaultMentionIssues = yobiEditorSvc.issues();
            }
        });

        function link(scope, element, attributes) {
            if (!attributes.method){
                attributes.method = "POST";
            }
            var editorContents = $(element).find('.editor-contents');
            if(scope.mentions && scope.mentions.indexOf('@') > -1){
                editorContents.atwho({
                    at: "@",
                    data: scope.userMention() || scope.defaultMentionUsers
                })
            }
            if(scope.mentions && scope.mentions.indexOf('#') > -1){
                editorContents.atwho({
                    at: "#",
                    data: scope.issueMention() || scope.defaultMentionIssues
                })
            }
        }
    });
