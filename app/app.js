'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
      'ngRoute',
      'myApp.version'
    ]).
    config(['$routeProvider', function($routeProvider) {
    }])
    .controller('EditorCtrl', ['$scope', function($scope){
        $scope.mention = {
            users: ['npcode', 'changsung', 'doortts'],
            issues: ["#1. 첫번째 이슈", "#2. 두번째 이슈", "#3. 세번째 이슈"]
        }
    }])
    .directive('yobiEditor', function(){
        return ({
            link: link,
            templateUrl: "editor.html",
            restrict: 'E',
            scope: true
        });
        function link( scope, element, attributes ) {
            $(element).find('.editor-contents').atwho({
                at: "@",
                data: scope.mention.users
            }).atwho({
                at: "#",
                data: scope.mention.issues
            });
        }
    });
