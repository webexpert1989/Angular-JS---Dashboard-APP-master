/*******************************
 *
 * Created: 07/06/2016
 *
 *******************************/


(function() {
    "use strict";
    
    var app = angular
        .module("myVegetables", ["ngRoute", "ui.bootstrap", "MV.top", "MV.main", "MV.services"])
        .config(["$routeProvider", function($routeProvider){

            $routeProvider
                .when("/", {
                    templateUrl: "./app/views/main.html"
                })
                .otherwise({
                    redirectTo: "/"
                });

        }]);

})();