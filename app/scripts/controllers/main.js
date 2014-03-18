'use strict';

angular.module('projectGluApp')
  .controller('MainCtrl', function ($scope, $http, $filter, $timeout) {

    function update() {
      $http.get('/api/entries').success(function(entries) {
        $scope.current = _.head(entries);
        $scope.entries = _.tail(entries);
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
      'NOT COMPUTABLE': '-',
      'RATE OUT OF RANGE': '&#8622;'
    };

    var dateFilter = $filter('date');

    $scope.ago = function() {
     if ($scope.current) {
        var now = Date.now();
        var mostCurrent = new Date($scope.current.timestamp).getTime()
        console.info('Date.now()', now);
        console.info('$scope.current.timestamp', mostCurrent);
        return (now - mostCurrent)/1000;
      } else return 0;
    };

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

  }).filter("timeago", function () {
    //time: the time
    //local: compared to what time? default: now
    //raw: wheter you want in a format of "5 minutes ago", or "5 minutes"
    return function (offset) {
      var
        span = [],
        MINUTE = 60,
        HOUR = 3600,
        DAY = 86400,
        WEEK = 604800,
        MONTH = 2629744,
        YEAR = 31556926,
        DECADE = 315569260;

      if (offset <= MINUTE)              span = [ 'now', '' ];
      else if (offset < (MINUTE * 60))   span = [ Math.round(Math.abs(offset / MINUTE)), 'min' ];
      else if (offset < (HOUR * 24))     span = [ Math.round(Math.abs(offset / HOUR)), 'hr' ];
      else if (offset < (DAY * 7))       span = [ Math.round(Math.abs(offset / DAY)), 'day' ];
      else if (offset < (WEEK * 52))     span = [ Math.round(Math.abs(offset / WEEK)), 'week' ];
      else if (offset < (YEAR * 10))     span = [ Math.round(Math.abs(offset / YEAR)), 'year' ];
      else if (offset < (DECADE * 100))  span = [ Math.round(Math.abs(offset / DECADE)), 'decade' ];
      else                               span = [ '', 'a long time' ];

      if (span[1])
       return span.join(' ')  + ' ago';
      else
        return span[0]

    }
  })
;
