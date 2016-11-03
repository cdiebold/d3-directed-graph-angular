'use strict';

/**
 * @ngdoc service
 * @name directedGraphApp.MockDataService
 * @description
 * # MockDataService
 * Service in the directedGraphApp.
 */
angular.module('directedGraphApp')
  .service('mockDataService', function () {
    this.mockData = function(){
      var data = {};

      data.node = [
        { id:'1234', name:'node1', group:1},
        { id:'5678', name:'node2', group:2},
        { id:'3210', name:'node3', group:3},
        { id:'0984', name:'node4', group:4}
      ];

      data.edge = [
        {source: 'node1', target: 'node2', name: 'type1'},
        {source: 'node1', target: 'node3', name: 'type2'},
        {source: 'node2', target: 'node2', name: 'type1'},
        {source: 'node3', target: 'node4', name: 'type4'}
      ];

      return data;
    };

    this.title = 'myTitle';
    this.uniqueLinks = ['type1', 'type2', 'type4'];

    // AngularJS will instantiate a singleton by calling "new" on this function
    //var data = createMockData();

  });


