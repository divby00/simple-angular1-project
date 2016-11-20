angular
.module('appname.about.controller', [])
.controller('aboutController', aboutController);

aboutController.$inject = ['$scope'];

function aboutController($scope) {
    var vm = this;
    vm.message = 'This is the about section';
}