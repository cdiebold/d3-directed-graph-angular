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
app.directive('directedGraph', function(){
  return{
    restrict: 'E', // can only use as an HTML attribute <directed-graph>
    templateUrl: '../views/directed-graph.view.html'
  }
});

app.directive('listView', function(){
  return {
    restrict: 'E', // can only use as an HTML attribute <list-view>
    templateUrl: '../views/list-view.html'
  }
});


