/*******************************
 *
 * Created: 07/06/2016
 *
 *******************************/

(function() {
    "use strict";
    
    angular.module("MV.main", []).controller("main", ["$scope", "$api", "$interval", "$timeout", function($scope, $api, $interval, $timeout) {
        var dayNames = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];
        
        var chartDayNames = [
            "Sun",
            "Mon",
            "Tues",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ];
        
        // timer
        var refreshTime = 5279;
        $scope.chartDataAsRefresh = refreshTime;
        $scope.chartDataAsRefreshPrint = getTime($scope.chartDataAsRefresh);
        
        //////////////////////////////////////////////////////////////
        
        // get full data
        getData();
        
        // init all data
        initData();
        
        // calendar
        $scope.today = function() {
            $scope.dt = new Date("2016-07-01");
        };
        $scope.today();

        $scope.options = {
            showWeeks: false
        };

        $scope.sel = function(){
            // get selected date
            selectDate();
        }
  
        // enable chart
        $scope.loadedGchart = false;
        google.charts.load("current", {"packages":["corechart"]});
        google.charts.setOnLoadCallback(function(){
            $scope.loadedGchart = true;
        });

        $(window).on("resize.doResize", function (){
            $scope.$apply(function(){
                resetChart();
            });
        });

        $scope.$on("$destroy",function (){
            $(window).off("resize.doResize"); //remove the handler added earlier
        });

        //////////////////////////////////////////////////////////////
        function selectDate(){
            var selDate = new Date($scope.dt);
            selDate.setHours(0,0,0,0);
            $scope.selectedDate = selDate.getTime();
            $scope.selectedDay = selDate.getDay();
            $scope.selectedWeek = $scope.selectedDate - $scope.selectedDay * 86400000;

            if($scope.MVall[$scope.selectedDate]){
                $scope.MVdata.dayName = dayNames[$scope.selectedDay];
                
                for(var i in $scope.MVdata){
                    if($scope.MVall[$scope.selectedDate][i]){
                        $scope.MVdata[i] = $scope.MVall[$scope.selectedDate][i];
                    }
                }
                
            } else {
                console.log("no Data");
                initData();
                
            }

            $scope.MVdata.chartDataAsDay = [["Day", ""]];
            for(var i = 0; i < 8; i++){
                var t = $scope.selectedWeek + i * 86400000;
                var v = $scope.MVall[t]? parseFloat($scope.MVall[t].ConfidenceLevel): 0;
                $scope.MVdata.chartDataAsDay.push([{v: i, f: chartDayNames[i]}, v]);
            }
            
            resetChart();
        }
        
        function initData(){
            
            $scope.MVdata = {
                vegetableName: "Lettuce",
                userName: "Romain",
                dayName: "---",
                Timestamp: 0,
                Date: "",
                ConfidenceLevel: 0,
                High: 0,
                HighTrend: 0,
                Low: 0,
                LowTrend: 0,
                Average: 0,
                AverageTrend: 0,
                FarmHealthIndex: 0,
                IndexTrend: 0,
                chartDataAsDay: [
                    ["Day", ""],
                    [{v: 0, f: chartDayNames[0]}, 0],
                    [{v: 1, f: chartDayNames[1]}, 0],
                    [{v: 2, f: chartDayNames[2]}, 0],
                    [{v: 3, f: chartDayNames[3]}, 0],
                    [{v: 4, f: chartDayNames[4]}, 0],
                    [{v: 5, f: chartDayNames[5]}, 0],
                    [{v: 6, f: chartDayNames[6]}, 0],
                    [{v: 7, f: chartDayNames[7]}, 0],
                ]
            };
        }
        
        function initChart(){
            // init data 
            initData();

            // line area chart
            drawAreaChart();

            // cycle chart
            drawCycleChart();
            
            // set count-down timer
            if($scope.interval){
                $interval.cancel($scope.interval);
            }
            
            $scope.interval = $interval(function(){
                
                if($scope.chartDataAsRefresh == 0){
                    // refresh after 2 hour
                    $scope.chartDataAsRefresh = refreshTime;
                    $scope.chartAsRefresh.duration(500).data($scope.chartDataAsRefresh).update();

                    // get data form server again
                    getData();

                } else {
                    $scope.chartDataAsRefresh--;
                    $scope.chartAsRefresh.duration(0).data($scope.chartDataAsRefresh).update();
                }
                $scope.chartDataAsRefreshPrint = getTime($scope.chartDataAsRefresh);

            }, 1000);
        }

        function drawAreaChart(){
            // line area chart
            var data = google.visualization.arrayToDataTable($scope.MVdata.chartDataAsDay);
            var options = {
                curveType: "function",
                lineWidth: 4,
                legend: "none",
                hAxis: { 
                    baseline: 0,
                    baselineColor: "#2e4358",
                    gridlines: {color: "#2e4358", count: data.length - 1},
                    ticks: [
                        {v: 0, f:"Sun"},
                        {v: 1, f:"Mon"},
                        {v: 2, f:"Tues"},
                        {v: 3, f:"Wed"},
                        {v: 4, f:"Thu"},
                        {v: 5, f:"Fri"},
                        {v: 6, f:"Sat"},
                        {v: 7, f:"Sun"}
                    ],
                    textStyle: {color: "#ddebf6"}
                },
                vAxis: {
                    maxValue: 100,
                    minValue: 0,
                    minValue: 0,  baselineColor: "#2e4358", 
                    gridlines: {color: "#2e4358", count: 0}
                },
                series: [
                    {color: "#ffe600", areaOpacity : 0.02}
                ],  
                chartArea: {top: 0, left: 10, width: "94%", height: "90%"},
                backgroundColor: {fill: "transparent"}
            };

            new google.visualization.AreaChart(document.getElementById("chartAsDay")).draw(data, options);

        }

        function drawCycleChart(){
            // Confidence Level
            var elemChartAsLevel = document.getElementById("chartAsLevel");
            elemChartAsLevel.innerHTML = "";

            $scope.ChartAsLevel = vizuly.component.radial_progress(elemChartAsLevel);
            $scope.ChartAsLevel.data($scope.MVdata.ConfidenceLevel)   // Current value
                                .min(0)                         // min value
                                .max(100)                       // max value
                                .capRadius(1)                   // Sets the curvature of the ends of the arc.
                                .startAngle(0)                  // Angle where progress bar starts
                                .endAngle(360)                  // Angle where the progress bar stops
                                .arcThickness(.15)              // The thickness of the arc (ratio of radius)
                                .label(function (d, i){         // The 'label' property allows us to use a dynamic function for labeling.
                                    return d3.format()(d) + "%";
                                });                             // Sets the curvature of the ends of the arc.
            $scope.ChartAsLevel.width(elemChartAsLevel.offsetWidth).height(elemChartAsLevel.offsetHeight).radius(elemChartAsLevel.offsetWidth/2.2).update();

            // refresh count-down timer
            var elemhartAsRefresh = document.getElementById("chartAsRefresh");
            elemhartAsRefresh.innerHTML = "";

            $scope.chartAsRefresh = vizuly.component.radial_progress(elemhartAsRefresh);
            $scope.chartAsRefresh.data($scope.chartDataAsRefresh)
                                .min(0)
                                .max(refreshTime + 1)
                                .capRadius(1)
                                .startAngle(270)
                                .endAngle(90)
                                .arcThickness(.12)
                                .label(function (d, i){         // The 'label' property allows us to use a dynamic function for labeling.
                                    return "";
                                });
            $scope.chartAsRefresh.width(elemhartAsRefresh.offsetWidth).height(elemhartAsRefresh.offsetHeight).radius(elemhartAsRefresh.offsetWidth/2.2).update();
        }

        function resetChart(){
            drawAreaChart()
            $scope.ChartAsLevel.data($scope.MVdata.ConfidenceLevel).update();
        }
        
        function getData(){
            $api.getData($scope,
                "GET",
                "data",
                {}, 
                function(response){
                    var fields = [
                        "Timestamp",
                        "Date",
                        "ConfidenceLevel",
                        "High",
                        "HighTrend",
                        "Low",
                        "LowTrend",
                        "Average",
                        "AverageTrend",
                        "FarmHealthIndex",
                        "IndexTrend"
                    ];
                    
                    $scope.MVall = [];
                    var fullData = response.split("\n");
                    for(var i in fullData){
                        var d = fullData[i].split("\t");
                        
                        if(d[0]){
                            $scope.MVall[d[0]] = {};
                            for(var f in fields){
                                $scope.MVall[d[0]][fields[f]] = d[f];
                            }
                        }
                    }
                
                    console.log("data:", $scope.MVall);
                    if($scope.loadedGchart){
                        initChart();
                        selectDate();                        
                    } else {
                        $scope.checkGchartTimer = $interval(function(){
                            if($scope.loadedGchart){
                                $interval.cancel($scope.checkGchartTimer);
                                
                                initChart();
                                selectDate();
                            }
                        }, 300);
                    }
                
                    return;
                }
            );
        }
        
        function getTime(timestamp){
            var h = Math.floor((timestamp + 60) / 3600);
            var m = Math.ceil((timestamp - h * 3600) / 60);
            return {h: h, m: m};
        }
    }]);
    
})();
