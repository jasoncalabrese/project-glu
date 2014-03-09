'use strict';

describe('Controller: MessageCtrl', function () {

  // load the controller's module
  beforeEach(module('projectGluApp'));

  var MessageCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    MessageCtrl = $controller('MessageCtrl', {
      $scope: scope
    });
  }));

});
