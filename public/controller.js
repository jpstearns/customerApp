var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

var refresh = function(){
$http.get('/customers').success(function(response) {
	console.log("I got the data I requested")
	$scope.customers = response;
    $scope.customer = {};
  });
};
        refresh();
    	$scope.customers;

    	$scope.newCustomer = {};

    	$scope.addNewCustomer = function(newCustomer){
    		console.log($scope.newCustomer)
    		$scope.customers.push(newCustomer);    		
    		$http.post('/customers', $scope.newCustomer).success(function(response){
    			console.log(response);
            $scope.newCustomer = {};
    	    });
        }

 
    	$scope.editCustomer = function(id) {
             console.log(id);
             $scope.editOldCustomer = true;
             $http.get('/customers/' + id).success(function(response) {
             $scope.existingCustomer = response;
  });
}; 
    	
    $scope.update = function(){
      console.log($scope.existingCustomer);
    $http.put('/customers/' + $scope.existingCustomer._id, $scope.existingCustomer).success(function(response) {
      refresh(); 
      $scope.existingCustomer={};
      $scope.editOldCustomer = false;
  })  
};	
    	$scope.deleteCustomer = function(id){
          console.log("removing... " + id);
          $http.delete('/customers/' + id);
          refresh();
    	}
    } 		
]);