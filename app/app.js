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
        $scope.getUsers = function(){
            return editorService.users();
        };
        $scope.getIssues = function () {
            return editorService.issues();
        }
    }])
    .directive('yobiEditor', function(){
        // Return the directive configuration.

        return ({
            link: link,
            templateUrl: "editor.html",
            restrict: 'E',
            scope: {
                editor: '=',
                usermention: '=',
                issuemention: '='
            }
        });

        function link( scope, element, attributes ) {
            console.log('hello', scope.usermention, 'go');
            $(element).find('.editor-contents').atwho({
                at: "@",
                data: scope.usermention
            }).atwho({
                at: "#",
                data: scope.issuemention
            });
        }
    });
