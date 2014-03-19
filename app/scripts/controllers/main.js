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

    var dir2Char = {
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

    var magicBGs = {
      0:  '??0', //None
      1:  '?SN', //SENSOR_NOT_ACTIVE
      2:  '??2', //MINIMAL_DEVIATION
      3:  '?NA', //NO_ANTENNA
      5:  '?NC', //SENSOR_NOT_CALIBRATED
      6:  '?CD', //COUNTS_DEVIATION
      7:  '??7', //?
      8:  '??8', //?
      9:  '?AD', //ABSOLUTE_DEVIATION
      10: '?PD', //POWER_DEVIATION
      12: '?RF' //BAD_RF
    }

    $scope.ago = function() {
      if ($scope.current) {
        var now = Date.now();
        var mostCurrent = new Date($scope.current.timestamp).getTime();
        return (now - mostCurrent) / 1000;
      } else {
        return 0;
      }
    };

    $scope.bgDisplay = function(entry) {
      var bg = (entry && parseInt(entry.bg)) || '';
      return magicBGs[bg] || bg;
    };

    $scope.bgClass = function(entry) {
      var bgClass, bg = (entry && parseInt(entry.bg)) || 0;

      if (bg > 180) bgClass = 'bg-high';
      else if (bg < 70) bgClass = 'bg-low';
      else bgClass = 'bg-in-range';

      return bgClass;
    };

    $scope.directionToChar = function(direction) {
      return dir2Char[direction] || '-';
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
