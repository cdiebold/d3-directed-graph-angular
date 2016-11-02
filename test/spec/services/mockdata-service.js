'use strict';

describe('Service: MockDataService', function () {

  // load the service's module
  beforeEach(module('directedGraphApp'));

  // instantiate service
  var MockDataService;
  beforeEach(inject(function (_MockDataService_) {
    MockDataService = _MockDataService_;
  }));

  it('should do something', function () {
    expect(!!MockDataService).toBe(true);
  });

});
