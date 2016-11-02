### services, controllers, and directives

Services are responsible for fetching and storing data from remote 
servers. Controllers build on top of services to provide data and 
functionality to AngularJS’s scope hierarchy. Directives build on top 
of controllers and services to interface with Document Object Model (DOM) 
elements directly.

### Controllers:

Controllers are the AngularJS component responsible for exposing JavaScript data and functions to your Hypertext Markup Language (HTML). Typically, controllers are instantiated from your HTML using the ng‐controller directive:
`<div ng-controller="MyController"></div>`

Controllers are instantiated using AngularJS’s dependency injector, a tool that inspects the controller’s parameters and constructs them as necessary. Because services are registered with the dependency injector, a controller can utilize any number of services. However, controllers are not registered with the dependency injector, so controllers and services cannot list controllers as dependencies.

a service cannot list a local as a dependency. The following code will cause an error:
`m.factory('myService', function($scope) { // Error: $scope not registered with
// dependency injector
});`
This is why controllers are AngularJS’s primary tool for exposing JavaScript data and functions to HTML: Controllers have access to $scope, whereas services do not. However, there is nothing to stop a controller from listing a service as a dependency and adding that service to its scope:
`m.factory('myService', function() { return { answer: 42 };
});
m.controller('MyController', function($scope, myService) { // Enable accessing myService from the scope $scope.myService = myService;
});`

### Directives

A directive is a rule for how the DOM should interact with JavaScript variables. In other words, directives are AngularJS’s abstraction around DOM interactions. For instance, the ngClick directive de nes a rule that says, “When this element is clicked, evaluate this code snippet.”


Fundamentally, a directive is a rule for de ning how your UI interacts with data binding. In other words,
a directive de nes how the associated element interacts with its corresponding scope.

your controllers should provide an API by attaching functions and variables to a scope, and your HTML de nes how the API should be used to create your page’s user experience. This idea is a signi cant paradigm shift from how JavaScript is written in many other frameworks, where HTML provides a basic structure that JavaScript is responsible for modifying.

### Directive link ()
The link function is invoked on each element you attach the directive to. This function takes the DOM element, its associated scope, and a map of the element’s attributes. 
