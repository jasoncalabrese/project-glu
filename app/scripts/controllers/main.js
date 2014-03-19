'use strict';

angular.module('projectGluApp')
  .controller('MainCtrl', function ($scope, $http, visibility, $filter, $timeout) {

    var pageIsHidden = false;

    function update() {
      if (pageIsHidden) {
        console.info('Not updating, since page is hidden');
      } else {
        console.info('Updating, since page is visible');
        $http.get('/api/entries').success(function(entries) {
          $scope.current = _.head(entries);
          $scope.entries = _.tail(entries);
          $scope.lastDay = '';
        });
      }
    }

    $scope.$on('visibilityChanged', function(event, isHidden) {
      console.info('changed pageIsHidden to ' + isHidden);
      pageIsHidden = isHidden;
      if (!pageIsHidden) update();
    });

    function startUpdateCycle() {
      update();
      $timeout(startUpdateCycle, 20 * 1000);
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
        var mostCurrent = new Date($scope.current.timestamp).getTime();
        return (now - mostCurrent) / 1000;
      } else {
        return 0;
      }
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

  }).filter('timeago', function () {
    return function (offset) {
      var
        span = [],
        MINUTE = 60,
        HOUR = 3600,
        DAY = 86400,
        WEEK = 604800;

      if (offset <= MINUTE)              span = [ 'now', '' ];
      else if (offset < (MINUTE * 60))   span = [ Math.round(Math.abs(offset / MINUTE)), 'min' ];
      else if (offset < (HOUR * 24))     span = [ Math.round(Math.abs(offset / HOUR)), 'hr' ];
      else if (offset < (DAY * 7))       span = [ Math.round(Math.abs(offset / DAY)), 'day' ];
      else if (offset < (WEEK * 52))     span = [ Math.round(Math.abs(offset / WEEK)), 'week' ];
      else                               span = [ 'a long time', '' ];

      if (span[1])
        return span.join(' ')  + ' ago';
      else
        return span[0];

    };
  }).service('visibility', function visibility($rootScope) {
    function visibilityChanged() {
      $rootScope.$broadcast('visibilityChanged', !!(document.hidden || document.webkitHidden || document.mozHidden || document.msHidden));
    }

    //document.addEventListener('visibilitychange', visibilityChanged);
    document.addEventListener('webkitvisibilitychange', visibilityChanged);
    //document.addEventListener('msvisibilitychange', visibilityChanged);
  })
;
