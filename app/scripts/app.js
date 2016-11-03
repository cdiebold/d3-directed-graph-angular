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
  .module('directedGraphApp', ['ngAnimate']);

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
app.directive('directedGraph', ['$log','mockDataService', function($log, mockDataService) {
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

  function link(scope, element, attributes){
    var width = document.getElementById('root').clientWidth;
    var svg = d3.select('svg').attr('height', attributes.height).attr('width', width);
    var height = svg.attr('height');
    $log.info('svg height: ' + svg.attr('height'));
    $log.info('svg width: ' + svg.attr('width'));

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().distance(125).id(function (d) {
        return d.name;
      }))
      .force("charge", d3.forceManyBody().strength(-75))
      .force("collision", d3.forceCollide(5))
      .force("center", d3.forceCenter(width / 2, height / 2));

    var data = mockDataService.mockData();

    //get data
    var graph_nodes = data.node;
    var graph_edges = data.edge;

    createSvgArrow();

    $log.info("nodes data undefined: " + graph_nodes);
    $log.info("links data undefined: " + graph_edges);

    var link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graph_edges)
      .enter().append('line')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.5)
      .style("marker-end",  "url(#suit)") ;// Modified line;

    $log.info("links inside init: " + link);

    var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graph_nodes)
      .enter().append("circle")
      .attr("r", 15)
      .attr("fill", function (d) {
        return color(d.group);
      })
      .call(d3.drag()
        .on("start", dragStarted)
        .on("drag", dragged)
        .on("end", dragEnded));

    $log.info("node inside init: " + node);
    var ticked = function () {
      link.attr('x1', function (d) { return d.source.x; })
        .attr('y1'  , function (d) { return d.source.y; })
        .attr('x2'  , function (d) { return d.target.x; })
        .attr('y2'  , function (d) { return d.target.y; });

      node.attr('cx', function (d) { return d.x; }).attr('cy', function (d) { return d.y; });

    }; //end ticked function

    simulation.nodes(graph_nodes).on('tick', ticked);
    simulation.force('link').links(graph_edges);

    function dragStarted(d) {
      if (!d3.event.active) {
        simulation.alphaTarget(0.3).restart();
      }
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragEnded(d) {
      if (!d3.event.active) {
        simulation.alphaTarget(0);
      }
      d.fx = null;
      d.fy = null;
    }

    function createSvgArrow(){
      svg.append("defs").selectAll("marker")
        .data(["suit", "licensing", "resolved"])
        .enter().append("marker")
        .attr("id", function(d) { return d; })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 25)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5 L10,0 L0, -5")
        .style("stroke", "#4679BD")
        .style("opacity", "0.6");
    }

  }
  return {
    restrict: 'E', // can only use as an HTML attribute <directed-graph>
    templateUrl: '../views/directed-graph.view.html',
    scope: {
      height: '=' // allows height to be defined as an attribute on the html
    },
    link: link
  }; // end return object

}]);

app.directive('listView', function(){
  return {
    restrict: 'E', // can only use as an HTML attribute <list-view>
    templateUrl: '../views/list-view.html'
  };
});


