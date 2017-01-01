var myApp =angular.module('myApp', ['ngRoute']);
myApp.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);
myApp.config(function ($routeProvider) {
   $routeProvider
      .when('/project/:id', {
         templateUrl: 'views/project.html',
         controller: 'projectCtrl',
         controllerAs: 'project'
      })
      .otherwise({
         redirectTo: '/#'
      });
});

myApp.controller('dashCtrl', function($scope,$http) {
    $http.get("/api/projects").then(function(response) {
      //console.log(response.data);
    $scope.dash = response.data;
    });
    $scope.Conveyorcount = function(conveyors){
      var count =0;
      var x;
      for (x in conveyors) {
        var index = ((conveyors[x].timeRunning-conveyors[x].lastMaintenance) /conveyors[x].maintenancetime)*100;
        if (index > 90) { count+=1;}
      }
      return count;
    };
});

myApp.controller('projectCtrl',function($scope,$http,$routeParams) {
  $http.get("/api/project/"+$routeParams.id).then(function(response) {
    //console.log(response.data);
    $scope.Conveyors = response.data.Conveyors ;
    $scope.edit = function(index){
      //console.log(index);
      $scope.Conveyors[index].lastMaintenance = $scope.Conveyors[index].timeRunning ;
      $http.put("/api/project/"+$routeParams.id+'/' + $scope.Conveyors[index].name, $scope.Conveyors[index])
      .success(function(){
        //console.log("succes") ;
      })
      .error(function(err){
        alert('Error! Something went wrong'+ err);
      });
    };
  });
  $scope.getColorConveyor = function(x){
    var index = ((x.timeRunning-x.lastMaintenance) /x.maintenancetime)*100;
    //console.log("index:"+index);
    if (index < 90) { return "bg-default";} else
    if (index >= 90 && index < 100 ) { return "bg-warning";} else
    if (index >=100) { return "bg-danger";}
  };

  $scope.getColorProgress = function(x){
    var index = ((x.timeRunning-x.lastMaintenance) /x.maintenancetime)*100;
    //console.log("index:"+index);
    if (index < 90) { return "progress-bar-success";} else
    if (index >= 90 && index < 100 ) { return "progress-bar-warning";} else
    if (index >=100) { return "progress-bar-danger";}
  };

  $scope.getProgress = function(x){
    var index = ((x.timeRunning-x.lastMaintenance) /x.maintenancetime)*100;
    return index;
  };

});
