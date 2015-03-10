'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);

var app = angular.module('BasicHttpAuth', [
    'Authentication',
    'Home',
    'ngRoute',
    'ngCookies'
])
 
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'modules/authentication/views/login.html',
            hideMenus: true
        })
 
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'modules/home/views/home.html'
        })
 
        .otherwise({ redirectTo: '/login' });
}])
 
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);

    app.controller('DemoController', ['$scope', function($scope){
        $scope.sampleBinding = "Sample";
        $scope.messages = serverMessages;
        this.btn = buttonData;
        $scope.messageInfo = {
            carn: 'AS2124421',
            id: 'iia211213-2188823'
        };
    }]);

    app.directive('icbsMessageDisplay', function() {
        return {
                template: 'Message CARN: {{messageInfo.carn}} Message Id: {{messageInfo.id}}'
        };
    });


    app.controller('CustomController', ['$scope', function($scope){
        $scope.messageStatus = 'Pending';

        $scope.submitMessage = function() {
            $scope.messageStatus = 'Submitted';
        };

        $scope.resubmitMessage = function() {
            $scope.messageStatus = 'Resubmitted';
        };

        $scope.helloMessage = function(name) {
            $scope.name = 'Hello ' + name;
        }
    }]);

    app.controller('ServiceController', ['$scope', 'notify', function($scope, notify){
        $scope.callNotify = function(msg) {
            notify(msg)
        };
    }]);

    app.controller('FilterController', ['$scope', function($scope){
        $scope.greeting = 'hello';
        $scope.amount = 1234.4
        $scope.messages = serverMessages;
    }]);

    app.factory('notify', ['$window', function(win){
        var msgs = [];
        return function(msg) {
            msgs.push(msg);
            if(msgs.length == 3) {
                win.alert(msgs.join("\n"));
                msgs = [];
            }
        };

    }]);

    app.filter('reverse', function() {
         return function(input, uppercase) {
           input = input || '';
           var out = "";
           for (var i = 0; i < input.length; i++) {
             out = input.charAt(i) + out;
           }
           // conditional based on optional argument
           if (uppercase) {
             out = out.toUpperCase();
           }
           return out;
         };
       })

var serverMessages =[{
        desc: 'Message1',
        id: 'ooek3912',
        carn: 'adfoo3mm123p',
        status: 'Delivered'},
        {
        desc: 'Message2',
        id: 'dd32fae',
        carn: '123ddjjt1',
        status: 'Delivered'},
        {
        desc: 'Message3',
        id: '12kif8123',
        carn: 'as932nj',
        status: 'Pending'}

];

var buttonData = {
    default: false,
    primary: false,
    success:false,
    info: false,
    warning: true,
    danger: false,
    link: true

}
var gem = {
    name: 'Agate',
    price: 2.95,
    description: 'Nice gem',
    enabled: false
}