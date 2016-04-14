/**
 * Created by leandroloi on 14/04/16.
 */
var simpleTodo = angular.module('simpleTodo', []);

function mainController($scope, $http){
    $scope.formData = {};

    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data){
            console.log(data);

    });

    $scope.createTodo = function(){
        $http.post('/api/todos', $scope.formData)
            .success(function(data){
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);

            })
            .error(function(data){
                console.log(data);

            });

    };

    $scope.deleteTodo = function(id){
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error on delete: ' + data);
            });
    };



}