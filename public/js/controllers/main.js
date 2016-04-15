/**
 * Created by leandroloi on 15/04/16.
 */


angular.module('todoController', [])

    .controller('mainController', function($scope, $http, Todos){
        $scope.formData = {};

        Todos.get()
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error on delete: ' + data);
            });

        $scope.createTodo = function() {
            if (!$.isEmptyObject($scope.formData)) {

                // call the create function from our service (returns a promise object)
                Todos.create($scope.formData)

                    // if successful creation, call our get function to get all the new todos
                    .success(function(data) {
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.todos = data; // assign our new list of todos
                    })
                    .error(function(data) {
                        console.log('Error on delete: ' + data);
                    });
            }
        };

        $scope.deleteTodo = function(id) {
            Todos.delete(id)
                // if successful creation, call our get function to get all the new todos
                .success(function(data) {
                    $scope.todos = data; // assign our new list of todos
                })
                .error(function(data) {
                    console.log('Error on delete: ' + data);
                });
        };

    });