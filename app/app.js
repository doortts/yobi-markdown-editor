'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
      'ngRoute',
      'myApp.version'
    ]).
    config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/view1'});
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
        $scope.user =  editorService.users();
        $scope.issueMention = editorService.issues();
        $scope.getUsers = function(){
            return editorService.users();
        }
        $scope.mention = {
            users: editorService.users(),
            issues: editorService.issues()
        }
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
                issueMention: "&"
            },
            compile: function(element, attrs){
                if (!attrs.method){
                    attrs.method = "POST";
                }
            }
        });

        function link( scope, element, attributes) {
            var editorContents = $(element).find('.editor-contents');
            if(scope.mentions && scope.mentions.indexOf('@') > -1){
                editorContents.atwho({
                    at: "@",
                    data: scope.userMention()
                })
            }
            if(scope.mentions && scope.mentions.indexOf('#') > -1){
                editorContents.atwho({
                    at: "#",
                    data: scope.issueMention()
                })
            }
        }
    });
