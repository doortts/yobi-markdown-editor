'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
      'ngRoute',
      'myApp.version'
    ]).
    config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/view1'});
    }])
    .controller('EditorCtrl', ['$scope', function($scope){
        $scope.john = { title: "John Bill"};
    }])
    .directive('yobiEditor',function(){
        // Return the directive configuration.
        return ({
            link: link,
            templateUrl: "editor.html",
            restrict: 'E',
            scope: {
                editor: '='
            }
        });

        function link( scope, element, attributes ) {
            $(function(){
                $('.editor-contents').atwho({
                    at: "@",
                    data:['npcode', 'changsung', 'doortts']
                }).atwho({
                    at: "#",
                    data: ["#1. 첫번째 이슈", "#2. 두번째 이슈", "#3. 세번째 이슈"]
                });
            });
        }
    });
