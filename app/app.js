'use strict';

angular.module('myApp', [
      'ngRoute',
      'myApp.version'
    ]).
    config(['$routeProvider', function($routeProvider) {
    }])
    .service("editorService", function(){
        var mention = {
            users: ['npcode', 'changsung', 'doortts'],
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
    .controller('EditorCtrl', ['$scope', 'editorService', function($scope, editorService){
        $scope.mention = {
            users: editorService.users(),
            issues: editorService.issues()
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
            controller: function($scope, editorService){
                $scope.editor = $scope.contents;
                $scope.defaultMentionUsers = editorService.users();
                $scope.defaultMentionIssues = editorService.issues();
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
