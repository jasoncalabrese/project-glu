'use strict';

angular.module('projectGluApp')
  .controller('MainCtrl', function ($scope, $http) {

    function update() {
      $http.get('/api/entries').success(function(entries) {
        $scope.entries = entries;
      });
    }

    update();

  });
