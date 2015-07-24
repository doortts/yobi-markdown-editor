(function() {
    'use strict';

    angular
        .module('yobi')
        .service("yobiEditorSvc", yobiEditorSvc);

    function yobiEditorSvc() {
        var mention = {
            users: ['James Gordon', 'Selina Kyle', 'Bruce Wayne', 'Alfred Pennyworth', 'Barbara Gordon'],
            issues: ["#1. 첫번째 이슈", "#2. 두번째 이슈", "#3. 세번째 이슈"]
        }
        return {
            users: function () {
                return mention.users;
            },
            issues: function () {
                return mention.issues;
            }
        }
    }
})();
