'use strict';

/**
 * @ngdoc overview
 * @name directedGraphApp
 * @description
 * # directedGraphApp
 *
 * Main module of the application.
 */
var app = angular
  .module('directedGraphApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]);

// controllers
app.controller('graphCtrl', function(){

});

app.controller('listCtrl', function(){

});

// directives
app.directive('directedGraph', ['$log','MockDataService', function($log, MockDataService){
  /**
   * defines the logic that manipulates the DOM
   * The link function is responsible for registering DOM listeners as well as updating the DOM. It is executed after
   * the template has been cloned. This is where most of the directive logic will be put.
   * @param scope -  The scope to be used by the directive for registering watches.
   * @param element - is the jqLite-wrapped element that this directive matches. The element where the directive is to
   * be used. It is safe to manipulate the children of the element only in postLink function since the children have
   * already been linked.
   * @param attrs - is a hash object with key-value pairs of normalized attribute names and their corresponding attribute values
   */
  return{
    restrict: 'E', // can only use as an HTML attribute <directed-graph>
    templateUrl: '../views/directed-graph.view.html',
    scope: {
      height: '=' // allows height to be defined as an attribute on the html
    },
    link: function(scope, element, attrs){
      var width = document.getElementById('root').clientWidth;
      var svg = d3.select('svg').attr('height', attrs.height).attr('width', width);
      var height = svg.attr('height');
      $log.info('svg height: ' + svg.attr('height'));
      $log.info('svg width: ' + svg.attr('width'));

      var color = d3.scaleOrdinal(d3.schemeCategory20);
      $log.debug('assert color is not null: ' + color === undefined);
      $log.info(color);

      var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function(d) { return d.id; }))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

      $log.info(simulation);



    }

  };
}]);

app.directive('listView', function(){
  return {
    restrict: 'E', // can only use as an HTML attribute <list-view>
    templateUrl: '../views/list-view.html'
  };
});


