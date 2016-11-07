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

### Different pieces of an angular app

1. Model: The data shown to the users. The model data are simple POJOs (Plain Old JavaScript Objects).
2. View: This is what the users see when they visit your page, that is to say after the raw HTML template involving directives and expressions is compiled and linked with correct scope.
3. Controller: The business logic that drives your application.
4. Scope: A context that holds data models and functions. A controller usually sets these models and functions in the scope.
5. Directives: Something that teaches HTML new syntax. It extends HTML with custom elements and attributes.
6. Expressions: Expressions are represented by {{}} in the HTML. They are useful for accessing scope models and functions.

#### Here's what each component does:

Controller: The Controller handles inputs, calls the code that performs business rules and shares data with view via $scope. The business logic is what your app is known to do. In case of a weather app the business logic is all about obtaining the weather data (probably from a REST web service). In AngularJS we perform this logic inside a service and inject it into the controller. Using the service our controller obtains the data and sets it on a $scope object so that the view can display it. In this way the controller is just aware of the $scope and not the view. Tomorrow you can change the whole UI from a web view to mobile view and the business logic will be the same because the controller is completely separated from the view.

Model: The Model represents the business data that drives your UI. Your UI is a projection of the model data at any given time through the view.

View: The view is only concerned with displaying the data and is decoupled from the business logic. It should update itself whenever the underlying data model changes. In AngularJS the view reads model data from the $scope which has already been set by our controller and displays it. This helps the front end development to progress in parallel with the back end activity.


Think of the scope as a glue between Controller and View. This way our Controller and View are not aware of each other, but still they can share data. This means if tomorrow your manager asks you to change the current UI to something else you can do that pretty easily without touching the business logic.
