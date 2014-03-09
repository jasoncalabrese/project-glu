'use strict';

angular.module('projectGluApp')
  .controller('MainCtrl', function ($scope, $http) {

    function update() {
      $http.get('/api/entries').success(function(entries) {
        $scope.entries = entries;
      });
    }

    update();

    var mapping = {
      'NONE': '&#8700;',
      'DoubleUp': '&#8648;',
      'SingleUp': '&#8593;',
      'FortyFiveUp': '&#8599;',
      'Flat': '&#8594;',
      'FortyFiveDown': '&#8600;',
      'SingleDown': '&#8595;',
      'DoubleDown': '&#8650;',
      'NOT COMPUTABLE': '&#10568;',
      'RATE OUT OF RANGE': '&#8622;'
    };

    $scope.directionToChar = function(direction) {
      return mapping[direction];
    };

  });
