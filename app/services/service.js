/*******************************
 *
 * Created: 07/06/2016
 *
 *******************************/

(function(){
    "use strict";
    
    angular.module("MV.services", []).constant("$servicesConfig", {
        urlRoot: "./json/",
        urlSub: {
            data: "sample.json"
        }
    })
    .factory("$api", ["$servicesConfig", "$http", function($servicesConfig, $http){
        return {
            getData: function($scope, type, func, params, callback){
                var ajaxURL = $servicesConfig.urlRoot + $servicesConfig.urlSub[func];

                ////
                $scope.$parent.loadingBar = true;
                $http({method: type, url: ajaxURL, headers: {"Content-Type": "application/json; charset=UTF-8"}, data: params})
                    .success(function(response, status, headers, $servicesConfig){
                        $scope.$parent.loadingBar = false;

                        if(callback){
                            callback(response);
                        }
                    })
                    .error(function(response, status, headers, $servicesConfig){
                        $scope.$parent.loadingBar = false;
                        alert("Ajax Error");

                        if(callback){
                            callback(response);
                        }
                    });
                return;
            },
        };
    }]);
    
})();