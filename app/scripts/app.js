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
app.controller('graphCtrl', ['$log','$scope', 'mockDataService', function($log, $scope, mockDataService){
  $log.info("Scope: " + $scope);

  $scope.data = mockDataService.mockData();
  $scope.buttonTitle = mockDataService.title;
  $log.info($scope.data.node); //I am able to get data from service

}]);

app.controller('listCtrl', ['$scope','mockDataService', function($scope, mockDataService){
  $scope.links = mockDataService.uniqueLinks;

  //update links as they change
  $scope.$watch('links', function(){
    mockDataService.uniqueLinks = $scope.links;
  });

}]);

// directives
app.directive('directedGraph', ['$log','mockDataService', function($log, mockDataService){
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
      height: '=',  // allows height to be defined as an attribute on the html
      nodes: '=',  //node data from controller
      links: '='   // links data from controller
    },
    link: function(scope, element, attrs){
      var width = document.getElementById('root').clientWidth;
      var height = svg.attr('height');

      var svg = d3.select('svg').attr('height', height).attr('width', width);

      $log.info('svg height: ' + svg.attr('height'));
      $log.info('svg width: ' + svg.attr('width'));

      var color = d3.scaleOrdinal(d3.schemeCategory20);

      var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().distance(125).id(function(d) { return d.name; }))
        .force("charge", d3.forceManyBody().strength(-75))
        .force("collision", d3.forceCollide(5))
        .force("center", d3.forceCenter(width / 2, height / 2));

      $log.info(simulation);

      //get data
      var nodes = scope.nodes;
      var edges = scope.links;



      function initializeGraph(svg, color, simulation){
        var link = svg.append('g')
          .attr('class', 'links')
          .selectAll('line')
          .data(edges)
          .enter().append('line')
          .attr('stroke', 'black')
          .attr('stroke-width', 1.5);

        var node = svg.selectAll('nodes')
          .attr('class', 'nodes')
          .data(nodes)
          .enter().append('g')
          .append('circle')
          .attr('r', 20)
          .attr('fill', function(d){ return color(d.group)})
          .call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended));



        dragstarted = function(d){
          if(!d3.event.active){
            simulation.alphaTarget(0.3).restart();
          }
          d.fx = d.x;
          d.fy = d.y;

        };
        dragged = function(d){
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        };
        dragended = function(d){
          if(!d3.event.active){
            simulation.alphaTarget(0);
          }
          d.fx = null;
          d.fy = null;
        };

        ticked = function(){
          link.attr('x1', function(d){ return d.source.x; })
            .attr('y1'  , function(d){ return d.source.y; })
            .attr('x2'  , function(d){ return d.target.x; })
            .attr('y2'  , function(d){ return d.target.y; });

          node.attr('cx', function(d){ return d.x; })
            .attr('cy'  , function(d){ return d.y; });
        };

        simulation.nodes(node).on('tick', ticked);
        simulation.force('link').links(link);

      }

      initializeGraph(svg, color, simulation);





    }

  };
}]);

app.directive('listView', function(){
  return {
    restrict: 'E', // can only use as an HTML attribute <list-view>
    templateUrl: '../views/list-view.html'
  };
});


