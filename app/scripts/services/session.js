'use strict';

angular.module('projectGluApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
