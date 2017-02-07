/*******************************
 *
 * Created: 07/06/2016
 *
 *******************************/

(function() {
    "use strict";
    
    angular.module("MV.top", ["ngScrollbars"])
        .config(function(ScrollBarsProvider){
            // scrollbar defaults
            ScrollBarsProvider.defaults = {
                autoHideScrollbar: false,
                scrollInertia: 200,
                axis: "yx",
                advanced: {
                    updateOnContentResize: true
                },
                scrollButtons: {
                    scrollAmount: "auto", // scroll amount when button pressed
                    enable: true // enable scrolling buttons by default
                }
            };
        })
        .controller("top", ["$scope", function($scope){
            $scope.scrollbarConfig = {
                theme: "dark-3",
                scrollInertia: 500
            }
            
            // popup
            $scope.showPopup = "";
            $scope.popup = function(id){
                var msg = {
                    Main: {
                        title: "More vegetables",
                        img: "https://static.pexels.com/photos/33315/cabbage-vegetable-power-green.jpg",
                        desc: "This MVP has been put together to demonstrate our vision. The final version of the tool would include live data, more than 10 different vegetables, and the ability to choose different cities."
                    },
                    ConfidenceLevel: {
                        title: "Confidence Level",
                        img: "https://static.pexels.com/photos/5775/calculator-scientific.jpg",
                        desc: "Every forecast has a margin of error. Confidence Level highlights the degree of certainty that the algorithm has in regards to the day's prediction. The higher, the better."
                    },
                    FarmHealthIndex: {
                        title: "Farm Health Index",
                        img: "https://static.pexels.com/photos/24978/pexels-photo.jpg",
                        desc: "An index developed by Termelo, FHI highlights the productivity of all farms - in this case lettuce farms - accross North America. Using satelite imagery and multi-spectral remote sensing, we can accurately determine the supply power of the industry at any moment in time. The index scores the day's outlook based on a 0-1000 scale."
                    },
                    NextRefresh: {
                        title: "Next Refresh",
                        img: "https://static.pexels.com/photos/2097/desk-office-pen-ruler.jpg",
                        desc: "Termelo recalculates all forecasts every 2 hours, taking into account the latest reports of severe weather accross North America. This means the forecast is always the best it could be!"
                    },
                    WhatIsThis: {
                        title: "What is this",
                        img: "https://static.pexels.com/photos/34177/pexels-photo.jpg",
                        desc: "This is a demonstration of TermeloKnow, a free tool that helps restaurants be mindful of their future raw material costs by providing accurate vegetable price forecasts for the next 7 days. Simply click on any date from the calendar and check out the prices on the red column. The closer your choice is to today, the higher the prediction accuracy will be."
                    },
                    WhoMadeIt: {
                        title: "Who made it",
                        img: "https://static.pexels.com/photos/47408/pexels-photo-47408.jpeg",
                        desc: "TermeloKnow is made by Termelo, an innovative urban farm in the heart of Montreal, Quebec. We offer some of the best produce available in the city and deliver 7 days per week to the restaurants we serve."
                    },
                    Why: {
                        title: "Why?",
                        img: "https://static.pexels.com/photos/5938/food-salad-healthy-lunch.jpg",
                        desc: "Termelo believes in empowering chefs to be competitive, efficient, and claculated. Our farm products and our order processing system is built on these foundations. But we didn't want to stop there. With TermeloKnow, we want to futher allow restaurant owners and chefs the ability to make calculated decisions."
                    },
                    HowDoesItWork: {
                        title: "How does it work?",
                        img: "https://static.pexels.com/photos/40120/pexels-photo-40120.jpeg",
                        desc: "TermeloKnow takes into account 17 different variables from diesel prices to soil moisture models and combines it with multi-spectral satelite imagery to achieve an accurate model for price fluctuations in the Montreal vegetable market."
                    },
                    ContactUs: {
                        title: "Contact us",
                        img: "https://static.pexels.com/photos/6465/man-field-smartphone-yellow.jpg",
                        desc: "Want to discuss TermeloKnow? Want to know more about Termelo? Send us an email at info@termelo.farm"
                    },
                    error: {
                        title: "No Text",
                        img: "../images/popup-header.png",
                        desc: "Sorry, Couldn't find correct text."
                    }
                };

                if(msg[id]){
                    $scope.poupHeader = msg[id].img;
                    $scope.poupTitle = msg[id].title;
                    $scope.poupContents = msg[id].desc;
                } else {
                    $scope.poupHeader = msg.error.img;
                    $scope.poupTitle = msg.error.title;
                    $scope.poupContents = msg.error.desc;
                }
                $scope.showPopup = "show";
            };
        }]);
    
})();

