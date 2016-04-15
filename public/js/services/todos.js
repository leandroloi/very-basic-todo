/**
 * Created by leandroloi on 15/04/16.
 */


angular.module('todoService',[])

    //very simple service
    .factory('Todos', function($http){

        return {
            get : function(){
                return $http.get('/api/todos');
            },
            create : function(todoData){
                return $http.post('/api/todos', todoData);
            },

            delete : function(id){
                return $http.delete('/api/todos/' + id)
            }
        }

    });

