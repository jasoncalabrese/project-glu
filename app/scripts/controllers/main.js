'use strict';

angular.module('projectGluApp')
  .controller('MainCtrl', function ($scope, $http, $filter, $timeout) {

    function update() {
      $http.get('/api/entries').success(function(entries) {
        $scope.entries = entries;
        $scope.lastDay = '';
      });
    }

    function startUpdateCycle() {
      update();
      $timeout(startUpdateCycle, 5 * 60 * 100);
    }

    startUpdateCycle();

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

    var dateFilter = $filter('date');

    $scope.showDay = function(entry) {
      $scope.currentDay = dateFilter(entry.timestamp);

      if ($scope.currentDay !== $scope.lastDay) {
        console.info('compared "' + $scope.currentDay + '" to "' + $scope.lastDay);
        $scope.lastDay = $scope.currentDay;
        return true;
      } else {
        return false;
      }

    };

    $scope.directionToChar = function(direction) {
      return mapping[direction];
    };

  });
