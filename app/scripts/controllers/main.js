'use strict';

angular.module('projectGluApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.directions = [
      "DoubleUp",
      "SingleUp",
      "FortyFiveUp",
      "Flat",
      "FortyFiveDown",
      "SingleDown",
      "DoubleDown"
    ];

    $scope.newentry = {};

    function update() {
      $http.get('/api/entries').success(function(entries) {
        $scope.entries = entries;
      });
    }

    update();

    $scope.addEntry = function() {
      $http.post('/api/entries', $scope.newentry).success(function() {
        console.info("post success");
        update();
      });
    };
  });
